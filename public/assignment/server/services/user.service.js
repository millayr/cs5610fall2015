"use strict";

module.exports = function(app, userModel, db) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser(req, res) {
        // grab the new user from the req body and send it to the model
        userModel
            .create(req.body)
            .then(function(newUser) {
                res.json(newUser);
            });
    }

    function findUsers(req, res) {
        var rUsername = req.query.username;
        var rPassword = req.query.password;

        // check query params to determine to appropriate action.
        // 1 - find by creds
        // 2 - find by username
        // 3 - return all
        if(rUsername != null && rPassword != null) {
            userModel
                .findUserByCredentials({
                    username: rUsername,
                    password: rPassword
                })
                .then(function(user) {
                    res.json(user);
                });
        } else if(rUsername != null) {
            userModel
                .findUserByUsername(rUsername)
                .then(function(user) {
                    res.json(user);
                });
        } else {
            userModel
                .findAll()
                .then(function(allUsers) {
                    res.json(allUsers);
                });
        }
    }

    function findUserById(req, res) {
        // return the user that matches the id in req
        userModel
            .findById(req.params.id)
            .then(function(user) {
                res.json(user);
            });
    }

    function updateUser(req, res) {
        // update the matching user with the contents of the PUT
        userModel
            .update(req.params.id, req.body)
            .then(function(user) {
                res.json(user);
            });
    }

    function deleteUser(req, res) {
        userModel
            .remove(req.params.id)
            .then(function(status) {
                //TODO: propogate error if occurs
                console.log(status);

                // send back the list of remaining users
                findUsers(req, res);
            });
    }
};
