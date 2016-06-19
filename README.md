# Readme

[![Code Climate](https://codeclimate.com/github/LestaD/timeout.js/badges/gpa.svg)](https://codeclimate.com/github/LestaD/timeout.js)
[![Test Coverage](https://codeclimate.com/github/LestaD/timeout.js/badges/coverage.svg)](https://codeclimate.com/github/LestaD/timeout.js/coverage)
[![Issue Count](https://codeclimate.com/github/LestaD/timeout.js/badges/issue_count.svg)](https://codeclimate.com/github/LestaD/timeout.js)
[![Build Status](https://travis-ci.org/LestaD/timeout.js.svg?branch=master)](https://travis-ci.org/LestaD/timeout.js)

Simple promise-based timeout

## Installation

```bash
npm install --save timeout.js
```

## Usage

```js
const timeout = require('timeout.js');

// call then callback after 200ms
timeout(200).then(() => console.log('Okey'));

// call catch after .break() called
const exm = timeout(1000)
  .then(() => console.log('Called!'))
  .catch(() => console.log('Breaked!'));

exm.break();


// resolve data after time out
timeout(200, "Data to be resolved")
  .then(data => console.log(data));
```


## License

    Copyright © 2016 Sergey Sova <i.am@lestad.net>
    This work is free. You can redistribute it and/or modify it under the
    terms of the Do What The Fuck You Want To Public License, Version 2,
    as published by Sam Hocevar. See the COPYING file or http://www.wtfpl.net/
    for more details.
