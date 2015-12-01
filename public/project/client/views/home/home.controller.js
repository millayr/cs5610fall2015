"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("HomeController", HomeController);

    function HomeController(BeerService, BreweryService) {
        var model = this;

        BeerService.getTrendingBeers()
            .then(function(trendingBeers) {
                model.beers = trendingBeers.data;
            });

        BreweryService.getTrendingBreweries()
            .then(function(trendingBreweries) {
                model.breweries = trendingBreweries.data;
            });
    }
})();