"use strict";

var q = require("q");

module.exports = function(db, mongoose) {
    var UserSchema = require("./user.schema.js")(mongoose);
    var UserModel = mongoose.model("UserModel", UserSchema);
    var api = {
        create: create,
        findAll: findAll,
        findById: findById,
        update: update,
        remove: remove,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    // accepts a new user object to create.
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

    // returns all users
    function findAll() {
        var deferred = q.defer();

        UserModel.find(function(err, allUsers) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(allUsers);
            }
        });

        return deferred.promise;
    }

    // return the user that has the matching id
    function findById(id) {
        var deferred = q.defer();

        UserModel.findById(id, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    // accepts an id and a user object with updates.
    // locates matching user doc if it exists and updates the corresponding
    // fields.
    function update(id, updatedUser) {
        var deferred = q.defer();

        UserModel.update({ _id: id }, { $set: updatedUser },
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

    // accepts an id of a user doc.  deletes the record if found.
    function remove(id) {
        var deferred = q.defer();

        UserModel.remove({ _id: id }, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }

    // accepts a username and returns matching user doc if found
    function findUserByUsername(username) {
        var deferred = q.defer();

        UserModel.find({ username: username }, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    // accepts a credentials object and returns the matching user
    function findUserByCredentials(creds) {
        var deferred = q.defer();

        UserModel.find({ username: creds.username, password: creds.password },
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