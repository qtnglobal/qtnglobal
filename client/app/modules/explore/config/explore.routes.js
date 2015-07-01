'use strict';
angular.module('com.module.explore')
  .config(function($stateProvider) {
    $stateProvider
      .state('explore', {
        abstract: true,
        url: '/explore',
        /*templateUrl: 'modules/explore/views/app.html',*/
        template: '<explore></explore>',
        controller: 'ExploreCtrl'
      })
      .state('explore.home', {
        url: '',
        controller: function($state) {
          $state.go('explore.project');
        }
      }).state('explore.trending', {
        url: '/trending',
        templateUrl: 'modules/explore/views/elements/trending.html'
      }).state('explore.staff-picks', {
        url: '/staff-picks',
        templateUrl: 'modules/explore/views/elements/staff-picks.html'
      }).state('explore.article', {
        url: '/article',
        templateUrl: 'modules/explore/views/elements/article.html',
          resolve: {
            articles: ['ArticlesService', function(ArticlesService) {
              return ArticlesService.getArticles();
            }]
          },
          controller: function($scope, articles) {
            $scope.articles = articles;
          }

        }).state('explore.photos', {
        url: '/photos',
        templateUrl: 'modules/explore/views/elements/photo.html',
        resolve: {
          photos: ['PhotosService', function(PhotosService) {
            return PhotosService.getPhotos();
          }]
        },
        controller: function($scope, photos) {
          $scope.photos = photos;
        }
      }).state('explore.links', {
        url: '/links',
        templateUrl: 'modules/explore/views/elements/links.html',
        controller:'LinksCtrl'
      }).state('explore.audios', {
        url: '/audios',
        templateUrl: 'modules/explore/views/elements/audio.html'
      }).state('explore.videos', {
        url: '/videos',
        templateUrl: 'modules/explore/views/elements/video.html',
        resolve: {
          videos: ['VideosService', function(VideosService) {
            return VideosService.getVideos();
          }]
        },
        controller: function($scope, videos) {
          $scope.videos = videos;
        }
      }).state('explore.project', {
        url: '/project',
        templateUrl: 'modules/explore/views/elements/project.html'
      });
  });
