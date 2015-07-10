'use strict';
angular.module('com.module.intro')
  .config(function($stateProvider) {
    $stateProvider
      .state('intro',{
        url:'/intro',
        template: '<intro></intro>',
        controller: 'IntroCtrl'
      })
  });
