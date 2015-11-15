"use strict";

var forms = require("./form.mock.json");

module.exports = function(app, db) {
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

    // accepts a new form object to create and the resulting list of forms.
    // TODO:  move this to a Mongo database call
    function create(newForm) {
        newForm.id = guid();
        forms.push(newForm);
        return forms;
    }

    // accepts a new form object to create and a user id.  Creates the form
    // and returns a list of all the user's forms.
    function createFormForUser(newForm, userid) {
        newForm.id = guid();
        newForm.userid = userid;
        forms.push(newForm);
        return findFormsByUserId(userid);
    }

    // return all forms
    function findAll() {
        return forms;
    }

    // accepts a form id and returns the matching doc if found
    function findById(id) {
        // iterate over forms and look for a match.
        // TODO: I imagine this will be replace by a single lookup to Mongo
        for(var i = 0; i < forms.length; i++) {
            if(forms[i].id == id) {
                // form found!
                return forms[i];
            }
        }
        return null;
    }

    // accepts a form id and updated form doc.  locates matching form doc
    // and updates fields included in updated form doc.
    function update(id, updatedForm) {
        // iterate over forms array and look for a match
        for(var i = 0; i < forms.length; i++) {
            if(forms[i].id == id) {
                // form found!  time to update the form properties
                for(var attr in updatedForm) {
                    if(updatedForm.hasOwnProperty(attr))
                        forms[i].attr = updatedForm.attr;
                }
                break;
            }
        }
        return forms;
    }

    // accepts a form id and deletes the doc if it exists.  Returns a list
    // of all forms.
    function remove(id) {
        // iterate over forms and look for a match
        for(var i = 0; i < forms.length; i++) {
            if(forms[i].id == id) {
                // form found!
                forms.splice(i, 1);
                break;
            }
        }
        return forms;
    }

    // accepts a form id and userid.  Deletes the doc if it exists.  Returns a
    // list of all forms owned by the userid.
    function removeForUser(id, userid) {
        // iterate over forms and look for a match
        for(var i = 0; i < forms.length; i++) {
            if(forms[i].id == id) {
                // form found!
                forms.splice(i, 1);
                break;
            }
        }
        return findFormsByUserId(userid);
    }

    function findFormByTitle(title) {
        // iterate over forms and look for a match.
        // TODO: I imagine this will be replace by a single lookup to Mongo
        for(var i = 0; i < forms.length; i++) {
            if(forms[i].title == title) {
                // form found!
                return forms[i];
            }
        }
        return null;
    }

    function findFormsByUserId(userid) {
        var userForms = [];

        // iterate over forms and look for matches.
        // TODO: I imagine this will be replace by a single lookup to Mongo
        for(var i = 0; i < forms.length; i++) {
            if(forms[i].userid == userid) {
                // form found!  add it to the array
                userForms.push(forms[i]);
            }
        }
        return userForms;
    }

    function retrieveFormFields(id) {
        // iterate over forms and look for a match.
        // TODO: I imagine this will be replace by a single lookup to Mongo
        for(var i = 0; i < forms.length; i++) {
            if(forms[i].id == id) {
                // form found!  return the fields
                return forms[i].fields;
            }
        }
        return null;
    }

    function retrieveFormField(id, fieldid) {
        // iterate over forms and look for a match.
        // TODO: I imagine this will be replace by a single lookup to Mongo
        for(var i = 0; i < forms.length; i++) {
            if(forms[i].id == id) {
                // form found!  now locate requested field
                for(var j = 0; j < forms[i].fields.length; j++) {
                    if(forms[i].fields.id == fieldid){
                        // field found!
                        return forms[i].fields[j];
                    }
                }
            }
        }
        return null;
    }

    function removeFormField(id, fieldid) {
        // iterate over forms and look for a match.
        // TODO: I imagine this will be replace by a single lookup to Mongo
        for(var i = 0; i < forms.length; i++) {
            if(forms[i].id == id) {
                // form found!  now locate requested field
                for(var j = 0; j < forms[i].fields.length; j++) {
                    if(forms[i].fields[j].id == fieldid){
                        // field found!  remove it
                        forms[i].fields.splice(j, 1);
                        return forms[i];
                    }
                }
            }
        }
        return null;
    }

    function createFormField(id, newField) {
        newField.id = guid();

        // iterate over forms and look for a match.
        // TODO: I imagine this will be replace by a single lookup to Mongo
        for(var i = 0; i < forms.length; i++) {
            if(forms[i].id == id) {
                // form found!
                form[i].fields.push(newField);
                return forms[i];
            }
        }
        return null;
    }

    function updateFormField(id, fieldid, updatedField) {
        // iterate over forms and look for a match.
        // TODO: I imagine this will be replace by a single lookup to Mongo
        for(var i = 0; i < forms.length; i++) {
            if(forms[i].id == id) {
                // form found!  now locate requested field
                for(var j = 0; j < forms[i].fields.length; j++) {
                    if(forms[i].fields[j].id == fieldid){
                        // field found!  update it
                        for(var attr in updatedField) {
                            if(updatedField.hasOwnProperty(attr))
                                forms[i].fields[j].attr = updatedField.attr;
                        }
                    }
                }
            }
        }
        return null;
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