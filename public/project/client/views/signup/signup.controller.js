"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("SignUpController", SignUpController);

    function SignUpController($rootScope, $location, UserService, SearchService) {
        var model = this;
        model.newUser = {
            isBrewery: "false"
        };

        model.signUp = function(newUser) {
            if(newUser.password == undefined
                || newUser.verifyPassword == undefined
                || newUser.password != newUser.verifyPassword) {
                $window.alert("Password fields don't match!");
                return;
            }

            // If user is a brewery, we need to make sure they entered a name
            if(newUser.isBrewery == "true"
                && (newUser.breweryName == "" || newUser.breweryName == undefined)) {
                $window.alert("Please enter a brewery name!");
                return;
            }

            // If brewery, we need to populate their beers.  This is a "hack" for the
            // purposes of this project.  When interfacing with real breweries, we'd
            // allow them to select specific beers as their own.
            if(newUser.isBrewery == "true") {
                var query = {
                    text: newUser.breweryName,
                    option: "beer"
                };
                SearchService.searchBrewerydb(query)
                    .then(function(queryResult) {
                        newUser.beers = filterBeerAttributes(queryResult.data);
                        createUser(newUser);
                    });
            } else {
                createUser(newUser);
            }
        };

        function createUser(newUser) {
            // create the user via the UserService
            UserService.create(newUser)
                .then(function(createdUser) {
                    // update root scope and navigate to profile
                    $rootScope.user = createdUser;
                    $rootScope.$broadcast("login", createdUser);
                    $location.path("/profile");
                });
        }

        function filterBeerAttributes(beerData) {
            var beers = [];

            // let's limit their beers since chances are not all search
            // results are theirs.
            var limit = (beerData.length > 10 ? 10 : beerData.length);
            for(var i = 0; i < limit; i++) {
                beers.push({
                    beerid: beerData[i].id,
                    name: beerData[i].name
                });
            }
            return beers;
        }
    }
})();