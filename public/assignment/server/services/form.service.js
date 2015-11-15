"use strict";

module.exports = function(app, formModel, db) {
    app.get("/api/assignment/user/:userid/form", findFormsByUserId);
    app.get("/api/assignment/form/:formid", findFormById);
    app.delete("/api/assignment/form/:formid", deleteFormById);
    app.delete("/api/assignment/user/:userid/form/:formid", deleteFormByIdForUser);
    app.post("/api/assignment/user/:userid/form", createFormForUser);
    app.put("/api/assignment/form/:formid", updateFormById);
    app.get("/api/assignment/form", findAllForms);

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
        res.json(formModel.remove(req.params.formid));
    }

    function deleteFormByIdForUser(req, res) {
        // ask the model to delete the form matching the id and return a list
        // of the user's forms.
        res.json(formModel.removeForUser(req.params.formid, req.params.userid));
    }

    function createFormForUser(req, res) {
        // ask the model to create a form for this user and return a list
        // of their forms.
        res.json(formModel.createFormForUser(req.body, req.params.userid));
    }

    function updateFormById(req, res) {
        // ask the model to update the matching form
        res.json(formModel.update(req.params.formid, req.body));
    }

    function findAllForms(req, res) {
        res.json(formModel.findAll());
    }
};