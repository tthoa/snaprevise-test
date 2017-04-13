(function() {
    'use strict';

    angular
        .module('app')
        .directive('menuCollapsed', menuDirective);

    function menuDirective() {
        // Usage: ...
        var directive = {
            restrict: 'A',
            scope: {
                sidemenuCollapsed: '=',
                searchCollapsed: '='
            },
            controller: menuController,
            controllerAs: 'vm'
        };
        return directive;
    }

    menuController.$inject = ['$scope'];

    function menuController($scope) {
        $scope.$watch('sidemenuCollapsed', function(value) {

            if (value) {
                angular.element('.logo').addClass('logo-collapsed');
                angular.element('.div-sidemenu').addClass('div-sidemenu-collapsed');
                angular.element('.div-project-title').addClass('div-project-title-collapsed');
                angular.element('.project-title').addClass('project-title-collapsed');
                angular.element('.sidemenu').addClass('sidemenu-collapsed');
                angular.element('.menu-title').css('display', 'none');
            } else {
                angular.element('.logo-collapsed').removeClass('logo-collapsed');
                angular.element('.div-sidemenu-collapsed').removeClass('div-sidemenu-collapsed');
                angular.element('.div-project-title-collapsed').removeClass('div-project-title-collapsed');
                angular.element('.project-title-collapsed').removeClass('project-title-collapsed');
                angular.element('.sidemenu-collapsed').removeClass('sidemenu-collapsed');
                angular.element('.menu-title').css('display', 'inline-block');
            }
        });

        $scope.$watch('searchCollapsed', function(value) {
            
            if (value) {
                angular.element('.div-input-search').css('background-color', 'rgba(255,255,255,0.15)');
                angular.element('.input-search').css('display', 'inline-block');
            } else {
                angular.element('.div-input-search').css('background-color', 'transparent');
                angular.element('.input-search').css('display', 'none');

            }
        });
    }
})();
