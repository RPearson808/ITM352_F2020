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

// initalize products
var product_data = require('./public/products.js');
var products = product_data.products_array;

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

expressApp.post("/invoice", function (request, response) {
    POST = request.body;
    creditCard = POST['credit_card'];
    response.cookie('creditCard', creditCard);
    firstName = POST['first_name'];
    response.cookie('firstName', firstName);
    lastName = POST['last_name'];
    response.cookie('lastName', lastName);
    address1 = POST['address1'];
    response.cookie('address1', address1);
    address2 = POST['address2'];
    response.cookie('address2', address2);
    city = POST['city'];
    response.cookie('city', city);
    stateCode = POST['state'];
    response.cookie('stateCode', stateCode);
    postalCode = POST['postal_code'];
    response.cookie('postalCode', postalCode);
    contents = fs.readFileSync('./secure/invoice.html', 'utf-8');
    contents += `Shipping To: <br>
                ${firstName} ${lastName} <br>
                ${address1} ${address2} <br>
                ${city}, ${stateCode} ${postalCode}
                `;
    response.send(contents);
});

expressApp.get("/order_confirmation", function (request, response) {
    emailToSend = request.cookies.email;
    fname = request.cookies.firstName;
    lname = request.cookies.lastName;
    address1 = request.cookies.address1;
    address2 = request.cookies.address2;
    city = request.cookies.city;
    state = request.cookies.stateCode;
    zip = request.cookies.postalCode;
    creditcard = request.cookies.creditCard;
    var customerName = request.cookies.login;
    var shipName = fname + " " + lname;
    var address = address1 + " " + address2;
    var city_state_zip = city + ", " + state + " " + zip;
    var lastFourCC = creditcard.substr(-4);
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
        subject: "Thank you for shopping at Russel's store!", // Subject line
        text: `Aloha ${customerName},
        
Mahalo for shopping at our store!  You can expect your order to be delieved in 5-7 business days.
        
As a reminder, this is the address we will be shipping to:
${shipName}
${address}
${city_state_zip}

We will be charging the credit card ending in ${lastFourCC}.  
        
Mahalo again for shopping with us ${customerName}!` // Plain text body
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
    response.clearCookie('firstName');
    response.clearCookie('lastName');
    response.clearCookie('address1');
    response.clearCookie('address2');
    response.clearCookie('city');
    response.clearCookie('stateCode');
    response.clearCookie('postalCode');
    response.clearCookie('creditCard');
});

expressApp.get("/logout", function (request, response) {
    response.clearCookie('login');
    response.clearCookie('email');
    request.session.destroy();
    response.redirect('/');
});

expressApp.get("/get_cookie", function (request, response) { // for checking cookies
    contents = request.cookies;
    response.send(contents);
});

expressApp.get("/session_check", function (request, response) { // for checking session ID
    contents = request.session.id;
    response.send(contents);
})

expressApp.listen(8080, () => console.log(`listening on port 8080`));