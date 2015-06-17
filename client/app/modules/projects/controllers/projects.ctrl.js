/*jshint sub:true*/
'use strict';
angular.module('com.module.projects')
  .controller('ProjectsCtrl', function($scope, $state, $stateParams, CoreService,
    Project, gettextCatalog) {

    var projectId = $stateParams.id;

    var createDate = function(date, time) {

      console.log(date);
      console.log(time);
      if (!date || !time) {
        return date || time;
      }

      var out = angular.copy(time);
      out.setFullYear(date.getFullYear());
      out.setMonth(date.getMonth());
      out.setDate(date.getDate());
      return out;
    };

    var splitDate = function() {
      var project = $scope.project;
      project.sDate = project.sTime = project.startTime;
      project.eDate = project.eTime = Date.parse(project['end_time']);
      //      project['start_time'] =  project['end_time'] = null;
    };

    if (projectId) {
      $scope.project = Project.findById({
        id: projectId
      }, function() {
        splitDate();
      }, function(err) {
        console.log(err);
      });
    } else {
      $scope.project = {};
    }

    function loadItems() {
      $scope.projects = Project.find();
    }

    loadItems();

    $scope.delete = function(id) {
      CoreService.confirm(gettextCatalog.getString('Are you sure?'),
        gettextCatalog.getString('Deleting this cannot be undone'),
        function() {
          Project.deleteById(id, function() {
            CoreService.toastSuccess(gettextCatalog.getString(
              'Project deleted'), gettextCatalog.getString(
              'Your project is deleted!'));
            loadItems();
            $state.go('app.projects.list');
            console.log();
          }, function(err) {
            CoreService.toastError(gettextCatalog.getString(
              'Error deleting project'), gettextCatalog.getString(
              'Your project is not deleted: ') + err);
          });
        },
        function() {
          return false;
        });
    };

    var dateOpen = function($project) {
      $project.prprojectDefault();
      $project.stopPropagation();

      this.opened = true;
    };

    $scope.formFields = [{
        key: 'name',
        label: gettextCatalog.getString('Name'),
        type: 'text',
        required: true
      }, {
        key: 'description',
        type: 'text',
        label: gettextCatalog.getString('Description'),
        required: true
      }, {
        key: 'sDate',
        required: true,
        label: gettextCatalog.getString('Start Date'),
        type: 'date',
        format: gettextCatalog.getString('dd/MM/yyyy'),
        opened: false,
        switchOpen: dateOpen
      }, {
        key: 'eDate',
        label: gettextCatalog.getString('End'),
        type: 'date',
        format: gettextCatalog.getString('dd/MM/yyyy'),
        opened: false,
        switchOpen: dateOpen
      },
    ];

    $scope.formOptions = {
      uniqueFormId: true,
      hideSubmit: false,
      submitCopy: gettextCatalog.getString('Save')
    };
    $scope.alerts = [];

    $scope.onSubmit = function() {
      var project = $scope.project;

      project['start_time'] = createDate(project.sDate, project.sTime);
      project.sDate = null;
      project.sTime = null;

      project['end_time'] = createDate(project.eDate, project.eTime);
      project.eDate = null;
      project.eTime = null;

      Project.upsert($scope.project, function() {
        CoreService.toastSuccess(gettextCatalog.getString('Project saved'),
          gettextCatalog.getString('Your project is safe with us!'));
        $state.go('^.list');
      }, function(err) {
        $scope.alerts.push({
          type: 'danger',
          msg: err.data.error.message
        });
        CoreService.toastError(gettextCatalog.getString(
          'Project not added'), err.data.error.message);
        console.log(err);
      });
    };


  });
