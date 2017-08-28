
var argv = require('minimist')(process.argv.slice(2));
var badgeData = argv['d'];

var robot = require("robotjs");

var readline = require('readline');



var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
console.log('Type "b" to emulate badge scanning');
rl.on('line', (line) => {
  console.log(`typed '${line}'`);
  if (line == 'b') {
    console.log('within 3 seconds, focus the browser window')
    setTimeout(() => {
      robot.typeString(badgeData);
      robot.keyTap("enter");
      console.log(`"${badgeData}" + ENTER emulated`)
    }, 3000);
  }
});





// Type "Hello World" then press enter.
