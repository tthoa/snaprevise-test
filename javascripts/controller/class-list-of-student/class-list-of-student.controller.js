(function () {
    angular
        .module('app')
        .controller('ClassListOfStudentController', ClassListOfStudentController);


    ClassListOfStudentController.$inject = ['$stateParams', '$scope',
        '$state', '$localStorage'];

    function ClassListOfStudentController($stateParams, $scope,
        $state, $localStorage) {
        var vm = this;
        $scope.roomName = '';
        $scope.joinedRoom = false;
        $scope.message = 'watching the room';
        $scope.username = $localStorage.user.username;
        $scope.videoList = [];
        vm.messages = [];
        $scope.joinRoom = joinRoom;
        $scope.leaveRoom = leaveRoom;
        $scope.sendMessage = sendMessage;

       function joinRoom() {
            $scope.$broadcast('joinRoom');
        }
        function leaveRoom() {
            $scope.$broadcast('leaveRoom');
        }

        // print broadcasted messages?
        function sendMessage() {
            $scope.$broadcast('messageAll', $scope.message);
        }

        $scope.$on('channelMessage', function (event, peer, message) {
            console.log('message', message);
            vm.messages.push(message);
        });
    }
})();
