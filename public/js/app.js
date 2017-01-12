var mailApp = angular.module('mailApp', ["ngRoute", 'ngStorage']);

mailApp.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            controller: "loginCtrl",
            templateUrl: "partials/login.html"
        })
        .when("/inbox", {
            controller: "inboxCtrl",
            templateUrl: "partials/inbox.html"
        })
        .when("/sentbox", {
            controller: "sentboxCtrl",
            templateUrl: "partials/sentbox.html"
        })
        .when("/compose", {
            controller: "composeCtrl",
            templateUrl: "partials/compose.html"
        });

});



mailApp.controller('mainCtrl', function($scope, $http, $location, Services,$localStorage) {

    $scope.$watch(function() {
        return Services.getNavbar();
    }, function(value) {
        $scope.getNavbar = value;
    });

 $scope.$watch(function() {
        return Services.getUserName();
    }, function(value) {
        $scope.userName = value;
    });

    $scope.isActive=function(pathName){

        return pathName==$location.path();
    };

    $scope.logout=function(){

        window.localStorage.clear();
        $location.path('/');
    };

});



mailApp.factory('Services', function($route, $http, $localStorage) {

    function setNavbar() {
        $localStorage.getNavbar = true;
    }

    function getNavbar() {
        return $localStorage.getNavbar;
    }

    function setUserName(name) {
        $localStorage.userName = name;
    }

    function getUserName() {
        return $localStorage.userName;
    }

    return {

        setNavbar: setNavbar,
        getNavbar: getNavbar,
        setUserName:setUserName,
        getUserName:getUserName

    }
});
