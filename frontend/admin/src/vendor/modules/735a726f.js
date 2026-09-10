let legacyModule = module,
  legacyExports = exports;
var r = require("./6c6d3052.js"),
  i = Object.keys || function (e) {
    var t = [];
    for (var n in e) t.push(n);
    return t;
  };
legacyModule.exports = h;
var o = Object.create(require("./4f6e7a30.js"));
o.inherits = require("./5037584d.js");
var a = require("./72584675.js"),
  s = require("./33425273.js");
o.inherits(h, a);
for (var l = i(s.prototype), c = 0; c < l.length; c++) {
  var u = l[c];
  h.prototype[u] || (h.prototype[u] = s.prototype[u]);
}
function h(e) {
  if (!(this instanceof h)) return new h(e);
  a.call(this, e), s.call(this, e), e && !1 === e.readable && (this.readable = !1), e && !1 === e.writable && (this.writable = !1), this.allowHalfOpen = !0, e && !1 === e.allowHalfOpen && (this.allowHalfOpen = !1), this.once("end", f);
}
function f() {
  this.allowHalfOpen || this._writableState.ended || r.nextTick(d, this);
}
function d(e) {
  e.end();
}
Object.defineProperty(h.prototype, "writableHighWaterMark", {
  enumerable: !1,
  get: function () {
    return this._writableState.highWaterMark;
  }
}), Object.defineProperty(h.prototype, "destroyed", {
  get: function () {
    return void 0 !== this._readableState && void 0 !== this._writableState && this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (e) {
    void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = e, this._writableState.destroyed = e);
  }
}), h.prototype._destroy = function (e, t) {
  this.push(null), this.end(), r.nextTick(t, e);
};
