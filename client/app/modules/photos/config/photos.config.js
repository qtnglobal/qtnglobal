'use strict';
angular.module('com.module.photos')
  .run(function($rootScope, Photo, gettextCatalog) {
    Photo.find(function(photos) {
      $rootScope.addDashboardBox(gettextCatalog.getString('Photos'),
        'bg-red', 'ion-document-text', photos.length, 'app.photos.list');
    });

  });
