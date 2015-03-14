'use strict';

angular.module('gsyTask.signIn', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/signIn', {
		templateUrl: 'signIn/signIn.html',
		controller: 'SignInCtrl'
	});
}])

.controller('SignInCtrl', ['$scope', function($scope) {
	$scope.user = {};

	$scope.signIn = function(e) {
		e.preventDefault();
		var email = $scope.user.email;
		var password = $scope.user.password;

		console.log($scope);
	};
}]);