'use strict';
angular.module('EmployeeApp')
    .controller('mainCtrl', ['$log', '$location', '$timeout', '$rootScope', 'Employee', 'AuthToken',
        function ($log, $location, $timeout, $rootScope, Employee, AuthToken) {
            var app = this;
            app.successMsg = false;
            app.errorMsg = false;
            app.disabled = false;
            app.firstTime = true;
            app.inputType = 'password';
            app.limit = 5;

            if (!Employee.isLoggedIn()) {
                Employee.designation()
                    .then(function (data) {
                        app.designations = data.data.message;
                    }, function (err) {
                        $log.error('Error in getting designations ' + err);
                    });

                Employee.role()
                    .then(function (data) {
                        app.roles = data.data.message;
                    }, function (err) {
                        $log.error('Error in getting roles ' + err);
                    });
            }

            $rootScope.$on('$routeChangeStart', function (event, next, current) {
                if (Employee.isLoggedIn()) {
                    app.isLoggedIn = true;
                    Employee.getEmployee()
                        .then(function (data) {
                            app.name = data.data.message.employee_name;
                        });
                    Employee.getAllEmployees()
                        .then(function (data) {
                            app.employees = data.data.message;
                        });
                } else {
                    app.isLoggedIn = false;
                    app.name = undefined;
                }
            })

            this.regEmployee = function (regData) {
                $rootScope.errMsg = undefined;
                app.disabled = true;
                Employee.regEmployee(app.regData)
                    .then(function (data) {
                        app.icon = 'glyphicon glyphicon-ok';
                        app.alert = 'alert alert-success alert-dismissible';
                        app.successMsg = data.data.message;
                        $timeout(() => {
                            $location.path('/login');
                        }, 3000);
                    }, function (err) {
                        app.icon = 'glyphicon glyphicon-remove';
                        app.alert = 'alert alert-danger alert-dismissible';
                        app.errorMsg = err.data.message;
                        app.disabled = false;
                    });
            }

            this.login = function (loginData) {
                $rootScope.errMsg = undefined;
                app.disabled = true;
                Employee.loginEmployee(app.loginData)
                    .then(function (data) {
                        app.icon = 'glyphicon glyphicon-ok-sign';
                        app.alert = 'alert alert-success alert-dismissible';
                        app.successMsg = data.data.message;
                        AuthToken.setToken(data.data.token);
                        $timeout(() => {
                            $location.path('/dashboard');
                        }, 3000);
                    }, function (err) {
                        app.icon = 'glyphicon glyphicon-remove-sign';
                        app.alert = 'alert alert-danger alert-dismissible';
                        app.errorMsg = err.data.message;
                        app.disabled = false;
                    });
            }

            this.logout = function () {
                Employee.logout();
                $location.path('/');
            }

            this.hideAlert = function () {
                app.errorMsg = false;
                app.successMsg = false;
            }

            this.showPassword = function () {
                if (app.inputType == 'password') {
                    app.inputType = 'text';
                } else {
                    app.inputType = 'password';
                }
            }

            this.showMore = function (number) {
                (number > 0) ? app.limit = number : app.errorMsg = 'Please enter a number greater than zero';
            }

            this.showAll = function () {
                app.limit = undefined;
            }

        }]);