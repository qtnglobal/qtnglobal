'use strict';
angular.module('com.module.articles')
    .run(function($rootScope, Article, gettextCatalog) {
      /*$rootScope.addMenu(gettextCatalog.getString('Articles'), 'app.articles.list',
       'fa-edit');*/

      Article.find(function(articles) {
        $rootScope.addDashboardBox(gettextCatalog.getString('Articles'),
            'bg-red', 'ion-document-text', articles.length, 'app.articles.list');
      });

    });
