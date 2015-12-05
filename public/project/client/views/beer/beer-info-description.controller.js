"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("BeerInfoDescriptionController", BeerInfoDescriptionController);

    function BeerInfoDescriptionController($scope, BreweryService) {
        var desc = this;
        delete desc.avgSmell;
        delete desc.avgTaste;
        delete desc.avgHops;
        delete desc.avgMalts;

        $scope.$on("beerLoad", function(event, beer) {
            desc.beer = beer;

            BreweryService.getBreweryForBeer(desc.beer.id)
                .then(function(breweryData) {
                    // tell the scope about the brewery.
                    // The data object is an array with only one element.
                    desc.brewery = breweryData.data[0];
                });
        });

        $scope.$on("averagesLoad", function(event, averages) {
            if(averages != undefined) {
                desc.avgSmell = Math.round(averages.avgSmell);
                desc.avgTaste = Math.round(averages.avgTaste);
                desc.avgHops = Math.round(averages.avgHops);
                desc.avgMalts = Math.round(averages.avgMalts);
            }
        });

        desc.getNumber = function(number) {
            return new Array(number);
        };
    }
})();