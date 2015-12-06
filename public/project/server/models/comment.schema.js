"use strict";

module.exports = function(mongoose) {
    var CommentSchema = mongoose.Schema({
        smell: {
            type: Number,
            default: 0
        },
        taste: {
            type: Number,
            default: 0
        },
        hops: {
            type: Number,
            default: 0
        },
        malts: {
            type: Number,
            default: 0
        },
        comment: String,
        username: String,
        beerid: String,
        date: {
            type: Date,
            default: Date.now
        },
        response: String,
        responded: {
            type: Boolean,
            default: false
        }
    }, { collection: "cs5610.project.comment" });
    return CommentSchema;
};