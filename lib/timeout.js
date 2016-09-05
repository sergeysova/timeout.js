"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timeout = function () {
  function Timeout(ms, rs) {
    var _this = this;

    _classCallCheck(this, Timeout);

    this._pm = new Promise(function (resolve, reject) {
      this._res = resolve;
      this._rej = reject;
    }.bind(this));
    this._tm = setTimeout(function () {
      return _this._res(rs);
    }, ms);
  }

  _createClass(Timeout, [{
    key: 'break',
    value: function _break() {
      clearTimeout(this._tm);
      this._pm.catch(function (err) {
        return null;
      });
      this._rej();
      return this;
    }
  }, {
    key: 'then',
    value: function then(func, ctch) {
      this._pm.then(func, ctch);
      return this;
    }
  }, {
    key: 'catch',
    value: function _catch(func) {
      this._pm.catch(func);
      return this;
    }
  }, {
    key: 'chain',
    value: function chain(func) {
      this._pm.chain(func);
      return this;
    }
  }]);

  return Timeout;
}();

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

timeout.make = function (milliseconds, data) {
  return function (override) {
    return timeout(milliseconds, override || data);
  };
};