let legacyModule = module,
  legacyExports = exports;
var r = require("./6d725347.js"),
  i = require("./792b5674.js"),
  o = require("./6e506e68.js"),
  a = {},
  s = function () {
    function e() {
      this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.percent = 1;
    }
    return e;
  }(),
  l = function (e) {
    function t(t) {
      return e.call(this, t) || this;
    }
    return Object(r["a"])(t, e), t.prototype.getDefaultStyle = function () {
      return {
        stroke: "#000",
        fill: null
      };
    }, t.prototype.getDefaultShape = function () {
      return new s();
    }, t.prototype.buildPath = function (e, t) {
      var n, r, i, s;
      if (this.subPixelOptimize) {
        var l = Object(o["b"])(a, t, this.style);
        n = l.x1, r = l.y1, i = l.x2, s = l.y2;
      } else n = t.x1, r = t.y1, i = t.x2, s = t.y2;
      var c = t.percent;
      0 !== c && (e.moveTo(n, r), c < 1 && (i = n * (1 - c) + i * c, s = r * (1 - c) + s * c), e.lineTo(i, s));
    }, t.prototype.pointAt = function (e) {
      var t = this.shape;
      return [t.x1 * (1 - e) + t.x2 * e, t.y1 * (1 - e) + t.y2 * e];
    }, t;
  }(i["b"]);
l.prototype.type = "line", legacyExports["a"] = l;
