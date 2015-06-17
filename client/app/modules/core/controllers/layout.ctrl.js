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
  .controller('LayoutCtrl', function($scope, $rootScope, $cookies, CoreService,
    gettextCatalog) {

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
        $('.left-side').removeClass('collapse-left');
        $('.right-side').removeClass('strech');
        $('body').toggleClass('sidebar-collapse');
        $('.row-offcanvas').toggleClass('relative');
      } else {
        // Else, enable content streching
        $('.left-side').toggleClass('collapse-left');
        $('.right-side').toggleClass('strech');
        $('body').toggleClass('sidebar-collapse');
      }
    };
    $scope.additional = function() {
      var $ = angular.element;
      $('.wrapper').toggleClass('additional');
    }
    $scope.addAlerts =[];
    var i=-1;
    var j=0;
    $scope.notification = function() {
      i++;
      $scope.num = Math.floor(9 * Math.random());
      $scope.namepage = ["alert-warning","alert-info","alert-mint","alert-pink","alert-dark","alert-danger","alert-primary","alert-purple","alert-success"];
      $scope.addAlerts[i] = ($scope.namepage[i]);
      setTimeout($('.alert-wrap').removeClass('in'),3000);
      setTimeout($removeNum(i),3000);
      $scope.removeNum = function(index){
        j++
        $scope.addAlerts[i]=j;
      }
      var $ = angular.element;
      $('right-side').toggleClass('notification');
    }
    $scope.settings = $rootScope.settings;

    $rootScope.loadSettings();

  });
