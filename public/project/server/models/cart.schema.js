"use strict";

module.exports = function(mongoose) {
    var CartSchema = mongoose.Schema({
        username: String,
        contents: [{
            beerid: String,
            count: Number,
            unitPrice: Number
        }]
    }, { collection: "cs5610.project.cart" });
    return CartSchema;
};