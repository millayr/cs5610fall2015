"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {
        var service = {
            create: create,
            update: update,
            findByUsername: findByUsername,
            findByCredentials: findByCredentials
        };
        return service;

        // Accepts new user object.  Calls user service on server requesting it
        // create the new user.  Returns a promise.
        function create(newUser) {
            var deferred = $q.defer();
            $http.post("/api/project/user", newUser)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        // Accepts id of user and a user object with new properties.  If user is
        // is found, the user object is updated with the new properties.
        function update(username, updatedUser) {
            var deferred = $q.defer();
            $http.put("/api/project/user/" + username, updatedUser)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        // Accepts username and password strings.  Calls user service on server
        // for matching user docs that have the correct creds.  Returns a promise.
        function findByUsername(username) {
            var deferred = $q.defer();
            $http.get("/api/project/user?username=" + username)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        // Accepts username and password strings.  Calls user service on server
        // for matching user docs that have the correct creds.  Returns a promise.
        function findByCredentials(username, password) {
            var deferred = $q.defer();
            $http.get("/api/project/user?username=" + username + "&password=" + password)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();
