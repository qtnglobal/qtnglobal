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
    },
    //  {
    //  name: 'Project',
    //  sref: '.project'
    //}
    ];



  });
