"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .factory("BreweryService", BreweryService);

    function BreweryService($http, $q) {
        var service = {
            getBreweryForBeer: getBreweryForBeer,
            getTrendingBreweries: getTrendingBreweries
        };
        return service;

        // Accepts a beer id.  Returns the brewery object that
        // brews that specific beer.
        function getBreweryForBeer(beerid) {
            var deferred = $q.defer();
            $http.get("/api/project/beer/" + beerid + "/brewery")
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        // Accepts no arguments.  Returns a list of breweries
        // that are popular amongst the users.
        function getTrendingBreweries() {
            var deferred = $q.defer();
            $http.get("/api/project/trendingBreweries")
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();
