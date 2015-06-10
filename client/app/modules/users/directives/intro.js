'use strict';

angular.module('com.module.users')
  .directive('intro', function() {
    return {
      templateUrl:'modules/users/views/intro.html',
      restrict: 'E'
    };
  });
