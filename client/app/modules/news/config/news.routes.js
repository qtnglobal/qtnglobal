'use strict';

var app = angular.module('com.module.news');

app.config(function($stateProvider) {
  $stateProvider.state('app.news', {
    abstract: true,
    url: '/news',
    templateUrl: 'modules/news/views/main.html',
    controller: 'NewsCtrl',
    controllerAs: 'ctrl'
  }).state('app.news.list', {
    url: '',
    templateUrl: 'modules/news/views/list.html',
    resolve: {
      news: ['NewsService', function(NewsService) {
        return NewsService.getNews();
      }]
    },
    controller: function($scope, news) {
      $scope.news = news;
    }
  }).state('app.news.add', {
    url: '/add',
    templateUrl: 'modules/news/views/form.html',
    controller: 'NewsCtrl'
  }).state('app.news.edit', {
    url: '/:id/edit',
    templateUrl: 'modules/news/views/form.html',
    controller: 'NewsCtrl'
  }).state('app.news.view', {
    url: '/:id',
    templateUrl: 'modules/news/views/view.html',
    resolve: {
      new: ['$stateParams', 'NewsService', function($stateParams,
        NewsService) {
        return NewsService.getNew($stateParams.id);
      }]
    },
    controller: function($scope, post) {
      $scope.new = post;
    }
  });
});
