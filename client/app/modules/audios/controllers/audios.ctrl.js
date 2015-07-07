'use strict';
angular.module('com.module.audios')
  .controller('AudiosCtrl', function($scope, $state, $stateParams, CoreService,
    FormHelper, gettextCatalog, Audio, AudiosService,User) {

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

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };


    $scope.onSubmit = function() {
      if($scope.audio.ownerId === currentUser.id){
        Audio.upsert($scope.audio, function() {
          CoreService.toastSuccess(gettextCatalog.getString('Audio saved'),
            gettextCatalog.getString('Your audio is safe with us!'));
          $state.go('^.list');
        }, function(err) {
          console.log(err);
        });
      }
      else{
        CoreService.alertWarning('May be you do not have permission to do this stuff','Please ask admin for permission');
        $state.go('^.list');
      }
    };

    $scope.upload = function(item){

      if($scope.audio.ownerId === currentUser.id){
        $scope.audio.url = CoreService.env.apiUrl+ '/containers/files/download/'+item.file.name;
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

  });
