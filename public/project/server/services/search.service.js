"use strict";

module.exports = function(app, brewerydbModel) {
    app.post("/api/project/search", searchBrewerydb);

    // asks the model to search brewerydb with the user's
    // query in the POST request.  Sends back the results.
    function searchBrewerydb(req, res) {
        brewerydbModel
            .searchBrewerydb(req.body)
            .then(function(searchResults) {
                res.json(searchResults);
            });
    }
};
