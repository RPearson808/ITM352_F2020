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
var nodemailer = require('nodemailer');

// initialize user database
var userDatabase = './secure/userData.json';

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
    { secret: "Mellon", saveUninitialized: false, resave: false }
));
expressApp.use(cookieParser());

expressApp.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

expressApp.get('/', function (request, response) {

});

expressApp.get("/login", function (request, response) {
    contents = fs.readFileSync('./secure/login.html', 'utf-8');
    response.send(contents);
});

expressApp.post("/login", function (request, response) {
    POST = request.body;
    console.log(POST); // for checking internally if POST is being read correctly.
    username_from_form = POST['username'];
    password_from_form = POST['password'];
    loginAuth = username_from_form.toLowerCase();
    if (loginAuth == user_data[loginAuth]['authID'] && password_from_form == user_data[loginAuth]['password']) {
        displayName = user_data[loginAuth]['name'];
        userEmail = user_data[loginAuth]['email'];
        response.cookie('login', displayName).send;
        response.cookie("email", userEmail).send;
        response.redirect('/');
    } else {
        str = `${username_from_form} is not the same as ${user_data}[${username_from_form}]['username']`;
        response.send(str);
    }
});

expressApp.get("/register", function (request, response) {
    contents = fs.readFileSync('./secure/register.html', 'utf-8');
    response.send(contents);
});

expressApp.post("/register", function (request, response) {
    POST = request.body;
    newUser = POST['username'].toLowerCase();
    if (user_data[newUser] == undefined) {
        if (POST['username'] != '' && POST['password'] != '' && POST['repeat_password'] != '' && POST['email'] != '' && POST['name'] != '') {
            user_data[newUser] = {};
            user_data[newUser].authID = newUser
            user_data[newUser].username = POST['username'];
            user_data[newUser].password = POST['password'];
            user_data[newUser].name = POST['name'];
            user_data[newUser].email = POST['email'];
            data = JSON.stringify(user_data);
            fs.writeFileSync(userDatabase, data, 'utf-8');
            displayName = user_data[newUser]['name'];
            userEmail = user_data[newUser]['email'];
            response.cookie("login", displayName).send;
            response.cookie("email", userEmail).send;
            response.redirect("/");
        } else {
            str = 'registration failed';
            response.send(str);
        }
    } else {
        str = 'user already exists';
        response.send(str);
    }
});

expressApp.get("/cart", function (request, response) {
    contents = fs.readFileSync('./secure/cart.html', 'utf-8');
    response.send(contents);
});

expressApp.get("/checkout", function (request, response) {
    contents = fs.readFileSync('./secure/checkout.html', 'utf-8');
    response.send(contents);
});

expressApp.get("/invoice", function (request, response) {
    contents = fs.readFileSync('./secure/invoice.html', 'utf-8');
    response.send(contents);
});

expressApp.post("/order_confirmation", function (request, response) {
    var emailToSend = request.cookies.email;
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465, // Google's SSL port
        auth: {
            user: 'captainblue808@gmail.com',
            pass: 'mcaocarcuqtaggsl'
        }
    });
    const message = {
        from: 'captainblue808@gmail.com', // Sender address
        to: `${emailToSend}`,         // List of recipients
        subject: "Your purchase receipt from Russel's Store", // Subject line
        text: 'EMAIL' // Plain text body
    };
    transporter.sendMail(message, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
    contents = fs.readFileSync('./secure/confirm.html', 'utf-8');
    response.send(contents);
});

expressApp.get("/get_cookie", function (request, response) {
    contents = request.cookies;
    response.send(contents);
});

expressApp.get("/session_check", function (request, response) {
    contents = request.session.id;
    response.send(contents);
});

expressApp.get("/logout", function (request, response) {
    response.clearCookie('login');
    response.clearCookie('email');
    request.session.destroy();
    response.redirect('/');
})

expressApp.listen(8080, () => console.log(`listening on port 8080`));