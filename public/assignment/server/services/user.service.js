"use strict";

module.exports = function(app, userModel, db) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser(req, res) {
        // grab the new user from the req body and send it to the model
        res.json(userModel.create(req.body));
    }

    function findUsers(req, res) {
        var rUsername = req.query.username;
        var rPassword = req.query.password;

        // check query params to determine to appropriate action.
        // 1 - find by creds
        // 2 - find by username
        // 3 - return all
        if(rUsername != null && rPassword != null) {
            res.json(userModel.findUserByCredentials({
                username: rUsername,
                password: rPassword
            }));
        } else if(rUsername != null) {
            res.json(userModel.findUserByUsername(rUsername));
        } else {
            res.json(userModel.findAll());
        }
    }

    function findUserById(req, res) {
        // return the user that matches the id in req
        res.json(userModel.findById(req.params.id));
    }

    function updateUser(req, res) {
        // update the matching user with the contents of the PUT
        res.json(userModel.update(req.params.id, req.body));
    }

    function deleteUser(req, res) {
        // delete the user matching the id
        userModel.remove(req.params.id);

        // respond with the list of users
        res.json(userModel.findAll());
    }
};
