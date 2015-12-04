"use strict";

(function() {
    angular
        .module("BrewHouseApp")
        .controller("BeerInfoCommentsController", BeerInfoCommentsController);

    function BeerInfoCommentsController($scope, $rootScope, BeerService) {
        var user = $rootScope.user;
        $scope.isLoggedIn = (user != undefined);
        $scope.newComment = {};

        $scope.$on("beerLoad", function(event, beer) {
            $scope.beer = beer;

            BeerService.getBeerComments($scope.beer.id)
                .then(function(commentData) {
                    $scope.comments = commentData.comments;
                });
        });

        $scope.addComment = function(newComment) {
            newComment.username = user._id;
            newComment.beerid = $scope.beer.id;

            BeerService.addComment(newComment)
                .then(function(commentData) {
                    $scope.newComment.comment = "";
                    $scope.comments = commentData.comments;
                });
        }
    }
})();