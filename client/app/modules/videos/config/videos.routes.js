'use strict';

var app = angular.module('com.module.videos');

app.config(function($stateProvider) {
  $stateProvider.state('app.videos', {
    abstract: true,
    url: '/videos',
    templateUrl: 'modules/videos/views/main.html',
    controller: 'VideosCtrl',
    controllerAs: 'ctrl'
  }).state('app.videos.list', {
    url: '',
    templateUrl: 'modules/videos/views/list.html',
    controller: 'VideosCtrl'
  }).state('app.videos.edit', {
    url: '/:id/edit',
    templateUrl: 'modules/videos/views/form.html',
    controller: 'VideosCtrl'
  }).state('app.videos.view', {
    url: '/:id',
    templateUrl: 'modules/videos/views/view.html',
    resolve: {
      video: ['$stateParams', 'VideosService', function($stateParams,
                                                        VideosService) {
        return VideosService.getVideo($stateParams.id);
      }]
    },
    controller: function($scope, video) {
      $scope.video = video;
    }
  });
});
