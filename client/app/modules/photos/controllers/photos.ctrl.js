'use strict';
var app=angular.module('com.module.photos');
  app.controller('PhotosCtrl', function($scope, $state, $stateParams, CoreService,
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
app.controller('FormCtrl', function ($scope) {
  $scope.listone = '';
  $scope.listtwo = 'one,two,three';
  $scope.listthree = '';
  return $scope.users = [
    'Max',
    'Tim',
    'Bernd',
    'Angela'
  ];
});
app.directive('tagInput', function () {
  return {
    restrict: 'E',
    scope: {
      inputTags: '=taglist',
      autocomplete: '=autocomplete'
    },
    link: function ($scope, element, attrs) {
      $scope.defaultWidth = 200;
      $scope.tagText = '';
      $scope.placeholder = attrs.placeholder;
      if ($scope.autocomplete) {
        $scope.autocompleteFocus = function (event, ui) {
          $(element).find('input').val(ui.item.value);
          return false;
        };
        $scope.autocompleteSelect = function (event, ui) {
          $scope.$apply('tagText=\'' + ui.item.value + '\'');
          $scope.$apply('addTag()');
          return false;
        };
        $(element).find('input').autocomplete({
          minLength: 0,
          source: function (request, response) {
            var item;
            return response(function () {
              var i, len, ref, results;
              ref = $scope.autocomplete;
              results = [];
              for (i = 0, len = ref.length; i < len; i++) {
                if (window.CP.shouldStopExecution(1)) {
                  break;
                }
                item = ref[i];
                if (item.toLowerCase().indexOf(request.term.toLowerCase()) !== -1) {
                  results.push(item);
                }
              }
              window.CP.exitedLoop(1);
              return results;
            }());
          },
          focus: function (_this) {
            return function (event, ui) {
              return $scope.autocompleteFocus(event, ui);
            };
          }(this),
          select: function (_this) {
            return function (event, ui) {
              return $scope.autocompleteSelect(event, ui);
            };
          }(this)
        });
      }
      $scope.tagArray = function () {
        if ($scope.inputTags === undefined) {
          return [];
        }
        return $scope.inputTags.split(',').filter(function (tag) {
          return tag !== '';
        });
      };
      $scope.addTag = function () {
        var tagArray;
        if ($scope.tagText.length === 0) {
          return;
        }
        tagArray = $scope.tagArray();
        tagArray.push($scope.tagText);
        $scope.inputTags = tagArray.join(',');
        return $scope.tagText = '';
      };
      $scope.deleteTag = function (key) {
        var tagArray;
        tagArray = $scope.tagArray();
        if (tagArray.length > 0 && $scope.tagText.length === 0 && key === undefined) {
          tagArray.pop();
        } else {
          if (key !== undefined) {
            tagArray.splice(key, 1);
          }
        }
        return $scope.inputTags = tagArray.join(',');
      };
      $scope.$watch('tagText', function (newVal, oldVal) {
        var tempEl;
        if (!(newVal === oldVal && newVal === undefined)) {
          tempEl = $('<span>' + newVal + '</span>').appendTo('body');
          $scope.inputWidth = tempEl.width() + 5;
          if ($scope.inputWidth < $scope.defaultWidth) {
            $scope.inputWidth = $scope.defaultWidth;
          }
          return tempEl.remove();
        }
      });
      element.bind('keydown', function (e) {
        var key;
        key = e.which;
        if (key === 9 || key === 13) {
          e.preventDefault();
        }
        if (key === 8) {
          return $scope.$apply('deleteTag()');
        }
      });
      return element.bind('keyup', function (e) {
        var key;
        key = e.which;
        if (key === 9 || key === 13 || key === 188) {
          e.preventDefault();
          return $scope.$apply('addTag()');
        }
      });
    },
    template: '<div class=\'tag-input-ctn\'><div class=\'input-tag\' data-ng-repeat="tag in tagArray()">{{tag}}<div class=\'delete-tag\' data-ng-click=\'deleteTag($index)\'>&times;</div></div><input type=\'text\' data-ng-style=\'{width: inputWidth}\' data-ng-model=\'tagText\' placeholder=\'{{placeholder}}\'/></div>'
  };
});
