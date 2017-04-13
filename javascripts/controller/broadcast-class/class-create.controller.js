(function () {
    angular
        .module('app')
        .controller('broadcastClassController', broadcastClassController);

    broadcastClassController.$inject = ['$http', '$state', '$scope', '$localStorage'];

    function broadcastClassController($http, $state, $scope, $localStorage) {
        var vm = this;
        $scope.hasStream = false;
        $scope.roomName = '';
        $scope.isBroadcasting = '';
        $scope.minWidth = 1280;
        $scope.message = '';
        vm.messages = [];
        $scope.prepare = prepare;
        $scope.start = start;
        $scope.sendMessage = sendMessage;

        if (window.MediaStreamTrack) {
            MediaStreamTrack.getSources(function (sources) {
                var videoSources = sources.filter(function (source) {
                    return source.kind === 'video';
                });
                console.log('got video sources', videoSources);
            });
        }

        function prepare() {
            $scope.$broadcast('prepare');
        }
        function start() {
            $scope.$broadcast('start');
        }
        function sendMessage() {
            $scope.$broadcast('messageAll', $scope.message);
        }

        $scope.$on('channelMessage', function (event, peer, message) {
            console.log(message);
            vm.messages.push(message);
        });
    }
})();
