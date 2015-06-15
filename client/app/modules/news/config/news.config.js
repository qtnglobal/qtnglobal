'use strict';
angular.module('com.module.news')
  .run(function($rootScope, New, gettextCatalog) {
    $rootScope.addMenu(gettextCatalog.getString('News'), 'app.news.list',
      'fa-edit');

    New.find(function(news) {
      $rootScope.addDashboardBox(gettextCatalog.getString('News'),
        'bg-red', 'ion-document-text', news.length, 'app.news.list');
    });

  });
