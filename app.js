'use strict';

// Declare app level module which depends on views, and components
angular.module('gsyTask', [
	'ngRoute',
	'gsyTask.signIn',
	'gsyTask.signUp',
	'gsyTask.taskManager'
])

.factory("services", ['$http', 'SignInInfo', 'SignUpInfo', '$location', function($http, SignInInfo, SignUpInfo, $location) {
  	var serviceBase = 'services/';
    var obj = {};

	obj.signIn = function (user) {
	    return $http.post(serviceBase + 'signIn', user).then(
		    function (status) {
		    	if (status.status === 200) {
		    		$location.path('/taskManager');
		    	} else if (status.status === 204) {
		    		SignInInfo.setMessage('Invalid Email address or Password');		
		    	};	        
		    },
		    function(error) {
		    	if (error.status === 400) {
					SignInInfo.setMessage('Invalid Email address or Password');
		    	};

		    	return error;
		    }
	    );
	};

	obj.signUp = function (user) {
	    return $http.post(serviceBase + 'signUp', user).then(
		    function (status) {
		    	if (status.status === 200) {
		    		$location.path('/taskManager');
		    	} else if (status.status === 204) {
		    		SignUpInfo.setMessage('Invalid Email address or Password');		
		    	};	        
		    },
		    function(error) {
		    	if (error.status === 400) {
					SignUpInfo.setMessage(error.data.msg);
		    	};

		    	return error;
		    }
	    );
	};

    return obj;   
}])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/signIn'});
}]);