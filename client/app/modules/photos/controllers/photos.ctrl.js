'use strict';
angular.module('com.module.photos')
  .controller('PhotosCtrl', function($scope, $state, $stateParams, CoreService,
    FormHelper, gettextCatalog, Photo, PhotosService,User) {

    $scope.delete = function(id) {
      PhotosService.deletePhoto(id, function() {
        $state.reload();
      });
    };

    var currentUser;

    User.getCurrent(function(user) {
      currentUser = user;
      loadItems(currentUser.id);
    }, function(err) {
      console.log(err);
    });

    function loadItems(id) {
      if(id==1){
        $scope.photos = Photo.find(
          {
            filter: {
              order: 'created DESC'
            }
          }
        );
      }
      else{
        $scope.photos = Photo.find(
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

    this.formHelper = new FormHelper(Photo);
    $scope.cancel = function() {
      console.log('Cancel');
      console.log(this.formHelper);
      //this.formHelper.cancel('app.photos.list');
    };

    var photoId = $stateParams.id;

    if (photoId) {
      $scope.photo = Photo.findById({
        id: photoId
      }, function() {}, function(err) {
        console.log(err);
      });
    } else {
      $scope.photo = {};
      User.getCurrent(function(user) {
        currentUser = user;
        $scope.photo.ownerId=user.id;
        $scope.photo.ownerName=user.username;
        $scope.photo.date=user.roles;
      }, function(err) {
        console.log(err);
      });
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
    },{
      key: 'url1',
      type: 'text',
      label: gettextCatalog.getString('Add photo from web'),
      required: false
    }];

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };



    $scope.onSubmit = function() {
      if($scope.photo.ownerId === currentUser.id){
        Photo.upsert($scope.photo, function() {
          CoreService.toastSuccess(gettextCatalog.getString('Photo saved'),
            gettextCatalog.getString('Your photo is safe with us!'));
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

    $scope.upload = function(item){
      if($scope.photo.ownerId === currentUser.id){
        $scope.photo.url = CoreService.env.apiUrl+ '/containers/files/download/'+item.file.name;
        console.log(item.file.name);
        //Photo.upsert($scope.photo, function() {
          CoreService.toastSuccess(gettextCatalog.getString('Photo saved'),
            gettextCatalog.getString('Your photo is safe with us!'));
          //$state.go('^.list');
        //}, function(err) {
        //  console.log(err);
        //});
        item.upload();
      }
      else{
        CoreService.alertWarning('May be you do not have permission to do this stuff','Please ask admin for permission');
        $state.go('^.list');
      }
    };
  });
