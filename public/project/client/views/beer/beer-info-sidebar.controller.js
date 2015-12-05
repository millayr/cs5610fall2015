"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("BeerInfoSidebarController", BeerInfoSidebarController);

    function BeerInfoSidebarController($scope, $rootScope, CartService) {
        var sidebar = this;
        sidebar.success = false;

        // grab the query information that was tucked away in the root scope.
        // we'll use this to build the "back" link.
        if($rootScope.backPageUrl != undefined) {
            sidebar.backPageUrl = $rootScope.backPageUrl;
            delete $rootScope.backPageUrl;
        } else {
            sidebar.backPageUrl = "#/home";
        }

        if($rootScope.backData != undefined) {
            sidebar.backData = $rootScope.backData;
            delete $rootScope.backData;
        }

        // check if the user is logged in
        sidebar.isLoggedIn = ($rootScope.user != undefined);

        // populate the img url once we know what beer we're displaying
        $scope.$on("beerLoad", function(event, beer) {
            if(beer.labels == undefined) {
                sidebar.imgUrl = "./img/generic_beer.png";
            } else {
                sidebar.imgUrl = beer.labels.medium;
            }
            sidebar.quantity = 1;
            sidebar.beer = beer;
            sidebar.price = getPrice(beer.id);
        });

        // add this beer to a user's cart
        sidebar.addToCart = function(quantity) {
            var totalPrice = sidebar.price * quantity;

            var cartItem = {
                username: $rootScope.user._id,
                contents: {
                    beerid: sidebar.beer.id,
                    beerName: sidebar.beer.name,
                    count: quantity,
                    unitPrice: sidebar.price,
                    totalPrice: totalPrice
                }
            };

            CartService.addToCart(cartItem)
                .then(function(response) {
                    sidebar.success = response.success;
                });
        };

        sidebar.dismiss = function() {
            sidebar.success = false;
        };

        // helper function to create a consistent but fake price
        function getPrice(beerid) {
            return (beerid[0].charCodeAt(0) % 10)
                + "."
                + (beerid[1].charCodeAt(0) % 10)
                + (beerid[2].charCodeAt(0) % 10);
        }
    }
})();
