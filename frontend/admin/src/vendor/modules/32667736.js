let legacyModule = module,
  legacyExports = exports;
var r = require("./6d725347.js"),
  i = require("./792b5674.js"),
  o = function () {
    function e() {
      this.cx = 0, this.cy = 0, this.r = 0;
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
      e.moveTo(t.cx + t.r, t.cy), e.arc(t.cx, t.cy, t.r, 0, 2 * Math.PI);
    }, t;
  }(i["b"]);
a.prototype.type = "circle", legacyExports["a"] = a;
