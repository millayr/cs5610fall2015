(function () {
	angular
		.module("FormBuilderApp")
		.factory("FormService", FormService);

	function FormService() {
		var forms = [];

		var service = {
			createFormForUser: createFormForUser,
			findAllFormsForUser: findAllFormsForUser,
			deleteFormById: deleteFormById,
			updateFormById: updateFormById
		};
		return service;

		// Accepts id of user and new form object.  Adds id guid and userid to
		// form object.  Appends form to forms array and exectes callback.
		function createFormForUser(userid, form, createFormForUserCallback) {
			// add "id" to new form with a fresh guid
			form.id = Guid.create().value;

			// add userid to the form object
			form.userid = userid;

			// append to forms array
			forms.push(form);

			// time to execute the callback
			createFormForUserCallback(form);
		}

		// Accepts id of user.  Iterates over forms array for all matching
		// forms.  Executes callback with the resulting forms.
		function findAllFormsForUser(userid, findAllFormsForUserCallback) {
			var matchingForms = [];

			// iterate over forms array for matches
			for(var i = 0; i < forms.length; i++) {
				if(forms[i].userid === userid)
					matchingForms.push(forms[i]);
			}

			// time to execute the callback
			findAllFormsForUserCallback(matchingForms);
		}

		// Accepts form id.  Iterates over forms array for matches.  If found,
		// form is removed.  Executes callback with remaining forms.
		function deleteFormById(id, deleteFormByIdCallback) {
			// iterate over forms array looking for matches
			for(var i = 0; i < forms.length; i++) {
				if(forms[i].id === id) {
					// form found!  time to remove it
					forms.splice(i, 1);

					// time to execute the callback
					deleteFormByIdCallback(forms);
					break;
				}
			}
		}

		// Accepts id of form and updated form object.  Matches to form in forms 
		// array.  If found, form is updated with new properties.  Executes 
		// callback with updated form.
		function updateFormById(id, updatedForm, updateFormByIdCallback) {
			// iterate over forms array and look for a match
			for(var i = 0; i < forms.length; i++) {
				if(forms[i].id === id) {
					// form found!  time to update the form properties
					for(var attr in updatedForm) {
						if(updatedForm.hasOwnProperty(attr))
							forms[i][attr] = updatedForm[attr];
					}
					// time to execute the callback
					updateFormByIdCallback(forms[i]);
					break;
				}
			}
		}
	}
})();