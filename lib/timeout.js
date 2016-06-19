
class Timeout extends Promise {
  constructor(ms, rs) {
    let br;
    let tm;
    super((resolve, reject) => {
      br = () => reject();
      tm = setTimeout(() => resolve(rs), ms);
    });

    this._break = br;
    this._tm = tm;
  }

  break() {
    clearTimeout(this._tm);
    this._break();
    return this;
  }

  then(f, c) {
    super.then(f, c);
    return this;
  }

  catch(f) {
    super.catch(f);
    return this;
  }
}


module.exports =
function timeout(milliseconds, resolveData) {
  var pmtm = new Timeout(milliseconds, resolveData);
  return pmtm;
}
