"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService) {
        // get logged in user from the root scope
        var user = $rootScope.user;

        if(user != null) {
            // set the form values based on this user
            $scope.user.username = user.username;
            $scope.user.password = user.password;
            $scope.user.firstName = user.firstName;
            $scope.user.lastName = user.lastName;
            $scope.user.email = user.email;
        } else {
            alert("You must register/login!");
        }

    	$scope.update = function(updatedUser) {
    		// create the user via the UserService
    		UserService.updateUser(user.id, updatedUser)
                .then(function(mergedUser) {
                    alert("Update successful!");
                });
    	}
    }
})();