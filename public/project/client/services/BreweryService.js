"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .factory("BreweryService", BreweryService);

    function BreweryService($http, $q) {
        var service = {
            getBrewery: getBrewery,
            getBreweryForBeer: getBreweryForBeer,
            getTrendingBreweries: getTrendingBreweries
        };
        return service;

        // Accepts a brewery id.  Returns the matching brewery
        // object.
        function getBrewery(breweryid) {
            var deferred = $q.defer();
            $http.get("/api/project/brewery/" + breweryid)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

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
