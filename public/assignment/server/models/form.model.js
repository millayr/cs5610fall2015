"use strict";

var q = require("q");

module.exports = function(db, mongoose) {
    var FormSchema = require("./form.schema.js")(mongoose);
    var FormModel = mongoose.model("FormModel", FormSchema);
    var api = {
        create: create,
        createFormForUser: createFormForUser,
        findAll: findAll,
        findById: findById,
        update: update,
        remove: remove,
        removeForUser: removeForUser,
        findFormByTitle: findFormByTitle,
        findFormsByUserId: findFormsByUserId,
        retrieveFormFields: retrieveFormFields,
        retrieveFormField: retrieveFormField,
        removeFormField: removeFormField,
        createFormField: createFormField,
        updateFormField: updateFormField
    };
    return api;

    // accepts a new form object to create and returns all forms
    function create(newForm) {
        var deferred = q.defer();

        FormModel.create(newForm, function(err, newForm) {
            if(err) {
                deferred.reject(err);
            } else {
                // get the new list of all forms to return
                findAll()
                    .then(function(allForms) {
                        deferred.resolve(allForms);
                    });
            }
        });

        return deferred.promise;
    }

    // accepts a new form object to create and a user id.  Creates the form
    // and returns a list of all the user's forms.
    function createFormForUser(newForm, userid) {
        var deferred = q.defer();
        newForm.userid = userid;

        FormModel.create(newForm, function(err, newForm) {
            if(err) {
                deferred.reject(err);
            } else {
                // get the new list of forms owned by this userid
                findFormsByUserId(userid)
                    .then(function(userForms) {
                        deferred.resolve(userForms);
                    });
            }
        });

        return deferred.promise;
    }

    // return all forms
    function findAll() {
        var deferred = q.defer();

        FormModel.find(function(err, allForms) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(allForms);
            }
        });

        return deferred.promise;
    }

    // accepts a form id and returns the matching doc if found
    function findById(id) {
        var deferred = q.defer();

        FormModel.findById(id, function(err, form) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });

        return deferred.promise;
    }

    // accepts a form id and updated form doc.  locates matching form doc
    // and updates fields included in updated form doc.
    function update(id, updatedForm) {
        var deferred = q.defer();

        FormModel.findByIdAndUpdate(id, { $set: updatedForm }, { new: true },
            function(err, uForm) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(uForm);
                }
            });

        return deferred.promise;
    }

    // accepts a form id and deletes the doc if it exists.  Returns a list
    // of all forms.
    function remove(id) {
        var deferred = q.defer();

        FormModel.remove({ _id: id }, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                // return the new list of forms
                findAll()
                    .then(function(allForms) {
                        deferred.resolve(allForms);
                    });
            }
        });

        return deferred.promise;
    }

    // accepts a form id and userid.  Deletes the doc if it exists.  Returns a
    // list of all forms owned by the userid.
    function removeForUser(id, userid) {
        var deferred = q.defer();

        FormModel.remove({ _id: id }, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                // return the new list of forms owned by this user
                findFormsByUserId(userid)
                    .then(function(allUserForms) {
                        deferred.resolve(allUserForms);
                    });
            }
        });

        return deferred.promise;
    }

    // accepts a form title and returns matching doc if exists
    function findFormByTitle(title) {
        var deferred = q.defer();

        FormModel.findOne({ title: title }, function(err, form) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });

        return deferred.promise;
    }

    // accepts a userid and returns all forms belonging to that user
    function findFormsByUserId(userid) {
        var deferred = q.defer();

        FormModel.find({ userid: userid }, function(err, userForms) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(userForms);
            }
        });

        return deferred.promise;
    }

    // accepts a form id and returns its fields
    function retrieveFormFields(id) {
        var deferred = q.defer();

        FormModel.findById(id, function(err, form) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form.fields);
            }
        });

        return deferred.promise;
    }

    // accepts a form id and a field id.  Returns the matching field on the
    // matching form.
    function retrieveFormField(id, fieldid) {
        var deferred = q.defer();

        FormModel.findById(id, function(err, form) {
            if(err) {
                deferred.reject(err);
            } else {
                // iterate over form fields
                for(var i = 0; i < form.fields.length; i ++) {
                    if(form.fields[i].id == fieldid) {
                        deferred.resolve(form.fields[i]);
                    }
                }
            }
        });

        return deferred.promise;
    }

    // accepts a form id and a field id.  Removes the field from the matching
    // form.  Returns the resulting form post deletion.
    function removeFormField(id, fieldid) {
        var deferred = q.defer();

        FormModel.findById(id, function(err, form) {
            if(err) {
                deferred.reject(err);
            } else {
                // iterate over form fields
                for(var i = 0; i < form.fields.length; i ++) {
                    if(form.fields[i].id == fieldid) {
                        form.fields.splice(i, 1);
                        form.save(function(err, form) {
                            if(err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(form);
                            }
                        });
                    }
                }
            }
        });

        return deferred.promise;
    }

    // accepts a form id and a new field object.  Adds the field to the form.
    // Returns the newly updated form.
    function createFormField(id, newField) {
        var deferred = q.defer();
        newField.id = guid();  // keep this since Mongo won't create
                               // one for subdocs

        FormModel.findById(id, function(err, form) {
            if(err) {
                deferred.reject(err);
            } else {
                if(!form.fields) {
                    form.fields = [];
                }
                form.fields.push(newField);
                form.save(function(err, form) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(form);
                    }
                });
            }
        });

        return deferred.promise;
    }

    // accepts a form id, field id, and updated field object.  Finds the form
    // updates the matching field with the updatedField attributes.
    function updateFormField(id, fieldid, updatedField) {
        var deferred = q.defer();

        FormModel.findById(id, function(err, form) {
            if(err) {
                deferred.reject(err);
            } else {
                // iterate over form fields
                for(var i = 0; i < form.fields.length; i ++) {
                    if(form.fields[i].id == fieldid) {
                        // field found!  update it
                        for(var attr in updatedField) {
                            if(updatedField.hasOwnProperty(attr))
                                form.fields[i].attr = updatedField.attr;
                        }
                        form.save(function(err, form) {
                            if(err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(form);
                            }
                        });
                    }
                }
            }
        });

        return deferred.promise;
    }

    // temporary guid function for this assignment
    function guid() {
        function s4() {
            return Math
                .floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-'
            + s4() + '-' + s4() + s4() + s4();
    }
};