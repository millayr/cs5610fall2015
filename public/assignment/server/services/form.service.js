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
        formModel
            .findFormsByUserId(req.params.userid)
            .then(function(userForms) {
                res.json(userForms);
            });
    }

    function findFormById(req, res) {
        // ask the model for the matching form to the id
        formModel
            .findById(req.params.formid)
            .then(function(form) {
                res.json(form);
            });
    }

    function deleteFormById(req, res) {
        // ask the model to delete the form matching the id
        formModel
            .remove(req.params.formid)
            .then(function(remainingForms) {
                res.json(remainingForms);
            });
    }

    function deleteFormByIdForUser(req, res) {
        // ask the model to delete the form matching the id and return a list
        // of the user's forms.
        formModel
            .removeForUser(req.params.formid, req.params.userid)
            .then(function(remainingForms) {
                res.json(remainingForms);
            });
    }

    function createFormForUser(req, res) {
        // ask the model to create a form for this user and return a list
        // of their forms.
        formModel
            .createFormForUser(req.body, req.params.userid)
            .then(function(userForms) {
                res.json(userForms);
            });
    }

    function updateFormById(req, res) {
        // ask the model to update the matching form
        formModel
            .update(req.params.formid, req.body)
            .then(function(updatedForm) {
                res.json(updatedForm);
            });
    }

    function findAllForms(req, res) {
        formModel
            .findAll()
            .then(function(allForms) {
                res.json(allForms);
            });
    }
};