"use strict";

module.exports = function(mongoose) {
    var CartSchema = mongoose.Schema({
        username: String,
        contents: {
            beerid: String,
            beerName: String,
            count: Number,
            unitPrice: Number,
            totalPrice: Number
        }
    }, { collection: "cs5610.project.cart" });
    return CartSchema;
};