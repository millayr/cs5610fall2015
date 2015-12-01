"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("BreweryInfoSidebarController", BreweryInfoSidebarController);

    function BreweryInfoSidebarController($scope) {
        $scope.$on("breweryLoad", function(event, brewery) {
            $scope.imgUrl = brewery.images.medium;
        });
    }
})();
