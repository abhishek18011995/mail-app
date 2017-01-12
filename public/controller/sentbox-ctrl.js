mailApp.controller('sentboxCtrl', function($scope, $http, $location, Services) {

    console.log("sentbox");

        $http.get('/sentbox').then(function(response) {

        // console.log(response.data);
        $scope.sentbox = response.data.sentbox.reverse();

        $scope.sentboxCall = function(index) {

            $scope.sentboxMsg = $scope.sentbox[index];
//             // console.log($scope.inboxMsg);
        }

    });
});
