var fs = require('fs');
var filename = "user_data.json";

raw_data = fs.readFileSync(filename, 'utf-8');
user_data = JSON.parse(raw_data);

username = 'newuser';
user_data[username] = {};
user_data[username].name = "Joe Schmoe";
user_data[username].password = "a";
user_data[username].email = "joe@schmoe.com";

data = JSON.stringify(user_data);
fs.writeFileSync(filename, data, 'utf-8');
