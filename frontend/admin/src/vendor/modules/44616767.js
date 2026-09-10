let legacyModule = module,
  legacyExports = exports;
var r = require("./6d725347.js"),
  i = require("./47657637.js"),
  o = require("./6d464469.js"),
  a = require("./62597459.js"),
  s = Object(a["i"])({
    x: 0,
    y: 0
  }, i["b"]),
  l = {
    style: Object(a["i"])({
      x: !0,
      y: !0,
      width: !0,
      height: !0,
      sx: !0,
      sy: !0,
      sWidth: !0,
      sHeight: !0
    }, i["a"].style)
  };
function c(e) {
  return !!(e && "string" !== typeof e && e.width && e.height);
}
var u = function (e) {
  function t() {
    return null !== e && e.apply(this, arguments) || this;
  }
  return Object(r["a"])(t, e), t.prototype.createStyle = function (e) {
    return Object(a["g"])(s, e);
  }, t.prototype._getSize = function (e) {
    var t = this.style,
      n = t[e];
    if (null != n) return n;
    var r = c(t.image) ? t.image : this.__image;
    if (!r) return 0;
    var i = "width" === e ? "height" : "width",
      o = t[i];
    return null == o ? r[e] : r[e] / r[i] * o;
  }, t.prototype.getWidth = function () {
    return this._getSize("width");
  }, t.prototype.getHeight = function () {
    return this._getSize("height");
  }, t.prototype.getAnimationStyleProps = function () {
    return l;
  }, t.prototype.getBoundingRect = function () {
    var e = this.style;
    return this._rect || (this._rect = new o["a"](e.x || 0, e.y || 0, this.getWidth(), this.getHeight())), this._rect;
  }, t;
}(i["c"]);
u.prototype.type = "image", legacyExports["a"] = u;
