var express = require('express');
var app = express();
var myParser = require("body-parser");

app.use(express.static('./public'));
app.use(myParser.urlencoded({ extended: true}));

function isNonNegInt(stringToCheck, returnErrors = false) {
    errors = []; // assume no errors at first
    if (Number(stringToCheck) != stringToCheck) errors.push('Not a number!'); // Check if string is a number value
    if (stringToCheck < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(stringToCheck) != stringToCheck) errors.push('Not an integer!'); // Check that it is an integer

    return returnErrors ? errors : (errors.length == 0);
}

app.all('*', function (request, response, next) {
    response.send(request.method + ' to path ' + request.path);
    next();
});

app.use(myParser.urlencoded({ extended: true }));
app.post("/process_form", function (request, response) {
    console.log("Got POST process_form");
   let POST = request.body;
   //response.send(POST); 
   if (typeof POST['quantity_textbox'] != 'undefined') {
       qty = POST["quantity_textbox"];
       console.log(qty);
       if (isNonNegInt(qty, false)) {
        response.send(`Thank you for purchasing ${userInput} items!`);
        //window.stop();           
       } else {
           response.send(`${qty} is not a valid quantity!  Please go back to the previous page and try again.`)
       }
   }
});

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here