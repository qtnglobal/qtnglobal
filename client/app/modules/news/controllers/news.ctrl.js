'use strict';
angular.module('com.module.news')
  .controller('NewsCtrl', function($scope, $state, $stateParams, CoreService,
    FormHelper, gettextCatalog, News, NewsService, User, $location) {

    $scope.delete = function(id) {
      NewsService.deleteNews(id, function() {
        $state.reload();
      });
    };

    this.formHelper = new FormHelper(News);
    $scope.cancel = function() {
      console.log('Cancel');
      console.log(this.formHelper);
      //this.formHelper.cancel('app.news.list');
    };

    var newId = $stateParams.id;

    if (newId) {
      $scope.new = News.findById({
        id: newId
      }, function() {}, function(err) {
        console.log(err);
      });
    } else {
      $scope.new = {};
      User.getCurrent(function(user) {
        currentUser = user;
        $scope.new.ownerId=user.id;
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
      key: 'image',
      type: 'text',
      label: gettextCatalog.getString('image'),
      required: true
    }*/];


    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };


    var currentUser;

    User.getCurrent(function(user) {
      currentUser = user;
    }, function(err) {
      console.log(err);
    });


    $scope.onSubmit = function() {
      if($scope.new.ownerId === currentUser.id){
        News.upsert($scope.new, function() {
          CoreService.toastSuccess(gettextCatalog.getString('News saved'),
            gettextCatalog.getString('Your new is safe with us!'));
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

    $scope.goToProject = function(){
      $location.path('/app/projects');
    }

    $scope.goToLink = function(){
      $location.path('/app/links');
    }

    $scope.goToVideo = function(){
      $location.path('/app/videos');
    }

    $scope.goToPhoto = function(){
      $location.path('/app/photos');
    }
  });
