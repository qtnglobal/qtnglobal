'use strict';

var app = angular.module('com.module.links');

app.config(function($stateProvider) {
  $stateProvider.state('app.links', {
    abstract: true,
    url: '/links',
    templateUrl: 'modules/links/views/main.html',
    controller: 'LinksCtrl'
  }).state('app.links.list', {
    url: '',
    templateUrl: 'modules/links/views/list.html',
    /*resolve: {
      news: ['LinksService', function(LinksService) {
        return LinksService.getLinks();
      }]
    },
    controller: function($scope, Link) {
      $scope.news = Link;
    }*/
    controller: 'LinksCtrl'
  }).state('app.links.add', {
    url: '/add',
    templateUrl: 'modules/links/views/form.html',
    controller: 'LinksCtrl'
  }).state('app.links.edit', {
    url: '/:id/edit',
    templateUrl: 'modules/links/views/form.html',
    controller: 'LinksCtrl'
  })/*.state('app.links.view', {
    url: '/:id',
    templateUrl: 'modules/links/views/view.html',
    resolve: {
      links: ['$stateParams', 'LinksService', function($stateParams, LinksService) {
        return LinksService.getLink($stateParams.id);
      }]
    },
    controller: function($scope, links) {
      $scope.link = links;
    }
  })*/;
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
