"use strict";

module.exports = function(app, db, mongoose) {
    require("./services/beer.service.js")(app);
    require("./services/brewery.service.js")(app);
};