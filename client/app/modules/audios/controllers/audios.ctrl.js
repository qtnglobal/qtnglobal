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
      if(id==1){
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
    }, {
      key: 'content',
      type: 'textarea',
      label: gettextCatalog.getString('Content'),
      required: true
    }/*, {
      key: 'url',
      type: 'text',
      label: gettextCatalog.getString('Url'),
      required: false
    }*/];

    $scope.formFieldsUrl = [{
      key: 'content',
      type: 'textarea',
      label: gettextCatalog.getString('Add a description, if you like'),
      required: false
    }]

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };


    $scope.upload = function(item){
      if($scope.audio.ownerId === currentUser.id){
        $scope.audio.url = CoreService.env.apiUrl+ '/containers/files/download/'+item.file.name;
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
    }

    $scope.onSubmit = function(url) {
          if($scope.audio.ownerId === currentUser.id){
            if(url.match(/mp3.zing.vn/)){
              var songID = url.substr(-13,8);
              $http({
                url: 'http://api.mp3.zing.vn/api/mobile/song/getsonginfo?keycode=fafd463e2131914934b73310aa34a23f&requestdata={"id":"'+songID+'"}',
                method: 'GET',
                dataType: 'jsonp'
              })
                .success(function(data) {
                  console.log(data);
                  $scope.title = data.title;
                  $scope.audio.artist = data.artist;
                  $scope.audio.genre = data.genre_name;
                  $scope.audio.cover = 'http://image.mp3.zdn.vn/' + data.album_cover;
                  $scope.audio.composer = data.composer;
                  $scope.audio.link_mp3 = data.link_download[128];
                  $scope.audio.title = $scope.title;
                  $scope.audio.url = url;
                  Audio.upsert($scope.audio, function() {
                    CoreService.toastSuccess(gettextCatalog.getString('Audio saved'),
                     gettextCatalog.getString('Your audio is safe with us!'));
                    $state.go('^.list');
                  }, function(err) {
                    console.log(err);
                  });
                })
            } else if (url.match(/soundcloud/)) {
              $http.get('http://api.soundcloud.com/resolve.json?url='+url+'&client_id=769247ada809c2e2640c6962c4017a9f')
                .success(function(data){
                  console.log(data);
                  $scope.title = data.title;
                  $scope.audio.artist = data.user.username;
                  $scope.audio.cover = data.artwork_url;
                  $scope.audio.link_mp3 = data.stream_url+'?client_id=769247ada809c2e2640c6962c4017a9f';
                  $scope.audio.title = $scope.title;
                  $scope.audio.url = url;
                  Audio.upsert($scope.audio, function() {
                    CoreService.toastSuccess(gettextCatalog.getString('Audio saved'),
                      gettextCatalog.getString('Your audio is safe with us!'));
                    $state.go('^.list');
                  }, function(err) {
                    console.log(err);
                  });
                })
            }
          }
            else{
              CoreService.alertWarning('May be you do not have permission to do this stuff','Please ask admin for permission');
              $state.go('^.list');
            }

      }
  });
