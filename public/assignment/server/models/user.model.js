var users = require("./user.mock.json");

module.exports = function(app, db) {
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
    // TODO:  update for use with a Mongo backend
    function create(newUser) {
        users.push(newUser);
        return users;
    }

    // returns all users
    function findAll() {
        return users;
    }

    // return the user that has the matching id
    function findById(id) {
        // iterate over users and look for a match.
        // TODO: I imagine this will be replace by a single lookup to Mongo
        for(var i = 0; i < users.length; i++) {
            if(users[i].id == id) {
                // user found!
                return users[i];
            }
        }
        return null;
    }

    // accepts an id and a user object with updates.
    // locates matching user doc if it exists and updates the corresponding
    // fields.
    function update(id, updatedUser) {
        // iterate over users array and look for a match
        for(var i = 0; i < users.length; i++) {
            if(users[i].id == id) {
                // user found!  time to update the user properties
                for(var attr in updatedUser) {
                    if(updatedUser.hasOwnProperty(attr))
                        users[i][attr] = updatedUser[attr];
                }
                break;
            }
        }
    }

    // accepts an id of a user doc.  deletes the record if found.
    function remove(id) {
        // iterate over users and look for a match
        for(var i = 0; i < users.length; i++) {
            if(users[i].id == id) {
                // user found!
                users.splice(i, 1);
            }
        }
    }

    // accepts a username and returns matching user doc if found
    function findUserByUsername(username) {
        // iterate over users and look for a match.
        // TODO: I imagine this will be replace by a single lookup to Mongo
        for(var i = 0; i < users.length; i++) {
            if(users[i].username === username) {
                // user found!
                return users[i];
            }
        }
        return null;
    }

    // accepts a credentials object and returns the matching user
    function findUserByCredentials(creds) {
        var matchedUser = null;

        // iterate over current users and look for a match
        for(var i = 0; i < users.length; i++) {
            if(users[i].username === creds.username
                && users[i].password === creds.password) {
                // user found!
                return users[i];
            }
        }
        return null;
    }
};