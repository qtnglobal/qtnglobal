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
      $location.path('/news');
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
      name: 'News',
      sref: '.news'
    }, {
      name: 'Project',
      sref: '.project'
    }];

  });
