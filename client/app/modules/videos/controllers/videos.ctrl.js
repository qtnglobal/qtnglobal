'use strict';
angular.module('com.module.videos')
  .controller('VideosCtrl', function($scope, $state, $stateParams, CoreService,
    FormHelper, gettextCatalog, Video, VideosService) {

    $scope.delete = function(id) {
      VideosService.deleteVideo(id, function() {
        $state.reload();
      });
    };

    this.formHelper = new FormHelper(Video);
    $scope.cancel = function() {
      console.log('Cancel');
      console.log(this.formHelper);
      //this.formHelper.cancel('app.videos.list');
    };

    var videoId = $stateParams.id;

    if (videoId) {
      $scope.video = Video.findById({
        id: videoId
      }, function() {}, function(err) {
        console.log(err);
      });
    } else {
      $scope.video = {};
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
      Video.upsert($scope.video, function() {
        CoreService.toastSuccess(gettextCatalog.getString('Video saved'),
          gettextCatalog.getString('Your video is safe with us!'));
        $state.go('^.list');
      }, function(err) {
        console.log(err);
      });
    };

    $scope.upload = function(item){
      $scope.video.url = CoreService.env.apiUrl+ '/containers/files/download/'+item.file.name;
      console.log(item.file.name);
      Video.upsert($scope.video, function() {
        CoreService.toastSuccess(gettextCatalog.getString('Video saved'),
          gettextCatalog.getString('Your video is safe with us!'));
        $state.go('^.list');
      }, function(err) {
        console.log(err);
      });
      item.upload();
    }

  });
