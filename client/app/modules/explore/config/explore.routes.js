'use strict';
angular.module('com.module.explore')
  .config(function($stateProvider) {
    $stateProvider
      .state('explore', {
        abstract: true,
        url: '/explore',
        templateUrl: 'modules/explore/views/app.html',
        controller: 'ExploreCtrl'
      })
      .state('explore.home', {
        url: '',
        templateUrl: 'modules/explore/views/home.html',
        controller: function($state) {
          $state.go('explore.home.news');
          $state.go('explore.home.trending');
        }
      }).state('explore.home.news', {
        url: '/news',
        templateUrl: 'modules/explore/views/elements/news.html',
        controller: ''
      }).state('explore.home.project', {
        url: '/project',
        templateUrl: 'modules/explore/views/elements/project.html',
        controller: ''
      }).state('explore.home.trending', {
        url: '/trending',
        templateUrl: 'modules/explore/views/elements/trending.html',
        controller: ''
      }).state('explore.home.staff-picks', {
        url: '/staff-picks',
        templateUrl: 'modules/explore/views/elements/staff-picks.html',
        controller: ''
      });
  });
