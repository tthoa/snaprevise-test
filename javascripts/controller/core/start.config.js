(function () {
    angular
        .module('app')
        .config(config)
        .factory('httpInterceptor', httpInterceptor);

    config.$inject = ['$httpProvider', '$urlRouterProvider', '$stateProvider'];
    /* @ngInject */
    function config($httpProvider, $urlRouterProvider, $stateProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
        $urlRouterProvider.otherwise('/start');
        $stateProvider.state('start', {
            url: '/start',
            templateUrl: 'javascripts/controller/core/start.html',
            authenticate: true,
            controller: 'CoreController',
            controllerAs: 'vm',
            resolve: {
                checkAuth: function (authenticationService) {
                    return authenticationService.checkAuthentication();
                }
            }
        });

    }

    httpInterceptor.$inject = ['$q', '$location', '$localStorage'];

    function httpInterceptor($q, $location, $localStorage) {

        return {
            request: function (_config) {
                console.log(_config);
                if (_config.url.indexOf('.html') === -1 && _config.url.indexOf('http') === -1) {
                    _config.url = 'http://localhost:5831' + _config.url;
                }
                return _config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401 || rejection.status === 403 || rejection.status === 404 || rejection.status === 419) {
                    // Xu ly loi trong nay
                    delete $localStorage.user;
                    $location.path('/login');
                    return $q.reject(rejection);
                } else {
                    return $q.reject(rejection);
                }
            }
        };
    }
})();