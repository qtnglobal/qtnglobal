'use strict';
angular.module('com.module.audios')
  .run(function($rootScope, Audio, gettextCatalog) {
    /*$rootScope.addMenu(gettextCatalog.getString('Audios'), 'app.audios.list',
      'fa-edit');*/

    Audio.find(function(audios) {
      $rootScope.addDashboardBox(gettextCatalog.getString('Audios'),
        'bg-purple', 'ion-document-text', audios.length, 'app.audios.list');
    });
    
  });
