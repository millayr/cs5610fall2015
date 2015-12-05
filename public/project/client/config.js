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
                    templateUrl: "./views/signup/signup.view.html",
                    controller: "SignUpController",
                    controllerAs: "model"
                })
                .when("/login", {
                    templateUrl: "./views/login/login.view.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })
                .when("/profile", {
                    templateUrl: "./views/profile/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model"
                })
                .when("/search-results/:option/:text", {
                    templateUrl: "./views/search/search-results.view.html",
                    controller: "SearchResultsController",
                    controllerAs: "model"
                })
                .when("/beer-info/:beerid", {
                    templateUrl: "./views/beer/beer-info.view.html",
                    controller: "BeerInfoController"
                })
                .when("/brewery-info/:breweryid", {
                    templateUrl: "./views/brewery/brewery-info.view.html",
                    controller: "BreweryInfoController"
                })
                .when("/cart", {
                    templateUrl: "./views/cart/cart.view.html",
                    controller: "CartController",
                    controllerAs: "model"
                })
                .when("/checkout", {
                    templateUrl: "./views/checkout/checkout.view.html",
                    controller: "CheckoutController",
                    controllerAs: "model"
                })
                .when("/dashboard", {
                    templateUrl: "./views/dashboard/dashboard.view.html"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();
