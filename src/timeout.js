"use strict";

class Timeout {
  constructor(ms, rs) {
    this._pm = Promise.defer();
    this._tm = setTimeout(() => this._pm.resolve(rs), ms);
  }

  break() {
    clearTimeout(this._tm);
    this._pm.reject();
    return this;
  }

  then(func, ctch) {
    return this._pm.promise.then(func, ctch);
  }

  catch(func) {
    return this._pm.promise.catch(func);
  }

  chain(func) {
    return this._pm.promise.chain(func);
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
