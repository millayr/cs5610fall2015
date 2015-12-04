"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location) {
        $scope.isLoggedIn = false;

        $scope.$on("login", function(event, user) {
            $scope.isLoggedIn = true;
            $scope.username = user._id;
        });

        $scope.logout = function() {
            if(!confirm("Are you sure?")) {
                return;
            }

            $scope.isLoggedIn = false;
            delete $scope.username;
            if($rootScope.user != undefined) {
                delete $rootScope.user;
            }
            $location.path("/home");
        };
    }
})();