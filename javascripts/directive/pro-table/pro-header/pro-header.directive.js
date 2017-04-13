(function () {
    'use strict';
    angular
        .module('app')
        .directive('proHeader', proHeaderDirective);
    function proHeaderDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'javascripts/directive/pro-table/pro-header/pro-header.html',
            scope: {
                proHeader: '='
            },
            controller: proHeaderController,
            controllerAs: 'vm'
        };
        return directive;
    }
    proHeaderController.$inject = ['$scope'];

    function proHeaderController($scope) {
        var vm = this;
        var option = $scope.proHeader;
        vm.ascentFlag = [];
        vm.checkSortType = checkSortType;
        vm.sortAction = option.sorting;
        vm.titleList = option.titleList;
        vm.actionHeader = option.action;
        init();

        function init() {
            $scope.$watch('proHeader', function (value) {
                option = value;
            });

            // init 
            angular.forEach(vm.titleList, function () {
                vm.ascentFlag.push(true);
            });
        }
        function checkSortType(title, type) {

            angular.forEach(vm.titleList, function (element, index) {
                if (title === element) {
                    vm.ascentFlag[index] = !vm.ascentFlag[index];
                }
            });

            if (type === 'ASC') {
                vm.sortAction(title, '');
            } else {
                vm.sortAction(title, '_DESC');
            }

        }
    }
})();
