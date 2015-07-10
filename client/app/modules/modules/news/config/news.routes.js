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
      news: ['$stateParams', 'NewsService', function($stateParams,
        NewsService) {
        return NewsService.getNew($stateParams.id);
      }]
    },
    controller: function($scope, news) {
      $scope.new = news;
    }
  });
});


  /*.run(function(Permission, User, $location, CoreService, $stateParams){
  Permission.defineRole('owner',function(stateParams){
    var user = User.getCurrent(function(user) {
      if (user.username == 'admin') {
        console.log(user.username);
        return true;
      }
      else {
        console.log('Do not have permission');
        CoreService.alertWarning('May be you do not have permission to do this stuff','Please ask admin for permission');
        $location.path('/app')
        return false;
      }
    }, function(err) {
      console.log(err);
    });
  })
});


*/
