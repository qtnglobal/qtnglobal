'use strict';

var app = angular.module('com.module.articles');

app.config(function($stateProvider) {
  $stateProvider.state('app.articles', {
    abstract: true,
    url: '/articles',
    templateUrl: 'modules/articles/views/main.html',
    controller: 'ArticlesCtrl',
    controllerAs: 'ctrl'
  }).state('app.articles.list', {
    url: '',
    templateUrl: 'modules/articles/views/list.html',
    controller: 'ArticlesCtrl'
  }).state('app.articles.add', {
    url: '/add',
    templateUrl: 'modules/articles/views/form.html',
    controller: 'ArticlesCtrl'
  }).state('app.articles.edit', {
    url: '/:id/edit',
    templateUrl: 'modules/articles/views/form.html',
    controller: 'ArticlesCtrl'
  }).state('app.articles.view', {
    url: '/:id',
    templateUrl: 'modules/articles/views/view.html',
    controller: 'ArticlesCtrl'
  });
});
