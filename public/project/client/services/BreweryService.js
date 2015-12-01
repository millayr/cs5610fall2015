"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .factory("BreweryService", BreweryService);

    function BreweryService($http, $q) {
        var service = {
            getTrendingBreweries: getTrendingBreweries
        };
        return service;

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
