let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = a;
var r = require("./735a726f.js"),
  i = Object.create(require("./4f6e7a30.js"));
function o(e, t) {
  var n = this._transformState;
  n.transforming = !1;
  var r = n.writecb;
  if (!r) return this.emit("error", new Error("write callback called multiple times"));
  n.writechunk = null, n.writecb = null, null != t && this.push(t), r(e);
  var i = this._readableState;
  i.reading = !1, (i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
}
function a(e) {
  if (!(this instanceof a)) return new a(e);
  r.call(this, e), this._transformState = {
    afterTransform: o.bind(this),
    needTransform: !1,
    transforming: !1,
    writecb: null,
    writechunk: null,
    writeencoding: null
  }, this._readableState.needReadable = !0, this._readableState.sync = !1, e && ("function" === typeof e.transform && (this._transform = e.transform), "function" === typeof e.flush && (this._flush = e.flush)), this.on("prefinish", s);
}
function s() {
  var e = this;
  "function" === typeof this._flush ? this._flush(function (t, n) {
    l(e, t, n);
  }) : l(this, null, null);
}
function l(e, t, n) {
  if (t) return e.emit("error", t);
  if (null != n && e.push(n), e._writableState.length) throw new Error("Calling transform done when ws.length != 0");
  if (e._transformState.transforming) throw new Error("Calling transform done when still transforming");
  return e.push(null);
}
i.inherits = require("./5037584d.js"), i.inherits(a, r), a.prototype.push = function (e, t) {
  return this._transformState.needTransform = !1, r.prototype.push.call(this, e, t);
}, a.prototype._transform = function (e, t, n) {
  throw new Error("_transform() is not implemented");
}, a.prototype._write = function (e, t, n) {
  var r = this._transformState;
  if (r.writecb = n, r.writechunk = e, r.writeencoding = t, !r.transforming) {
    var i = this._readableState;
    (r.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
  }
}, a.prototype._read = function (e) {
  var t = this._transformState;
  null !== t.writechunk && t.writecb && !t.transforming ? (t.transforming = !0, this._transform(t.writechunk, t.writeencoding, t.afterTransform)) : t.needTransform = !0;
}, a.prototype._destroy = function (e, t) {
  var n = this;
  r.prototype._destroy.call(this, e, function (e) {
    t(e), n.emit("close");
  });
};
