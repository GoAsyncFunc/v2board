let legacyModule = module,
  legacyExports = exports;
var r = require("./6d725347.js"),
  i = require("./792b5674.js"),
  o = require("./5142737a.js"),
  a = require("./536a3969.js"),
  s = [],
  l = function () {
    function e() {
      this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.cpx1 = 0, this.cpy1 = 0, this.percent = 1;
    }
    return e;
  }();
function c(e, t, n) {
  var r = e.cpx2,
    i = e.cpy2;
  return null != r || null != i ? [(n ? a["b"] : a["a"])(e.x1, e.cpx1, e.cpx2, e.x2, t), (n ? a["b"] : a["a"])(e.y1, e.cpy1, e.cpy2, e.y2, t)] : [(n ? a["i"] : a["h"])(e.x1, e.cpx1, e.x2, t), (n ? a["i"] : a["h"])(e.y1, e.cpy1, e.y2, t)];
}
var u = function (e) {
  function t(t) {
    return e.call(this, t) || this;
  }
  return Object(r["a"])(t, e), t.prototype.getDefaultStyle = function () {
    return {
      stroke: "#000",
      fill: null
    };
  }, t.prototype.getDefaultShape = function () {
    return new l();
  }, t.prototype.buildPath = function (e, t) {
    var n = t.x1,
      r = t.y1,
      i = t.x2,
      o = t.y2,
      l = t.cpx1,
      c = t.cpy1,
      u = t.cpx2,
      h = t.cpy2,
      f = t.percent;
    0 !== f && (e.moveTo(n, r), null == u || null == h ? (f < 1 && (Object(a["n"])(n, l, i, f, s), l = s[1], i = s[2], Object(a["n"])(r, c, o, f, s), c = s[1], o = s[2]), e.quadraticCurveTo(l, c, i, o)) : (f < 1 && (Object(a["g"])(n, l, u, i, f, s), l = s[1], u = s[2], i = s[3], Object(a["g"])(r, c, h, o, f, s), c = s[1], h = s[2], o = s[3]), e.bezierCurveTo(l, c, u, h, i, o)));
  }, t.prototype.pointAt = function (e) {
    return c(this.shape, e, !1);
  }, t.prototype.tangentAt = function (e) {
    var t = c(this.shape, e, !0);
    return o["k"](t, t);
  }, t;
}(i["b"]);
u.prototype.type = "bezier-curve", legacyExports["a"] = u;
