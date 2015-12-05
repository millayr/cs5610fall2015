"use strict";

module.exports = function(app, cartModel) {
    app.post("/api/project/cart", addToCart);
    app.get("/api/project/cart/:username", getCart);
    app.delete("/api/project/cart/:username/:id", removeFromCart);
    app.put("/api/project/cart/:username/:id", updateItem);

    // send back a json obj with a true/false value after
    // adding to a user's cart.
    function addToCart(req, res) {
        cartModel
            .create(req.body)
            .then(function(success) {
                res.json(success);
            });
    }

    // pulls the username from the url.  returns all items
    // that are in the user's cart.
    function getCart(req, res) {
        cartModel
            .getCart(req.params.username)
            .then(function(cart) {
                res.json(cart);
            });
    }

    // pulls the item id from the url.  deletes the item and
    // returns the new cart contents.
    function removeFromCart(req, res) {
        cartModel
            .removeFromCart(req.params.id, req.params.username)
            .then(function(cart) {
                res.json(cart);
            });
    }

    // updates the item passed in the request body
    function updateItem(req, res) {
        cartModel
            .updateItem(req.body)
            .then(function(item) {
                res.json(item);
            });
    }
};