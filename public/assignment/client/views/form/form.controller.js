"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $location, FormService) {
        var model = this;
        model.addForm = addForm;
        model.updateForm = updateForm;
        model.deleteForm = deleteForm;
        model.selectForm = selectForm;

        // let's get the user id since we're going to use it several times
        var user = $rootScope.user;

        // iniitalize table of forms
        model.selectedForm = {
            title: ""
        };
        if(user != null) {
            FormService.findAllFormsForUser(user.id)
                .then(function(allUserForms) {
                    model.forms = allUserForms;
                });
        } else {
            alert("You need to register/login!");
        }

    	function addForm(newForm) {
    		// Create new object to pass to service. This separates the ng-model from
            // the ng-repeat data.  TBH, this is a hack and should be more eloquent. 
            var newForm = {
                title: newForm.title
            };

            // reset the ng-model.
            model.selectedForm.title = "";

    		FormService.createFormForUser(user.id, newForm)
                // TODO:  this returns ALL forms and not just the ones owned by the user
                .then(function(allForms) {
                    model.forms = allForms;
                });
    	}

        function updateForm(form) {
            // call the FormService to update the "selected" form.
            // NOTE:  I'm sure we'll get more details about how this function should
            // work in the next assignment but for now it depends on the user first
            // clicking the pencil icon (a.k.a. the selectForm() button).
            FormService.updateFormById(form.id, form)
                .then(function(allForms) {
                    // no-op for now
                });
        }

        function deleteForm(index) {
            var deletedId = model.forms[index].id;
            FormService.deleteFormByIdForUser(deletedId, user.id)
                .then(function(remainingForms) {
                    model.forms = remainingForms.data;
                });
        }

        function selectForm(index) {
            // NOTE:  the assignment 3 requirements were vague about what this
            // function is meant to do.  Plus, the pencil button seems weird as
            // a selectForm() button.  Doesn't seem intuitive to me :).
            model.selectedForm.title = model.forms[index].title;
        }
    }
})();