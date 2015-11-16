"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $routeParams, FieldService) {
        var userid = $routeParams.userid;
        var formid = $routeParams.formid;

        var defaultFieldValues = {
            TEXT: {id: null, label: "New Text Field", type: "TEXT", placeholder: "New Field"},
            TEXTAREA: {id: null, label: "New Text Field", type: "TEXTAREA", placeholder: "New Field"},
            DATE: {id: null, label: "New Date Field", type: "DATE"},
            OPTIONS: {id: null, label: "New Dropdown", type: "OPTIONS", options: [
                {label: "Option 1", value: "OPTION_1"},
                {label: "Option 2", value: "OPTION_2"},
                {label: "Option 3", value: "OPTION_3"}
            ]},
            CHECKBOXES: {id: null, label: "New Checkboxes", type: "CHECKBOXES", options: [
                {label: "Option A", value: "OPTION_A"},
                {label: "Option B", value: "OPTION_B"},
                {label: "Option C", value: "OPTION_C"}
            ]},
            RADIOS: {id: null, label: "New Radio Buttons", type: "RADIOS", options: [
                {label: "Option X", value: "OPTION_X"},
                {label: "Option Y", value: "OPTION_Y"},
                {label: "Option Z", value: "OPTION_Z"}
            ]},
            EMAIL: {id: null, label: "New Email Field", type: "EMAIL", placeholder: "New Field"}
        };

        FieldService.getFieldsForForm(formid)
            .then(function(allFields) {
                $scope.fields = allFields;
            });

        $scope.removeField = function(index) {
            FieldService.deleteFieldFromForm(formid, $scope.fields[index].id)
                .then(function(revisedForm) {
                    $scope.fields = revisedForm.fields;
                });
        }

        $scope.addField = function(newFieldType) {
            var newField = defaultFieldValues[newFieldType];
            FieldService.createFieldForForm(formid, newField)
                .then(function(revisedForm) {
                    $scope.fields = revisedForm.fields;
                });
        }
    }
})();
