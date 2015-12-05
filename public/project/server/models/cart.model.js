"use strict";

var q = require("q");

module.exports = function(db, mongoose) {
    var CartSchema = require("./cart.schema.js")(mongoose);
    var CartModel = mongoose.model("CartModel", CartSchema);
    var api = {
        create: create,
        getCart: getCart,
        removeFromCart: removeFromCart,
        updateItem: updateItem,
        clearCart: clearCart
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

    // Accepts a username.  Returns all items in that user's cart
    function getCart(username) {
        var deferred = q.defer();

        CartModel.find({ username: username }, function(err, cart) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(cart);
            }
        });

        return deferred.promise;
    }

    // Accepts a username and an item id.  Deletes the item and returns
    // the user's new cart contents.
    function removeFromCart(id, username) {
        var deferred = q.defer();

        CartModel.remove({ _id: id }, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                // grab the new cart
                getCart(username)
                    .then(function(cart) {
                        deferred.resolve(cart);
                    });
            }
        });

        return deferred.promise;
    }

    // Accepts an item id, username, and new item object.
    // Updates the item and then returns the user's new cart.
    function updateItem(item) {
        var deferred = q.defer();

        CartModel.findByIdAndUpdate(item._id, { $set: item }, { new: true },
            function(err, item) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(item);
                }
            }
        );

        return deferred.promise;
    }

    // Accepts a username.  Deletes all entries in their cart.
    function clearCart(username) {
        var deferred = q.defer();

        CartModel.remove({ username: username }, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }
};
