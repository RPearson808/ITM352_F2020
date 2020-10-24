//exercise 4
var val = ["2", "-3", "asdf", "-3.14156", "5"];

function isNonNegInt (stringToCheck, returnErrors = false) {
    errors = []; // assume no errors at first
    if(Number(stringToCheck) != stringToCheck) errors.push('Not a number!'); // Check if string is a number value
    if(stringToCheck < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(stringToCheck) != stringToCheck) errors.push('Not an integer!'); // Check that it is an integer

    return returnErrors ? errors : (errors.length == 0);
}

console.log("------Exercise 4-----");
for (i=0; i < val.length; i++) {
    console.log("String \'" + val[i] + "\' is " + isNonNegInt(val[i],true).join("||"));
}

//exercise 5
console.log("------Exercise 5-----");
values.forEach (item, index) {
    errorsReturned = isNonNegInt(item, true).join("||");
    if (errorsReturned.length == 0) {
        console.log("String \'" + item + "\' is valid.");
    } else {
        console.log((typeof item == 'string' && item.length > 0)?true:false);
    }
}

function callback(item, index) {
    errorsReturned = isNonNegInt(item, true).join("||");
    console.log("String \'" + val[i] + "\' is " + isNonNegInt(val[i],true).join("||"));
}

val.forEach(callback);