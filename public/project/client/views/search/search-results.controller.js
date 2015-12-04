"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("SearchResultsController", SearchResultsController);

    function SearchResultsController($routeParams, $rootScope, SearchService) {
        var model = this;
        var query = {
            text: $routeParams.text,
            option: $routeParams.option,
            page: 1
        };
        var resultsPerRow = 6;
        var pageDisplayLimit = 5;
        model.pageMap = [];

        // tuck the query away in the root scope for requests that come
        // back to this page.
        $rootScope.backPageUrl = "#/search-results";
        $rootScope.backData = query;

        // search brewerydb for the user's query.
        SearchService.searchBrewerydb(query)
            .then(function(queryResults) {
                model.numResults = queryResults.totalResults;
                model.numPages = queryResults.numberOfPages;
                pageInit(queryResults.currentPage - 1, queryResults.numberOfPages);
                populate(queryResults.data);
            });

        model.newPage = function(index) {
            query.page = index + 1;
            SearchService.searchBrewerydb(query)
                .then(function(queryResults) {
                    model.pageMap = [];
                    pageInit(queryResults.currentPage - 1, queryResults.numberOfPages);
                    populate(queryResults.data);
                });
        };

        function pageInit(currentPage, numPages) {
            var start;
            var end;

            if(numPages <= pageDisplayLimit) {
                start = 0;
                end = numPages;
            } else {
                // determine start
                if(currentPage - Math.floor(pageDisplayLimit / 2) < 0) {
                    start = 0;
                } else if(currentPage + Math.floor(pageDisplayLimit / 2) > numPages) {
                    start = numPages - pageDisplayLimit;
                } else {
                    start = currentPage - Math.floor(pageDisplayLimit / 2);
                }

                // determine end
                if(currentPage + Math.floor(pageDisplayLimit / 2) >= numPages) {
                    start = numPages - pageDisplayLimit;
                    end = numPages;
                } else if(currentPage - Math.floor(pageDisplayLimit / 2) < 0) {
                    end = pageDisplayLimit;
                } else {
                    end = currentPage + Math.floor(pageDisplayLimit / 2) + 1;
                }
            }

            for(var i = start; i < end; i++) {
                model.pageMap.push({
                    active: currentPage == i,
                    index: i,
                    displayId: i + 1
                });
            }
        }

        function populate(results) {
            model.resultRows = [];
            var currentRow = 0;
            var pageResults = results;

            for(var i = 0; i < pageResults.length; i++) {

                if(model.resultRows[currentRow] == undefined) {
                    model.resultRows.push([]);
                }

                model.resultRows[currentRow].push(pageResults[i]);

                if(model.resultRows[currentRow].length == resultsPerRow) {
                    currentRow++;
                }
            }
        }
    }
})();