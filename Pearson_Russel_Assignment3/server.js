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
    console.log(user_data);
} else {
    console.log("ERROR: Unable to read file " + userDatabase);
    exit();
 }

// allowing express to use sessions and cookies
expressApp.use(session(
    { secret: "ITM352 rocks!" }
));
expressApp.use(cookieParser());

expressApp.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

expressApp.get("/login", function (request, response) {
    contents = fs.readFileSync('./public/login.html', 'utf-8');
    response.send(contents);
});

expressApp.post("/login", function (request, response) {
    POST = request.body;
    console.log(POST); // for checking internally if POST is being read correctly.
    username_from_form = POST['username'].toLowerCase();
    password_from_form = POST['password'];
    if (username_from_form == user_data[username_from_form]['auth'] && password_from_form == user_data[username_from_form]['password']) {
        str = `${username_from_form} = ${user_data}['${username_from_form}']['username']`;
        response.send(str);
    } else {
        str = `${username_from_form} is not the same as ${user_data}[${username_from_form}]['username']`;
        response.send(str);
    }
});

expressApp.get("/register", function (request, response) {

});

expressApp.post("/register", function (request, response) {

});

expressApp.post("/process_form", function (request, response) {

});

expressApp.listen(8080, () => console.log(`listening on port 8080`));