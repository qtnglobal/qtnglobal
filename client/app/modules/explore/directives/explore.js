'use strict';

var app= angular.module('com.module.explore');
  app.directive('explore', function(User) {
    return {
      templateUrl:'modules/explore/views/app.html',
      restrict: 'E'
    };
  });
app.directive('container',function($timeout){
  return{
    restrict:'A',
    link:function(scope, element, attrs){
      $timeout(function () {
        var iso = new Isotope(element[0], {
          itemSelector: '.boxEx'
        });
      }, 200);
    }
  }
});
