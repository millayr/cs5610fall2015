"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("BeerInfoDescriptionController", BeerInfoDescriptionController);

    function BeerInfoDescriptionController($scope, BreweryService, BeerService) {
        $scope.$on("beerLoad", function(event, beer) {
            $scope.beer = beer;

            BreweryService.getBreweryForBeer($scope.beer.id)
                .then(function(breweryData) {
                    // tell the scope about the brewery.
                    // The data object is an array with only one element.
                    $scope.brewery = breweryData.data[0];
                });
        });
    }
})();