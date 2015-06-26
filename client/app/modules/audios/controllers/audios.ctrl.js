'use strict';
angular.module('com.module.audios')
  .controller('AudiosCtrl', function($scope, $state, $stateParams, CoreService,
    FormHelper, gettextCatalog, Audio, AudiosService) {

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
    }, {
      key: 'url',
      type: 'text',
      label: gettextCatalog.getString('Url'),
      required: true
    }];

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };

    $scope.onSubmit = function() {
      Audio.upsert($scope.audio, function() {
        CoreService.toastSuccess(gettextCatalog.getString('Audio saved'),
          gettextCatalog.getString('Your audio is safe with us!'));
        $state.go('^.list');
      }, function(err) {
        console.log(err);
      });
    };

    $scope.upload = function(item){
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

  });
