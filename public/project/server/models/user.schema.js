"use strict";

module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        _id: String,
        password: String,
        email: String,
        address: String,
        city: String,
        state: String,
        zipcode: String
    }, { collection: "cs5610.project.user" });
    return UserSchema;
};
