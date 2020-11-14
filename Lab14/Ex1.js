var fs = require('fs');
var filename = "user_data.json";

raw_data = fs.readFileSync(filename, 'utf-8');
user_data = JSON.parse(raw_data);

console.log(user_data);