(function () {
    'use strict';

    angular
        .module('app')
        .directive('ttTable', tableDirective);

    function tableDirective() {
        // Usage: ...
        var directive = {
            restrict: 'AE',
            templateUrl: 'javascripts/directive/table/table.html',
            scope: {
                tableHeader: '=',
                tableBody: '=',
                amountRecord: '=',
                totalPages: '=',
                currentPage: '=',
                sortedColumnName: '=',
                ascendSort: '=', // if(true) -> ascend sort ; if(false) --> descend sort
                actionEdit: '=',
                actionDelete: '=',
                actionSort: '=',
                actionAdd: '=',
                customEditName: '=',
                customDeleteName: '=',
                customActionColumnName: '=',
                customAddName: '=',
                actionPageButton: '=',
                amountRecordArray: '=',
                actionForRowTable: '=',
                tableTitle: '=',
                leftPageFunction: '=',
                rightPageFunction: '=',
                showCheckBox: '=',
                idArray: '=',
                messageEmpty: '='
            },
            link: link,
            controller: tableController,
            controllerAs: 'vm'
        };
        return directive;

        ////////////////////////////

        function link() {

        }


    }

    tableController.$inject = ['$scope'];

    function tableController($scope) {
        var vm = this;
        vm.body = [];
        vm.header = [];
        vm.actionForRowTable = [];
        vm.tableTitle = '';
        // variables for amount <select> tag
        vm.amountRecord = '';
        vm.amountRecordArray = [10, 20, 30, 40, 50];

        // variables for pagination
        vm.currentPage = '';
        vm.totalPages = '';
        vm.pagination = [];
        vm.activeItem = [];
        vm.actionPageButton = [];
        vm.leftPageFunction = '';
        vm.rightPageFunction = '';
        vm.inputPageChange = inputPageChange;



        vm.customActionColumnName = 'Action';
        // variables for action edit
        vm.actionEdit = [];
        vm.customEditName = 'Edit';
        //variables for action add
        vm.actionAdd = [];
        vm.customAddName = 'Add';
        // variables action delete
        vm.actionDelete = [];
        vm.customDeleteName = 'Delete';

        // variables for sorting
        vm.activeSortSymbol = [];
        vm.ascendSort = '';
        vm.sortedColumnName = '';
        vm.actionSort = [];
        vm.activeSortedColumn = [];

        vm.messageEmpty = '';
        // vm.showCheckBox = true;
        vm.checkBoxValues = [];
        vm.checkBoxAll = false;
        vm.idArray = [];
        vm.setOtherCheckBox = true;
        /////////////////////////////////////////////

        init();

        function init() {
            scopeForTableData();
            scopeForPagination();
            scopeForSorting();
            scopeForAmountRecordsSelector();
            scopeForActionColumn();
            scopeForCheckBox();


        }

        function scopeForCheckBox() {

            vm.checkBoxValues = [];
            $scope.$watch('vm.checkBoxValues.length', function () {
                for (var i = 0; i < vm.checkBoxValues.length; i++) {
                    $scope.$watch('vm.checkBoxValues[' + i + ']', function () {
                        $scope.$emit('checkBoxValuesChange', {
                            checkBoxValues: vm.checkBoxValues
                        });
                    });
                }
            });
            vm.clickCheckBoxAll = function () {
                generateCheckBoxValues(vm.checkBoxAll);
            };

            $scope.$watch('showCheckBox', function (value) {
                vm.showCheckBox = value;
            });

            $scope.$on('updateCheckBox', function (event, args) {
                setCheckBoxValues(args.value, args.index);

            });
            $scope.$on('resetCheckBox', function () {
                vm.checkBoxAll = false;
                generateCheckBoxValues(false);
            });
            $scope.$watchCollection('vm.checkBoxValues', function () {

                if (vm.checkBoxAll !== undefined && vm.checkBoxAll === true) {
                    var index = vm.checkBoxValues.indexOf(false);
                    if (index > -1) {
                        vm.checkBoxAll = false;
                    }
                } else if (vm.checkBoxAll !== undefined && vm.checkBoxAll === false) {
                    var index = vm.checkBoxValues.indexOf(false);
                    if (index === -1) {
                        vm.checkBoxAll = true;
                    }
                }
                if (vm.body.length === 0) {
                    vm.checkBoxAll = false;
                }


            });
            function generateCheckBoxValues(value) {
                for (var i = 0; i < vm.checkBoxValues.length; i++) {
                    vm.checkBoxValues[i] = value;
                }

            }
            function setCheckBoxValues(value, index) {
                vm.checkBoxValues[index] = value;

            }

        }




        function scopeForPagination() {
            // pagination
            $scope.$watch('currentPage', function (value) {
                if (value !== undefined) {
                    vm.currentPage = value;
                }
            });
            $scope.$watch('vm.currentPage', function (value) {
                vm.currentPage = value;
                vm.activeItem = [];
                vm.activeItem[value] = 'active';
                vm.inputPage = vm.currentPage + 1;
            });

            $scope.$watch('actionPageButton', function (value) {
                if (value) {
                    vm.actionPageButton = value;
                }
            });
            $scope.$watch('leftPageFunction', function (params) {
                if (params !== undefined) {
                    vm.leftPageFunction = params;
                }
            });
            $scope.$watch('rightPageFunction', function (params) {
                if (params !== undefined) {
                    vm.rightPageFunction = params;
                }
            });



        }

        function scopeForAmountRecordsSelector() {
            $scope.$watch('amountRecord', function (value) {
                if (value) {
                    vm.amountRecord = value;

                }
            });
            $scope.$watch('vm.amountRecord', function (value) {
                if (value) {
                    $scope.$emit('amountRecordChange', {
                        amountRecord: value
                    });
                }
            });
            $scope.$watch('amountRecordArray', function (value) {
                if (value) {
                    vm.amountRecordArray = value;
                }
            });
        }

        function scopeForSorting() {
            // sort
            $scope.$watch('ascendSort', function (value) {

                if (value !== undefined) {
                    vm.ascendSort = value;

                }
            });
            $scope.$watch('vm.ascendSort', function (value) {
                if (value !== undefined) {
                    $scope.$emit('ascendSortChange', {
                        ascendSort: value
                    });
                }
            });
            $scope.$watch('actionSort', function (value) {
                if (value) {
                    vm.actionSort = value;
                }
            });
            $scope.$watch('sortedColumnName', function (value) {
                if (value) {
                    vm.sortedColumnName = value;
                }
            });
            $scope.$watch('vm.sortedColumnName', function (value) {
                if (value) {
                    if (vm.sortedColumnName !== undefined && vm.header !== undefined) {
                        vm.header.forEach(function (item, index) {
                            if (item === vm.sortedColumnName) {
                                setSortSymbol(index);
                                setActiveSortedColumn(index);
                            }
                        });
                    }
                }
            });

        }

        function scopeForTableData() {

            $scope.$watch('tableHeader', function (value) {
                vm.header = value;
            });
            $scope.$watch('tableBody', function (value) {

                if (value) {
                    vm.body = convertObjectToArray(value);
                    vm.checkBoxValues.length = vm.body.length;
                }
            });
            $scope.$watch('totalPages', function (value) {
                if (value) {
                    vm.totalPages = value;
                }
            });
            $scope.$watch('vm.totalPages', function (value) {
                if (value) {
                    vm.pagination = [];
                    vm.totalPages = value;
                    if (vm.totalPages > 1) {
                        for (var i = 0; i < vm.totalPages; i++) {
                            vm.pagination.push(i + 1);
                        }
                    }

                }
            });

            $scope.$watch('vm.header', function (value) {
                if (value !== undefined) {
                    vm.header = value;
                }

                if (vm.sortedColumnName !== undefined && vm.header !== undefined) {
                    value.forEach(function (item, index) {
                        if (item === vm.sortedColumnName) {
                            setSortSymbol(index);
                            setActiveSortedColumn(index);
                        }
                    });
                }

            });
            $scope.$watch('actionForRowTable', function (value) {
                if (value !== undefined) {
                    vm.actionForRowTable = value;
                    if (value.length === 0) {
                        vm.canClick = 'can-not-click';
                    } else {
                        vm.canClick = 'can-click';
                    }
                }


            });
            $scope.$watch('tableTitle', function (value) {
                if (value !== undefined) {
                    vm.tableTitle = value;
                }
            });

            $scope.$watch('messageEmpty', function (value) {
                if (value !== undefined) {
                    vm.messageEmpty = value;
                }
            });
        }

        function scopeForActionColumn() {
            // action ADD button
            $scope.$watch('actionAdd', function (value) {
                if (value) {
                    vm.actionAdd = value;
                }
            });
            $scope.$watch('customAddName', function (value) {
                if (value) {
                    vm.customAddName = value;
                }
            });
            // action EDIT button
            $scope.$watch('actionEdit', function (value) {
                if (value) {
                    vm.actionEdit = value;
                }
            });
            $scope.$watch('customEditName', function (value) {
                if (value) {
                    vm.customEditName = value;
                }
            });
            // action DELETE button
            $scope.$watch('actionDelete', function (value) {
                if (value) {
                    vm.actionDelete = value;
                }
            });

            $scope.$watch('customDeleteName', function (value) {
                if (value) {
                    vm.customDeleteName = value;
                }
            });
            $scope.$watch('customActionColumnName', function (value) {
                if (value) {
                    // vm.customActionColumnName = "{{'Table." + value + "'|translate}}";
                    vm.customActionColumnName = value;
                }
            });

        }

        function setSortSymbol(index) {
            vm.activeSortSymbol = [];
            vm.activeSortSymbol[index] = true;
        }

        function convertObjectToArray(obj) {
            var convertArray = [];
            for (var i = 0; i < obj.length; i++) {
                var j = 0;
                convertArray[i] = [];
                Object.getOwnPropertyNames(obj[i]).forEach(function (val) {
                    convertArray[i][j] = obj[i][val];
                    j++;
                });
            }
            return convertArray;
        }
        function setActiveSortedColumn(index) {
            vm.activeSortedColumn = [];
            vm.activeSortedColumn[index] = 'active-sorted-column';
        }
        function inputPageChange() {
            if (vm.inputPage - 1 >= 0 && vm.inputPage - 1 < vm.totalPages) {
                vm.currentPage = vm.inputPage - 1;
                $scope.$emit('currentPageChange', {
                    currentPage: vm.currentPage
                });
            }

        }


    }



})();
