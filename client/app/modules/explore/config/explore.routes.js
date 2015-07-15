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
          $state.go('explore.trending');
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
          $scope.deliberatelyTrustDangerousTitle = function(a) {
            return $sce.trustAsHtml(a.title);
          };
          $scope.deliberatelyTrustDangerousContent = function(a) {
            return $sce.trustAsHtml(a.content);
          };
          $scope.display = function(item){
            User.findOne({
              filter: {
                where: {
                  id: item.ownerId
                },
                include: ['roles', 'identities', 'credentials', 'accessTokens']
              }
            }, function(result) {
              var user=result;
              var id=item.id;
              var get = 'img[rel="'+id+'"]';
              $(get).popover({
                html: true,
                placement: 'right',
                content: function(){return '<div class="popover-wrapper"><div class="popover-header" style="position: relative;overflow:hidden;height:158px">'
                  + '<img src="'+user.cover+ '"/>' + '</div><div class="avatar circle" style="border-radius: 50%;box-shadow: 0 0 0 3px;position:relative;margin: 10px auto 0;height: 64px;width: 64px;margin-top: -40px">'
                  + '<img style="height:100%;border-radius:50%;" src="'+user.avatar+'"/>'+'</div><div class="description" style=""></div></div>';}
              }).popover('show').on('mouseleave',function(){
                $(get).popover('hide');
              });
            });
            // var a = $scope.user;
            // alert(a.c);
            // var cover = '<img src="'+user.cover+ '" />';
            // var avatar = '<img src="'+user.avatar+'"/>';
            // var content =
            // '<div class="popover-wrapper"><div class="popover-header" style="">'
            //     + cover +
            //   '</div><div class="avatar circle" styel="">'
            //     + avatar +
            //   '</div><div class="description" style=""></div></div>';

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

        controller: function($scope, photos) {
          $scope.photos = photos;
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
        controller: function($scope, links) {
          $scope.links = links;
        }
      }).state('explore.audios', {
        url: '/audios',
        templateUrl: 'modules/explore/views/elements/audio.html',
        resolve: {
          audios: ['AudiosService', function(AudiosService) {
            return AudiosService.getAudios();
          }]
        },
        controller: function($scope, audios) {
          $scope.audios = audios;
        }
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

