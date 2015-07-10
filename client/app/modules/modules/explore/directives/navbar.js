'use strict';

/**
 * @ngdoc directive
 * @name com.module.core.directive:navbar
 * @description
 * # navbar
 */
angular.module('com.module.explore')
  .directive('navbar1', function() {
    return {
      templateUrl: 'modules/explore/views/elements/navbar.html',
      restrict: 'E'
    };
  });
