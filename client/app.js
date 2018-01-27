'use strict';
angular.module('EmployeeApp', ['angular-loading-bar', 'ngRoute'])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'mainCtrl',
                controllerAs: 'main',
                aunthentication: false
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'mainCtrl',
                controllerAs: 'main',
                aunthentication: false
            })
            .when('/dashboard', {
                templateUrl: 'views/dashboard.html',
                aunthentication: true
            })
            .otherwise({
                templateUrl: 'views/404.html'
            })

        $locationProvider.html5Mode(true);

        $httpProvider.interceptors.push('AuthInterceptors');
    }])
    .run(function ($rootScope, $log, $location, Employee) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if(next.$$route.aunthentication) {
                if(!Employee.isLoggedIn()) {
                    event.preventDefault();
                    $location.path('/login');
                }
            } else {
                if(Employee.isLoggedIn()) {
                    event.preventDefault();
                    $location.path('/dashboard');
                }
            }
        });
    });