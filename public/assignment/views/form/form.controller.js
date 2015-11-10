"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, $location, FormService) {
        // let's get the user id since we're going to use it several times
        var user = $rootScope.user;

        // iniitalize table of forms
        if(user != null)
            getForms();
        else
            alert("You need to register/login!");

    	$scope.addForm = function(form) {
    		// Create new object to pass to service. This separates the ng-model from
            // the ng-repeat data.  TBH, this is a hack and should be more eloquent. 
            var newForm = {
                name: form.name
            };

            // reset the ng-model.
            $scope.selectedForm.name = "";

    		FormService.createFormForUser(user.id, newForm, function(createdForm) {
                getForms();  // NOTE: this seems ineffecient!!
            });
    	}

        $scope.updateForm = function(form) {
            // call the FormService to update the "selected" form.
            // NOTE:  I'm sure we'll get more details about how this function should
            // work in the next assignment but for now it depends on the user first
            // clicking the pencil icon (a.k.a. the selectForm() button).
            FormService.updateFormById(form.id, form, function(updatedForm){
                // no-op for now
            });
        }

        $scope.deleteForm = function(index) {
            var deletedId = $scope.forms[index].id;
            FormService.deleteFormById(deletedId, function(remainingForms){
                $scope.forms = remainingForms;
            });
        }

        $scope.selectForm = function(index) {
            // NOTE:  the assignment 3 requirements were vague about what this
            // function is meant to do.  Plus, the pencil button seems weird as
            // a selectForm() button.  Doesn't seem intuitive to me :).
            $scope.selectedForm.name = $scope.forms[index].name;
        }

        // get all forms and update scoop
        function getForms() {
            FormService.findAllFormsForUser(user.id, function(allForms) {
                $scope.forms = allForms;
            });            
        }
    }
})();