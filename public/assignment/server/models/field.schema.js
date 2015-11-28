"use strict";

module.exports = function(mongoose) {
    var FieldSchema = mongoose.Schema({
        label: String,
        fieldType: {
            type: String,
            enum: ["TEXT", "TEXTAREA", "RADIO", "CHECKBOX", "SELECT", "DATE"]
        },
        options: [{
            label: String,
            value: String
        }],
        placeholder: String
    }, { collection: "cs5610.assignment.form" });
    return FieldSchema;
}