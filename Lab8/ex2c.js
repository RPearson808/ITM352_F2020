var number = 1; //counter for age
var myage = 25; //my age

console.log("Initializing age counter program part C...");
while (number < myage) {
    number++;
    console.log(`Age=${number}`);
    if (number > myage/2) {
        console.log("Don't ask how old I am!");
        break;
    }
}