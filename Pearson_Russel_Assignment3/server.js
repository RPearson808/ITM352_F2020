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

if (fs.existsSync(userDatabase)) {
    var raw_data = fs.readFileSync(userDatabase, 'utf-8');
    var user_data = JSON.parse(raw_data);
} else {
    console.log("ERROR: Unable to read file " + userDatabase);
    exit();
}

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

expressApp.listen(8080, () => console.log(`listening on port 8080`));