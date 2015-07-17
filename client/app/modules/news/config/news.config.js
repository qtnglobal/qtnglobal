'use strict';
angular.module('com.module.news')
  .run(function($rootScope, News, gettextCatalog) {
    $rootScope.addMenu(gettextCatalog.getString('News'), 'app.news.list',
      'fa-edit');

    News.find(function(news) {
    });

  });
