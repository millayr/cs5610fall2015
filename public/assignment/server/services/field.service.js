"use strict";

module.exports = function(app, formModel, db) {
    app.get("/api/assignment/form/:formid/field", retrieveFormFields);
    app.get("/api/assignment/form/:formid/field/:fieldid", retrieveFormField);
    app.delete("/api/assignment/form/:formid/field/:fieldid", removeFormField);
    app.post("/api/assignment/form/:formid/field", createFormField);
    app.put("/api/assignment/form/:formid/field/:fieldid", updateFormField);

    function retrieveFormFields(req, res) {
        // ask the model for the fields of the requested form
        res.json(formModel.retrieveFormFields(req.params.formid));
    }

    function retrieveFormField(req, res) {
        // ask the model for the specific field in the requested form
        res.json(formModel.retrieveFormField(req.params.formid, req.params.fieldid));
    }

    function removeFormField(req, res) {
        // ask the model to remove the specific field in the requested form
        res.json(formModel.removeFormField(req.params.formid, req.params.fieldid));
    }

    function createFormField(req, res) {
        // ask the model to add a new field to the requested form
        res.json(formModel.createFormField(req.params.formid, req.body));
    }

    function updateFormField(req, res) {
        // ask the model to update the requested field in the requested form
        res.json(formModel.updateFormField(req.params.formid, req.params.fieldid, req.body));
    }
};