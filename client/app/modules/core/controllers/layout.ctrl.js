'use strict';
angular.module('com.module.core')
  /**
   * @ngdoc function
   * @name com.module.core.controller:LayoutCtrl
   * @description Layout controller
   * @requires $scope
   * @requires $rootScope
   * @requires CoreService
   * @requires gettextCatalog
   **/
  .controller('LayoutCtrl', function($state, $scope, $rootScope, $timeout, $cookies, CoreService,
    gettextCatalog, $location) {

    $scope.goToExplore = function(){
      $location.path('/explore');
      var $ = angular.element;
      if ($(window).width() <= 992) {
        $('.row-offcanvas').toggleClass('active');
        $('.left-side').toggleClass('collapse-left');
        $('body').toggleClass('sidebar-collapse');
        $('.row-offcanvas').toggleClass('relative');
      } else {
        // Else, enable content streching
        $('.left-side').toggleClass('collapse-left');
        $('body').toggleClass('sidebar-collapse');
      }
    };

    $scope.goToHome = function(){
      $location.path('/app');
    };

    // angular translate
    $scope.locale = {
      isopen: false
    };

    $scope.locales = $rootScope.locales;
    $scope.selectLocale = $rootScope.locale;

    $scope.setLocale = function(locale) {
      // set the current lang
      $scope.locale = $scope.locales[locale];
      $scope.selectLocale = $scope.locale;
      $rootScope.locale = $scope.locale;
      $cookies.lang = $scope.locale.lang;

      // You can change the language during runtime
      $scope.locale.isopen = !$scope.locale.isopen;

      gettextCatalog.setCurrentLanguage($scope.locale.lang);
    };

    $scope.appName = 'LB-NG-BS';
    $scope.apiUrl = CoreService.env.apiUrl;
    $scope.appTheme = 'skin-blue';
    $scope.appThemes = [{
      'name': 'Black',
      'class': 'skin-black'
    }, {
      'name': 'Blue',
      'class': 'skin-blue'
    }];
    $scope.appLayout = '';
    $scope.appLayouts = [{
      'name': 'Fixed',
      'class': 'fixed'
    }, {
      'name': 'Scrolling',
      'class': 'not-fixed'
    }];

    $scope.toggleSidebar = function() {
      var $ = angular.element;
      if ($(window).width() <= 992) {
        $('.row-offcanvas').toggleClass('active');
        $('.left-side').toggleClass('collapse-left');
        $('body').toggleClass('sidebar-collapse');
        $('.row-offcanvas').toggleClass('relative');
      } else {
        // Else, enable content streching
        $('.left-side').toggleClass('collapse-left');
        $('body').toggleClass('sidebar-collapse');
      }
    };
    $scope.toggleSidebar1 = function() {
      var $ = angular.element;
      $('body').removeClass('sidebar-collapse');
      $('.left-side').removeClass('collapse-left');
    };

    $scope.additional = function() {
      var $ = angular.element;
      $('.wrapper').toggleClass('additional');
    };

    $scope.addAlerts =[];
    var i=-1;
    $scope.notification = function() {
      i++;
      var $ = angular.element;
      $scope.namepage = ['alert-warning','alert-info','alert-mint','alert-pink','alert-dark','alert-danger','alert-primary','alert-purple','alert-success'];
      $scope.addAlerts.push($scope.namepage[i]);
      $timeout($scope.removeAdd(addAlerts[i]), 3000);
      $timeout($('.alert-wrap').removeClass('in'),5000);
    };

    $scope.removeAdd = function(index){
      $scope.addAlerts.splice(index, 1);
      $('.alert-wrap').removeClass('in');
    };
    $scope.settings = $rootScope.settings;

    $rootScope.loadSettings();

  });
