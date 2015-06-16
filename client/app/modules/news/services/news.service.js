'use strict';
var app = angular.module('com.module.news');

app.service('NewsService', ['CoreService', 'gettextCatalog', 'New', function(
  CoreService, gettextCatalog, New) {

  this.getNews = function() {
    return New.find({
      filter: {
        order: 'created DESC'
      }
    }).$promise;
  };

  this.getNew = function(id) {
    return New.findById({
      id: id
    }).$promise;
  };

  this.deleteNew = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        New.deleteById(id, function() {
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
