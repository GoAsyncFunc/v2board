let legacyModule = module,
  legacyExports = exports;
var r = require("./6d725347.js"),
  i = require("./792b5674.js"),
  o = function () {
    function e() {
      this.cx = 0, this.cy = 0, this.r = 0, this.r0 = 0;
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
      var n = t.cx,
        r = t.cy,
        i = 2 * Math.PI;
      e.moveTo(n + t.r, r), e.arc(n, r, t.r, 0, i, !1), e.moveTo(n + t.r0, r), e.arc(n, r, t.r0, 0, i, !0);
    }, t;
  }(i["b"]);
a.prototype.type = "ring", legacyExports["a"] = a;
