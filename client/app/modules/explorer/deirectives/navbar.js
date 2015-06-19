'use strict';

/**
 * @ngdoc directive
 * @name com.module.core.directive:navbar
 * @description
 * # navbar
 */
angular.module('com.module.explorer')
  .directive('navbar1', function() {
    return {
      templateUrl: 'modules/explorer/views/elements/navbar.html',
      restrict: 'E'
    };
  });
