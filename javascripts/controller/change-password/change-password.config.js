(function() {
    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider.state('start.change-password', {
            url: '/change-password',
            templateUrl: 'javascripts/controller/change-password/change-password.html',
            authenticate: true,
            controller: 'ChangePasswordController',
            controllerAs: 'vm'
        });
    }
})();
