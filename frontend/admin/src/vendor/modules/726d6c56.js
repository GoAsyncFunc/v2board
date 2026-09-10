let legacyModule = module,
  legacyExports = exports;
var r = require("./6d725347.js"),
  i = require("./792b5674.js"),
  o = function () {
    function e() {
      this.cx = 0, this.cy = 0, this.rx = 0, this.ry = 0;
    }
    return e;
  }(),
  a = function (e) {
    function t(t) {
      return e.call(this, t) || this;
    }
    return Object(r["a"])(t, e), t.prototype.getDefaultShape = function () {
      return new o();
    }, t.prototype.buildPath = function (e, t) {
      var n = .5522848,
        r = t.cx,
        i = t.cy,
        o = t.rx,
        a = t.ry,
        s = o * n,
        l = a * n;
      e.moveTo(r - o, i), e.bezierCurveTo(r - o, i - l, r - s, i - a, r, i - a), e.bezierCurveTo(r + s, i - a, r + o, i - l, r + o, i), e.bezierCurveTo(r + o, i + l, r + s, i + a, r, i + a), e.bezierCurveTo(r - s, i + a, r - o, i + l, r - o, i), e.closePath();
    }, t;
  }(i["b"]);
a.prototype.type = "ellipse", legacyExports["a"] = a;
