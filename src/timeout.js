"use strict";

class Timeout {
  constructor(ms, rs) {
    this._pm = new Promise(function(resolve, reject) {
      this._res = resolve;
      this._rej = reject;
    }.bind(this));
    this._tm = setTimeout(() => this._res(rs), ms);
  }

  break() {
    clearTimeout(this._tm);
    this._rej();
    return this;
  }

  then(func, ctch) {
    return this._pm.then(func, ctch);
  }

  catch(func) {
    return this._pm.catch(func);
  }

  chain(func) {
    return this._pm.chain(func);
  }
}

module.exports = timeout;

function timeout(milliseconds, resolveData) {
  if (typeof milliseconds !== 'number') {
    throw new TypeError('Milliseconds should be number');
  }

  if (milliseconds < 0) {
    throw new Error('Milliseconds should be more than 0');
  }

  return new Timeout(milliseconds, resolveData);
}

timeout.make = function(milliseconds, data) {
  return (override) => timeout(milliseconds, override || data);
}
