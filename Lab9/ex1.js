var numyear = 1995;
var year = String(numyear);
var monthvalue = "June";
var month = "ERROR";
var day = 1;
var leapyear = "ERROR";
var weekday = "ERROR";

switch (monthvalue) {
    case 'January':
    month = 3;
    break;
    case 'February':
    month = 3;
    break;
    case 'March':
    month = 6;
    break;
    case 'April':
    month = 1;
    break;
    case 'May':
    month = 4;
    break
    case 'June':
    month = 6;
    break;
    case 'July':
    month = 2;
    break;
    case 'August':
    month = 5;
    break;
    case 'September':
    month = 0;
    break;
    case 'October':
    month = 3;
    break;
    case 'November':
    month = 5;
    break;
    case 'December':
    month = 1;
    break;
    default:
    month = 'ERROR WITH MONTH SWITCH'
    break;
}

if (numyear%4 == 0 && numyear%100 == 0 && numyear%400 == 0){
    leapyear = true;
} else if (numyear%4 == 0 && numyear%100 == 0 && numyear%400 != 0) {
    leapyear = false;
} else if (numyear%4 == 0 && numyear%100 != 0) {
    leapyear = true;
} else if (numyear%4 != 0) {
    leapyear = false;
} else {
    leapyear = "ERROR WITH LEAP YEAR IF";
}

if (leapyear == true) {
    console.log(`The year ${year} is a leap year.`);
} else if (leapyear == false) {
    console.log(`The year ${year} is not a leap year.`)
} else console.log("There was an error with variable leapyear.");

var lastTwo = year.slice(2,4);
var step1 = parseInt(lastTwo);
console.log(`1) The last two digits of the year are ${lastTwo}.`);
var step2 = parseInt(step1/4);
console.log(`2) ${step1} / 4 = ${step2}`);
var step3 = step1 + step2;
console.log(`3) ${step1} + ${step2} = ${step3}`);

if (monthvalue == "January") {
    var step5 = step3 + day;
    console.log(`5) ${step3} + ${day} = ${step5}`);
    var step8 = step5;
} else {
    var step4 = month;
    console.log(`4) Since my birthday is in ${monthvalue}, looking at the table the number associated with it is ${month}.`);
    var step6 = step4 + step3;
    console.log(`6) ${step4} + ${step3} = ${step6}`);
    var step7 = step6 + day;
    console.log(`7) ${step6} + ${day} = ${step7}`);
    var step8 = step7;
}

if (numyear < 3000 && numyear >= 2000 && leapyear == false) {
    var finaltotal = step8 - 1;
} else if (numyear < 3000 && numyear >= 2000 && leapyear == true) {
    if (monthvalue == "January" || monthvalue == "February"){
        var finaltotal = step8 - 2;
    } else {
        var finaltotal = step8 - 1;
    }
} else if (numyear < 2000 && numyear >= 1900 && leapyear == false) {
    var finaltotal = step8;
} else if (numyear < 2000 && numyear >= 1900 && leapyear == true) {
    if (monthvalue == "January" || monthvalue == "February") {
        var finaltotal = step8 - 1;
    } else {
        var finaltotal = step8;
    }
} else {
    var finaltotal = "Something went wrong...";
}
console.log(`8) The final total is ${finaltotal}.`);

if (finaltotal >= 7) {
    var step9 = finaltotal%7;
    console.log(`9) ${finaltotal} % 7 = ${step9}.`);
    } else {
        var step9 = finaltotal;
        console.log(`9) Using the final total, I can find the day of the week I was born.`);
    }

switch (step9) {
    case 0:
        weekday = "Sunday";
    break;
    case 1:
        weekday = "Monday";
    break;
    case 2:
        weekday = "Tuesday";
    break;
    case 3:
        weekday = "Wednesday";
    break;
    case 4:
        weekday = "Thursday";
    break;
    case 5:
        weekday = "Friday";
    break;
    case 6:
        weekday = "Sunday";
    break;
    default:
        weekday = "ERROR WITH WEEKDAY SWITCH";
    break;
}
console.log(`Since we got ${step9} as our remainder, I was born on ${weekday}.`);