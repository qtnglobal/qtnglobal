'use strict';
angular.module('com.module.photos')
  .controller('PhotosCtrl', function($scope, $state, $stateParams, CoreService,
    FormHelper, gettextCatalog, Photo, PhotosService) {

    $scope.delete = function(id) {
      PhotosService.deletePhoto(id, function() {
        $state.reload();
      });
    };

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
      Photo.upsert($scope.photo, function() {
        CoreService.toastSuccess(gettextCatalog.getString('Photo saved'),
          gettextCatalog.getString('Your photo is safe with us!'));
        $state.go('^.list');
      }, function(err) {
        console.log(err);
      });
    };

    $scope.upload = function(item){
      $scope.photo.url = CoreService.env.apiUrl+ '/containers/files/download/'+item.file.name;
      console.log(item.file.name);
      Photo.upsert($scope.photo, function() {
        CoreService.toastSuccess(gettextCatalog.getString('Photo saved'),
          gettextCatalog.getString('Your photo is safe with us!'));
        $state.go('^.list');
      }, function(err) {
        console.log(err);
      });
      item.upload();
    }

  });
