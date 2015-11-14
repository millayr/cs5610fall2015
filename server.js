#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

require("./public/assignment/server/app.js")(app);

app.listen(3000);