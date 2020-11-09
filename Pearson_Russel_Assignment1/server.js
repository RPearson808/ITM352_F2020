// product initialization
var product_data = require('./public/products.js');
var products= product_data.products_array;
var maxQuantity = 0;
// using a for loop to dynamically find out total quantity of products
for (i=0; i < product_data.length; i++) {
    maxQuantity += product_data[i].quantity;
}
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
    // Finally check that it is an integer and a number value
    if (typeof stringToCheck == Number && parseInt(stringToCheck) != stringToCheck) errors.push('Please enter an amount without any decimals.');

    return returnErrors ? errors : (errors.length == 0);
}

expressApp.listen(8080, () => console.log(`listening on port 8080`));