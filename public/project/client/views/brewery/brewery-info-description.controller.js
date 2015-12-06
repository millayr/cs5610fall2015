"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("BreweryInfoDescriptionController", BreweryInfoDescriptionController);

    function BreweryInfoDescriptionController($scope) {
        var desc = this;
        $scope.$on("breweryLoad", function(event, brewery) {
            desc.brewery = brewery;
        })
    }
})();