'use strict';
angular.module('com.module.videos')
  .controller('VideosCtrl', function($scope, $state, $stateParams, CoreService, $timeout,
                                     FormHelper, gettextCatalog, $location, Video, VideosService, User) {

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
      required: false
    }, {
      key: 'content',
      type: 'textarea',
      label: gettextCatalog.getString('Content'),
      required: false
    }];
    $scope.formContent = [{
      key: 'content',
      type: 'textarea',
      placeholder: gettextCatalog.getString('Add content here...'),
      required: false
    }];
    //{
    //  key: 'url',
    //  type: 'text',
    //  label: gettextCatalog.getString('Url'),
    //  required: true
    //}

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };
    $scope.formFieldsUrl = [{
      key: 'url',
      type: 'url',
      label: gettextCatalog.getString('URL'),
      required: true
    }];

    $scope.formFieldsDescription = [{
      key: 'description',
      type: 'textarea',
      label: gettextCatalog.getString('Description'),
      required: false
    }];
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
        $scope.video.upChoose = true;
        $scope.video.upFrom = true;
        $scope.video.urlweb = "#";
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
        $timeout($state.reload(), 3000);
      }
      else{
        CoreService.alertWarning('May be you do not have permission to do this stuff','Please ask admin for permission');
        $state.go('^.list');
      }
    };
    $scope.uploadVideos = function(){
      $('.clearfix').toggleClass('fromPC');
    };
    $scope.closeUpVideo = function(){
      $('.clearfix').removeClass('fromPC');
      $('.clearfix').removeClass('fromWeb');
      $state.go('^.list');
    };
    $scope.upVideosFromWeb = function(){
      $('.clearfix').toggleClass('fromWeb');
    };
    $scope.upVideoFromWeb = function(){
      $('.hidePCpost').toggleClass('fromWeb');
    };
    $scope.title123 = angular.element("title");
    $scope.upPost = function() {
      if($scope.video.ownerId === currentUser.id){
        var url = document.getElementById('liveurl-url').innerHTML;
        var img = document.getElementById('liveurl-img').innerHTML;
        $scope.video.upChoose = true;
        $scope.video.upFrom = false;
        $scope.video.url = url;
        $scope.video.title = document.getElementById('liveurl-title').innerHTML;
        $scope.video.liveurlDescription = document.getElementById('liveurl-description').innerHTML;
        if(url.indexOf("youtube")>=0){
          $scope.video.liveurlImg = img.slice(39,-2);
          $scope.video.urlweb =  url.replace("watch?v=","embed/").slice(0,41);
        }else if(url.indexOf("vimeo")>=0){
          var urlweb = url + " ";
          $scope.video.urlweb = "https://player.vimeo.com/video/" + urlweb.slice(-10,-1)
        }else if(url.indexOf("embed/")>=0){
          $scope.video.urlweb =  url;
        }else {
          $scope.video.urlweb = "#";
          $scope.video.upChoose = false;
          $scope.video.liveurlImg = img.slice(10,-30);
        }
        Video.upsert($scope.video, function() {
          CoreService.toastSuccess(gettextCatalog.getString('Link saved'),
            gettextCatalog.getString('Your link is safe with us!'));
          $state.go('^.list');
        }, function(err) {
          console.log(err);
        });
        $timeout($state.reload(), 3000);
      }
      else{
        CoreService.alertWarning('May be you do not have permission to do this stuff','Please ask admin for permission');
        $state.go('^.list');
      }
    };
  });
