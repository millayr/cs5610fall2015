"use strict";

(function(){

    angular
        .module("BrewHouseApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "./views/home/home.view.html"
                })
                .when("/signup", {
                    templateUrl: "./views/signup/signup.view.html"
                })
                .when("/login", {
                    templateUrl: "./views/login/login.view.html"
                })
                .when("/profile", {
                    templateUrl: "./views/profile/profile.view.html"
                })
                .when("/search-results", {
                    templateUrl: "./views/search/search-results.view.html"
                })
                .when("/beer-info", {
                    templateUrl: "./views/beer/beer-info.view.html"
                })
                .when("/brewery-info", {
                    templateUrl: "./views/brewery/brewery-info.view.html"
                })
                .when("/cart", {
                    templateUrl: "./views/cart/cart.view.html"
                })
                .when("/checkout", {
                    templateUrl: "./views/checkout/checkout.view.html"
                })
                .when("/dashboard", {
                    templateUrl: "./views/dashboard/dashboard.view.html"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();
