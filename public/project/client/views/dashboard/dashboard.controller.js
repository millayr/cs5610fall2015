"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("DashboardController", DashboardController);

    function DashboardController($rootScope, $window, $location, $q, BeerService) {
        var model = this;

        if(!$rootScope.user.isBrewery) {
            $window("Ah! Ah! Ah! You're not a brewery!");
            $location.path("/home");
        }

        var user = $rootScope.user;
        model.breweryName = user.breweryName;
        model.rows = [];

        for(var i = 0; i < user.beers.length; i++) {
            var row = user.beers[i];
            row.unitPrice = getPrice(row.beerid);
            getAverage(row)
                .then(function(row) {
                    model.rows.push(row);
                });
        }

        function getAverage(row) {
            var deferred = $q.defer();

            BeerService.getBeerComments(row.beerid)
                .then(function(comments) {
                    row.averages = comments.averages[0];
                    deferred.resolve(row);
                });

            return deferred.promise;
        }

        model.getNumber = function(number) {
            return new Array(number);
        };

        // helper function to create a consistent but fake price
        function getPrice(beerid) {
            return (beerid[0].charCodeAt(0) % 10)
                + "."
                + (beerid[1].charCodeAt(0) % 10)
                + (beerid[2].charCodeAt(0) % 10);
        }
    }
})();