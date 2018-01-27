'use strict';
angular.module('EmployeeApp', ['angular-loading-bar','ngRoute'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html'
            })
            .when('/login', {
                templateUrl: 'views/login.html'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'mainCtrl',
                controllerAs: 'main'
            })
            .when('/dashboard', {
                templateUrl: 'views/dashboard.html'
            })
            .otherwise({
                templateUrl: 'views/404.html'
            })

        $locationProvider.html5Mode(true);
    }]);