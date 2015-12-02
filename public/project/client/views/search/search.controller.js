"use strict";

(function(){
    angular
        .module("BrewHouseApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $rootScope, $location, SearchService) {

        $scope.search = function(query) {

            // search brewerydb for the user's query.  Tuck the results
            // away in the $rootScope and redirect to the results page.
            SearchService.searchBrewerydb(query)
                .then(function(results) {
                    $rootScope.results = results.data;
                    $rootScope.$broadcast("searchLoad", results.data);
                    $location.path("/search-results");
                });
        }
    }
})();