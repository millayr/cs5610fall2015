"use strict";

module.exports = function(app, formModel, db) {
    app.get("/api/assignment/form/:formid/field", retrieveFormFields);
    app.get("/api/assignment/form/:formid/field/:fieldid", retrieveFormField);
    app.delete("/api/assignment/form/:formid/field/:fieldid", removeFormField);
    app.post("/api/assignment/form/:formid/field", createFormField);
    app.put("/api/assignment/form/:formid/field/:fieldid", updateFormField);

    function retrieveFormFields(req, res) {
        // ask the model for the fields of the requested form
        formModel
            .retrieveFormFields(req.params.formid)
            .then(function(fields) {
                res.json(fields);
            });
    }

    function retrieveFormField(req, res) {
        // ask the model for the specific field in the requested form
        formModel
            .retrieveFormField(req.params.formid, req.params.fieldid)
            .then(function(field) {
                res.json(field);
            });
    }

    function removeFormField(req, res) {
        // ask the model to remove the specific field in the requested form
        formModel
            .removeFormField(req.params.formid, req.params.fieldid)
            .then(function(updatedForm) {
                res.json(updatedForm);
            });
    }

    function createFormField(req, res) {
        // ask the model to add a new field to the requested form
        formModel
            .createFormField(req.params.formid, req.body)
            .then(function(updatedForm) {
                res.json(updatedForm);
            });
    }

    function updateFormField(req, res) {
        // ask the model to update the requested field in the requested form
        formModel
            .updateFormField(req.params.formid, req.params.fieldid, req.body)
            .then(function(updatedForm) {
                res.json(updatedForm);
            });
    }
};