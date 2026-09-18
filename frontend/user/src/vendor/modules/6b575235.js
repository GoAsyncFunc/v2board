let legacyModule = module,
  legacyExports = exports;
var r = require("./57474e57.js"),
  o = require("./coreJsVersion.js"),
  i = require("./globalObject.js"),
  a = require("./56657959.js"),
  s = require("./74476433.js");
r(r.P + r.R, "Promise", {
  finally: function (e) {
    var t = a(this, o.Promise || i.Promise),
      n = "function" == typeof e;
    return this.then(n ? function (n) {
      return s(t, e()).then(function () {
        return n;
      });
    } : e, n ? function (n) {
      return s(t, e()).then(function () {
        throw n;
      });
    } : e);
  }
});
