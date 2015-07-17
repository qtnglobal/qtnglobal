'use strict';
angular.module('com.module.audios')
  .controller('AudiosCtrl', function($scope, $state, $stateParams, CoreService,
    FormHelper, gettextCatalog, Audio, AudiosService, User, $http) {

    var currentUser;

    User.getCurrent(function(user) {
      currentUser = user;
      loadItems(currentUser.id);
    }, function(err) {
      console.log(err);
    });


    function loadItems(id) {
      if(id===1){
        $scope.audios = Audio.find(
          {
            filter: {
              order: 'created DESC'
            }
          }
        );
      }
      else{
        $scope.audios = Audio.find(
          {
            filter: {
              where:{
                ownerId: id
              },
              order: 'created DESC'
            }
          }
        );
      }
    }

    $scope.delete = function(id) {
      AudiosService.deleteAudio(id, function() {
        $state.reload();
      });
    };

    this.formHelper = new FormHelper(Audio);
    $scope.cancel = function() {
      console.log('Cancel');
      console.log(this.formHelper);
      //this.formHelper.cancel('app.audios.list');
    };

    var audioId = $stateParams.id;

    if (audioId) {
      $scope.audio = Audio.findById({
        id: audioId
      }, function() {}, function(err) {
        console.log(err);
      });
    } else {
      $scope.audio = {};
      User.getCurrent(function(user) {
        currentUser = user;
        $scope.audio.ownerId=user.id;
        $scope.audio.ownerName=user.firstName;
      }, function(err) {
        console.log(err);
      });
    }

    $scope.formFields = [{
      key: 'title',
      type: 'text',
      label: gettextCatalog.getString('Title'),
      required: true
    }];

    $scope.formFieldsContent = [{
      key: 'content',
      type: 'textarea',
      label: gettextCatalog.getString('Add a description, if you like'),
      required: false
    }];

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };


    $scope.upload = function(item){
      if($scope.audio.ownerId === currentUser.id){
        $scope.audio.linkMp3 = CoreService.env.apiUrl+ '/containers/files/download/'+item.file.name;
        $scope.audio.cover = './images/mucsicIcon.png';
        console.log(item.file.name);
        Audio.upsert($scope.audio, function() {
          CoreService.toastSuccess(gettextCatalog.getString('Audio saved'),
            gettextCatalog.getString('Your audio is safe with us!'));
          $state.go('^.list');
        }, function(err) {
          console.log(err);
        });
        item.upload();
      }
      else{
        CoreService.alertWarning('May be you do not have permission to do this stuff','Please ask admin for permission');
        $state.go('^.list');
      }
    };

    $scope.getDataZing = function(data){
      var title = data.match(/<title>(.*?)<\/title>/g);
      var embed = data.match(/<link rel="video_src" href="(.*?)"/g);
      var cover = data.match(/<meta property="og:image" content="(.*?)"/g);
      var getXml = data.match(/data-xml="(.*?)"/g);
      var xml = getXml[0].slice(10,-1);
      var linkDownload = xml.replace('mp3.zing.vn/xml/song-xml/','api.mp3.zing.vn/api/mobile/source/song/');
      $scope.audio.title = title[0].slice(7,-8);
      $scope.audio.linkMp3 = linkDownload;
      $scope.audio.cover = cover[0].slice(35,-1);
      Audio.upsert($scope.audio, function() {
        CoreService.toastSuccess(gettextCatalog.getString('Audio saved'),
          gettextCatalog.getString('Your audio is safe with us!'));
        $state.go('^.list');
      }, function(err) {
        console.log(err);
      });
      }

    $scope.getDataSoundcloud = function(data){
      $scope.audio.title = data.title;
      $scope.audio.artist = data.user.username;
      $scope.audio.cover = data.artwork_url.replace('large','t250x250');
      $scope.audio.linkMp3 = data.stream_url+'?client_id=769247ada809c2e2640c6962c4017a9f';
      Audio.upsert($scope.audio, function() {
        CoreService.toastSuccess(gettextCatalog.getString('Audio saved'),
          gettextCatalog.getString('Your audio is safe with us!'));
        $state.go('^.list');
      }, function(err) {
        console.log(err);
      });
    }

    $scope.onSubmit = function(url) {
          if($scope.audio.ownerId === currentUser.id){
            if(url.match(/mp3.zing.vn\//)){
              $http.get(url)
                .success(function(data) {
                  $scope.audio.url = url;
                  $scope.getDataZing(data);
                });
            } else if (url.match(/soundcloud/)) {
              $http.get('http://api.soundcloud.com/resolve.json?url='+url+'&client_id=769247ada809c2e2640c6962c4017a9f')
                .success(function(data){
                  $scope.getDataSoundcloud(data);
                  $scope.audio.url = url;
                });
            }
          }
            else{
              CoreService.alertWarning('May be you do not have permission to do this stuff','Please ask admin for permission');
              $state.go('^.list');
            }

      };

  });
