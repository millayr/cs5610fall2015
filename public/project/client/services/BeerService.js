"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .factory("BeerService", BeerService);

    function BeerService($http, $q) {
        var service = {
            getBeer: getBeer,
            getTrendingBeers: getTrendingBeers,
            getBeerComments: getBeerComments,
            addComment: addComment,
            updateComment: updateComment
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

        // Accepts number of beers.  Returns a list of beers
        // that are popular amongst the users.
        function getTrendingBeers(num) {
            var deferred = $q.defer();
            $http.get("/api/project/trendingBeers/" + num)
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

        // Accepts a comment id and an updated comment object.  Returns
        // the newly updated comment.
        function updateComment(id, updatedComment) {
            console.log("in the beer service");
            var deferred = $q.defer();
            $http.put("/api/project/beer/comment/" + id, updatedComment)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();