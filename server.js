#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// set up the express app
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.get("/", function(req, res) {
    res.sendfile('index.html', {root: __dirname });
});

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var database_name = "/cs5610";

// check if we're running locally!
if (typeof ipaddress === "undefined") {
    //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
    //  allows us to run/test the app locally.
    console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
    ipaddress = "127.0.0.1";

    // set up the database connection for local
    mongoose.connect("mongodb://" + ipaddress + database_name);
} else {
    var options = {
        user: 'admin',
        pass: 'YETkVcJfZ7an'
    };
    // set up the database connection for openshift
    mongoose.connect("mongodb://" + $OPENSHIFT_MONGODB_DB_HOST
        + ":" + $OPENSHIFT_MONGODB_DB_PORT + database_name, options);
}

app.listen(port, ipaddress);

var db = mongoose.connection;
require("./public/assignment/server/app.js")(app, db, mongoose);