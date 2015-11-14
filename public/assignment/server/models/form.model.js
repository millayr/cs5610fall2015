var forms = require("form.mock.json");

module.exports = function(app, db) {
    var api = {
        create: create,
        findAll: findAll,
        findById: findById,
        update: update,
        remove: remove,
        findFormByTitle: findFormByTitle
    };
    return api;

    // accepts a new form object to create and the resulting list of forms.
    // TODO:  move this to a Mongo database call
    function create(newForm) {
        forms.push(newForm);
        return forms;
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
            if(forms[i].id === id) {
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
            if(forms[i].id === id) {
                // form found!  time to update the form properties
                for(var attr in updatedForm) {
                    if(updatedForm.hasOwnProperty(attr))
                        forms[i][attr] = updatedForm[attr];
                }
                break;
            }
        }
    }

    // accepts a form id and deletes the doc if it exists
    function remove(id) {
        // iterate over forms and look for a match
        for(var i = 0; i < forms.length; i++) {
            if(forms[i].id === id) {
                // form found!
                forms.splice(i, 1);
            }
        }
    }

    function findFormByTitle(title) {
        // iterate over forms and look for a match.
        // TODO: I imagine this will be replace by a single lookup to Mongo
        for(var i = 0; i < forms.length; i++) {
            if(forms[i].title === title) {
                // form found!
                return forms[i];
            }
        }
        return null;
    }
};