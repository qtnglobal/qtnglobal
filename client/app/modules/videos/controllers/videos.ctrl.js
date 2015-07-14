'use strict';
angular.module('com.module.videos')
  .controller('VideosCtrl', function($scope, $state, $stateParams, CoreService,
    FormHelper, gettextCatalog, Video, VideosService, User) {

    var currentUser;

    User.getCurrent(function(user) {
      currentUser = user;
      loadItems(currentUser.id);
    }, function(err) {
      console.log(err);
    });

    function loadItems(id) {
      if(id==1){
        $scope.videos = Video.find({
            filter: {
              order: 'created DESC'
            }
        });
      }
      else{
        $scope.videos = Video.find(
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
      User.getCurrent(function(user) {
        currentUser = user;
        $scope.video.ownerId=user.id;
        $scope.video.ownerName=user.username;
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
      required: true
    }*/];

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };

/*
    var currentUser;

    User.getCurrent(function(user) {
      currentUser = user;
    }, function(err) {
      console.log(err);
    });
*/

    $scope.onSubmit = function() {
      if($scope.video.ownerId === currentUser.id){
        Video.upsert($scope.video, function() {
          CoreService.toastSuccess(gettextCatalog.getString('Video saved'),
            gettextCatalog.getString('Your video is safe with us!'));
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
      if($scope.video.ownerId === currentUser.id){
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
      else{
        CoreService.alertWarning('May be you do not have permission to do this stuff','Please ask admin for permission');
        $state.go('^.list');
      }
    };

  });
