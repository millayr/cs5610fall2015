"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("BreweryInfoDescriptionController", BreweryInfoDescriptionController);

    function BreweryInfoDescriptionController($scope) {
        $scope.$on("breweryLoad", function(event, brewery) {
            $scope.brewery = brewery;
        })
    }
})();