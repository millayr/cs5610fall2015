"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("SignUpController", SignUpController);

    function SignUpController($rootScope, $location, UserService) {
        var model = this;
        model.newUser = {};

        model.signUp = function(newUser) {
            if(newUser.password == undefined
                || newUser.verifyPassword == undefined
                || newUser.password != newUser.verifyPassword) {
                $window.alert("Password fields don't match!");
                return;
            }

            // create the user via the UserService
            UserService.create(newUser)
                .then(function(createdUser) {
                    // update root scope and navigate to profile
                    $rootScope.user = createdUser;
                    $location.path("/profile");
                });
        }
    }
})();