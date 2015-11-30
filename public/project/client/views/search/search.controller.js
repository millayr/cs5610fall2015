"use strict";

(function(){
    angular
        .module("BrewHouseApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $location) {

        $scope.search = function(query) {
            // Simply redirect to results page for purposes of PoC.
            // TODO:  implement this!
            $location.path("/search-results");
        }
    }
})();