"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("BeerInfoCommentsController", BeerInfoCommentsController);

    function BeerInfoCommentsController($scope, $rootScope, $window, BeerService) {
        var user = $rootScope.user;
        $scope.isLoggedIn = (user != undefined);
        $scope.newComment = {};
        $scope.starArrays = initStarArrays();

        $scope.$on("beerLoad", function(event, beer) {
            $scope.beer = beer;

            BeerService.getBeerComments($scope.beer.id)
                .then(function(commentData) {
                    $scope.comments = commentData.comments;
                    $rootScope.$broadcast("averagesLoad", commentData.averages[0]);
                });
        });

        $scope.addComment = function(commentToSave) {
            if(!validateStars()) {
                $window.alert("Please select ratings for all categories.");
                return;
            }

            commentToSave.smell = countStars($scope.starArrays.smell);
            commentToSave.taste = countStars($scope.starArrays.taste);
            commentToSave.hops = countStars($scope.starArrays.hops);
            commentToSave.malts = countStars($scope.starArrays.malts);
            commentToSave.username = user._id;
            commentToSave.beerid = $scope.beer.id;

            BeerService.addComment(commentToSave)
                .then(function(commentData) {
                    $scope.newComment.comment = "";
                    $scope.starArrays = initStarArrays();
                    $scope.comments = commentData.comments;
                    $rootScope.$broadcast("averagesLoad", commentData.averages[0]);
                });
        };

        $scope.setRating = function(index, category) {
            for(var i = 0; i < category.length; i++) {
                category[i] = (i <= index);
            }
        };

        $scope.getNumber = function(number) {
            return new Array(number);
        };

        function validateStars() {
            var categories = ["smell", "taste", "hops", "malts"];
            for(var i = 0; i < categories.length; i++) {
                // check the first star of each category to ensure there's input
                if(!$scope.starArrays[categories[i]][0]) {
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