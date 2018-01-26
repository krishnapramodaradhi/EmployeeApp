'use strict';
angular.module('EmployeeApp', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'views/register.html'
            })
            .when('/login', {
                templateUrl: 'views/login.html'
            })
            .when('/dashboard', {
                templateUrl: 'views/dashboard.html'
            })
            .otherwise({
                templateUrl: 'views/404.html'
            })

        $locationProvider.html5Mode(true);
    }]);