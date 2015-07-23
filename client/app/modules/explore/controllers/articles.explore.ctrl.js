'use strict';
var app=angular.module('com.module.explore');
app.controller('ArticlesCtrl1',function ($scope,$sce,$modal, User){



  $scope.deliberatelyTrustDangerousTitle = function(a) {
    return $sce.trustAsHtml(a.title);
  };
  $scope.deliberatelyTrustDangerousContent = function(a) {
    return $sce.trustAsHtml(a.content);
  };
  $scope.show = false;
});
app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
app.filter('trusted', ['$sce', function ($sce) {
  return function(url) {
    return $sce.trustAsResourceUrl(url);
  };
}]);
