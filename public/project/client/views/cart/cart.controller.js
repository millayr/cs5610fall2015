"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("CartController", CartController);

    function CartController($rootScope, $location, CartService) {
        var model = this;
        var user = $rootScope.user;

        // grab all the items in this user's cart
        CartService.getCart(user._id)
            .then(function(cart) {
                model.cart = cart;
                model.total = calculateTotal(cart);
            });

        model.removeFromCart = function(index) {
            CartService.removeFromCart(model.cart[index]._id, user._id)
                .then(function(cart) {
                    model.cart = cart;
                    model.total = calculateTotal(cart);
                });
        };

        model.updateItem = function(index, quantity) {
            var updatedItem = model.cart[index];
            updatedItem.contents.count = quantity;
            updatedItem.contents.totalPrice = Math.round(
                updatedItem.contents.count * updatedItem.contents.unitPrice * 100) / 100;

            CartService.updateItem(updatedItem)
                .then(function(item) {
                    model.cart[index] = item;
                    model.total = calculateTotal(model.cart);
                });
        };

        model.checkout = function() {
            $rootScope.total = model.total;
            $location.path("/checkout");
        };

        function calculateTotal(cart) {
            var total = 0;
            for(var i = 0; i < cart.length; i++) {
                total += cart[i].contents.totalPrice;
            }
            return Math.round(total * 100) / 100;
        }
    }
})();
