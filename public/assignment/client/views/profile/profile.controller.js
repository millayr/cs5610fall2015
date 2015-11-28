"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {
        var model = this;
        model.update = update;

        // get logged in user from the root scope
        var user = $rootScope.user;

        if(user != null) {
            model.user = {};
            // set the form values based on this user
            model.user.username = user.username;
            model.user.password = user.password;
            model.user.firstName = user.firstName;
            model.user.lastName = user.lastName;
            model.user.email = user.email;
        } else {
            alert("You must register/login!");
        }

    	function update(updatedUser) {
    		// create the user via the UserService
    		UserService.updateUser(user._id, updatedUser)
                .then(function(mergedUser) {
                    model.user = mergedUser;
                    $rootScope.user = mergedUser;
                });
    	}
    }
})();