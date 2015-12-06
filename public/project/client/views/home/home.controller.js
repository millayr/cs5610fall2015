"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("HomeController", HomeController);

    function HomeController($rootScope, BeerService, BreweryService) {
        var model = this;
        var numTrending = 6;
        model.beers = [];
        model.breweries = [];

        if($rootScope.backPageUrl != undefined) {
            delete $rootScope.backPageUrl;
        }

        BeerService.getTrendingBeers(numTrending)
            .then(function (trendingBeers) {
                model.beers = (trendingBeers.data);
            });

        BreweryService.getTrendingBreweries(numTrending)
            .then(function (trendingBreweries) {
                model.breweries = trendingBreweries.data;
            });
    }
})();