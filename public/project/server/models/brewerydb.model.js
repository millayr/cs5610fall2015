"use strict";

var q = require("q");
var request = require("request");
var creds = require("../brewerydb.creds.json");

var brewerydbModel = {
    // Accepts a beer id and returns the data
    getBeerById: function(beerid) {
        var deferred = q.defer();

        request({
            uri: creds.host + "/beer/" + beerid,
            qs: {
                key: creds.key
            },
            json: true
        }, function(err, res, beerData) {
            if(!err && res.statusCode == 200) {
                    deferred.resolve(beerData);
                } else {
                    deferred.reject(err);
                }
        });

        return deferred.promise;
    },
    // go out to brewerydb and request the brewery that brewed
    // a specific beer by id.
    getBreweryForBeer: function(beerid) {
        var deferred = q.defer();

        request({
            uri: creds.host + "/beer/" + beerid + "/breweries",
            qs: {
                key: creds.key
            },
            json: true
        }, function(err, res, breweryData) {
            if(!err && res.statusCode == 200) {
                deferred.resolve(breweryData);
            } else {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    },
    // go out to brewerydb and request a specific brewery
    getBreweryById: function(breweryid) {
        var deferred = q.defer();

        request({
            uri: creds.host + "/brewery/" + breweryid,
            qs: {
                key: creds.key
            },
            json: true
        }, function(err, res, breweryData) {
            if(!err && res.statusCode == 200) {
                deferred.resolve(breweryData);
            } else {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    },
    // got out to brewerydb with a user's search query
    searchBrewerydb: function(query) {
        var deferred = q.defer();

        var options = {
            q: query.text,
            key: creds.key,
            type: query.option,
            p: query.page
        };

        request({
            uri: creds.host + "/search",
            qs: options,
            json: true
        }, function(err, res, searchResults) {
            if(!err && res.statusCode == 200) {
                deferred.resolve(searchResults);
            } else {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    },
    // get the Trending Beer list
    getTrendingBeers: function(num) {
        var deferred = q.defer();

        request({
            uri: creds.host + "/beers",
            qs: {
                key: creds.key,
                hasLabels: "Y",
                order: "random",
                randomCount: num
            },
            json: true
        }, function (err, res, beers) {
            if (!err && res.statusCode == 200) {
                deferred.resolve(beers);
            } else {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    },
    // get the Trending Brewery list
    getTrendingBreweries: function(num) {
        var deferred = q.defer();

        request({
            uri: creds.host + "/breweries",
            qs: {
                key: creds.key,
                order: "random",
                randomCount: num
            },
            json: true
        }, function (err, res, breweries) {
            if (!err && res.statusCode == 200) {
                deferred.resolve(breweries);
            } else {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }
};

module.exports = brewerydbModel;