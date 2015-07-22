'use strict';
var app=angular.module('com.module.explore');
app.controller('ArticlesCtrl1',function ($scope,$sce,$modal, User){



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
              content: function(){return '<div class="popover-wrapper"><div class="popover-header" style="position: relative;overflow:hidden;height:130px;z-index: 1">'
                + '<img src="'+user.cover+ '"/>' + '</div><div class="avatar circle" style="border-radius: 50%;box-shadow: 0 0 0 3px;position:relative;margin: 10px auto 0;height: 64px;width: 64px;margin-top: -40px">'
                + '<img style="height:100%;border-radius:50%;" src="'+user.avatar+'"/>'+'</div><div class="description" style=""></div></div>';}
              }).popover('show').on('mouseleave',function(){
                $(get).popover('hide');
              });
    });
  };
  $scope.open = function (article) {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        items: function () {
          return article;
        }
      }
    });
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
