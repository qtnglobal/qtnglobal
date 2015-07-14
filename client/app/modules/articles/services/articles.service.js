'use strict';
var app = angular.module('com.module.articles');

app.service('ArticlesService', ['CoreService', 'gettextCatalog', 'Article', function(
    CoreService, gettextCatalog, Article,User) {

  this.getArticles = function() {
    return Article.find({
      filter: {
        order: 'created DESC'
      }
    }).$promise;
  };

  this.getArticle = function(id) {
    return Article.findById({
      id: id
    }).$promise;
  };

  this.deleteArticle = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
        gettextCatalog.getString('Deleting this cannot be undone'),
        function() {
          Article.deleteById(id, function() {
            CoreService.toastSuccess(gettextCatalog.getString(
                'Item deleted'), gettextCatalog.getString(
                'Your item has been deleted!'));
            cb();
          }, function(err) {
            CoreService.toastError(gettextCatalog.getString('Oops'),
                gettextCatalog.getString('Error deleting item: ') +
                err);
            cb();
          });
        },
        function() {
          return false;
        });
  };

}]);
app.filter('trusted', ['$sce', function ($sce) {
  return function(url) {
    return $sce.trustAsResourceUrl(url);
  };
}]);
