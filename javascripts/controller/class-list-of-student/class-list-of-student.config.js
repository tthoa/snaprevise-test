(function () {
    angular
        .module('app')
        .config(config);
    config.$inject = ['$stateProvider'];
    /* @ngInject */
    function config($stateProvider) {
        $stateProvider.state('start.class-list-of-student', {
            url: '/class-list-of-student',
            templateUrl: 'javascripts/controller/class-list-of-student/class-list-of-student.html',
            authenticate: true,
            controller: 'ClassListOfStudentController',
            controllerAs: 'vm'
        });
    }
})();
