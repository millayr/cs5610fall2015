(function(){

    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            // TODO: update these!!
            $routeProvider
                .when("/", {
                    templateUrl: "home.html"
                })
                .when("/profile", {
                    templateUrl: "profile.html"
                })
                .when("/admin", {
                    templateUrl: "admin.html"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();