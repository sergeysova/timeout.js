
var tm = require('../lib/timeout');

tm(100).then(() => console.log('Timeout 100ms'))
.catch(e => console.error(e))

var d = tm(400);
d.then(() => console.error('ERROR! Called then after break!'));
d.catch(() => console.log('OK. successfully breaked'));
d.break();

var a = tm(100)
.then(() => console.log('1. ok'))
.then(() => console.log('2. ok'))
.then(() => console.log('3. all ok'));

var b = tm(200, "ok, return good")
.then(c => console.log(c))
.catch(e => console.error('Fail:', e));


