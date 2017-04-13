(function() {
    angular.module('app')
        .config(config);
    // $httpProvider.interceptors.push('httpInterceptor');
    // $urlRouterProvider.otherwise('/start');
    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'javascripts/controller/login-page/login-page.html',
            authenticate: false,
            controller: 'loginController',
            controllerAs: 'vm',
            resolve: {
                checkAutho: function(authenticationService) {
                    return authenticationService.checkUnAuthentication();
                }
            }
        });
    }
})();
