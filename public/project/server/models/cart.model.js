"use strict";

var q = require("q");

module.exports = function(db, mongoose) {
    var CartSchema = require("./cart.schema.js")(mongoose);
    var CartModel = mongoose.model("CartModel", CartSchema);
    var api = {
        create: create
    };
    return api;

    // Accepts a new cart item and saves to db
    function create(cartItem) {
        var deferred = q.defer();

        CartModel.create(cartItem, function(err, cartItem) {
            if(err) {
                deferred.reject({ success: false });
            } else {
                deferred.resolve({ success: true });
            }
        });

        return deferred.promise;
    }
};
