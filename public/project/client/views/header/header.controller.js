"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location) {
        var header = this;
        header.isLoggedIn = false;

        $scope.$on("login", function(event, user) {
            header.isLoggedIn = true;
            header.isBrewery = user.isBrewery;
            header.username = user._id;
        });

        header.logout = function() {
            if(!confirm("Are you sure?")) {
                return;
            }

            header.isLoggedIn = false;
            delete header.username;
            if($rootScope.user != undefined) {
                delete $rootScope.user;
            }
            $location.path("/home");
        };
    }
})();