"use strict";

(function(){

    angular
        .module("BrewHouseApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "./home/home.view.html"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();
