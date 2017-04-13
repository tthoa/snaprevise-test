(function () {
    angular
        .module('app')
        .controller('ChangePasswordController', ChangePasswordController);
    ChangePasswordController.$inject = ['$scope', '$localStorage',
        '$state', 'accountService', '$timeout', 'toastr'];

    /* @ngInject */
    function ChangePasswordController($scope, $localStorage, $state, accountService, $timeout, toastr) {
        var vm = this;
        vm.passwordOld = '';
        vm.passwordNew = '';
        vm.passwordConfirm = '';
        vm.changePass = changePass;
        vm.cancel = cancel;

        init();

        function init() {

        }

        function changePass() {
            var objectPass = {};
            if (vm.passwordOld !== '' && vm.passwordNew !== '' && vm.passwordConfirm !== '') {
                objectPass.AccountId = $localStorage.id;
                objectPass.OldPassword = vm.passwordOld;
                objectPass.NewPassword = vm.passwordNew;
                objectPass.ConfirmPassword = vm.passwordConfirm;
                if (vm.passwordNew === vm.passwordConfirm) {
                    function successCallBack(response) {
                        if (response.status === 200) {
                            toastr.success('Change password successfully!');
                            vm.passwordOld = '';
                            vm.passwordNew = '';
                            vm.passwordConfirm = '';
                        }
                    }
                    function errorCallBack(response) {
                        toastr.error('Change password failed!');
                    }
                    accountService.changePassOfUser(objectPass).then(successCallBack, errorCallBack);
                }
                else {
                    toastr.warning('confirm password failed!', 'Notification');
                }
            }
            else {
                toastr.warning('Lack of information!', 'Notification');
            }
        }

        function cancel() {
            $timeout(function () {
                $state.go('start');
            });
        }
    }
})();