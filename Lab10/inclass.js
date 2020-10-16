var employees = ["Celopatra", "Gandhi", "Joan of Arc", "Abraham Lincoln", "JFK", "Jesus Christo"];
var my_kids = [["Kirk", 6, 59.5], ["Spock", 2, 35.2], ["McCoy", 19, 200]];
console.log(my_kids);
/*
var my_kid1 = {
    "name": "Kirk",
    "age": 6,
    "weight": 59.5
};

for (attrib in my_kid1) {
    console.log(my_kid1[attrib]); //[attrib] becomes the var within object my_kid1
    console.log(my_kid1.attrib); //.attrib is a secondary var name within object my_kid1
}

var my_kid2 = {
    "name": "Spock",
    "age": 2,
    "weight": 35.2
};

var my_kid3 = {
    "name": "McCoy",
    "age": 19,
    "weight": 200
};

console.log("Age of kid3 = " + my_kid3["age"]);
fav_kids = [my_kid1, my_kid2, my_kid3];


for (i=0; i < fav_kids.length; i++) {
    console.log("My kid " + fav_kids[i].name + ` is ${fav_kids[i].age} years old `);
}


for (i=0; i < my_kids.length; i++){
    console.log("My kid %s weighs %d pounds.", my_kids[i][0], my_kids[i][2]);
}
*/
for (i=0; i < employees.length; i++) {
    if (i%2 == 0) {
        console.log("Team 1 member: " + employees[i]);
    } else {
        console.log("Team 2 member: " + employees[i]);
    }
}

for (empl of employees){
    if (i%2 == 0) {
        console.log("Team 1 member: " + employees[i]);
    } else {
        console.log("Team 2 member: " + employees[i]);
    }
}