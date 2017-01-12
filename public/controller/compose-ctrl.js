mailApp.controller('composeCtrl', function($scope, $http, $location, Services) {

    // $scope.composeEmailValidation =false;
    $scope.sendNewMail = function() {

        // console.log($scope.newMail);
        $http.post('/composeMailValidation', $scope.newMail).then(function(response) {
            console.log(response);
            if (response.data == true) {

                $scope.composeEmailValidation = true;
                console.log("wrong");
            } else {

                console.log("coorect");
                $http.post('/compose', $scope.newMail).then(function(response) {

                    $location.path('/inbox');
                });
            }

       
        });



    };

});
