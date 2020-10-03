var number = 1; //counter for age
var myage = 25; //my age

console.log("Initializing age counter program part B...");
while (number < myage) {
    number++;
    if (number >= myage/2 && number <= myage*0.75) {
        console.log("No age zone!");
        continue;
    }
    console.log(`Age=${number}`);
}