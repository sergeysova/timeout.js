# timeout.js

[![GitHub stars](https://img.shields.io/github/stars/lestad/timeout.js.svg)](https://github.com/lestad/timeout.js/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/lestad/timeout.js.svg)](https://github.com/lestad/timeout.js/network)
[![npm](https://img.shields.io/npm/dm/timeout.js.svg?maxAge=2592000)](https://npmjs.com/timeout.js)
[![GitHub issues](https://img.shields.io/github/issues/lestad/timeout.js.svg?maxAge=2592000)]()
[![Maintainer](https://img.shields.io/badge/maintainer-lestad-blue.svg)](https://lestad.top)

## Readme

[![Code Climate](https://codeclimate.com/github/LestaD/timeout.js/badges/gpa.svg)](https://codeclimate.com/github/LestaD/timeout.js)
[![Test Coverage](https://codeclimate.com/github/LestaD/timeout.js/badges/coverage.svg)](https://codeclimate.com/github/LestaD/timeout.js/coverage)
[![Issue Count](https://codeclimate.com/github/LestaD/timeout.js/badges/issue_count.svg)](https://codeclimate.com/github/LestaD/timeout.js)
[![Build Status](https://travis-ci.org/LestaD/timeout.js.svg?branch=master)](https://travis-ci.org/LestaD/timeout.js)
[![David](https://img.shields.io/david/dev/lestad/timeout.js.svg?maxAge=2592000)]()

Simple promise-based timeout

## Installation

[![npm](https://img.shields.io/npm/v/timeout.js.svg?maxAge=2592000)](https://npmjs.com/timeout.js)
[![Minimum node](https://img.shields.io/badge/engines-node%20%3E%3D%204-green.svg)](https://github.com/LestaD/timeout.js/blob/master/package.json)

[![NPM](https://nodei.co/npm/timeout.js.png?compact=true)](https://nodei.co/npm/timeout.js/)

```bash
npm install --save timeout.js
```

## Usage

```js
const timeout = require('timeout.js');

// call then callback after 200ms
timeout(200).then(() => console.log('Okey'));

// call catch after .break() called
const exm = timeout(1000);

exm.then(() => console.log('Called!'))
  .catch(() => console.log('Breaked!'));

// stop timeout and reject promise
exm.break();


// resolve data after time out
timeout(500, "Data to be resolved")
  .then(data => console.log(data));
```

### Async/Await

```js
import timeout from 'timeout.js'

function withData() {
  return timeout(300, 'data')
}

async function main() {
  await timeout(200)
  console.log('After 200 ms')

  const data = await withData()
  console.log(`After 0.5s with ${data}`)
}

main()
```

### Timeout chaining

```js
const timeout = require('timeout.js');

timeout(300, 'data')
.then(data => timeout(100, data))
.then(timeout.make(100)) // simple
.then(data => {
  assert(data === 'data');
})
.catch(error => console.error(error));


// create timeout with predefined time
const out = timeout.make(200);

out().then(() => element.hide());


// with data
const waitFor = timeout.make(500);

waitFor({ user: 123 })
.then(user => request('/user', user))
.then(response => console.log(response.user))
.catch(error => debug(error));

// make timeout with predefined data
const waitData = timeout.make(100, 'data');

waitData()
.then(data => data === 'data');


// override

waitData('foo')
.then(data => data === 'foo');
```


## License

[![license](https://img.shields.io/github/license/lestad/timeout.js.svg?maxAge=2592000)]()

    Copyright © 2016 Sergey Sova <i.am@lestad.net>
    This work is free. You can redistribute it and/or modify it under the
    terms of the Do What The Fuck You Want To Public License, Version 2,
    as published by Sam Hocevar. See the COPYING file or http://www.wtfpl.net/
    for more details.
