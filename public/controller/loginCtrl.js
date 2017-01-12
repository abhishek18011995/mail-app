angular.module('mailApp')
    .controller('loginCtrl', function($scope, $http, $location, Services, $localStorage) {

        $localStorage.getNavbar = false;
        $scope.loginContent = true;
        $scope.user = {};
        $scope.newUser = {};

        $scope.login = function() {

            if ($scope.user.email == null || $scope.user.password == null) {

                $scope.loginValidation = true;
            } else {

                $http.post('/login', $scope.user).then(function(response) {

                    if (response.data == "true") {

                        $scope.wrongCredentials = response.data;
                        $scope.user = {};
                    } else {

                        $scope.setNavbar = Services.setNavbar();
                        Services.setUserName(response.data);
                        console.log(response.data);
                        $location.path('/inbox');
                    }
                });
            }
        };

        $scope.signUp = function() {

            if ($scope.newUser.email == null || $scope.newUser.password == null || $scope.newUser.firstName == null || $scope.newUser.lastName == null) {

                $scope.signUpValidation = true;
            } else {
                
                $http.post('/signUp', $scope.newUser).then(function(response) {

                    $scope.newUser = {};
                    $scope.signUpValidation = false;
                    alert("Successfully Signed In");
                    $location.path('/');
                });

            }


        };
    });
