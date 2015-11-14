"use strict";

module.exports = function(app) {
    var bodyParser = require("body-parser");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    var userModel = require("./models/user.model.js")(app);
    var formModel = require("./models/form.model.js")(app);
    require("./services/user.service.js")(app, userModel);
    require("./services/form.service.js")(app, formModel);
    require("./services/field.service.js")(app, formModel);
};