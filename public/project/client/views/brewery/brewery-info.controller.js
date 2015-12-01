"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("BreweryInfoController", BreweryInfoController);

    function BreweryInfoController($scope, $routeParams, BreweryService) {
        // set the brewery we're using
        BreweryService.getBrewery($routeParams.breweryid)
            .then(function(brewery) {
                $scope.$broadcast("breweryLoad", brewery.data);
            });
    }
})();