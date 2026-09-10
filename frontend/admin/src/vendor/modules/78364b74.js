let legacyModule = module,
  legacyExports = exports;
var r = require("./6d725347.js"),
  i = require("./792b5674.js");
function o(e, t) {
  var n,
    r,
    i,
    o,
    a,
    s = t.x,
    l = t.y,
    c = t.width,
    u = t.height,
    h = t.r;
  c < 0 && (s += c, c = -c), u < 0 && (l += u, u = -u), "number" === typeof h ? n = r = i = o = h : h instanceof Array ? 1 === h.length ? n = r = i = o = h[0] : 2 === h.length ? (n = i = h[0], r = o = h[1]) : 3 === h.length ? (n = h[0], r = o = h[1], i = h[2]) : (n = h[0], r = h[1], i = h[2], o = h[3]) : n = r = i = o = 0, n + r > c && (a = n + r, n *= c / a, r *= c / a), i + o > c && (a = i + o, i *= c / a, o *= c / a), r + i > u && (a = r + i, r *= u / a, i *= u / a), n + o > u && (a = n + o, n *= u / a, o *= u / a), e.moveTo(s + n, l), e.lineTo(s + c - r, l), 0 !== r && e.arc(s + c - r, l + r, r, -Math.PI / 2, 0), e.lineTo(s + c, l + u - i), 0 !== i && e.arc(s + c - i, l + u - i, i, 0, Math.PI / 2), e.lineTo(s + o, l + u), 0 !== o && e.arc(s + o, l + u - o, o, Math.PI / 2, Math.PI), e.lineTo(s, l + n), 0 !== n && e.arc(s + n, l + n, n, Math.PI, 1.5 * Math.PI);
}
var a = require("./6e506e68.js"),
  s = function () {
    function e() {
      this.x = 0, this.y = 0, this.width = 0, this.height = 0;
    }
    return e;
  }(),
  l = {},
  c = function (e) {
    function t(t) {
      return e.call(this, t) || this;
    }
    return Object(r["a"])(t, e), t.prototype.getDefaultShape = function () {
      return new s();
    }, t.prototype.buildPath = function (e, t) {
      var n, r, i, s;
      if (this.subPixelOptimize) {
        var c = Object(a["c"])(l, t, this.style);
        n = c.x, r = c.y, i = c.width, s = c.height, c.r = t.r, t = c;
      } else n = t.x, r = t.y, i = t.width, s = t.height;
      t.r ? o(e, t) : e.rect(n, r, i, s);
    }, t.prototype.isZeroArea = function () {
      return !this.shape.width || !this.shape.height;
    }, t;
  }(i["b"]);
c.prototype.type = "rect";
legacyExports["a"] = c;
