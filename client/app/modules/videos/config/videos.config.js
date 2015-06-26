'use strict';
angular.module('com.module.videos')
  .run(function($rootScope, Video, gettextCatalog) {
    /*$rootScope.addMenu(gettextCatalog.getString('Videos'), 'app.videos.list',
      'fa-edit');*/

    Video.find(function(videos) {
      $rootScope.addDashboardBox(gettextCatalog.getString('Videos'),
        'bg-yellow', 'ion-document-text', videos.length, 'app.videos.list');
    });

  });
