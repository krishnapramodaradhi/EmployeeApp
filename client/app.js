'use strict';
angular.module('EmployeeApp', ['angular-loading-bar', 'ngRoute', 'ngAnimate'])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: function ($scope) {
                    $scope.pageClass = 'page-home';
                }
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
            if (next.$$route.aunthentication === true) {
                if (!Employee.isLoggedIn()) {
                    $rootScope.errMsg = 'You\'re not authorized to access ' + $location.url() + ' route. Please Login to continue.';
                    event.preventDefault();
                    $location.path('/login');
                }
            } else if(next.$$route.aunthentication === false) {
                if (Employee.isLoggedIn()) {
                    $rootScope.errMsg = 'Cannot access ' + $location.url() + '. You\'re already authorized';
                    event.preventDefault();
                    $location.path('/dashboard');
                }
            }
        });
    });