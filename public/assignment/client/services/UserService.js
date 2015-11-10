"use strict";

(function () {
	angular
		.module("FormBuilderApp")
		.factory("UserService", UserService);

	function UserService() {
		var currentUsers = [];

		var service = {
			findUserByUsernameAndPassword: findUserByUsernameAndPassword,
			findAllUsers: findAllUsers,
			createUser: createUser,
			deleteUserById: deleteUserById,
			updateUser: updateUser
		};
		return service;

		// Accepts username and password strings.  Attempts to match to user in existing
		// currentUsers array.  If found, executes userFoundCallback.
		function findUserByUsernameAndPassword(username, password, userFoundCallback) {
			var matchedUser = null;

			// iterate over current users and look for a match
			for(var i = 0; i < currentUsers.length; i++) {
				if(currentUsers[i].username === username 
					&& currentUsers[i].password === password) {
					// user found!
					matchedUser = currentUsers[i];
					break;
				}
			}

			// Time to execute the callback function
			userFoundCallback(matchedUser);
		}

		// Simply executes allUsersCallback with the array or current users
		function findAllUsers(allUsersCallback) {
			allUsersCallback(currentUsers);
		}

		// Accepts new user object.  Adds id guid and appends to currentUsers array.
		// Executes createUserCallback with the new user object.
		function createUser(user, createUserCallback) {
			// add "id" to new user with a fresh guid
			user.id = guid();

			// add user to currentUsers array
			currentUsers.push(user);

			// time to execute the callback
			createUserCallback(user);
		}

		// Accepts id of user.  Matches to user in currentUsers array.  If found,
		// user is removed.  Executes deleteUserCallback with currentUsers array.
		function deleteUserById(id, deleteUserCallback) {
			// iterate over currentUsers array and look for a match
			for(var i = 0; i < currentUsers.length; i ++) {
				if(currentUsers[i].id === id) {
					// user found! remove it from the array
					currentUsers.splice(i, 1);

					// time to execute the callback
					deleteUserCallback(currentUsers);
					break;
				}
			}
		}

		// Accepts id of user and a user object with new properties.  If user is
		// is found, the user object is updated with the new properties.  Executes
		// updateUserCallback with the updated user.
		function updateUser(id, updatedUser, updateUserCallback) {
			// iterate over currentUsers array and look for a match
			for(var i = 0; i < currentUsers.length; i++) {
				if(currentUsers[i].id === id) {
					// user found!  time to update the user properties
					for(var attr in updatedUser) {
						if(updatedUser.hasOwnProperty(attr))
							currentUsers[i][attr] = updatedUser[attr];
					}
					// time to execute the callback
					updateUserCallback(currentUsers[i]);
					break;
				}
			}
		}

		// temporary guid function for this assignment
		function guid() {
			function s4() {
				return Math
						.floor((1 + Math.random()) * 0x10000)
						.toString(16)
						.substring(1);
			}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' 
				+ s4() + '-' + s4() + s4() + s4();
		}
	}
})();