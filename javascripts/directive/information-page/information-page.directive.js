(function () {
    'use strict';

    angular
        .module('app')
        .directive('ttInforpage', inforPageDirective);

    function inforPageDirective() {
        var directive = {
            restrict: 'AE',

            templateUrl: 'javascripts/directive/information-page/information-page.html',
            scope: {
                title: '=',
                disabledButton: '=',
                infors: '=',
                typeInfor: '=',
                nameInfor: '=',
                requiredInfors: '=',
                readonlyInfors: '=',
                actionSave: '&',
                actionDelete: '=',
                actionCancle: '=',
                actionSend: '='
            },

            link: link,
            controller: inforPageController,
            controllerAs: 'vm'
        };

        function link() { }
        return directive;

    }
    inforPageController.$inject = ['$scope'];

    function inforPageController($scope) {
        var vm = this;
        vm.title = '';
        vm.disabledButton = [];
        vm.inforArray = [];
        vm.requiredInfors = [];
        vm.readonlyInfors = [];
        vm.typeArray = [];
        vm.nameArray = [];
        vm.infors = [];
        vm.actionDisabled = actionDisabled;

        init();

        function init() {
            $scope.$watch('title', function (value) {
                if (value) {
                    vm.title = value;
                }
            });

            $scope.$watch('disabledButton', function (value) {
                if (value) {
                    vm.disabledButton = value;
                }
            });

            $scope.$watch('infors', function (value) {
                if (value) {
                    vm.infors = value;
                }
            });

            $scope.$watch('typeInfor', function (value) {
                if (value) {
                    vm.typeArray = value;
                }
            });

            $scope.$watch('nameInfor', function (value) {
                if (value) {
                    vm.nameArray = value;
                }
            });

            $scope.$watch('requiredInfors', function (value) {
                if (value) {
                    vm.requiredInfors = value;
                }
            });
            $scope.$watch('readonlyInfors', function (value) {

                if (value) {
                    vm.readonlyInfors = value;
                }
            });

            $scope.$watch('actionSave', function (value) {
                if (value) {
                    vm.actionSave = value;
                }
            });

            $scope.$watch('actionDelete', function (value) {
                if (value) {
                    vm.actionDelete = $scope.actionDelete;
                }
            });
            $scope.$watch('actionCancel', function (value) {
                if (value) {
                    vm.actionCancel = $scope.actionSave;
                }
            });
            $scope.$watch('actionSend', function (value) {
                if (value) {
                    vm.actionSend = $scope.actionSend;
                }
            });
        }

        function actionDisabled() {
            var disable = true;
            for (var i = 0; i < vm.infors.length; i++) {
                if (vm.infors[i] === null) {
                    disable = false;
                }
            }
            return disable;
        }
    }
})();
