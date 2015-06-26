'use strict';
angular.module('com.module.articles')
    .controller('ArticlesCtrl', function($scope, $state, $stateParams, CoreService,
                                       FormHelper, gettextCatalog, Article, ArticlesService) {

      $scope.delete = function(id) {
        ArticlesService.deleteArticle(id, function() {
          $state.reload();
        });
      };

      this.formHelper = new FormHelper(Article);
      $scope.cancel = function() {
        console.log('Cancel');
        console.log(this.formHelper);
        //this.formHelper.cancel('app.articles.list');
      };

      var articleId = $stateParams.id;

      if (articleId) {
        $scope.article = Article.findById({
          id: articleId
        }, function() {}, function(err) {
          console.log(err);
        });
      } else {
        $scope.article = {};
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
        key: 'url',
        type: 'text',
        label: gettextCatalog.getString('Url'),
        required: true
      }];

      $scope.formOptions = {
        uniqueFormId: true,
        hideSubmit: false,
        submitCopy: gettextCatalog.getString('Save')
      };

      $scope.onSubmit = function() {
        Article.upsert($scope.article, function() {
          CoreService.toastSuccess(gettextCatalog.getString('Article saved'),
              gettextCatalog.getString('Your article is safe with us!'));
          $state.go('^.list');
        }, function(err) {
          console.log(err);
        });
      };
      $scope.upload = function(item){
        $scope.article.url = CoreService.env.apiUrl+ '/containers/files/download/'+item.file.name;
        console.log(item.file.name);
        var b = item.file.name;
        var values = b.split(".");
        if(values[1]=='png'||values[1]=='jpg'){
          $scope.article.flag = 'a';
        }
        Article.upsert($scope.article, function() {
          CoreService.toastSuccess(gettextCatalog.getString('Article saved'),
              gettextCatalog.getString('Your article is safe with us!'));
          $state.go('^.list');
        }, function(err) {
          console.log(err);
        });
        item.upload();
      }

    });
