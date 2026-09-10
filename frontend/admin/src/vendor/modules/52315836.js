let legacyModule = module,
  legacyExports = exports;
var r = Math.round(9 * Math.random()),
  i = "function" === typeof Object.defineProperty,
  o = function () {
    function e() {
      this._id = "__ec_inner_" + r++;
    }
    return e.prototype.get = function (e) {
      return this._guard(e)[this._id];
    }, e.prototype.set = function (e, t) {
      var n = this._guard(e);
      return i ? Object.defineProperty(n, this._id, {
        value: t,
        enumerable: !1,
        configurable: !0
      }) : n[this._id] = t, this;
    }, e.prototype["delete"] = function (e) {
      return !!this.has(e) && (delete this._guard(e)[this._id], !0);
    }, e.prototype.has = function (e) {
      return !!this._guard(e)[this._id];
    }, e.prototype._guard = function (e) {
      if (e !== Object(e)) throw TypeError("Value of WeakMap is not a non-null object.");
      return e;
    }, e;
  }();
legacyExports["a"] = o;
