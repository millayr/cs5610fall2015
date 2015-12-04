"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("BeerInfoSidebarController", BeerInfoSidebarController);

    function BeerInfoSidebarController($scope, $rootScope) {
        // grab the query information that was tucked away in the root scope.
        // we'll use this to build the "back" link.
        $scope.backPageUrl =
            ($rootScope.backPageUrl == undefined ? "#/home" : $rootScope.backPageUrl);

        if($rootScope.backData != undefined) {
            $scope.backData = $rootScope.backData;
        }

        // populate the img url once we know what beer we're displaying
        $scope.$on("beerLoad", function(event, beer) {
            $scope.imgUrl = beer.labels.medium;
        });
    }
})();
