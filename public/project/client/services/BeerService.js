"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .factory("BeerService", BeerService);

    function BeerService($http, $q) {
        var service = {
            getBeer: getBeer,
            getTrendingBeer: getTrendingBeer,
            getBeerComments: getBeerComments,
            addComment: addComment
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
        function getTrendingBeer() {
            var deferred = $q.defer();
            $http.get("/api/project/trendingBeer")
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        // Accepts a beer id.  Returns all comments left
        // for the beer.
        function getBeerComments(id) {
            var deferred = $q.defer();
            $http.get("/api/project/beer/" + id + "/comment")
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        // Accepts a new comment object and saves to db.  Returns
        // new list of comments.
        function addComment(comment) {
            var deferred = $q.defer();
            $http.post("/api/project/beer/comment", comment)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();