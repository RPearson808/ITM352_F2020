var number = 1; //counter for age
var myage = 25; //my age

console.log("Initializing age counter program part A...");
while (number <= myage) {
    console.log(`Age=${number}`);
    if (number > myage/2) {
        console.log("I'm old!");
        break;
    }
    number++;
}