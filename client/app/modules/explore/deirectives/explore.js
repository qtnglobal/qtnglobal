'use strict';

angular.module('com.module.explore')
  .directive('explorer', function() {
    return {
      templateUrl:'modulers/explore/views/explore.html',
      restrict: 'E'
    };
  });
