'use strict';
angular.module('com.module.explorer')
  .config(function($stateProvider) {
    $stateProvider
      .state('explorer', {
        abstract: true,
        url: '/explorer',
        templateUrl: 'modules/explorer/views/app.html',
        controller: 'ExplorerCtrl'
      })
      .state('explorer.home', {
        url: '',
        templateUrl: 'modules/explorer/views/home.html',
        controller: 'ExplorerCtrl'
      }).state('explorer.home.news', {
        url: '/news',
        templateUrl: 'modules/explorer/views/news.html',
        controller: ''
      }).state('explorer.home.project', {
        url: '/project',
        templateUrl: 'modules/explorer/views/project.html',
        controller: ''
      });
  });
