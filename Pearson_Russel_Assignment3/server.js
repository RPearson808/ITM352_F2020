/*
----- Author: Russel Pearson
----- Description: The main server application of my website; handles
      login information, registering users, and invoice generation
*/
// webpage module initialization
var express = require('express');
var expressApp = express();
var bodyParser = require("body-parser");
var fs = require('fs');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// initialize user database
var userDatabase = 'userData.json';

// telling express what folder to serve
expressApp.use(express.static('./public'));
expressApp.use(bodyParser.urlencoded({ extended: true }));

// allowing userData.json to be read and written by the server
if (fs.existsSync(userDatabase)) {
    var raw_data = fs.readFileSync(userDatabase, 'utf-8');
    var user_data = JSON.parse(raw_data);
} else {
    console.log("ERROR: Unable to read file " + userDatabase);
    exit();
}

// allowing express to use sessions and cookies
expressApp.use(session({secret: "ITM352 rocks!"}));
expressApp.use(cookieParser());

expressApp.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

expressApp.get("/login", function (request, response) {

});

expressApp.post("/login", function (request, response) {

});

expressApp.get("/register", function (request, response) {

});

expressApp.post("/register", function (request, response) {

});

expressApp.post("/process_form", function (request, response) {

});

expressApp.listen(8080, () => console.log(`listening on port 8080`));