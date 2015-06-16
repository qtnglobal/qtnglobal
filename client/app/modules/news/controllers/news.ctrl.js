'use strict';
angular.module('com.module.news')
  .controller('NewsCtrl', function($scope, $state, $stateParams, CoreService,
    FormHelper, gettextCatalog, New, NewsService) {

    $scope.delete = function(id) {
      NewsService.deleteNew(id, function() {
        $state.reload();
      });
    };

    this.formHelper = new FormHelper(New);
    $scope.cancel = function() {
      console.log('Cancel');
      console.log(this.formHelper);
      //this.formHelper.cancel('app.news.list');
    };

    var newId = $stateParams.id;

    if (newId) {
      $scope.new = New.findById({
        id: newId
      }, function() {}, function(err) {
        console.log(err);
      });
    } else {
      $scope.new = {};
    }

    $scope.formFields = [{
      key: 'title',
      type: 'text',
      label: gettextCatalog.getString('Title'),
      required: true
    }, {
      key: 'content',
      type: 'textarea',
      label: gettextCatalog.getString('Content'),
      required: true
    }, {
      key: 'image',
      type: 'text',
      label: gettextCatalog.getString('image'),
      required: true
    }];

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };

    $scope.onSubmit = function() {
      New.upsert($scope.new, function() {
        CoreService.toastSuccess(gettextCatalog.getString('New saved'),
          gettextCatalog.getString('Your new is safe with us!'));
        $state.go('^.list');
      }, function(err) {
        console.log(err);
      });
    };

  });
