'use strict';
/**
 * @ngdoc function
 * @name com.module.core.controller:MainCtrl
 * @description Login Controller
 * @requires $scope
 * @requires $state
 * @requires $location
 * @requires CoreService
 * @requires AppAuth
 * @requires User
 * @requires gettextCatalog
 **/
angular.module('com.module.core')
  .controller('MainCtrl', function($scope, $rootScope, $state, $location,
    CoreService, User, gettextCatalog, AppAuth) {

    AppAuth.ensureHasCurrentUser(function(user)
    {
      $scope.currentUser = user;
    });

    $scope.currentUser = User.getCurrent();

    $scope.menuoptions = $rootScope.menu;

    User.getCurrent(function(user) {
      if (user.username !== 'admin' && $scope.menuoptions[$scope.menuoptions.length-1].name == 'Users') {
        $scope.menuoptions.pop();
        $scope.menuoptions.pop();
      }
      if(user.username == 'admin' && $scope.menuoptions[$scope.menuoptions.length-1].name != 'Users'){
        $scope.menuoptions.push({ name: "Settings", sref: "app.settings.list", icon: "fa-cog", $$hashKey: "object:57" });
        $scope.menuoptions.push({ name: "Users", sref: "app.users.list", icon: "fa-user", $$hashKey: "object:58" });
      }
    });

    $scope.logout = function() {
      User.logout(function() {
        $state.go('login');
        CoreService.toastSuccess(gettextCatalog.getString('Logged out'),
          gettextCatalog.getString('You are logged out!'));
      });
    };

  });
