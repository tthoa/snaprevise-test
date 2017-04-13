(function() {
    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider'];
    / @ngInject /;
    function config($stateProvider) {
        $stateProvider.state('start.broadcast-class', {
            url: '/broadcast-class',
            templateUrl: 'javascripts/controller/broadcast-class/broadcast-class.html',
            controller: 'broadcastClassController',
            controllerAs: 'vm'
        });
    }
})();
