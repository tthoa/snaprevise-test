(function() {
    'use strict';

    angular
        .module('app')
        .factory('teacherService', teacherService);

    teacherService.$inject = ['$http', '$state', 'toastr', '$translate'];

    function teacherService($http, $state, toastr, $translate) {

        var service = {
            getListTeacher: getListTeacher,
            getTeacherListByClass: getTeacherListByClass,
            getTeacherListBySubject : getTeacherListBySubject,
            createTeacher: createTeacher,
            checkMail: checkMail,
            deleteTeacher: deleteTeacher,
            editTeacher: editTeacher,
            getListTeacherBySubject: getListTeacherBySubject,
            getTimeTable : getTimeTable
        };
        var toastrError = $translate.instant('Error');
        var toastrSuccess = $translate.instant('Success');
        return service;

        ////////////////////////////

        function getListTeacher(sort, page, amount) {
            function successCallBack(response) {
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Failed to get list teacher');
                toastr.error(toastrmessage, toastrError);
                return response;
            }
            return $http.get('api/Teacher/Get?sort=' + sort + '&page=' + page + '&amount=' + amount)
                .then(successCallBack, errorCallBack);
        }

        function getTeacherListByClass(classId) {
            function successCallBack(response) {
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Failed to get teacher list by subject');
                toastr.error(toastrmessage, toastrError);
                return response;
            }
            return $http.get('api/Teacher/GetTeacherByClass?classId=' + classId)
                .then(successCallBack, errorCallBack);
        }
        
        function getTeacherListBySubject(subjectId) {
            function successCallBack(response) {
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Failed to get teacher list by subject');
                toastr.error(toastrmessage, toastrError);
                return response;
            }
            return $http.get('api/Teacher/GetTeachersBySubject?subjectId=' + subjectId + '&isIn=false')
                .then(successCallBack, errorCallBack);
        }

        function createTeacher(teacher) {
            function successCallBack(response) {
                var toastrmessage = $translate.instant('Create teacher successfully');
                toastr.success(toastrmessage, toastrSuccess);
                $state.go('start.teacher-list');
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Failed to create a teacher');
                toastr.error(toastrmessage, toastrError);
            }
            return $http.post('api/Teacher/Create', teacher)
                .then(successCallBack, errorCallBack);
        }

        function editTeacher(teacher) {
            function successCallBack(response) {
                var toastrmessage = $translate.instant('Update teacher successfully');
                toastr.success(toastrmessage, toastrSuccess);
                $state.go('start.teacher-list', {}, { reload: true });
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Failed to update teacher');
                toastr.error(toastrmessage, toastrError);
            }
            return $http.put('api/Teacher/UpdateProfile', teacher)
                .then(successCallBack, errorCallBack);
        }

        function checkMail(email) {
            var regMail = /^[A-Za-z0-9]+([_\.\-]?[A-Za-z0-9])*@[A-Za-z0-9]+([\.\-]?[A-Za-z0-9]+)*(\.[A-Za-z]+)+$/;
            if (email !== undefined && email.match(regMail) !== null) {
                return true;
            }
            return false;
        }

        function deleteTeacher(teacherId) {
            function successCallBack(response) {
                var toastrmessage = $translate.instant('Delete teacher successfully');
                toastr.success(toastrmessage, toastrSuccess);
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Failed to delete teacher');
                toastr.error(toastrmessage, toastrError);
            }
            return $http.delete('api/Teacher/Delete/' + teacherId)
                .then(successCallBack, errorCallBack);
        }

        function getListTeacherBySubject(subjectId) {
            function successCallBack(response) {
                return response;
            }

            function errorCallBack(response) {
                toastr.error('Failed to get list teacher of subject', 'Error');
            }

            return $http.get('api/Teacher/GetTeachersBySubject?subjectId=' + subjectId).then(successCallBack, errorCallBack);
        }

        function getTimeTable(teacherId) {

            function successCallBack(response) {
                return response;
            }

            function errorCallBack() {
                var toastrmessage = $translate.instant('Failed to load list timetable');
                toastr.error(toastrmessage, toastrError);
            }

            return $http.get('api/Teacher/GetScheduleOfTeacher?teacherId=' + teacherId)
                .then(successCallBack, errorCallBack);
        }
    }
})();
