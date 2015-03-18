'use strict';

angular.module('gsyTask.signUp', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/signUp', {
		templateUrl: 'signUp/signUp.html',
		controller: 'SignUpCtrl'
	});
}])

.controller('SignUpCtrl', ['$scope', '$location', 'services', 'SignUpInfo', function($scope, $location, services, SignUpInfo) {
	$scope.user = {};
	$scope.messageToShow = false;
	$scope.message = '';

	$scope.signUp = function(user) {
		services.signUp(user);

		setTimeout(function () {
		        $scope.$apply(function () {
		            $scope.message = SignUpInfo.getMessage();

		            if ($scope.message) {
		            	$scope.messageToShow = true;
		            };		            
		        });
		}, 400);

	};
}])

.service('SignUpInfo', function() {
    var user = '',
    	message = '';
 
    return {
        getUser: function() {
            return user;
        },
        setUser: function(value) {
            user = value;
        },
        getMessage: function() {
        	return message;
        },
        setMessage: function(value) {
        	message = value;
        }
    };
});