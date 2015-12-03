"use strict";

(function(){
    angular
        .module("BrewHouseApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $location) {
        $scope.query = {
            text: "",
            option: "beer"
        };

        $scope.search = function(query) {
            if(query.text != "") {
                $location.path("/search-results/"
                    + query.option + "/" + query.text);
            }
        };
    }
})();