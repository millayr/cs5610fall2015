"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .factory("BeerService", BeerService);

    function BeerService($http, $q) {
        var service = {
            getTrendingBeers: getTrendingBeers
        };
        return service;

        // Accepts no arguments.  Returns a list of beers
        // that are popular amongst the users.
        function getTrendingBeers() {
            var deferred = $q.defer();
            $http.get("/api/project/trendingBeers")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();