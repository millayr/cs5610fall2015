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
            }
        );

        return deferred.promise;
    }
};

module.exports = brewerydbModel;