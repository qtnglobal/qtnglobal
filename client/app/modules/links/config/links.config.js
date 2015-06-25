'use strict';
angular.module('com.module.links')
  .run(function($rootScope, Link, gettextCatalog) {
    /*$rootScope.addMenu(gettextCatalog.getString('Links'), 'app.links.list',
      'fa-edit');*/

    Link.find(function(links) {
      $rootScope.addDashboardBox(gettextCatalog.getString('Links'),
        'bg-red', 'ion-document-text', links.length, 'app.links.list');
    });

  });
