"use strict";

module.exports = function(app, cartModel) {
    app.post("/api/project/cart", addToCart);

    // send back a json obj with a true/false value after
    // adding to a user's cart.
    function addToCart(req, res) {
        cartModel
            .create(req.body)
            .then(function(success) {
                res.json(success);
            });
    }
};