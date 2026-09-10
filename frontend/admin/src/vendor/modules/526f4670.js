let legacyModule = module,
  legacyExports = exports;
var r = require("./6c6d3052.js");
function i(e, t) {
  var n = this,
    i = this._readableState && this._readableState.destroyed,
    o = this._writableState && this._writableState.destroyed;
  return i || o ? (t ? t(e) : !e || this._writableState && this._writableState.errorEmitted || r.nextTick(a, this, e), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(e || null, function (e) {
    !t && e ? (r.nextTick(a, n, e), n._writableState && (n._writableState.errorEmitted = !0)) : t && t(e);
  }), this);
}
function o() {
  this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
}
function a(e, t) {
  e.emit("error", t);
}
legacyModule.exports = {
  destroy: i,
  undestroy: o
};
