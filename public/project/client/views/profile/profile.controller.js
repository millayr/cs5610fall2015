"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $window, UserService) {
        var model = this;
        var user = $rootScope.user;

        if(user != null) {
            model.user = {};
            // set the form values based on this user
            model.user._id = user._id;
            model.user.firstName = user.firstName;
            model.user.lastName = user.lastName;
            model.user.email = user.email;
            model.user.address = user.address;
            model.user.city = user.city;
            model.user.state = user.state;
            model.user.zipcode = user.zipcode;
        }

        model.update = function(updatedUser) {
            if((updatedUser.password != undefined && updatedUser.verifyPassword == undefined)
                || (updatedUser.password == undefined && updatedUser.verifyPassword != undefined)
                || (updatedUser.password != updatedUser.verifyPassword)) {
                $window.alert("Password fields don't match!");
                return;
            }

            UserService.update(user._id, updatedUser)
                .then(function(mergedUser) {
                    delete mergedUser.password;
                    model.user = mergedUser;
                    $rootScope.user = model.user;
                    $window.alert("Record Updated!");
                });
        };
    }
})();