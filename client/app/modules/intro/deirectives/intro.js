'use strict';

angular.module('com.module.intro')
  .directive('intro', function() {
    return {
      templateUrl:'modules/intro/views/intro.html',
      restrict: 'E'
    };
  });
