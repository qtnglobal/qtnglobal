'use strict';

var app = angular.module('com.module.audios');

app.config(function($stateProvider) {
  $stateProvider.state('app.audios', {
    abstract: true,
    url: '/audios',
    templateUrl: 'modules/audios/views/main.html',
    controller: 'AudiosCtrl',
    controllerAs: 'ctrl'
  }).state('app.audios.list', {
    url: '',
    templateUrl: 'modules/audios/views/list.html',
    /*resolve: {
      audios: ['AudiosService', function(AudiosService) {
        return AudiosService.getAudios();
      }]
    },
    controller: function($scope, audios) {
      $scope.audios = audios;
    }*/
    controller: 'AudiosCtrl'
  }).state('app.audios.add', {
    url: '/add',
    templateUrl: 'modules/audios/views/form.html',
    controller: 'AudiosCtrl'
  }).state('app.audios.edit', {
    url: '/:id/edit',
    templateUrl: 'modules/audios/views/form.html',
    controller: 'AudiosCtrl'
  }).state('app.audios.view', {
    url: '/:id',
    templateUrl: 'modules/audios/views/view.html',
    resolve: {
      audio: ['$stateParams', 'AudiosService', function($stateParams,
        AudiosService) {
        return AudiosService.getAudio($stateParams.id);
      }]
    },
    controller: function($scope, audio) {
      $scope.audio = audio;
    }
  });
});
