'use strict';

angular.module('com.module.explorer')
  .directive('explorer', function() {
    return {
      templateUrl:'modules/explorer/views/explorer.html',
      restrict: 'E'
    };
  });
