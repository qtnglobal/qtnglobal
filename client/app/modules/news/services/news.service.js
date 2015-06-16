'use strict';
var app = angular.module('com.module.news');

app.service('NewsService', ['CoreService', 'gettextCatalog', 'News', function(
  CoreService, gettextCatalog, News, User) {

  this.getNews = function() {
    return News.find({
      filter: {
        order: 'created DESC'
      }
    }).$promise;
  };

  this.getNew = function(id) {
    return News.findById({
      id: id
    }).$promise;
  };

  this.deleteNews = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        News.deleteById(id, function() {
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
