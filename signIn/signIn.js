'use strict';

angular.module('gsyTask.signIn', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/signIn', {
		templateUrl: 'signIn/signIn.html',
		controller: 'SignInCtrl'
	});
}])

.controller('SignInCtrl', ['$scope', '$location', 'services', 'SignInInfo', function($scope, $location, services, SignInInfo) {
	$scope.user = {};
	$scope.messageToShow = false;
	$scope.message = '';

	$scope.signIn = function(user) {
		services.signIn(user);

		setTimeout(function () {
		        $scope.$apply(function () {
		            $scope.message = SignInInfo.getMessage();

		            if ($scope.message) {
		            	$scope.messageToShow = true;
		            };		            
		        });
		}, 200);

	};
}])

.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}])

.service('SignInInfo', function() {
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