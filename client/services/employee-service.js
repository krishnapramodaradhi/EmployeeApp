angular.module('EmployeeApp')
    .service('Employee', ['$q', '$http', '$log', 'AuthToken', function ($q, $http, $log, AuthToken) {
        return {
            regEmployee: function (regData) {
                return $http.post('/employee/register', regData);
            },
            loginEmployee: function (loginData) {
                return $http.post('/employee/login', loginData);
            },
            isLoggedIn: function () {
                if (AuthToken.getToken()) {
                    return true;
                } else {
                    return false;
                }
            },
            getEmployee: function () {
                if (AuthToken.getToken()) {
                    return $http.post('/employee/me');
                } else {
                    return { message: 'User has no token' };
                }
            },
            logout: function () {
                AuthToken.removeToken();
            },
            designation: function () {
                return $http.get('/employee/reference/designations');
            },
            role: function () {
                return $http.get('/employee/reference/roles');
            }
        }
    }])
    .service('AuthToken', ['$window', function ($window) {
        return {
            setToken: function (token) {
                return $window.localStorage.setItem('token', token);
            },
            getToken: function () {
                return $window.localStorage.getItem('token');
            },
            removeToken: function () {
                return $window.localStorage.removeItem('token');
            }
        }
    }])
    .service('AuthInterceptors', ['AuthToken', function (AuthToken) {
        return {
            request: function (config) {
                var token = AuthToken.getToken();
                if (token) config.headers['x-access-token'] = token;
                return config;
            }
        }
    }]);