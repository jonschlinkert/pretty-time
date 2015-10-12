
var pretty = require('./');
var start = process.hrtime();
var time = process.hrtime(start);

console.log(pretty(time));
//=> 3μs

var t = [6740, 795428088];
console.log(pretty(t, 'h'));
//=> '2h'

console.log(pretty(t, 'm'));
//=> '1h 52m'

console.log(pretty(t, 's'));
//=> '1h 52m 21s'
