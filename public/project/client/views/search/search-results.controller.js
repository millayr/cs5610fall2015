"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("SearchResultsController", SearchResultsController);

    function SearchResultsController($scope, $rootScope) {
        var numRows = 4;
        var resultsPerRow = 6;
        var resultsPerPage = numRows * resultsPerRow;

        // render the page if coming from a different area of the site
        populate($rootScope.results);

        // trigger if the user searches for a new term if already on the
        // search-results view.
        $scope.$on("searchLoad", function(event, results) {
            populate(results);
        });

        function populate(results) {
            console.log("here");
            $scope.resultRows = [];
            var allResults = results;
            var currentRow = 0;
            for(var i = 0; i < allResults.length; i++) {
                // drop results we don't support
                if(allResults[i].type == "guild" || allResults[i].type == "event") {
                    allResults.splice(i, 1);
                    continue;
                }

                if($scope.resultRows[currentRow] == undefined) {
                    $scope.resultRows.push([]);
                }

                $scope.resultRows[currentRow].push(allResults[i]);

                if($scope.resultRows[currentRow].length == resultsPerRow) {
                    currentRow++;
                }
            }
            $scope.numResults = allResults.length;
        }
    }
})();