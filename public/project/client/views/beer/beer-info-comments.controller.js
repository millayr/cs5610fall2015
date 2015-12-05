"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("BeerInfoCommentsController", BeerInfoCommentsController);

    function BeerInfoCommentsController($scope, $rootScope, $window, BeerService) {
        var com = this;
        var user = $rootScope.user;
        com.isLoggedIn = (user != undefined);
        com.newComment = {};
        com.starArrays = initStarArrays();

        $scope.$on("beerLoad", function(event, beer) {
            com.beer = beer;

            BeerService.getBeerComments(com.beer.id)
                .then(function(commentData) {
                    com.comments = commentData.comments;
                    $rootScope.$broadcast("averagesLoad", commentData.averages[0]);
                });
        });

        com.addComment = function(commentToSave) {
            if(!validateStars()) {
                $window.alert("Please select ratings for all categories.");
                return;
            }

            commentToSave.smell = countStars(com.starArrays.smell);
            commentToSave.taste = countStars(com.starArrays.taste);
            commentToSave.hops = countStars(com.starArrays.hops);
            commentToSave.malts = countStars(com.starArrays.malts);
            commentToSave.username = user._id;
            commentToSave.beerid = com.beer.id;

            BeerService.addComment(commentToSave)
                .then(function(commentData) {
                    com.newComment.comment = "";
                    com.starArrays = initStarArrays();
                    com.comments = commentData.comments;
                    $rootScope.$broadcast("averagesLoad", commentData.averages[0]);
                });
        };

        com.setRating = function(index, category) {
            for(var i = 0; i < category.length; i++) {
                category[i] = (i <= index);
            }
        };

        com.getNumber = function(number) {
            return new Array(number);
        };

        function validateStars() {
            var categories = ["smell", "taste", "hops", "malts"];
            for(var i = 0; i < categories.length; i++) {
                // check the first star of each category to ensure there's input
                if(!com.starArrays[categories[i]][0]) {
                    return false;
                }
            }
            return true;
        }

        function countStars(category) {
            var counter = 0;
            for(var i = 0; i < category.length; i++) {
                if(category[i]) {
                    counter++;
                }
            }
            return counter;
        }

        function initStarArrays() {
            return {
                smell: [false, false, false, false, false],
                taste: [false, false, false, false, false],
                hops: [false, false, false, false, false],
                malts: [false, false, false, false, false]
            };
        }
    }
})();