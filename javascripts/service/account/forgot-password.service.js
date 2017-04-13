(function() {
    'use strict';

    angular
        .module('app')
        .factory('ResetPassword', ResetPassword);

    ResetPassword.$inject = ['$http'];

    function ResetPassword($http) {

        var service = {
            createNewPassword: createNewPassword,
            sendPassword: sendPassword
        };

        return service;

        ////////////////////////////

        function createNewPassword(username, password, passwordConfirm, code) {
            var url = 'api/Accounts/ResetPassword';
            var body = {
                'UserName': username,
                'NewPassword': password,
                'ConfirmPassword': passwordConfirm,
                'Code': code
            };


            return $http.put(url, body).then(successCallpack, errorCallpack);

            function successCallpack(response) {
                return response;
            }

            function errorCallpack(response) {
                return response;
            }

        }

        function sendPassword(username, resetUrl) {
            var bodyData = {
                username: username,
                ResetUrl: resetUrl
            };
            return $http.post('api/Accounts/ResetPassword', bodyData).then(successCallpack, errorCallpack);

            function successCallpack(response) {
                return response;
            }

            function errorCallpack(response) {
                return response;
            }
        }


    }
})();