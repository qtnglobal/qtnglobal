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
          $state.go('explore.article');
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
        controller: function($scope,$sce, articles, User) {

          $scope.articles = articles;

          for(var i=0; i<$scope.articles.length; i++) {
            $scope.$watch('articles['+i+']', function(changed) {
              User.findOne({
                filter: {
                  where: {
                    id: changed.ownerId
                  },
                  include: ['roles', 'identities', 'credentials', 'accessTokens']
                }
              },function(result){
                var user = result;
                var item = changed;
                item.ava = result.avatar;
                item.ownerName = result.username;
                return item;
              });
            }, true);
          }
        }
        }).state('explore.photos', {
        url: '/photos',
        templateUrl: 'modules/explore/views/elements/photo.html',
        resolve: {
          photos: ['PhotosService', function(PhotosService) {
            return PhotosService.getPhotos();
          }]
        },

        controller: function($scope, photos,User) {
          $scope.photos = photos;
          for(var i=0; i<$scope.photos.length; i++) {
            $scope.$watch('photos['+i+']', function(changed) {
              User.findOne({
                filter: {
                  where: {
                    id: changed.ownerId
                  },
                  include: ['roles', 'identities', 'credentials', 'accessTokens']
                }
              },function(result){
                var user = result;
                var item = changed;
                item.ava = result.avatar;
                item.ownerName = result.username;
                return item;
              });
            }, true);
          }

          $scope.myLimit = 4;

          $scope.loadMore = function() {
            $scope.myLimit += 4;

          };
        }
      }).state('explore.links', {
        url: '/links',
        templateUrl: 'modules/explore/views/elements/links.html',
        resolve: {
          links: ['LinksService', function(LinksService) {
            return LinksService.getLinks();
          }]
        },
        controller: function($scope, links,User) {
          $scope.links = links;
          for(var i=0; i<$scope.links.length; i++) {
            $scope.$watch('links['+i+']', function(changed) {
              User.findOne({
                filter: {
                  where: {
                    id: changed.ownerId
                  },
                  include: ['roles', 'identities', 'credentials', 'accessTokens']
                }
              },function(result){
                var user = result;
                var item = changed;
                item.ava = result.avatar;
                item.ownerName = result.username;
                return item;
              });
            }, true);
          }

        }
      }).state('explore.audios', {
        url: '/audios',
        templateUrl: 'modules/explore/views/elements/audio.html',
        resolve: {
          audios: ['AudiosService', function(AudiosService) {
            return AudiosService.getAudios();
          }]
        },
        controller: function($scope, audios,User) {
          $scope.audios = audios;
          for(var i=0; i<$scope.audios.length; i++) {
            $scope.$watch('audios['+i+']', function(changed) {
              User.findOne({
                filter: {
                  where: {
                    id: changed.ownerId
                  },
                  include: ['roles', 'identities', 'credentials', 'accessTokens']
                }
              },function(result){
                var user = result;
                var item = changed;
                item.ava = result.avatar;
                item.ownerName = result.username;
                return item;
              });
            }, true);
          }

        }
      }).state('explore.videos', {
        url: '/videos',
        templateUrl: 'modules/explore/views/elements/video.html',
        resolve: {
          videos: ['VideosService', function(VideosService) {
            return VideosService.getVideos();
          }]
        },
        controller: function($scope, videos,User) {
          $scope.videos = videos;
          for(var i=0; i<$scope.videos.length; i++) {
            $scope.$watch('videos['+i+']', function(changed) {
              User.findOne({
                filter: {
                  where: {
                    id: changed.ownerId
                  },
                  include: ['roles', 'identities', 'credentials', 'accessTokens']
                }
              },function(result){
                var user = result;
                var item = changed;
                item.ava = result.avatar;
                item.ownerName = result.username;
                return item;
              });
            }, true);
          }

        }
      }).state('explore.project', {
        url: '/project',
        templateUrl: 'modules/explore/views/elements/project.html'
      });
  });

