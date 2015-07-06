'use strict';
angular.module('com.module.links')
  .controller('LinksCtrl', function($scope, $sce, $state, $stateParams, CoreService,
    FormHelper, gettextCatalog, Link, LinksService, User) {


    var currentUser;
    User.getCurrent(function(user) {
      currentUser = user;
      loadItems(currentUser.id);
    }, function(err) {
      console.log(err);
    });

    $scope.myLimit = 8;

    $scope.loadMore = function() {
      $scope.myLimit += 8;
    };

    function loadItems(id) {
      if(id==1){
        $scope.links = Link.find();
      }
      else{
        $scope.links = Link.find(
          {
            filter: {
              where:{
                ownerId: id
              }
            }
          }
        );
      }
    }

    function getLink(id) {
      return Link.findById({
        id: id
      });
    };

    if ($stateParams.id) {
      $scope.link = getLink($stateParams.id);
    } else {
      $scope.link = {};
    }


    $scope.delete = function(id) {
      LinksService.deleteLink(id, function() {
        $state.reload();
      });
    };

    this.formHelper = new FormHelper(Link);
    $scope.cancel = function() {
      console.log('Cancel');
      console.log(this.formHelper);
      //this.formHelper.cancel('app.news.list');
    };

    var linkId = $stateParams.id;

    if (linkId) {
      $scope.link = Link.findById({
        id: linkId
      }, function() {}, function(err) {
        console.log(err);
      });
    } else {
      $scope.link = {};
      User.getCurrent(function(user) {
        currentUser = user;
        $scope.link.ownerId=user.id;
        /*console.log('2');*/
      }, function(err) {
        console.log(err);
      });
    }

    $scope.formFields = [{
      key: 'url',
      type: 'text',
      label: gettextCatalog.getString('URL'),
      required: true
    }, {
      key: 'description',
      type: 'textarea',
      label: gettextCatalog.getString('Description'),
      required: false
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

      if($scope.link.ownerId === currentUser.id){
        Link.upsert($scope.link, function() {
          CoreService.toastSuccess(gettextCatalog.getString('Link saved'),
            gettextCatalog.getString('Your link is safe with us!'));
          $state.go('^.list');
        }, function(err) {
          console.log(err);
        });
      }
      else{
        CoreService.alertWarning('May be you do not have permission to do this stuff','Please ask admin for permission');
        $state.go('^.list');
      }

    };
  });

