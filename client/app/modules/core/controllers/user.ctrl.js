/**
 * Created by hung on 23/07/2015.
 */
angular.module('com.module.core').controller('UserCtrl',function($scope,User){
  User.getCurrent(function(user){
    $scope.user = user;
    if (typeof $scope.user.avatar == 'undefined'){
      $scope.user.avatar = 'images/qtn.png';
    }
    console.log($scope.user.avatar);

    if (typeof $scope.user.cover == 'undefined'){
      $scope.user.cover = 'images/qtnglobal.png';
    }
  });

});

