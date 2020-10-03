//Sum the numbers up to a specified integer
//Date: 09/30/20
//Author: Russel Pearson

var target = 5; //limit for sum of numbers
var counter = 1; //counter for loop
var sum = 0; //total of numbers added

console.log("Counting program intialized...");

while (counter <= target) {
    sum += counter;
    console.log(`Sum=${sum}`);
    counter++;
}

console.log(`Final Sum=${sum}`);

console.log("Trying second time using For loop...")
sum = 0;
for (counter = 5; counter > 0; counter=counter-2) {
    sum += counter;
    console.log(`Sum=${sum}`);
}

console.log(`Final Sum=${sum}`);