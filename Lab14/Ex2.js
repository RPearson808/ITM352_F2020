var fs = require('fs');
const { getDefaultSettings } = require('http2');
var filename = "user_data.json";

if (fs.existsSync(filename)) {
    fileStats = fs.statSync(filename);
    console.log(`File ${filename} has ${fileStats.size} characters.`);
    raw_data = fs.readFileSync(filename, 'utf-8');
    user_data = JSON.parse(raw_data);

    console.log(user_data);
} else {
    console.log("ERROR: Unable to read file " + filename);
}