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
        required: false
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
      $scope.uploadimage = function(item){
        $scope.article.image = CoreService.env.apiUrl+ '/containers/files/download/'+item.file.name;
        console.log(item.file.name);
        var b = item.file.name;
        var values = b.split(".");
        if(values[1]=='png'||values[1]=='jpg'){
          $scope.article.flag = 'a';
        }
        Article.upsert($scope.article, function() {
          CoreService.toastSuccess(gettextCatalog.getString('Photo saved'),
              gettextCatalog.getString('Your photo is safe with us!'));
        }, function(err) {
          console.log(err);
        });
        item.upload();
      };
    $scope.uploadvideo = function(item){
      $scope.article.video = CoreService.env.apiUrl+ '/containers/files/download/'+item.file.name;
      console.log(item.file.name);
      Article.upsert($scope.article, function() {
        CoreService.toastSuccess(gettextCatalog.getString('video saved'),
          gettextCatalog.getString('Your video is safe with us!'));
      }, function(err) {
        console.log(err);
      });
      item.upload();
    };
    $scope.uploadaudio = function(item){
      $scope.article.audio = CoreService.env.apiUrl+ '/containers/files/download/'+item.file.name;
      console.log(item.file.name);
      Article.upsert($scope.article, function() {
        CoreService.toastSuccess(gettextCatalog.getString('Audio saved'),
          gettextCatalog.getString('Your audio is safe with us!'));
      }, function(err) {
        console.log(err);
      });
      item.upload();
    }

    });
