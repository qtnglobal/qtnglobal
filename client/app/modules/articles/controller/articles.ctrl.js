'use strict';
var app=angular.module('com.module.articles');
    app.controller('ArticlesCtrl', function($scope,$sce, $state, $stateParams, CoreService,
                                       FormHelper, gettextCatalog, Article, ArticlesService, User) {

      var  currentUser;
      User.getCurrent(function(user){
        currentUser= user;
        loadItems(currentUser.id);
      });

      function loadItems(id) {
        if(id==1){
          $scope.articles = Article.find({
            filter: {
              order: 'created DESC'
            }
          });
        }
        else{
          $scope.articles = Article.find(
            {
              filter: {
                where:{
                  ownerId: id
                },
                order: 'created DESC'
              }
            }
          );
        }
      }
      $scope.delete = function(id) {
        ArticlesService.deleteArticle(id, function() {
          $state.reload();
        });
      };
      $scope.deliberatelyTrustDangerousTitle = function(a) {
        return $sce.trustAsHtml(a.title);
      };
      $scope.deliberatelyTrustDangerousContent = function(a) {
        return $sce.trustAsHtml(a.content);
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
        User.getCurrent(function(user){
          $scope.article.ownerId = user.id;
          $scope.article.ownerName = user.username;
        })
      }

      $scope.formFields = [{
        key: 'title',
        label: gettextCatalog.getString('Title'),
        type: 'editable-text',
        required: true
      }, {
        key: 'content',
        label: gettextCatalog.getString('Content'),
        type: 'editable-text',
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
        if(currentUser.id === $scope.article.ownerId){
          Article.upsert($scope.article, function() {
          CoreService.toastSuccess(gettextCatalog.getString('Article saved'),
              gettextCatalog.getString('Your article is safe with us!'));
          $state.go('^.list');
        }, function(err) {
          console.log(err);
        });
      }else {
          CoreService.toastError(gettextCatalog.getString('You dont have permission to do this'));
        }};
      $scope.uploadimage = function(item){
        if ($scope.article.ownerId === currentUser.id) {
          $scope.article.image = CoreService.env.apiUrl + '/containers/files/download/' + item.file.name;
          console.log(item.file.name);
          var b = item.file.name;
          var values = b.split(".");
          if (values[1] == 'png' || values[1] == 'jpg') {
            $scope.article.flag = 'a';
          }
          //Article.upsert($scope.article, function() {
          CoreService.toastSuccess(gettextCatalog.getString('Photo saved'),
            gettextCatalog.getString('Your photo is safe with us!'));
          //}, function(err) {
          //  console.log(err);
          //});
          item.upload();
        }else{
          CoreService.toastError(gettextCatalog.getString('You do not have permission to do this'))
        }
      };
    $scope.uploadvideo = function(item){
      if($scope.article.ownerId === currentUser.id) {
        $scope.article.video = CoreService.env.apiUrl + '/containers/files/download/' + item.file.name;
        console.log(item.file.name);
        //Article.upsert($scope.article, function() {
        CoreService.toastSuccess(gettextCatalog.getString('video saved'),
          gettextCatalog.getString('Your video is safe with us!'));
        //}, function(err) {
        //  console.log(err);
        //});
        item.upload();
      }else{
        CoreService.toastError(gettextCatalog.getString('You do not have permission to do this'))
      }
    };
    $scope.uploadaudio = function(item){
      if($scope.article.ownerId === currentUser.id){
      $scope.article.audio = CoreService.env.apiUrl+ '/containers/files/download/'+item.file.name;
      console.log(item.file.name);
      //Article.upsert($scope.article, function() {
        CoreService.toastSuccess(gettextCatalog.getString('Audio saved'),
          gettextCatalog.getString('Your audio is safe with us!'));
      //}, function(err) {
      //  console.log(err);
      //});
      item.upload();
    }else{
        CoreService.toastError(gettextCatalog.getString('You do not have permission to do this'))
      }
    };
    });
//app.controller('ConvertHtml',['$scope', '$sce', function($scope, $sce,$stateParams,Article,id ){
//  id=1;
//  if (id==1) {
//    $scope.content = Article.findById({
//      id: id
//    });
//    alert(typeof $scope.content.title);
//    $scope.deliberatelyTrustDangerousSnippet = function() {
//      return $sce.trustAsHtml($scope.content.title);
//    }
//    } else {
//    $scope.content = {};
//  }
//
//
//}]);

