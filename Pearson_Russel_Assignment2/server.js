// product initialization
var product_data = require('./public/products.js');
var products = product_data.products_array;
//variable initialization for functions
var subtotal = 0;
var taxRate = 0.035;
var visibleTaxRate = taxRate * 100;
var tax = 0;
var invoice = '';
// webpage modules
var express = require('express');
var expressApp = express();
var bodyParser = require("body-parser");
var fs = require('fs');
const { response } = require('express');
// init for user data
var userDatabase = 'user_data.json';
var username_from_form = '';

// bringing over isNonNegInt from Lab12 w/ some changes
function isNonNegInt(stringToCheck, returnErrors = false) {
    errors = []; // Assume no errors at first
    // First check if string is a number value
    if (Number(stringToCheck) != stringToCheck) errors.push('Please enter a valid number.');
    // Then check if it is non-negative
    if (stringToCheck < 0) errors.push('Please enter a non-negative amount.');
    // Finally check that it is an integer
    if (parseInt(stringToCheck) != stringToCheck) errors.push('Please enter an amount without any decimals.');

    return returnErrors ? errors : (errors.length == 0);
}
// below is the server for the webpage and for handling login/registration

// telling express what folder to serve & body parser for url
expressApp.use(express.static('./public'));
expressApp.use(bodyParser.urlencoded({ extended: true }));

// for allowing server to read user_data.json
if (fs.existsSync(userDatabase)) {
    var raw_data = fs.readFileSync(userDatabase, 'utf-8');
    var user_data = JSON.parse(raw_data);
    //console.log(user_data); // this is just to see if it reads user_data correctly
} else {
    console.log("ERROR: Unable to read file " + userDatabase);
    exit();
}

expressApp.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

expressApp.post("/process_form", function (request, response) {
    console.log("POST was sucessful for invoice");
    let POST = request.body;
    server_side_invoice(POST, response);
    response.redirect("login"); // purchase will now redirect to login page
});
// with new response.redirect for process_form, users will now need to successfully log in first before being shown the invoice
expressApp.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<h3>Please log into your account to finish processing your order.</h3>
<form action="/login" method="POST">
<input type="text" name="username" size="40" placeholder="enter username"><br>
<input type="password" name="password" size="40" placeholder="enter password"><br>
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
});

expressApp.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log("Got a POST login request");
    POST = request.body; // this will request from both username and password fields
    username_from_form = POST['username'].toLowerCase();
    password_from_form = POST['password'];
    if (typeof user_data[username_from_form] == 'undefined') {
        response.send   (`
                            It looks like we couldn't find an account with that name, please click the button below to register and create an account.<br>
                            <button onclick="location.href='/register'">Register</button>
                        `);
    } else if (username_from_form == user_data[username_from_form].username && password_from_form != user_data[username_from_form].password) {
        response.send('The password was incorrect, please go back and re-enter your password.');
    } else if (username_from_form == user_data[username_from_form].username && password_from_form == user_data[username_from_form].password) {
        response.send(invoice);
    } else {
        response.send('An error has ocurred, please go back to the previously working page.');
    }
});

// this is the register form for new users  
expressApp.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body>
<h3>We couldn't find any matching account data.  Please create an account to finish processing your order!</h3><br>
<form action="/register" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br>
<input type="password" name="password" size="40" placeholder="enter password"><br>
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br>
<input type="text" name="name" size="40" placeholder="enter your first and last name"><br>
<input type="email" name="email" size="40" placeholder="enter email"><br>
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

 expressApp.post("/register", function (request, response) {
    // process a simple register form
    POST = request.body;
    if (POST['username'] != undefined && POST['password'] != undefined) {
        if (POST['username'] != user_data['username'] && POST['password'] == POST['repeat_password']) {
        username = POST['username'].toLowerCase();
        user_data[username] = {};
        user_data[username].username = POST['username'];
        user_data[username].password = POST['password'];
        user_data[username].name = POST['name']
        user_data[username].email = POST['email'];

        data = JSON.stringify(user_data);
        fs.writeFileSync(userDatabase, data, 'utf-8');
        
        response.send(invoice);
        }
    } else {
        response.send(`Please go back to the register page.`);
    }
 });
 
// process_quantity_form function from Lab13 modified to handle the invoice creation
function server_side_invoice(POST, response) {
    if (typeof POST['purchase_submit_button'] != 'undefined') {
        // start of invoice generation
        invoice = "<table border=2><tr><th>Item</th><th>Quantity</th><th>Price</th><th>Extended Price</th></tr>";
        let subtotal = 0; // so subtotal resets to 0 each time you go back or refresh the page
        let shipRate = 0.07; // default ship rate, will be used later to determine a variable shipping rate
        for (i in products) {
            let q = POST[`quantity_textbox${i}`]; //getting quantity inputted
            let name = products[i]["name"];
            let price = products[i]["price"];
            var extended_price = price * q; //initialized extended price inside the invoice generator
            if (isNonNegInt(q) && q > 0) { // for creating invoice item rows
                invoice += `<tr>
                            <td>${name}</td>
                            <td>${q}</td>
                            <td>$${price}</td>
                            <td>$${extended_price.toFixed(2)}</td>
                            </tr>`;
                subtotal += extended_price;
            } else { // allows invalid inputs to not mess up price
                extended_price = 0;
                subtotal += extended_price;
                continue;
            }
        };
        if (subtotal >= 3000) { // allows variable shipping rate
            shipRate = 0;
        } else if (subtotal >= 2000 && subtotal < 3000) {
            shipRate = 0.03;
        } else if (subtotal >= 1000 && subtotal < 2000) {
            shipRate = 0.05;
        }
        let shipPercent = shipRate * 100; // show customers shipping rate
        let shipCost = subtotal * shipRate; // shipping cost
        let tax = taxRate * subtotal;
        var grandTotal = subtotal + shipCost + tax;
        // this is all just so the invoice can finish generating the table
        invoice += "<tr></tr><tr></tr><tr></tr><tr></tr>"; // separator for rest of table
        invoice += `<tr><td>Subtotal</td><td>$${subtotal.toFixed(2)}</td></tr>`; //subtotal row
        invoice += `<tr><td>Shipping @ ${shipPercent.toFixed(0)}% of Subtotal</td><td>$${shipCost.toFixed(2)}</td></tr>`; //shipping cost row
        invoice += `<tr><td>Tax @ ${visibleTaxRate.toFixed(1)}% of Subtotal</td><td>$${tax.toFixed(2)}</td></tr>`; //tax row
        invoice += `<tr><td><b>Grand Total</b></td><td><b>$${grandTotal.toFixed(2)}</b></td></tr>`; //bolded grandtotal
        invoice += "</table>"; // end of table
        // last thing we will generate is the shipping policy
        invoice += `<h3>SHIPPING POLICY</h3>Due to the high price of these cards, we charge shipping based off your order subtotal - we don't apply sales tax on our shipping costs.
                    <br><br>* Shipping rates for orders under $1000 will charged 7% of their subtotal as shipping. 
                    <br>* Shipping rates for orders between $1000 and $1999 will charged 5% of their subtotal as shipping. 
                    <br>* Shipping rates for orders between $2000 $2999 will charged 3% of their subtotal as shipping. 
                    <br>* Shipping rates for orders over $3000 will <b>NOT</b> charged any shipping -- it's on us!`;
    }
} // removed response.send at end of function so only users that are logged on can purchase 

expressApp.listen(8080, () => console.log(`listening on port 8080`));