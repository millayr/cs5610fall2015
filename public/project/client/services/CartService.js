"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .factory("CartService", CartService);

    function CartService($http, $q) {
        var service = {
            addToCart: addToCart
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
    }
})();