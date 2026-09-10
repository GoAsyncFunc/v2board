let legacyModule = module,
  legacyExports = exports;
var r = require("./6d725347.js"),
  i = require("./7a544d70.js"),
  o = require("./73532f72.js"),
  a = {},
  s = function (e) {
    function t() {
      var n = null !== e && e.apply(this, arguments) || this;
      return n.type = t.type, n;
    }
    return Object(r["a"])(t, e), t.prototype.render = function (t, n, r, o) {
      this.axisPointerClass && i["b"](t), e.prototype.render.apply(this, arguments), this._doUpdateAxisPointerClass(t, r, !0);
    }, t.prototype.updateAxisPointer = function (e, t, n, r) {
      this._doUpdateAxisPointerClass(e, n, !1);
    }, t.prototype.remove = function (e, t) {
      var n = this._axisPointer;
      n && n.remove(t);
    }, t.prototype.dispose = function (t, n) {
      this._disposeAxisPointer(n), e.prototype.dispose.apply(this, arguments);
    }, t.prototype._doUpdateAxisPointerClass = function (e, n, r) {
      var o = t.getAxisPointerClass(this.axisPointerClass);
      if (o) {
        var a = i["d"](e);
        a ? (this._axisPointer || (this._axisPointer = new o())).render(e, a, n, r) : this._disposeAxisPointer(n);
      }
    }, t.prototype._disposeAxisPointer = function (e) {
      this._axisPointer && this._axisPointer.dispose(e), this._axisPointer = null;
    }, t.registerAxisPointerClass = function (e, t) {
      a[e] = t;
    }, t.getAxisPointerClass = function (e) {
      return e && a[e];
    }, t.type = "axis", t;
  }(o["a"]);
legacyExports["a"] = s;
