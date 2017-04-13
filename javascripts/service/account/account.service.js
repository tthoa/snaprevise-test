(function () {
    'use strict';

    angular
        .module('app')
        .factory('accountService', accountService);

    accountService.$inject = ['$http', '$state', 'toastr'];

    function accountService($http, $state, toastr) {

        var files = [];

        var service = {
            ConfirmAccount: ConfirmAccount,
            getProfile: getProfile,
            updateProfile: updateProfile,
            changePassOfUser : changePassOfUser,
            getProfileById: getProfileById,
            changePass: changePass,
            sendPassword: sendPassword,
            pushImage : pushImage,
            getImages : getImages
        };

        return service;

        ////////////////////////////

        function updateProfile(formData) {
            return $http.put('api/Accounts/UpdateProfile', formData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(sucess, errorFunction);
            function sucess(response) {
                return response;
            }
            function errorFunction(error) {
                return error;
            }
        }

        function pushImage(fileModel) {
            if (checkFiles(fileModel)) {
                if (fileModel.file.name.indexOf('.jpg') === -1
                    && fileModel.file.name.indexOf('.png') === -1
                    && fileModel.file.name.indexOf('.jpeg') === -1) {
                    return false;
                }
                files[0] = fileModel;
            }
            return true;
        }

        function checkFiles(fileModel) {
            for (var i = 0; i < files.length; i++) {
                if (fileModel.file.name === files[i].file.name) {
                    return false;
                }
            }
            return true;
        }

        function getImages() {
            return files;
        }

        function getProfileById(Id) {
            function successCallBack(response) {
                return response;
            }

            function errorCallBack(response) {
                return response;
            }
            return $http.get('api/Accounts/GetById/' + Id)
                .then(successCallBack, errorCallBack);
        }

        function getProfile() {
            function successCallBack(response) {
                return response;
            }

            function errorCallBack(response) {
                return response;
            }
            return $http.get('api/Accounts/GetProfile')
                .then(successCallBack, errorCallBack);
        }

        function changePass(pass) {
            function successCallBack(response) {
                toastr.success('Change password successfully!', 'Success');
                return response;
            }

            function errorCallBack(response) {
                return response;
            }
            return $http.put('api/Accounts/ResetPassword', pass)
                .then(successCallBack, errorCallBack);
        }

        function changePassOfUser(password) {
            function successCallBack(response) {
                return response;
            }

            function errorCallBack(response) {
                toastr.error('Change password Failed!', 'Failed');
                return response;
            }
            return $http.put('api/Accounts/ChangePassword', password)
                .then(successCallBack, errorCallBack);
        }

        function sendPassword(username, resetUrl) {
            return $http.post('api/Accounts/ResetPassword', bodyData).then(successCallpack, errorCallpack);

            function successCallpack(response) {
                return response;
            }

            function errorCallpack(response) {
                return response;
            }
        }

        function ConfirmAccount(userId, code) {
            return $http.post('api/Accounts/UserConfirmMail?userId=' + userId + '&code=' + code).then(successCallpack, errorCallpack);

            function successCallpack(response) {
                return response;
            }

            function errorCallpack(response) {
                return response;
            }
        }
    }
})();
