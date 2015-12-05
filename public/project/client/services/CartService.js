"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .factory("CartService", CartService);

    function CartService($http, $q) {
        var service = {
            addToCart: addToCart,
            getCart: getCart,
            removeFromCart: removeFromCart,
            updateItem: updateItem
        };
        return service;

        // accepts a cart object.  Saves it to a user's
        // cart.  Returns a boolean
        function addToCart(cartItem) {
            var deferred = $q.defer();
            $http.post("/api/project/cart", cartItem)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        // accepts a username and finds all items in their cart
        function getCart(username) {
            var deferred = $q.defer();
            $http.get("/api/project/cart/" + username)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        // accepts an item id, deletes it, and returns the
        // new cart.
        function removeFromCart(id, username) {
            var deferred = $q.defer();
            $http.delete("/api/project/cart/" + username + "/" + id)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        // accepts an item object.  Updates
        // the line item with the new quantity and returns the
        // user's new cart.
        function updateItem(item) {
            var deferred = $q.defer();
            $http.put("/api/project/cart/" + item.username + "/" + item._id, item)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();