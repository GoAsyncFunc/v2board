let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return d;
}), defineExport(legacyExports, "b", function () {
  return p;
});
var r = require("./466f6678.js"),
  i = require("./5142737a.js"),
  o = r["c"],
  a = 5e-5;
function s(e) {
  return e > a || e < -a;
}
var l = [],
  c = [],
  u = r["b"](),
  h = Math.abs,
  f = function () {
    function e() {}
    return e.prototype.getLocalTransform = function (t) {
      return e.getLocalTransform(this, t);
    }, e.prototype.setPosition = function (e) {
      this.x = e[0], this.y = e[1];
    }, e.prototype.setScale = function (e) {
      this.scaleX = e[0], this.scaleY = e[1];
    }, e.prototype.setSkew = function (e) {
      this.skewX = e[0], this.skewY = e[1];
    }, e.prototype.setOrigin = function (e) {
      this.originX = e[0], this.originY = e[1];
    }, e.prototype.needLocalTransform = function () {
      return s(this.rotation) || s(this.x) || s(this.y) || s(this.scaleX - 1) || s(this.scaleY - 1) || s(this.skewX) || s(this.skewY);
    }, e.prototype.updateTransform = function () {
      var e = this.parent && this.parent.transform,
        t = this.needLocalTransform(),
        n = this.transform;
      t || e ? (n = n || r["b"](), t ? this.getLocalTransform(n) : o(n), e && (t ? r["e"](n, e, n) : r["a"](n, e)), this.transform = n, this._resolveGlobalScaleRatio(n)) : n && o(n);
    }, e.prototype._resolveGlobalScaleRatio = function (e) {
      var t = this.globalScaleRatio;
      if (null != t && 1 !== t) {
        this.getGlobalScale(l);
        var n = l[0] < 0 ? -1 : 1,
          i = l[1] < 0 ? -1 : 1,
          o = ((l[0] - n) * t + n) / l[0] || 0,
          a = ((l[1] - i) * t + i) / l[1] || 0;
        e[0] *= o, e[1] *= o, e[2] *= a, e[3] *= a;
      }
      this.invTransform = this.invTransform || r["b"](), r["d"](this.invTransform, e);
    }, e.prototype.getComputedTransform = function () {
      var e = this,
        t = [];
      while (e) t.push(e), e = e.parent;
      while (e = t.pop()) e.updateTransform();
      return this.transform;
    }, e.prototype.setLocalTransform = function (e) {
      if (e) {
        var t = e[0] * e[0] + e[1] * e[1],
          n = e[2] * e[2] + e[3] * e[3],
          r = Math.atan2(e[1], e[0]),
          i = Math.PI / 2 + r - Math.atan2(e[3], e[2]);
        n = Math.sqrt(n) * Math.cos(i), t = Math.sqrt(t), this.skewX = i, this.skewY = 0, this.rotation = -r, this.x = +e[4], this.y = +e[5], this.scaleX = t, this.scaleY = n, this.originX = 0, this.originY = 0;
      }
    }, e.prototype.decomposeTransform = function () {
      if (this.transform) {
        var e = this.parent,
          t = this.transform;
        e && e.transform && (r["e"](c, e.invTransform, t), t = c);
        var n = this.originX,
          i = this.originY;
        (n || i) && (u[4] = n, u[5] = i, r["e"](c, t, u), c[4] -= n, c[5] -= i, t = c), this.setLocalTransform(t);
      }
    }, e.prototype.getGlobalScale = function (e) {
      var t = this.transform;
      return e = e || [], t ? (e[0] = Math.sqrt(t[0] * t[0] + t[1] * t[1]), e[1] = Math.sqrt(t[2] * t[2] + t[3] * t[3]), t[0] < 0 && (e[0] = -e[0]), t[3] < 0 && (e[1] = -e[1]), e) : (e[0] = 1, e[1] = 1, e);
    }, e.prototype.transformCoordToLocal = function (e, t) {
      var n = [e, t],
        r = this.invTransform;
      return r && i["b"](n, n, r), n;
    }, e.prototype.transformCoordToGlobal = function (e, t) {
      var n = [e, t],
        r = this.transform;
      return r && i["b"](n, n, r), n;
    }, e.prototype.getLineScale = function () {
      var e = this.transform;
      return e && h(e[0] - 1) > 1e-10 && h(e[3] - 1) > 1e-10 ? Math.sqrt(h(e[0] * e[3] - e[2] * e[1])) : 1;
    }, e.prototype.copyTransform = function (e) {
      p(this, e);
    }, e.getLocalTransform = function (e, t) {
      t = t || [];
      var n = e.originX || 0,
        i = e.originY || 0,
        o = e.scaleX,
        a = e.scaleY,
        s = e.anchorX,
        l = e.anchorY,
        c = e.rotation || 0,
        u = e.x,
        h = e.y,
        f = e.skewX ? Math.tan(e.skewX) : 0,
        d = e.skewY ? Math.tan(-e.skewY) : 0;
      if (n || i || s || l) {
        var p = n + s,
          m = i + l;
        t[4] = -p * o - f * m * a, t[5] = -m * a - d * p * o;
      } else t[4] = t[5] = 0;
      return t[0] = o, t[3] = a, t[1] = d * o, t[2] = f * a, c && r["f"](t, t, c), t[4] += n + u, t[5] += i + h, t;
    }, e.initDefaultProps = function () {
      var t = e.prototype;
      t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
    }(), e;
  }(),
  d = ["x", "y", "originX", "originY", "anchorX", "anchorY", "rotation", "scaleX", "scaleY", "skewX", "skewY"];
function p(e, t) {
  for (var n = 0; n < d.length; n++) {
    var r = d[n];
    e[r] = t[r];
  }
}
legacyExports["c"] = f;
