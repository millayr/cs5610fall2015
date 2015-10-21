(function(){

    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            // TODO: update these!!
            $routeProvider
                .when("/home", {
                    templateUrl: "home.view.html"
                })
                .when("/profile", {
                    templateUrl: "profile.view.html"
                })
                .when("/admin", {
                    templateUrl: "admin.view.html"
                })
                .when("/forms", {
                    templateUrl: "form.view.html"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();