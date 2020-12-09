// webpage modules
var express = require('express');
var expressApp = express();
var bodyParser = require("body-parser");
var fs = require('fs');

// init for user data
var userDatabase = 'userData.json';

// telling express what folder to serve
expressApp.use(express.static('./public'));
expressApp.use( bodyParser.urlencoded({ extended: true }) );