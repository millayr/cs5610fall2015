"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("BeerInfoDescriptionController", BeerInfoDescriptionController);

    function BeerInfoDescriptionController($scope, BreweryService) {
        delete $scope.avgSmell;
        delete $scope.avgTaste;
        delete $scope.avgHops;
        delete $scope.avgMalts;

        $scope.$on("beerLoad", function(event, beer) {
            $scope.beer = beer;

            BreweryService.getBreweryForBeer($scope.beer.id)
                .then(function(breweryData) {
                    // tell the scope about the brewery.
                    // The data object is an array with only one element.
                    $scope.brewery = breweryData.data[0];
                });
        });

        $scope.$on("averagesLoad", function(event, averages) {
            if(averages != undefined) {
                $scope.avgSmell = Math.round(averages.avgSmell);
                $scope.avgTaste = Math.round(averages.avgTaste);
                $scope.avgHops = Math.round(averages.avgHops);
                $scope.avgMalts = Math.round(averages.avgMalts);
            }
        });

        $scope.getNumber = function(number) {
            return new Array(number);
        };
    }
})();