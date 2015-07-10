'use strict';
var app = angular.module('com.module.audios');

app.service('AudiosService', ['CoreService', 'gettextCatalog', 'Audio', function(
  CoreService, gettextCatalog, Audio) {

  this.getAudios = function() {
    return Audio.find({
      filter: {
        order: 'created DESC'
      }
    }).$promise;
  };

  this.getAudio = function(id) {
    return Audio.findById({
      id: id
    }).$promise;
  };

  this.deleteAudio = function(id, cb) {
    CoreService.confirm(gettextCatalog.getString('Are you sure?'),
      gettextCatalog.getString('Deleting this cannot be undone'),
      function() {
        Audio.deleteById(id, function() {
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
