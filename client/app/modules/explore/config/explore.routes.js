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
        controller: function($state) {
          $state.go('explore.trending');
        }
      }).state('explore.news', {
        url: '/news',
        templateUrl: 'modules/explore/views/elements/news.html'
      }).state('explore.project', {
        url: '/project',
        templateUrl: 'modules/explore/views/elements/project.html'
      }).state('explore.trending', {
        url: '/trending',
        templateUrl: 'modules/explore/views/elements/trending.html'
      }).state('explore.staff-picks', {
        url: '/staff-picks',
        templateUrl: 'modules/explore/views/elements/staff-picks.html'
      });
  });
