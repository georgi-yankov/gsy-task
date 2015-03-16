'use strict';

angular.module('gsyTask.signIn', ['ngRoute'])

.factory("services", ['$http', 'LoginInfo', '$location', function($http, LoginInfo, $location) {
  	var serviceBase = 'services/';
    var obj = {};

	obj.login = function (user) {
	    return $http.post(serviceBase + 'login', user).then(
		    function (status) {
		    	if (status.status === 200) {
		    		console.log(status.data);
		    		return status.data;
		    	} else if (status.status === 204) {
		    		LoginInfo.setMessage('Invalid Email address or Password');		
		    	};	        
		    },
		    function(error) {
		    	console.log(error);
		    	return error;
		    }
	    );
	};

    return obj;   
}])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/signIn', {
		templateUrl: 'signIn/signIn.html',
		controller: 'SignInCtrl'
	});
}])

.controller('SignInCtrl', ['$scope', '$location', 'services', 'LoginInfo', function($scope, $location, services, LoginInfo) {
	$scope.user = {};
	$scope.message = '';

	$scope.signIn = function(user) {
		services.login(user);

		setTimeout(function () {
		        $scope.$apply(function () {
		            $scope.message = LoginInfo.getMessage();
		            console.log($scope.message);
		        });
		    }, 50);
		
	};
}])

.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}])

.service('LoginInfo', function() {
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