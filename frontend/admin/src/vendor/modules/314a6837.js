let legacyModule = module,
  legacyExports = exports;
var r = require("./6d725347.js"),
  i = require("./792b5674.js"),
  o = require("./54367869.js"),
  a = function () {
    function e() {
      this.points = null, this.percent = 1, this.smooth = 0, this.smoothConstraint = null;
    }
    return e;
  }(),
  s = function (e) {
    function t(t) {
      return e.call(this, t) || this;
    }
    return Object(r["a"])(t, e), t.prototype.getDefaultStyle = function () {
      return {
        stroke: "#000",
        fill: null
      };
    }, t.prototype.getDefaultShape = function () {
      return new a();
    }, t.prototype.buildPath = function (e, t) {
      o["a"](e, t, !1);
    }, t;
  }(i["b"]);
s.prototype.type = "polyline", legacyExports["a"] = s;
