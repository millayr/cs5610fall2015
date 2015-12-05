"use strict";


module.exports = function(app, brewerydbModel, commentModel) {
    app.get("/api/project/beer/:beerid", getBeerById);
    app.get("/api/project/trendingBeer", getTrendingBeer);
    app.get("/api/project/beer/:beerid/comment", getBeerComments);
    app.post("/api/project/beer/comment", addComment);

    // send back data for a specific beer
    function getBeerById(req, res) {
        brewerydbModel
            .getBeerById(req.params.beerid)
            .then(function(beerData) {
                res.json(beerData);
            });
    }

    // send back a list of beers popular amongst users
    function getTrendingBeer(req, res) {
        brewerydbModel
            .getTrendingBeer()
            .then(function(beer) {
                res.json(beer);
            });
    }

    // send back a list of all comments tied to a beer
    function getBeerComments(req, res) {
        commentModel
            .findByBeerId(req.params.beerid)
            .then(function(commentData) {
                res.json(commentData);
            });
    }

    // add a new comment and send back the new list of comments
    function addComment(req, res) {
        commentModel
            .create(req.body)
            .then(function(commentData) {
                res.json(commentData);
            });
    }
};