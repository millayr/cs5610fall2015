"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("BeerInfoSidebarController", BeerInfoSidebarController);

    function BeerInfoSidebarController($scope) {
        $scope.$on("beerLoad", function(event, beer) {
            $scope.imgUrl = beer.labels.medium;
        });
    }
})();
