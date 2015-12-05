"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("BeerInfoSidebarController", BeerInfoSidebarController);

    function BeerInfoSidebarController($scope, $rootScope, CartService) {
        $scope.success = false;

        // grab the query information that was tucked away in the root scope.
        // we'll use this to build the "back" link.
        if($rootScope.backPageUrl != undefined) {
            $scope.backPageUrl = $rootScope.backPageUrl;
            delete $rootScope.backPageUrl;
        } else {
            $scope.backPageUrl = "#/home";
        }

        if($rootScope.backData != undefined) {
            $scope.backData = $rootScope.backData;
            delete $rootScope.backData;
        }

        // check if the user is logged in
        $scope.isLoggedIn = ($rootScope.user != undefined);

        // populate the img url once we know what beer we're displaying
        $scope.$on("beerLoad", function(event, beer) {
            if(beer.labels == undefined) {
                $scope.imgUrl = "./img/generic_beer.png";
            } else {
                $scope.imgUrl = beer.labels.medium;
            }
            $scope.quantity = 1;
            $scope.beerid = beer.id;
            $scope.price = getPrice(beer.id);
        });

        // add this beer to a user's cart
        $scope.addToCart = function(quantity) {
            var cartItem = {
                username: $rootScope.user._id,
                contents: {
                    beerid: $scope.beerid,
                    count: quantity,
                    unitPrice: $scope.price
                }
            };

            CartService.addToCart(cartItem)
                .then(function(response) {
                    $scope.success = response.success;
                });
        };

        $scope.dismiss = function() {
            $scope.success = false;
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
