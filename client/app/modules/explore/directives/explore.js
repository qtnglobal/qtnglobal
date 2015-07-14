'use strict';

angular.module('com.module.explore')
  .directive('explore', function(User) {
    return {
      templateUrl:'modules/explore/views/app.html',
      restrict: 'E'
    };
  });
