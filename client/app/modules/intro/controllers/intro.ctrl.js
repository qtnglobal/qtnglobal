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
angular.module('com.module.intro')
  .controller('IntroCtrl', function($scope, $routeParams, $location) {
    $scope.goToLogin = function(){
      $location.path('/login');
    };

    $scope.goToExlorer = function(){
      $location.path('/explorer');
    };
  });
