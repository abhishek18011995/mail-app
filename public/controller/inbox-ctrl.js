mailApp.controller('inboxCtrl', function($scope, $http, $location, Services) {

    
    $scope.inboxFrom = [];
    $scope.inboxMsg = {};

    $http.get('/inbox').then(function(response) {

        console.log(response.data.inbox);
        $scope.inbox = response.data.inbox.reverse();

        $scope.inboxCall = function(index) {

            $scope.inboxMsg = $scope.inbox[index];
            // console.log($scope.inboxMsg);
        }

    });
});
