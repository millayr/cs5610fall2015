"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("BeerInfoController", BeerInfoController);

    function BeerInfoController($scope, $routeParams, BeerService) {
        // set the beer we're using
        BeerService.getBeer($routeParams.beerid)
            .then(function(beer) {
                $scope.$broadcast("beerLoad", beer.data);
            });
    }
})();