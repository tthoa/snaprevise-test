(function () {
    angular
        .module('app')
        .controller('CoreController', CoreController);

    CoreController.$inject = ['$state', '$localStorage'];

    /* @ngInject */
    function CoreController($state, $localStorage) {
        var vm = this;
        vm.user = $localStorage.user;
        vm.logout = logout;
        function logout() {
            delete $localStorage.user;
            $state.go('login');
        }
    }
})();
