"use strict";

module.exports = function(mongoose) {
    var FieldSchema = require("./field.schema.js")(mongoose);
    var FormSchema = mongoose.Schema({
        title: String,
        userid: String,
        fields: [FieldSchema]
    }, { collection: "cs5610.assignment.form" });
    return FormSchema;
}