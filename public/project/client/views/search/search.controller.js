"use strict";

(function(){
    angular
        .module("BrewHouseApp")
        .controller("SearchController", SearchController);

    function SearchController($location) {
        var search = this;

        search.query = {
            text: "",
            option: "beer"
        };

        search.search = function(query) {
            if(query.text != "") {
                $location.path("/search-results/"
                    + query.option + "/" + query.text);
            }
        };
    }
})();