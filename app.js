'use strict';

// Declare app level module which depends on views, and components
angular.module('gsyTask', [
	'ngRoute',
	'gsyTask.signIn'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/signIn'});
}]);