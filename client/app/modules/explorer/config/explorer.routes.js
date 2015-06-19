'use strict';
angular.module('com.module.explorer')
  .config(function($stateProvider) {
    $stateProvider
      .state('explorer',{
        url:'/explorer',
        template: '<explorer></explorer>',
        controller: 'ExplorerCtrl'
      })
  });
