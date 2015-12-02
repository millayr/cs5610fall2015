"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .factory("SearchService", SearchService);

    function SearchService($http, $q) {
        var service = {
            searchBrewerydb: searchBrewerydb
        };
        return service;

        // Accepts a query object with a search text and search options.
        function searchBrewerydb(query) {
            var deferred = $q.defer();
            $http.post("/api/project/search", query)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();