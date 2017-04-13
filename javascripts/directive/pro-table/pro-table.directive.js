(function () {
    'use strict';
    angular
        .module('app')
        .directive('proTable', proTableDirective);
    function proTableDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'javascripts/directive/pro-table/pro-table.html',
            scope: {
                proTable: '='
            },
            controller: proTableController,
            controllerAs: 'vm'
        };
        return directive;
    }
    proTableController.$inject = ['$scope'];

    function proTableController($scope) {
        var vm = this;
        vm.option = $scope.proTable;
        init();

        function init() {
            $scope.$watch('proTable', function (value) {
                vm.option = value;
                vm.option.header = value.header;
                vm.option.body = value.body;
                vm.pagination = value.pagination;
            }, true);
        }
    }

})();
