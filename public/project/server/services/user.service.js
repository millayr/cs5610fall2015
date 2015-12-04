"use strict";

module.exports = function(app, userModel) {
    app.post("/api/project/user", createUser);
    app.put("/api/project/user/:username", updateUser);
    app.get("/api/project/user", findUser);

    function createUser(req, res) {
        // grab the new user from the req body and send it to the model
        userModel
            .create(req.body)
            .then(function(newUser) {
                res.json(newUser);
            });
    }

    function updateUser(req, res) {
        // update the matching user with the contents of the PUT
        userModel
            .update(req.params.username, req.body)
            .then(function(user) {
                res.json(user);
            });
    }

    function findUser(req, res) {
        var rUsername = req.query.username;
        var rPassword = req.query.password;

        // check query params to determine to appropriate action.
        // 1 - find by creds
        // 2 - find by username
        // 3 - return all
        if(rUsername != null && rPassword != null) {
            userModel
                .findByCredentials({
                    username: rUsername,
                    password: rPassword
                })
                .then(function(user) {
                    res.json(user);
                });
        } else if(rUsername != null) {
            userModel
                .findByUsername(rUsername)
                .then(function(user) {
                    res.json(user);
                });
        } else {
            res.json({error: "Must provide username and/or password"});
        }
    }
};