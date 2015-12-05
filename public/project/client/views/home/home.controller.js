"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("HomeController", HomeController);

    function HomeController(BeerService, BreweryService) {
        var model = this;
        model.beers = [];
        model.breweries = [];
        var numTrending = 6;

        for(var i = 0; i < numTrending; i++) {
            BeerService.getTrendingBeer()
                .then(function (trendingBeer) {
                    model.beers.push(trendingBeer.data);
                });

            BreweryService.getTrendingBrewery()
                .then(function (trendingBrewery) {
                    model.breweries.push(trendingBrewery.data);
                });
        }
    }
})();