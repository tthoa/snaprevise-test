(function () {
    'use strict';

    angular
        .module('app')
        .factory('authenticationService', authenticationService);

    authenticationService.$inject = ['$http', '$localStorage', '$httpParamSerializerJQLike', '$state', '$timeout'];

    function authenticationService($http, $localStorage, $httpParamSerializerJQLike, $state, $timeout) {

        var service = {
            login: login,
            checkAuthentication: checkAuthentication,
            checkUnAuthentication: checkUnAuthentication
        };

        return service;

        ////////////////////////////

        function login(data) {
            function successCallback(response) {
                return response;
            }
            function errorCallback(err) {
                return err;
            }
            return $http.post('/api/user/login', data).then(successCallback, errorCallback);
        }

        function checkAuthentication() {
            if (!$localStorage.user) {
                $timeout(function () {
                    $state.go('login');
                });

            }
        }

        function checkUnAuthentication() {
            if ($localStorage.user) {
                $timeout(function () {
                    $state.go('start');
                });
            }
        }
    }
})();
