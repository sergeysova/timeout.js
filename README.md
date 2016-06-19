# Readme

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
```


## License

    Copyright © 2016 Sergey Sova <i.am@lestad.net>
    This work is free. You can redistribute it and/or modify it under the
    terms of the Do What The Fuck You Want To Public License, Version 2,
    as published by Sam Hocevar. See the COPYING file or http://www.wtfpl.net/
    for more details.
