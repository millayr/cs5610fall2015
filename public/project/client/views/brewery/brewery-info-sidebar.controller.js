"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("BreweryInfoSidebarController", BreweryInfoSidebarController);

    function BreweryInfoSidebarController($scope, $rootScope) {
        var sidebar = this;

        // grab the query information that was tucked away in the root scope.
        // we'll use this to build the "back" link.
        if($rootScope.backPageUrl != undefined) {
            sidebar.backPageUrl = $rootScope.backPageUrl;
            delete $rootScope.backPageUrl;
        } else {
            sidebar.backPageUrl = "#/home";
        }

        if($rootScope.backData != undefined) {
            sidebar.backData = $rootScope.backData;
            delete $rootScope.backData;
        }

        $scope.$on("breweryLoad", function(event, brewery) {
            sidebar.breweryName = brewery.name;
            if(brewery.images == undefined) {
                sidebar.imgUrl = "./img/generic_brewery.jpg";
            } else {
                sidebar.imgUrl = brewery.images.medium;
            }
        });
    }
})();
