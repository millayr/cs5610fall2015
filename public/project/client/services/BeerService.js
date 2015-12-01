"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .factory("BeerService", BeerService);

    function BeerService($http, $q) {
        var service = {
            getBeer: getBeer,
            getTrendingBeers: getTrendingBeers
        };
        return service;

        // Accepts a beer id.  Returns the beer data.
        function getBeer(id) {
            var deferred = $q.defer();
            $http.get("/api/project/beer/" + id)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

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