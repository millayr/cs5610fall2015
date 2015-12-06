"use strict";

var q = require("q");

module.exports = function(db, mongoose) {
    var UserSchema = require("./user.schema.js")(mongoose);
    var UserModel = mongoose.model("BrewHouseUserModel", UserSchema);
    var api = {
        create: create,
        update: update,
        findByUsername: findByUsername,
        findByCredentials: findByCredentials
    };
    return api;

    // accepts a new user object to create
    function create(newUser) {
        var deferred = q.defer();

        UserModel.create(newUser, function(err, newUser) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(newUser);
            }
        });

        return deferred.promise;
    }

    // accepts a username and a user object with updates.
    // locates matching user doc if it exists and updates the corresponding
    // fields.
    function update(username, updatedUser) {
        var deferred = q.defer();

        UserModel.findByIdAndUpdate(username, { $set: updatedUser }, { new: true },
            function(err, user) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            }
        );

        return deferred.promise;
    }

    // accepts a username and returns true if found, false otherwise
    function findByUsername(username) {
        var deferred = q.defer();

        UserModel.findOne({ _id: username }, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve((user == null ? {success: false} : {success: true}));
            }
        });

        return deferred.promise;
    }

    // accepts a credentials object and returns the matching user
    function findByCredentials(creds) {
        var deferred = q.defer();

        UserModel.findOne({ _id: creds.username, password: creds.password },
            function(err, user) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            }
        );

        return deferred.promise;
    }
};
