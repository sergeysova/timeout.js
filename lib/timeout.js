
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

  then(f, c) {
    this._pm.promise.then(f, c);
    return this;
  }

  catch(f) {
    this._pm.promise.catch(f);
    return this;
  }

  chain(f) {
    this._pm.promise.chain(f);
    return this;
  }
}


module.exports =
function timeout(milliseconds, resolveData) {
  if (typeof milliseconds !== 'number') {
    throw new TypeError('Milliseconds not a number');
  }

  if (milliseconds < 0) {
    throw new Error('Timeout must be more than 0')
  }

  var pmtm = new Timeout(milliseconds, resolveData);
  return pmtm;
}
