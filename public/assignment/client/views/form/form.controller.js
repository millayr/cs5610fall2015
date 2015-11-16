"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, $location, FormService) {
        // let's get the user id since we're going to use it several times
        var user = $rootScope.user;

        // iniitalize table of forms
        $scope.selectedForm = {
            title: ""
        };
        if(user != null) {
            FormService.findAllFormsForUser(user.id)
                .then(function(allUserForms) {
                    $scope.forms = allUserForms;
                });
        } else {
            alert("You need to register/login!");
        }

    	$scope.addForm = function(newForm) {
    		// Create new object to pass to service. This separates the ng-model from
            // the ng-repeat data.  TBH, this is a hack and should be more eloquent. 
            var newForm = {
                title: newForm.title
            };

            // reset the ng-model.
            $scope.selectedForm.title = "";

    		FormService.createFormForUser(user.id, newForm)
                // TODO:  this returns ALL forms and not just the ones owned by the user
                .then(function(allForms) {
                    $scope.forms = allForms;
                });
    	}

        $scope.updateForm = function(form) {
            // call the FormService to update the "selected" form.
            // NOTE:  I'm sure we'll get more details about how this function should
            // work in the next assignment but for now it depends on the user first
            // clicking the pencil icon (a.k.a. the selectForm() button).
            FormService.updateFormById(form.id, form)
                .then(function(allForms) {
                    // no-op for now
                });
        }

        $scope.deleteForm = function(index) {
            var deletedId = $scope.forms[index].id;
            FormService.deleteFormByIdForUser(deletedId, user.id)
                .then(function(remainingForms) {
                    console.log(remainingForms);
                    $scope.forms = remainingForms;
                });
        }

        $scope.selectForm = function(index) {
            // NOTE:  the assignment 3 requirements were vague about what this
            // function is meant to do.  Plus, the pencil button seems weird as
            // a selectForm() button.  Doesn't seem intuitive to me :).
            $scope.selectedForm.title = $scope.forms[index].title;
        }
    }
})();