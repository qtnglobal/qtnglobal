'use strict';
/**
 * @ngdoc function
 * @name com.module.users.controller:LoginCtrl
 * @description Login Controller
 * @requires $scope
 * @requires $routeParams
 * @requires $location
 * Contrller for Login Page
 **/
angular.module('com.module.explore')
  .controller('ExploreCtrl', function($scope, $routeParams, $location,User, $modal) {
    $scope.limitText = 200;
    $scope.limit = 3;
    $scope.loadMore = function() {
      $scope.limit += 3;
    };
    $scope.currentUser = User.getCurrent();

    $scope.getUserData = function (item) {
      $modal.open({
        templateUrl: 'myModalContent.html',
        resolve: {
          user:  [function() {
            return  User.findOne({
              filter: {
                where: {
                  id: item.ownerId
                },
                include: ['roles', 'identities', 'credentials', 'accessTokens']
              }
            });
          }]
        },
        controller: function($scope, user) {
          $scope.user = user;
        }
      });
    };


    $scope.goToNews = function(){
      $location.path('/links');
    };

    $scope.goToExlore = function(){
      $location.path('/explore');
    };

    $scope.goToLogin = function(){
      $location.path('/login');
    };

    $scope.goToRegister = function(){
      $location.path('/register');
    };

    $scope.items = [
    //  {
    //  name: 'Trending',
    //  sref: '.trending'
    //}, {
    //  name: 'Staff picks',
    //  sref: '.staff-picks'
    //},
      {
      name: 'Article',
      sref: '.article'
    },{
      name: 'Photos',
      sref: '.photos'
    },{
      name: 'Links',
      sref: '.links'
    },{
      name: 'Audios',
      sref: '.audios'
    },{
      name: 'Videos',
      sref: '.videos'
    }
    //  {
    //  name: 'Project',
    //  sref: '.project'
    //}
    ];

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
        if (typeof user.avatar == 'undefined'){
          user.avatar = 'images/qtn.png';
        }
        if (typeof user.cover == 'undefined'){
          user.cover = 'images/default-background.png';
        }
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
    };


  });
