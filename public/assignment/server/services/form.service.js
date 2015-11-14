"use strict";

module.exports = function(app, formModel, db) {
    app.get("/api/assignment/user/:userid/form", findFormsByUserId);
    app.get("/api/assignment/form/:formid", findFormById);
    app.delete("/api/assignment/form/:formid", deleteFormById);
    app.post("/api/assignment/user/:userid/form", createFormForUser);
    app.put("/api/assignment/form/:formid", updateFormById);

    function findFormsByUserId(req, res) {
        // ask the model for matching forms to the user id
        res.json(formModel.findFormsByUserId(req.params.userid));
    }

    function findFormById(req, res) {
        // ask the model for the matching form to the id
        res.json(formModel.findById(req.params.formid));
    }

    function deleteFormById(req, res) {
        // ask the model to delete the form matching the id
        formModel.deleteFormById(req.params.formid);
    }

    function createFormForUser(req, res) {
        var newForm = req.body;

        // add the username to the form object
        newForm.userid = req.params.userid;

        res.json(formModel.create(newForm));
    }

    function updateFormById(req, res) {
        // ask the model to update the matching form
        formModel.update(req.params.formid, req.body);
    }
};