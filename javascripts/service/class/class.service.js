(function () {
    'use strict';

    /**
     * app Module
     *
     * Description
     */
    angular
        .module('app')
        .service('classService', classService);

    classService.$inject = ['$http', '$state', 'toastr', '$translate'];

    function classService($http, $state, toastr, $translate) {
        var service = {
            createClass: createClass,
            getListClass: getListClass,
            getListClassByTeacher: getListClassByTeacher,
            getListClassByCourseSubjectDate: getListClassByCourseSubjectDate,
            addNoteForStudent: addNoteForStudent,
            addNoteForTeacher: addNoteForTeacher,
            changeStudents: changeStudents,
            removeStudent: removeStudent,
            changeTeachers: changeTeachers,
            deleteClass: deleteClass,
            joinClass: joinClass,
            leaveClass: leaveClass,
            getListClassForTeacherSession: getListClassForTeacherSession,
            getListClassAndScheduleByTeacher: getListClassAndScheduleByTeacher,
            getListClassByStudent: getListClassByStudent,
            getListScheduleInClassByStudentNotConvert: getListScheduleInClassByStudentNotConvert
        };
        var toastrError = $translate.instant('Error');
        var toastrSuccess = $translate.instant('Success');
        return service;

        //////////////////////

        function convert_Class_Object(Class) {
            angular.forEach(Class.data.Data, function (element) {
                element.StartDate = element.StartDate.split('T')[0];
                element.EndDate = element.EndDate.split('T')[0];
                var temp = '<\p>';
                angular.forEach(element.Schedule, function (scheduelElement) {
                    temp += scheduelElement.DayOfWeek + ': <\span>' + scheduelElement.StartTime + ' - ' + scheduelElement.EndTime + '<\p>';
                });
                element.Subject = element.Subject.Name;
                element.Schedule = temp;
                if (element.Course !== null) {
                    element.Course = element.Course.Name;
                }
            });
            return Class;
        }

        function convertClassObject(Class) {
            angular.forEach(Class.data, function (element) {
                element.StartDate = element.StartDate.split('T')[0];
                element.EndDate = element.EndDate.split('T')[0];
                var temp = '<\p>';
                angular.forEach(element.Schedule, function (scheduelElement) {
                    temp += scheduelElement.DayOfWeek + ': <\span>' + scheduelElement.StartTime + ' - ' + scheduelElement.EndTime + '<\p>';
                });
                element.Subject = element.Subject.Name;
                element.Schedule = temp;
                if (element.Course !== null) {
                    element.Course = element.Course.Name;
                }
            });
            return Class;
        }

        function createClass(clas) {
            function successCallBack(response) {
                var toastrmessage = $translate.instant('Create class success');
                toastr.success(toastrmessage, toastrSuccess);
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Create class failed');
                toastr.error(toastrmessage, toastrError);
                return response;
            }
            return $http.post('api/Classes/Create', clas).then(successCallBack, errorCallBack);
        }

        function getListClass(sort, page, amount) {
            function successCallBack(response) {
                response = convert_Class_Object(response);
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Failed to get list class');
                toastr.error(toastrmessage, toastrError);
                return response;
            }
            return $http.get('api/Classes/Get?sort=' + sort + '&page=' + page + '&amount=' + amount).then(successCallBack, errorCallBack);
        }

        function getListClassByTeacher(sort, page, amount, isAvailable, teacherId) {
            function successCallBack(response) {
                response = convert_Class_Object(response);
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Failed to get list class');
                toastr.error(toastrmessage, toastrError);
                return response;
            }
            return $http.get('api/Classes/Get?sort=' + sort + '&page=' + page + '&amount=' + amount + '&isAvailable=' + isAvailable + '&teacherId=' + teacherId).then(successCallBack, errorCallBack);
        }

        function getListClassByStudent(studentId) {
            function successCallBack(response) {
                response = convertClassObject(response);
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Failed to get list class');
                toastr.error(toastrmessage, toastrError);
                return response;
            }
            return $http.get('api/Classes/GetByStudent?studentId=' + studentId).then(successCallBack, errorCallBack);
        }

        function getListScheduleInClassByStudentNotConvert(studentId) {
            function successCallBack(response) {
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Failed to get list class');
                toastr.error(toastrmessage, toastrError);
                return response;
            }
            return $http.get('api/Classes/GetByStudent?studentId=' + studentId).then(successCallBack, errorCallBack);
        }

        function getListClassAndScheduleByTeacher(sort, page, amount, isAvailable, teacherId) {
            function successCallBack(response) {
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Failed to get list class');
                toastr.error(toastrmessage, toastrError);
                return response;
            }
            return $http.get('api/Classes/Get?sort=' + sort + '&page=' + page + '&amount=' + amount + '&isAvailable=' + isAvailable + '&teacherId=' + teacherId).then(successCallBack, errorCallBack);
        }

        function getListClassByCourseSubjectDate(sort, page, amount, subjectId, courseId) {
            function successCallBack(response) {
                response = convert_Class_Object(response);
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Failed to get list class of course');
                toastr.error(toastrmessage, toastrError);
                return response;
            }

            return $http.get('api/Classes/GetBySubject?sort=' + sort + '&page=' + page + '&amount=' + amount + '&subjectId=' + subjectId + '&courseId=' + courseId)
                .then(successCallBack, errorCallBack);
        }

        function addNoteForStudent(noteStudent) {
            function successCallBack(response) {
                var toastrmessage = $translate.instant('Add note for student successfully');
                toastr.success(toastrmessage, toastrSuccess);
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Failed to add note for student');
                toastr.error(toastrmessage, toastrError);
                return response;
            }

            return $http.post('api/Classes/AddNoteForStudent', noteStudent).then(successCallBack, errorCallBack);
        }

        function addNoteForTeacher(noteTeacher) {
            function successCallBack(response) {
                var toastrmessage = $translate.instant('Add note for teacher successfully');
                toastr.success(toastrmessage, toastrSuccess);
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Failed to add note for teacher');
                toastr.error(toastrmessage, toastrError);
                return response;
            }

            return $http.post('api/Classes/AddNoteForTeacher', noteTeacher).then(successCallBack, errorCallBack);
        }

        function changeStudents(object) {
            function successCallBack(response) {
                var toastrmessage = $translate.instant('Change students in class successfully');
                toastr.success(toastrmessage, toastrSuccess);
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Failed to change students in class');
                toastr.error(toastrmessage, toastrError);
                return response;
            }

            return $http.put('api/Classes/ChangeStudent', object).then(successCallBack, errorCallBack);
        }

        function removeStudent(object) {
            function successCallBack(response) {
                var toastrmessage = $translate.instant('Remove students in class successfully');
                toastr.success(toastrmessage, toastrSuccess);
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Remove to change students in class');
                toastr.error(toastrmessage, toastrError);
                return response;
            }

            return $http.put('api/Classes/RemoveStudents', object).then(successCallBack, errorCallBack);
        }

        function changeTeachers(object) {
            function successCallBack(response) {
                var toastrmessage = $translate.instant('Change teachers in class successfully');
                toastr.success(toastrmessage, toastrSuccess);
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Failed to change teachers in class');
                toastr.error(toastrmessage, toastrError);
                return response;
            }

            return $http.put('api/Classes/ChangeTeacher', object).then(successCallBack, errorCallBack);
        }

        function deleteClass(classId) {
            function successCallBack(response) {
                var toastrmessage = $translate.instant('Delete class successfully');
                toastr.success(toastrmessage, toastrSuccess);
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Failed to delete a class');
                toastr.error(toastrmessage, toastrError);
                return response;
            }

            return $http.delete('api/Classes/Delete?id=' + classId).then(successCallBack, errorCallBack);
        }

        function joinClass(recordObject) {
            function successCallBack(response) {
                var toastrmessage = $translate.instant('Join class successfully');
                toastr.success(toastrmessage, toastrSuccess);
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Can not join to this class');
                toastr.error(toastrmessage, toastrError);
                return response;
            }

            return $http.put('api/Classes/Join?classId=' + recordObject.Id).then(successCallBack, errorCallBack);
        }

        function leaveClass(recordObject) {
            function successCallBack(response) {
                var toastrmessage = $translate.instant('leave class successfully');
                toastr.success(toastrmessage, toastrSuccess);
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Can not leave to this class');
                toastr.error(toastrmessage, toastrError);
                return response;
            }

            return $http.put('api/Classes/Leave?classId=' + recordObject.Id).then(successCallBack, errorCallBack);
        }

        function getListClassForTeacherSession(sort, page, amount, date, teacherId) {
            function successCallBack(response) {
                response = convert_Class_Object(response);
                return response;
            }

            function errorCallBack(response) {
                var toastrmessage = $translate.instant('Failed to get list class');
                toastr.error(toastrmessage, toastrError);
                return response;
            }
            return $http.get('api/Classes/Get?sort=' + sort + '&page=' + page + '&amount=' + amount + '&Date=' + date + '&teacherId=' + teacherId).then(successCallBack, errorCallBack);
        }
    }
})();
