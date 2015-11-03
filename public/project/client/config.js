"use strict";

(function(){

    angular
        .module("BrewHouseApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "./home/home.view.html"
                })
                .when("/signup", {
                    templateUrl: "./signup/signup.view.html"
                })
                .when("/login", {
                    templateUrl: "./login/login.view.html"
                })
                .when("/profile", {
                    templateUrl: "./profile/profile.view.html"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();
