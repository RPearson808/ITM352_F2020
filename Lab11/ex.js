
function years_til_retire (retire_year){
    this_year = 2020;
    return retire_year - this_year;
}

reitrement_target = 2077;
retirement_year = years_til_retire(reitrement_target);

console.log("I am going to retire in " + retirement_year + " years.");

/* //the following below works but considered "bad programming"
this_year = 1980;

reitrement_target = 2077;
retirement_year = years_til_retire(reitrement_target);

console.log("I am going to retire in " + retirement_year + " years.");

function years_til_retire (retire_year){
    this_year = 2020;
    return retire_year - this_year;
}
*/