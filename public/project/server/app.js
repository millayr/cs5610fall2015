"use strict";

module.exports = function(app, db, mongoose) {
    var brewerydbModel = require("./models/brewerydb.model.js");
    var userModel = require("./models/user.model.js")(db, mongoose);
    var commentModel = require("./models/comment.model.js")(db, mongoose);
    var cartModel = require("./models/cart.model.js")(db, mongoose);
    require("./services/beer.service.js")(app, brewerydbModel, commentModel);
    require("./services/brewery.service.js")(app, brewerydbModel);
    require("./services/search.service.js")(app, brewerydbModel);
    require("./services/user.service.js")(app, userModel);
    require("./services/cart.service.js")(app, cartModel);
};