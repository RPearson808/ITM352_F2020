var number = 1; //counter for age
var myage = 25; //my age

console.log("Initializing age counter program part B...");
number = 0; //reset number for new parameters
while (number < myage) {
    number++;
    if (number >= myage/2 && number <= myage*0.75) {
        console.log (" ");
    } else {
        console.log(`Age=${number}`);
    }
}
console.log("Ages 13-18 were my most awkward years, so we'll skip those.");