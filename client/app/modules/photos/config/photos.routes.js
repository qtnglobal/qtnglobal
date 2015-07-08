'use strict';

var app = angular.module('com.module.photos');

app.config(function($stateProvider) {
  $stateProvider.state('app.photos', {
    abstract: true,
    url: '/photos',
    templateUrl: 'modules/photos/views/main.html',
    controller: 'PhotosCtrl',
    controllerAs: 'ctrl'
  }).state('app.photos.list', {
    url: '',
    templateUrl: 'modules/photos/views/list.html',
    /*resolve: {
      photos: ['PhotosService', function(PhotosService) {
        return PhotosService.getPhotos();
      }]
    },
    controller: function($scope, photos) {
      $scope.photos = photos;
    }*/
    controller: 'PhotosCtrl'
  }).state('app.photos.add', {
    url: '/add',
    templateUrl: 'modules/photos/views/form.html',
    controller: 'PhotosCtrl'
  }).state('app.photos.edit', {
    url: '/:id/edit',
    templateUrl: 'modules/photos/views/form.html',
    controller: 'PhotosCtrl'
  }).state('app.photos.view', {
    url: '/:id',
    templateUrl: 'modules/photos/views/view.html',
    resolve: {
      photo: ['$stateParams', 'PhotosService', function($stateParams,
        PhotosService) {
        return PhotosService.getPhoto($stateParams.id);
      }]
    },
    controller: function($scope, photo) {
      $scope.photo = photo;
    }
  });
});
