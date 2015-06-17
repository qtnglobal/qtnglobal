'use strict';
angular.module('com.module.news')
  .controller('NewsCtrl', function($scope, $state, $stateParams, CoreService,
    FormHelper, gettextCatalog, News, NewsService) {

    $scope.delete = function(id) {
      NewsService.deleteNews(id, function() {
        $state.reload();
      });
    };

    this.formHelper = new FormHelper(News);
    $scope.cancel = function() {
      console.log('Cancel');
      console.log(this.formHelper);
      //this.formHelper.cancel('app.news.list');
    };

    var newId = $stateParams.id;

    if (newId) {
      $scope.new = News.findById({
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
    }/*, {
      key: 'image',
      type: 'text',
      label: gettextCatalog.getString('image'),
      required: true
    }*/];

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };

    $scope.onSubmit = function() {
      News.upsert($scope.new, function() {
        CoreService.toastSuccess(gettextCatalog.getString('News saved'),
          gettextCatalog.getString('Your new is safe with us!'));
        $state.go('^.list');
      }, function(err) {
        console.log(err);
      });
    };

  });
