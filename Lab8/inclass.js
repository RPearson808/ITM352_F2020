var count = 0; //where we are dropping
var target = 10; //where we wanna end
//program
console.log("Let count lines of code with The Count.");
while (count <= target && count != target/2) {
    console.log(`We have ${count}! ${count} lines of code ah-hah-hah.`);
    count++;
}
//for loop
console.log("This time let's try counting with a For loop.")
for (count =1; target >= count; count++){
    console.log(`The number ${count} was brought to you by the For loop.`)
}
//whatever Kazman is doing
console.log("Now I'm motivated!");
for (count = target*11; count > 0; count--) {
    console.log("Value=" + count);
}