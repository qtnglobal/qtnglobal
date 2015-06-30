'use strict';

angular.module('com.module.explore')
  .directive('explore', function(User) {
    return {
      templateUrl:'modules/explore/views/app.html',
      restrict: 'E'
    };
   /* if(name){
      return {
        templateUrl:'modules/explore/views/app_login.html',
        restrict: 'E'
      };
    }
    else{
      return {
        templateUrl:'modules/explore/views/app.html',
        restrict: 'E'
      };
    }*/
  });
