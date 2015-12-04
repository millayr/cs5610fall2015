"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, $window, UserService) {
        var model = this;
        model.creds = {
            username: "",
            password: ""
        };

        model.login = function(creds) {
            // look up the user via the UserService
            UserService.findByCredentials(creds.username, creds.password)
                .then(function(loggedInUser){
                    // update root scope and navigate to profile if user exists
                    if(loggedInUser != null) {
                        $rootScope.user = loggedInUser;
                        $rootScope.$broadcast("login", loggedInUser);
                        $location.path("/home");
                    } else {
                        $window.alert("Username or password does not match a valid account!");
                    }
                });
        }
    }
})();
