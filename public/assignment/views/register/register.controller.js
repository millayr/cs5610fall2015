"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {

    	$scope.register = function(newUser) {
    		// create the user via the UserService
    		UserService.createUser(newUser, function(createdUser) {
    			// update root scope and navigate to profile
				$rootScope.user = createdUser;
                $location.path("/profile");
    		});
    	}
    }
})();