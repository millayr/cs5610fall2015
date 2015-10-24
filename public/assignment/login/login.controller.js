(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService) {

    	$scope.login = function() {

    		// look up the user via the UserService
    		var user = UserService.findUserByUsernameAndPassword($scope.username, $scope.password, function(loggedInUser) {
    			// update root scope and navigate to profile if user exists
				if(loggedInUser != null) {
					$rootScope.user = loggedInUser;
					$location.path("#/profile");
				} else {
					alert("Username or password does not match a valid account!\n\n" +
						"Redirecting to Profile page for the purposes of this assignment.");

					// TODO remove this once we have a database backend
					$location.path("#/profile");
				}
    		});
    	}
    }
})();