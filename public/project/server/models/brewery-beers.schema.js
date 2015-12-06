"use strict";

module.exports = function(mongoose) {
    var BreweryBeersSchema = mongoose.Schema({
        beerid: String,
        name: String
    });
    return BreweryBeersSchema;
};
