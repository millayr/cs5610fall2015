"use strict";

var q = require("q");

module.exports = function(db, mongoose) {
    var CommentSchema = require("./comment.schema.js")(mongoose);
    var CommentModel = mongoose.model("CommentModel", CommentSchema);
    var api = {
        create: create,
        findByBeerId: findByBeerId,
        update: update
    };
    return api;

    // Accepts a new comment object and returns the new list of comments
    // for the beer referenced in the new comment.
    function create(newComment) {
        var deferred = q.defer();

        CommentModel.create(newComment, function(err, newComment) {
            if(err) {
                deferred.reject(err);
            } else {
                // get the new list of comments
                findByBeerId(newComment.beerid)
                    .then(function(comments) {
                        deferred.resolve(comments);
                    });
            }
        });

        return deferred.promise;
    }

    // Accepts a beer id.  Returns all comments tied to that beer and
    // the average ratings across all comments.
    function findByBeerId(beerid) {
        var deferred = q.defer();

        CommentModel.find({ beerid: beerid }, function(err, comments) {
            if(err) {
                deferred.reject(err);
            } else {
                var data = {};
                data.comments = comments;

                // find the average ratings across all comments
                CommentModel.aggregate([
                    {
                        $match: { beerid: beerid }
                    },
                    {
                        $group: {
                            _id: "$beerid",
                            avgSmell: { $avg: "$smell" },
                            avgTaste: { $avg: "$taste" },
                            avgHops: { $avg: "$hops" },
                            avgMalts: { $avg: "$malts" }
                        }
                    }
                ], function(err, averages) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        data.averages = averages;
                        deferred.resolve(data);
                    }
                });
            }
        });

        return deferred.promise;
    }

    // Accepts the comment id and the new comment object to merge.
    function update(id, updatedComment) {
        var deferred = q.defer();
        delete updatedComment._id;

        CommentModel.findByIdAndUpdate(id, { $set: updatedComment }, { new: true },
            function(err, comment) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(comment);
                }
            }
        );

        return deferred.promise;
    }
};