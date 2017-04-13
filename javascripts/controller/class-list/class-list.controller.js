(function () {
    angular
        .module('app')
        .controller('ListClassController', ListClassController);


    ListClassController.$inject = ['$scope', '$translate', 'classService',
        '$state', '$localStorage', 'dataListClass', 'popupService'];

    function ListClassController($scope, $translate, classService,
        $state, $localStorage, dataListClass, popupService) {
        var vm = this;
        vm.titleList = ['Name', 'StartDate', 'EndDate', 'Schedule', 'Subject', 'Course'];
        vm.actionHeader = true;
        vm.contentBody = dataListClass.Data;
        vm.sorting = sorting;
        vm.sort = dataListClass.Sort;
        vm.paging = paging;
        vm.totalPage = dataListClass.TotalPage;
        vm.amountRecordArray = [10, 20, 30, 40];
        vm.amountRecord = 10;
        vm.amount = dataListClass.Amount;
        vm.page = dataListClass.Page;

        vm.deleteClass = deleteClass;
        vm.actionForRow = actionForRow;

        // btn new class 
        vm.role = $localStorage.role;

        vm.option = {
            header: {
                titleList: vm.titleList,
                action: vm.actionHeader,
                sorting: vm.sorting,
                sortField: vm.sort
            },
            body: {
                contentList: vm.contentBody,
                titleList: vm.titleList,
                sorting: vm.sorting,
                actionList: [
                    {
                        color: 'btn btn-success fa fa-trash-o',
                        title: 'Delete',
                        action: vm.deleteClass
                    }
                ],
                actionForRow: vm.actionForRow
                // actionList: []
            },
            pagination: {
                sort: vm.sort,
                page: vm.page,
                amount: vm.amount,
                totalPage: vm.totalPage,
                amountRecordArray: vm.amountRecordArray,
                paging: vm.paging
            },
            message: 'No class is exsist'
        };

        init();

        function init() {
            getListClass(vm.option.header.sort, vm.option.pagination.page, vm.option.pagination.amount);
        }

        function sorting(field, _type) {
            vm.option.header.sort = field + _type;
            getListClass(vm.option.header.sort, vm.option.pagination.page, vm.option.pagination.amount);
        }

        function paging(field, page, amount) {
            getListClass(field, page, amount);

        }

        function getListClass(field, page, amount) {
            function successCallback(response) {
                if (response.status === 200) {
                    vm.option.body.contentList = response.data.Data;
                    vm.totalPage = response.data.TotalPage;
                    vm.page = response.data.Page;
                    // console.log(vm.totalPage);
                    vm.option.pagination.totalPage = vm.totalPage;
                    vm.option.pagination.page = vm.page;
                }

            }
            function errorCallback(error) {
                console.log(error);
            }

            classService.getListClass(field, page, amount).then(successCallback, errorCallback);
        }

        function deleteClass(object) {
            popupService.popup.reasonBox = false;
            popupService.popup.tagInput = false;
            popupService.popup.tagInputLabel = $translate.instant('Teachers');
            popupService.popup.tagInputPlaceHolder = $translate.instant('Add a teacher');
            popupService.popup.bodyTitle = $translate.instant('Information of Subject');
            popupService.popup.bodyContent = object;
            popupService.showPopup();
            popupService.popup.nameBtnOK = 'Ok';
            popupService.popup.funcBtnOK = function () {
                classService.deleteClass(object.Id).then(successCallback, errorCallback);
                function successCallback(response) {
                    if (response.status === 200) {
                        getListClass(vm.option.header.sort, vm.option.pagination.page, vm.option.pagination.amount);
                    }
                }

                function errorCallback() {
                    getListClass(vm.option.header.sort, vm.option.pagination.page, vm.option.pagination.amount);
                }
                popupService.closePopup();
            };
        }

        function actionForRow(object) {
            $state.go('start.student-list-in-class', { Id: object.Id });
        }
    }
})();
