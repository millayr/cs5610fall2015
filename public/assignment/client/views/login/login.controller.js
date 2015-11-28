"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService) {
		var model = this;
		model.login = login;

    	function login(creds) {
    		// look up the user via the UserService
    		UserService.findUserByUsernameAndPassword(creds.username, creds.password)
				.then(function(loggedInUser){
					// update root scope and navigate to profile if user exists
					if(loggedInUser != null) {
						$rootScope.user = loggedInUser;
						$location.path("/profile");
					} else {
						alert("Username or password does not match a valid account!");
					}
    			});
    	}
    }
})();