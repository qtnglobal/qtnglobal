'use strict';
/**
 * @ngdoc function
 * @name com.module.users.controller:LoginCtrl
 * @description Login Controller
 * @requires $scope
 * @requires $routeParams
 * @requires $location
 * Contrller for Login Page
 **/
angular.module('com.module.explore')
  .controller('ExploreCtrl', function($scope, $routeParams, $location) {

    $scope.goToNews = function(){
      $location.path('/links');
    };

    $scope.goToExlore = function(){
      $location.path('/explore');
    };

    $scope.goToLogin = function(){
      $location.path('/login');
    };

    $scope.goToRegister = function(){
      $location.path('/register');
    }

    $scope.items = [{
      name: 'Trending',
      sref: '.trending'
    }, {
      name: 'Staff picks',
      sref: '.staff-picks'
    }, {
      name: 'Article',
      sref: '.article'
    },{
      name: 'Photos',
      sref: '.photos'
    },{
      name: 'Links',
      sref: '.links'
    },{
      name: 'Audios',
      sref: '.audios'
    },{
      name: 'Videos',
      sref: '.videos'
    },{
      name: 'Project',
      sref: '.project'
    }];

  });
