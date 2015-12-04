"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("BeerInfoSidebarController", BeerInfoSidebarController);

    function BeerInfoSidebarController($scope, $rootScope) {
        // grab the query information that was tucked away in the root scope.
        // we'll use this to build the "back" link.
        if($rootScope.backPageUrl != undefined) {
            $scope.backPageUrl = $rootScope.backPageUrl;
            delete $rootScope.backPageUrl;
        } else {
            $scope.backPageUrl = "#/home";
        }

        if($rootScope.backData != undefined) {
            $scope.backData = $rootScope.backData;
            delete $rootScope.backData;
        }

        // populate the img url once we know what beer we're displaying
        $scope.$on("beerLoad", function(event, beer) {
            if(beer.labels == undefined) {
                $scope.imgUrl = "./img/generic_beer.png";
            } else {
                $scope.imgUrl = beer.labels.medium;
            }
        });
    }
})();
