'use strict';

angular.module('gsyTask.signUp', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/signUp', {
		templateUrl: 'signUp/signUp.html',
		controller: 'SignUpCtrl'
	});
}])

.controller('SignUpCtrl', ['$scope', function($scope) {
	$scope.user = {};

	$scope.signUp = function(e) {
		e.preventDefault();
		var email = $scope.user.email;
		var password = $scope.user.password;

		console.log($scope);
	};
}]);