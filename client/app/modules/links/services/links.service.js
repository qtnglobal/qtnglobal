'use strict';
var app = angular.module('com.module.links');

app.service('LinksService', ['CoreService', 'gettextCatalog', 'Link', function(
  CoreService, gettextCatalog, Link) {

  this.getLinks = function() {
    return Link.find({
      filter: {
        order: 'created DESC'
      }
    }).$promise;
  };

  this.getLink = function(id) {
    return Link.findById({
      id: id
    }).$promise;
  };

  this.deleteLink = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        Link.deleteById(id, function() {
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
