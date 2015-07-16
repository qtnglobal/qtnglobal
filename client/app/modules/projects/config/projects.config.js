'use strict';
angular.module('com.module.projects')
  .run(function($rootScope, Project, gettextCatalog) {
    $rootScope.addMenu(gettextCatalog.getString('Projects'), 'app.projects.list',
      'fa-calendar-o');

    Project.find(function(data) {
      $rootScope.addDashboardBox('Projects', 'bg-purple', 'ion-calendar',
        data.length, 'app.projects.list');
    });

  });
