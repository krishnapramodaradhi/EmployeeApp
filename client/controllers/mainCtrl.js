'use strict';
angular.module('EmployeeApp')
    .controller('mainCtrl', ['$log', 'Employee', function ($log, Employee) {
        var app = this;
        app.successMsg = false;
        app.errorMsg = false;
        Employee.designation()
            .then(function (data) {
                app.designation = data.data.message;
            }, function (err) {
                $log.error(err);
            });

        this.regEmployee = function (regData) {
            Employee.regEmployee(app.regData)
                .then(function (data) {
                    app.icon = 'glyphicon glyphicon-ok';
                    app.alert = 'alert alert-success alert-dismissible';
                    app.successMsg = data.data.message;
                    setTimeout(() => {
                        app.successMsg = false;
                    }, 3000);
                }, function (err) {
                    app.icon = 'glyphicon glyphicon-remove';
                    app.alert = 'alert alert-danger alert-dismissible';
                    app.errorMsg = err.data.message;
                    setTimeout(() => {
                        app.errorMsg = false;
                    }, 3000);
                });
        }

        this.hideAlert = function() {
            app.errorMsg = false;
            app.successMsg = false;
        }

    }]);