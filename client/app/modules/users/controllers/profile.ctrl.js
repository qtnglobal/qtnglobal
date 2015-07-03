'use strict';
angular.module('com.module.users')
  .controller('ProfileCtrl', function($scope, $timeout, CoreService, User, gettextCatalog) {


    $scope.user = User.getCurrent(function(user) {
      console.log(user);
    }, function(err) {
      console.log(err);
    });
    
    $scope.formFields = [{
      key: 'username',
      type: 'text',
      label: gettextCatalog.getString('Username'),
      required: true
    }, {
      key: 'email',
      type: 'email',
      label: gettextCatalog.getString('E-mail'),
      required: true
    }, {
      key: 'firstName',
      type: 'text',
      label: gettextCatalog.getString('First name'),
      required: true
    }, {
      key: 'lastName',
      type: 'text',
      label: gettextCatalog.getString('Last name'),
      required: true
    }];

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };

    $scope.onSubmit = function() {
      User.upsert($scope.user, function() {
        CoreService.toastSuccess(gettextCatalog.getString(
          'Profile saved'), gettextCatalog.getString(
          'Enjoy the new you!'));
      }, function(err) {
        CoreService.toastError(gettextCatalog.getString(
          'Error saving profile'), gettextCatalog.getString(
          'Your profile is not saved: ') + err);
      });
    };
    //below Edit by Sang
    /*$scope.changeImages = function(){
      var $ = angular.element;
      $('.indash_blog').toggleClass('customizing');
      $scope.avaStyle={color:'rgb(250, 250, 250)', 'background-image':'url(https://secure.assets.tumblr.com/images/default_avatar/cube_closed_128.png)'};
    }*/

    $scope.changeCover = function(){
      var $ = angular.element;
      $('.navigation').toggleClass('customizing');
      $scope.avaStyle={color:'rgb(250, 250, 250)', 'background-image':'url(https://secure.assets.tumblr.com/images/default_avatar/cube_closed_128.png)'};
    };

    $scope.changeAvatar = function(){
      var $ = angular.element;
      $('.avatarSolution').toggleClass('customizing1');
      $scope.avaStyle={color:'rgb(250, 250, 250)', 'background-image':'url(https://secure.assets.tumblr.com/images/default_avatar/cube_closed_128.png)'};
    };

    $scope.uploadCover = function(item){

      $scope.user.cover = CoreService.env.apiUrl+ '/containers/files/download/'+item.file.name;
      console.log($scope.user);
      User.upsert($scope.user, function() {
        CoreService.toastSuccess(gettextCatalog.getString(
          'Profile saved'), gettextCatalog.getString(
          'Enjoy the new you!'));
      }, function(err) {
        CoreService.toastError(gettextCatalog.getString(
          'Error saving profile'), gettextCatalog.getString(
          'Your profile is not saved: ') + err);
      });
      item.upload();
      $('.navigation').toggleClass('customizing');
    }

    $scope.uploadAvatar = function(item){

      $scope.user.avatar = CoreService.env.apiUrl+ '/containers/files/download/'+item.file.name;
      console.log($scope.user);
      User.upsert($scope.user, function() {
        CoreService.toastSuccess(gettextCatalog.getString(
          'Profile saved'), gettextCatalog.getString(
          'Enjoy the new you!'));
      }, function(err) {
        CoreService.toastError(gettextCatalog.getString(
          'Error saving profile'), gettextCatalog.getString(
          'Your profile is not saved: ') + err);
      });
      item.upload();
      $('.avatarSolution').toggleClass('customizing1');
    }

  });
