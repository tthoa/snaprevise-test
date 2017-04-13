(function () {
    angular
        .module('app')
        .controller('loginController', loginController);

    loginController.$inject = ['authenticationService', '$state', '$localStorage'];

    /* @ngInject */
    function loginController(authenticationService, $state, $localStorage) {
        var vm = this;
        vm.login = login;
        vm.username;
        vm.password;
        vm.message = '';
        vm.user = {};
        function login() {
            vm.user.username = vm.username;
            vm.user.password = vm.password;
            console.log(vm.user);
            authenticationService.login(vm.user).then(function (res) {
                console.log(res);
                if (res.status === 200) {
                    $state.go('start');
                    $localStorage.user = res.data;
                    vm.message = '';
                } else {
                    vm.message = 'username or password is not correct!';
                }
            });
        }
    }
})();
