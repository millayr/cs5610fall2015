"use strict";

module.exports = function(mongoose) {
    var BreweryBeersSchema = require("./brewery-beers.schema.js")(mongoose);
    var UserSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        _id: String,
        password: String,
        email: String,
        address: String,
        city: String,
        state: String,
        zipcode: String,
        isBrewery: {
            type: Boolean,
            default: false
        },
        breweryName: String,
        beers: [BreweryBeersSchema]
    }, { collection: "cs5610.project.user" });
    return UserSchema;
};
