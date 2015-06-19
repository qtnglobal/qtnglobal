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
angular.module('com.module.explorer')
  .controller('ExplorerCtrl', function($scope, $routeParams, $location) {
    $scope.goToNews = function(){
      $location.path('/news');
    };

    $scope.goToExlorer = function(){
      $location.path('/explorer');
    };

    $scope.items = [{
      name: 'Trending',
      sref: '.trending'
    }, {
      name: 'Staffpick',
      sref: '.staffpick'
    }, {
      name: 'News',
      sref: '.news'
    }, {
      name: 'Project',
      sref: '.project'
    }];

  });
