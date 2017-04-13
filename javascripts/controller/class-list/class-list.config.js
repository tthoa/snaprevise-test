(function () {
    angular
        .module('app')
        .config(config);
    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider.state('start.class-list', {
            url: '/class-list',
            templateUrl: 'javascripts/controller/class-list/class-list.html',
            authenticate: true,
            controller: 'ListClassController',
            controllerAs: 'vm',
            resolve: {
                checkRole: function (userRoleService) {
                    userRoleService.checkIsStudent();
                },
                dataListClass: function (classService) {
                    return classService.getListClass().then(function (resp) {
                        return resp.data;
                    });
                }
            }
        });
    }
})();
