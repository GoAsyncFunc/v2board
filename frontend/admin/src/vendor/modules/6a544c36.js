let legacyModule = module,
  legacyExports = exports;
var r = require("./6d725347.js"),
  i = require("./792b5674.js"),
  o = function () {
    function e() {
      this.cx = 0, this.cy = 0, this.r = 0, this.startAngle = 0, this.endAngle = 2 * Math.PI, this.clockwise = !0;
    }
    return e;
  }(),
  a = function (e) {
    function t(t) {
      return e.call(this, t) || this;
    }
    return Object(r["a"])(t, e), t.prototype.getDefaultStyle = function () {
      return {
        stroke: "#000",
        fill: null
      };
    }, t.prototype.getDefaultShape = function () {
      return new o();
    }, t.prototype.buildPath = function (e, t) {
      var n = t.cx,
        r = t.cy,
        i = Math.max(t.r, 0),
        o = t.startAngle,
        a = t.endAngle,
        s = t.clockwise,
        l = Math.cos(o),
        c = Math.sin(o);
      e.moveTo(l * i + n, c * i + r), e.arc(n, r, i, o, a, !s);
    }, t;
  }(i["b"]);
a.prototype.type = "arc", legacyExports["a"] = a;
