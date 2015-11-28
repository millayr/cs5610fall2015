"use strict";

module.exports = function(mongoose) {
    var FieldSchema = mongoose.Schema({
        label: String,
        type: {
            type: String,
            enum: ["TEXT", "TEXTAREA", "RADIOS", "CHECKBOXES", "DATE", "EMAIL", "OPTIONS"]
        },
        options: [{
            label: String,
            value: String
        }],
        placeholder: String
    }, { collection: "cs5610.assignment.form" });
    return FieldSchema;
}