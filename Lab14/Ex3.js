var express = require('express');
var app = express();
var myParser = require("body-parser");

app.use(myParser.urlencoded({ extended: true }));

var fs = require('fs');
var filename = "user_data.json";

if (fs.existsSync(filename)) {
    raw_data = fs.readFileSync(filename, 'utf-8');
    user_data = JSON.parse(raw_data);

    console.log(user_data);
} else {
    console.log("ERROR: Unable to read file " + filename);
    exit();
}

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="/login" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log("Got a POST login request");
    POST = request.body; // this will request from both username and password fields
    //console.log("Got username: " + POST['username']);
    //console.log("Got a password: " + POST['password']);
    user_name_from_form = POST['username'];
    if (user_data.user_name_from_form != undefined) {
        response.send(`<h3>User ${POST['username']} logged in.</h3>`);
    } else {
        response.send(`<h3>Please re-enter login information.</h3>`);
    }
});

app.listen(8080, () => console.log(`listening on port 8080`));