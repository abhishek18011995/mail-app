var app = angular.module("myApp", ["ngRoute", 'angularUtils.directives.dirPagination', 'ngStorage']);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            controller: "loginCtrl",
            templateUrl: "partials/login.html"
        })
        .when("/customers/cardView", {
            resolve: {
                "check": function($location, $localStorage) {
                    // if (window.localStorage['session'] == false){ //check condition if its logged in
                    if (!$localStorage.session) {
                        console.log("route");
                        $location.path("/");
                    } //redirect user to home.
                }
            },
            controller: "customerCtrl",
            templateUrl: "partials/customer.html"
        })
        .when("/customers/listView", {
            resolve: {
                "check": function($location, $localStorage) {
                    if (!$localStorage.session) {
                        console.log("route");
                        $location.path("/");
                    }
                }
            },
            controller: "listCtrl",
            templateUrl: "partials/customer.html"
        })
        .when("/customers/addCustomer", {

            resolve: {
                "check": function($location, $localStorage) {
                    if (!$localStorage.session) {
                        console.log("route");
                        $location.path("/");
                    }
                }
            },
            controller: "addCustomerCtrl",
            templateUrl: "partials/add-customer.html"
        })
        .when("/customers/editCustomer", {

            resolve: {
                "check": function($location, $localStorage) {
                    if (!$localStorage.session) {
                        console.log("route");
                        $location.path("/");
                    }
                }
            },
            controller: "editCustomerCtrl",
            templateUrl: "partials/edit-customer.html"
        })
        .when("/customers/details", {

            resolve: {
                "check": function($location, $localStorage) {
                    if (!$localStorage.session) {
                        console.log("route");
                        $location.path("/");
                    }
                }
            },
            controller: "customerOrdersCtrl",
            templateUrl: "partials/customer-orders.html"
        })
        .when("/orders", {

            resolve: {
                "check": function($location, $localStorage) {
                    if (!$localStorage.session) {
                        console.log("route");
                        $location.path("/");
                    }
                }
            },
            controller: "ordersCtrl",
            templateUrl: "partials/orders.html"
        });
});


// main controller
app.controller('mainCtrl', function($scope, $sessionStorage, $rootScope, $route, $http, Services, $location, $localStorage) {

    $scope.$watch(function() {
        return Services.getLogout();
    }, function(value) {
        $scope.logout = value;
    });

    $scope.ordersPage = function() {


        $location.path('/orders');
    };

    $scope.logoutUser = function() {
        $localStorage.$reset();
        $location.path('/');
    };

    $scope.customerPage = function() {
        $location.path('/customers/cardView');
    };
});

app.factory('Services', function($route, $http, $localStorage) {

    var logout = false;
    var customer = {};

    function deleteCustomer(customer) {

        $http.post('/customers/deleteCustomer', customer).then(function(response) {
            $route.reload();
        });

    }

    function setLogout() {
        $localStorage.logout = true;
    }

    function getLogout() {
        return $localStorage.logout;
    }

    function setCustomer(x) {
        $localStorage.customer = x;
    }

    function getCustomer() {
        return $localStorage.customer;
    }

    return {
        deleteCustomer: deleteCustomer,
        setLogout: setLogout,
        getLogout: getLogout,
        setCustomer: setCustomer,
        getCustomer: getCustomer
    }
});
