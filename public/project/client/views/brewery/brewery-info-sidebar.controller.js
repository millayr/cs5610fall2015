"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("BreweryInfoSidebarController", BreweryInfoSidebarController);

    function BreweryInfoSidebarController($scope, $rootScope) {
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

        $scope.$on("breweryLoad", function(event, brewery) {
            $scope.breweryid = brewery.id;
            if(brewery.images == undefined) {
                $scope.imgUrl = "./img/generic_brewery.jpg";
            } else {
                $scope.imgUrl = brewery.images.medium;
            }
        });
    }
})();
