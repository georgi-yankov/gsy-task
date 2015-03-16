'use strict';

angular.module('gsyTask.taskManager', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/taskManager', {
		templateUrl: 'taskManager/taskManager.html',
		controller: 'TaskManagerCtrl'
	});
}])

.controller('TaskManagerCtrl', ['$scope', function($scope) {

}]);