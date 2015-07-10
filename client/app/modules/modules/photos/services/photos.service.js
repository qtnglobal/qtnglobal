'use strict';
var app = angular.module('com.module.photos');

app.service('PhotosService', ['CoreService', 'gettextCatalog', 'Photo', function(
  CoreService, gettextCatalog, Photo) {

  this.getPhotos = function() {
    return Photo.find({
      filter: {
        order: 'created DESC'
      }
    }).$promise;
  };

  this.getPhoto = function(id) {
    return Photo.findById({
      id: id
    }).$promise;
  };

  this.deletePhoto = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        Photo.deleteById(id, function() {
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
