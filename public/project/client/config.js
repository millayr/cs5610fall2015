"use strict";

(function(){

    angular
        .module("BrewHouseApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "./views/home/home.view.html",
                    controller: "HomeController",
                    controllerAs: "model"
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
                .when("/beer-info/:beerid", {
                    templateUrl: "./views/beer/beer-info.view.html",
                    controller: "BeerInfoController"
                })
                .when("/brewery-info/:breweryid", {
                    templateUrl: "./views/brewery/brewery-info.view.html"
                    //controller: "BreweryController",
                    //controllerAs: "model"
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
