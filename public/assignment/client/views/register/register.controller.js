"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService) {
        var model = this;
        model.register = register;

        model.newUser = {};
    	function register(newUser) {
    		// create the user via the UserService
    		UserService.createUser(newUser)
                .then(function(createdUser) {
                    // update root scope and navigate to profile
                    $rootScope.user = createdUser;
                    $location.path("/profile");
    		    });
    	}
    }
})();