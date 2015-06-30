'use strict';
angular.module('com.module.users')
  .controller('ProfileCtrl', function($scope, $timeout, CoreService, User, gettextCatalog) {

    $scope.user = User.getCurrent(function(user) {
      console.log(user);
    }, function(err) {
      console.log(err);
    });

    $scope.formFields = [{
      key: 'username',
      type: 'text',
      label: gettextCatalog.getString('Username'),
      required: true
    }, {
      key: 'email',
      type: 'email',
      label: gettextCatalog.getString('E-mail'),
      required: true
    }, {
      key: 'firstName',
      type: 'text',
      label: gettextCatalog.getString('First name'),
      required: true
    }, {
      key: 'lastName',
      type: 'text',
      label: gettextCatalog.getString('Last name'),
      required: true
    }, {
      key: 'coverImage',
      type: 'image',
      label: gettextCatalog.getString('Cover Image'),
      required: false,
    }, {
      key: 'avatarImage',
      type: 'image',
      label: gettextCatalog.getString('Avatar Image'),
      required: false,
    }];

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };

    $scope.onSubmit = function() {
      User.upsert($scope.user, function() {
        CoreService.toastSuccess(gettextCatalog.getString(
          'Profile saved'), gettextCatalog.getString(
          'Enjoy the new you!'));
      }, function(err) {
        CoreService.toastError(gettextCatalog.getString(
          'Error saving profile'), gettextCatalog.getString(
          'Your profile is not saved: ') + err);
      });
    };
    //below Edit by Sang
    $scope.clickSearch = function(){
      var $ = angular.element;
      $('.peepr-blog-search').toggleClass('show-search');
    };
    $scope.changeImage = function(){
      var myEdi1 = angular.element( document.querySelector( '.navigation_inner' ) );
      var myEdi2 = angular.element(document.querySelector('.avatar'));
      var myEdi3 = angular.element(document.querySelector('.abc'));
      myEdi1.html('<h3>Edit appearance</h3>' +
        '<button class="chrome big black cancel_button" ng-click="closeEdit()" type="button">Cancel</button>' +
        '<button class="chrome big save_button" data-error="Woops :(" data-error-confirm="Ok" type="button" disabled="disabled"><span class="label">Save</span></button>' +
      '<button class="edit_header_image edit_button"><label><i class="icon icon_edit_pencil"></i><input class="coverImage" type="file" /></label></button>');
      $scope.avaStyle={color:'rgb(250, 250, 250)', 'background-image':'url(https://secure.assets.tumblr.com/images/default_avatar/cube_closed_128.png)'};
      myEdi2.html('<div class"off_overlay customize_overlay"></div><div class="header_dropzone customize_overlay"><input id="tumblelog_avatar_url" data-filetype-ok="I am sorry" data-filetype-error="That\'s not even an image..." data-filesize-ok="Fine" data-filesize-error="That\'s too big!<br />Try making it 10 MB or less." class="customize_overlay" name="photo" type="file" accept="image/*"></div>' +
      '<button class="edit_avatar edit_button" title="Edit avatar options" type="button"><label><i class="icon icon_edit_pencil"><input class="avatarImage" type="file"/></i></label></button>' +
      '<div class="indash_header_popover"><div class="popover popover_gradient nipple_on_left" style="display: none; top: 0px; left: 0px;"><div class="avatar_popover popover_inner"><ul class="popover_options"><li><a class="choose_photo"><i class="icon icon_view_grid_settings"></i>Choose a photo</a></li><li><label class="binary_switch right"><input name="tumblelog_show_avatar" id="tumblelog_show_avatar" type="checkbox" checked>' +
        '<span class="binary_switch_track"></span><span class="binary_switch_button"></span></label><label for="tumblelog_show_avatar">Show avatar</label></li><li class="avatar_shape_options"><div class="styles right"><a class="avatar_shape square selected" data-value="square"></a><a class="avatar_shape circle" data-value="circle"></div><labe for="tumblelog_avatar_shape">Shape</labe></li></ul></div></div></div>')
      //$('.indash_blog').addClass('customizing');

    };
    $scope.closeEdit = function(){
      var myEd = angular.element( document.querySelector( '.navigation_inner' ) );
      myEd.html('<h3><a href="http://solidblackdn.tumblr.com" class="blog_name" target="_blank"><span class="name">{{user_name}}</span><span class="full_url">{{user_name}}.tumblr.com</span></a></h3>' +
        '<div class="peepr-blog-search" style="width: 397px">' +
        '<form class="blog-search-form">' +
        '<div class="search-filters" data-subview="filters">' +
        '<i class="icon_filter show-filter-popover nav_icon"></i>' +
        '</div>' +
        '<i class="icon_arrow_thin_left clear-search nav_icon"></i>' +
        '<i class="icon_search toggle-search nav_icon" ng-click="clickSearch()"></i>' +
        '<div class="search-input" data-subview="input">' +
        '<input type="text" class="blog-search-input" placeholder="Search {{user_name}}">'+
        '</div>' +
        '</form>'+
        '</div>' +
        '<div class="header_controls">' +
        '<a class="open_blog_button nav_icon icon_export"></a>' +
        '<button class="chrome big customize_button" type="button" ng-click="changeImage()" data-url="/settings/blog/{{user_name}}">Edit appearance</button>' +
        '</div>')
    };
    $scope.changeImages = function(){
      var $ = angular.element;
      $('.indash_blog').toggleClass('customizing');
      $scope.avaStyle={color:'rgb(250, 250, 250)', 'background-image':'url(https://secure.assets.tumblr.com/images/default_avatar/cube_closed_128.png)'};
    }
  });
