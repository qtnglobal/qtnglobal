'use strict';
var app = angular.module('com.module.videos');

app.service('VideosService', ['CoreService', 'gettextCatalog', 'Video', function(
  CoreService, gettextCatalog, Video) {

  this.getVideos = function() {
    return Video.find({
      filter: {
        order: 'created DESC'
      }
    }).$promise;
  };

  this.getVideo = function(id) {
    return Video.findById({
      id: id
    }).$promise;
  };

  this.deleteVideo = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        Video.deleteById(id, function() {
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
