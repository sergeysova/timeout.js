"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timeout = function () {
  function Timeout(ms, rs) {
    var _this = this;

    _classCallCheck(this, Timeout);

    this._pm = Promise.defer();
    this._tm = setTimeout(function () {
      return _this._pm.resolve(rs);
    }, ms);
  }

  _createClass(Timeout, [{
    key: 'break',
    value: function _break() {
      clearTimeout(this._tm);
      this._pm.reject();
      return this;
    }
  }, {
    key: 'then',
    value: function then(f, c) {
      this._pm.promise.then(f, c);
      return this;
    }
  }, {
    key: 'catch',
    value: function _catch(f) {
      this._pm.promise.catch(f);
      return this;
    }
  }, {
    key: 'chain',
    value: function chain(f) {
      this._pm.promise.chain(f);
      return this;
    }
  }]);

  return Timeout;
}();

module.exports = function timeout(milliseconds, resolveData) {
  if (typeof milliseconds !== 'number') {
    throw new TypeError('Milliseconds not a number');
  }

  if (milliseconds < 0) {
    throw new Error('Timeout must be more than 0');
  }

  var pmtm = new Timeout(milliseconds, resolveData);
  return pmtm;
};