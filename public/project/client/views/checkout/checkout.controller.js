"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("CheckoutController", CheckoutController);

    function CheckoutController($rootScope, $location, $window, CartService) {
        var model = this;

        if($rootScope.total == undefined) {
            $window.alert("Hold your horses!  You need to checkout from your shopping cart!");
            if($rootScope.user == undefined) {
                $location.path("/home");
            } else {
                $location.path("/cart");
            }
        }

        model.success = false;
        model.user = $rootScope.user;
        model.total = $rootScope.total;
        delete $rootScope.total;

        model.completeOrder = function() {
            if(!$window.confirm("Are you sure?")) {
                return;
            }

            CartService.clearCart(model.user._id)
                .then(function(status) {
                    model.success = (status.ok == 1);
                });
        }
    }
})();
