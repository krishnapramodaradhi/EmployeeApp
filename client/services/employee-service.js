angular.module('EmployeeApp')
    .service('Employee', ['$q', '$http', '$log', function($q, $http, $log) {
        return {
            regEmployee: function(regData) {
                return $http.post('/employee/register', regData);
            },
            designation: function() {
                return $http.get('/employee/reference');
            }
        }
    }]);