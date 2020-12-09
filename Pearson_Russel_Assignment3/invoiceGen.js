// product initialization
var product_data = require('./public/products.js');
var products= product_data.products_array;
//variable initialization for functions
var subtotal = 0;
var taxRate = 0.035;
var visibleTaxRate = taxRate * 100;
var tax = 0;
// webpage modules
var express = require('express');
var expressApp = express();
var bodyParser = require("body-parser");

// telling express what folder to serve
expressApp.use(express.static('./public'));
expressApp.use( bodyParser.urlencoded({ extended: true }) );

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

// process_quantity_form function from Lab13 modified to handle the invoice creation
function server_side_invoice(POST, response) {
    if (typeof POST['purchase_submit_button'] != 'undefined') {
        //var contents = fs.readFileSync('./public/invoice.view', 'utf-8');
        invoice = "<table border=2><tr><th>Item</th><th>Quantity</th><th>Price</th><th>Extended Price</th></tr>"
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
        // server will now send the invoice to user
        response.send(invoice);
        response.end();
    }
}

expressApp.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

expressApp.post("/process_form", function (request, response) {
    console.log("POST was sucessful");
    let POST = request.body;
    server_side_invoice(POST, response);
});