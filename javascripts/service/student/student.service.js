(function () {
    'use strict';

    /**
     * app Module
     *
     * Description
     */
    angular
        .module('app')
        .service('studentService', studentService);

    studentService.$inject = ['$http', '$state', 'toastr', '$translate'];

    function studentService($http, $state, toastr, $translate) {
        var service = {
            getListStudent: getListStudent,
            createStudent: createStudent,
            getStudentsOfClass: getStudentsOfClass,
            getStudentsNotInClass: getStudentsNotInClass,
            deleteStudent: deleteStudent,
            getListStudentWithNoteByClass: getListStudentWithNoteByClass,
            getTimeTable : getTimeTable
        };
        var toastrError = $translate.instant('Error');
        var toastrSuccess = $translate.instant('Success');

        return service;

        function getListStudent(sort, page, amount) {
            function successCallBack(response) {
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Get list student failed');
                toastr.error(toastrmessage, toastrError);
                return response;
            }
            return $http.get('api/Students/Get?sort=' + sort + '&page=' + page + '&amount=' + amount)
                .then(successCallBack, errorCallBack);
        }

        function createStudent(student) {
            function successCallBack(response) {
                var toastrmessage = $translate.instant('Create Student Successfully');
                toastr.success(toastrmessage, toastrSuccess);
                return response;
            }

            function errorCallBack(response) {
                return response;
            }
            return $http.post('api/Students/Create', student)
                .then(successCallBack, errorCallBack);
        }

        function getStudentsOfClass(classId, sort, page, amount) {
            function successCallBack(response) {
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Get list student failed');
                toastr.error(toastrmessage, toastrError);
                return response;
            }
            return $http.get('api/Students/GetStudentsByClass?classId=' + classId + '&sort=' + sort + '&page=' + page + '&amount=' + amount)
                .then(successCallBack, errorCallBack);
        }

        function getStudentsNotInClass(sort, page, amount, classId) {

            function successCallBack(response) {
                if (response.data.Data.length !== 0) {
                    return response;
                }
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Get list student failed');
                toastr.error(toastrmessage, toastrError);
                return response;
            }

            return $http.get('api/Students/GetStudentsByClass?classId=' + classId + '&sort=' + sort + '&page=' + page + '&amount=' + amount + '&isIn=false')
                .then(successCallBack, errorCallBack);
        }

        function deleteStudent(studentId) {
            function successCallBack(response) {
                return response;
            }

            function errorCallBack(response) {
                return response;
            }

            return $http.delete('api/Students/Delete?id=' + studentId)
                .then(successCallBack, errorCallBack);
        }

        function getListStudentWithNoteByClass(classId, sort, page, amount) {
            function successCallBack(response) {
                return response;
            }

            function errorCallBack() {
                var toastrmessage = $translate.instant('Failed to load list student with note by class');
                toastr.error(toastrmessage, toastrError);
            }

            return $http.get('api/Students/GetStudentsByClassWithNote?classId=' + classId + '&sort=' + sort + '&page=' + page + '&amount=' + amount)
                .then(successCallBack, errorCallBack);
        }

        function getTimeTable(studentId) {

            function successCallBack(response) {
                return response;
            }

            function errorCallBack() {
                var toastrmessage = $translate.instant('Failed to load list timetable');
                toastr.error(toastrmessage, toastrError);
            }

            return $http.get('api/Students/GetScheduleOfStudent?studentId=' + studentId)
                .then(successCallBack, errorCallBack);
        }
    }
})();
