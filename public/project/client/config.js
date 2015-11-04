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
                .when("/search-results", {
                    templateUrl: "./search/search-results.view.html"
                })
                .when("/beer-info", {
                    templateUrl: "./beer/beer-info.view.html"
                })
                .when("/brewery-info", {
                    templateUrl: "./brewery/brewery-info.view.html"
                })
                .when("/cart", {
                    templateUrl: "./cart/cart.view.html"
                })
                .when("/checkout", {
                    templateUrl: "./checkout/checkout.view.html"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();
