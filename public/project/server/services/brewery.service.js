"use strict";

module.exports = function(app, brewerydbModel) {
    app.get("/api/project/brewery/:breweryid", getBreweryById);
    app.get("/api/project/beer/:beerid/brewery", getBreweryForBeer);
    app.get("/api/project/trendingBreweries/:num", getTrendingBreweries);

    // send back the brewery object that matches the breweryid
    function getBreweryById(req, res) {
        brewerydbModel
            .getBreweryById(req.params.breweryid)
            .then(function(breweryData) {
                res.json(breweryData);
            });
    }

    // send back the brewery object that brews the beer
    function getBreweryForBeer(req, res) {
        brewerydbModel
            .getBreweryForBeer(req.params.beerid)
            .then(function(breweryData) {
                res.json(breweryData);
            });
    }

    // send back a list of breweries that are popular amongst users
    function getTrendingBreweries(req, res) {
        brewerydbModel
            .getTrendingBreweries(req.params.num)
            .then(function(breweries) {
                res.json(breweries);
            });
    }
};