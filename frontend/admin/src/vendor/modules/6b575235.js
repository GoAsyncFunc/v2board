let legacyModule = module,
  legacyExports = exports;
var r = require("./57474e57.js"),
  i = require("./62563566.js"),
  o = require("./63304f79.js"),
  a = require("./56657959.js"),
  s = require("./74476433.js");
r(r.P + r.R, "Promise", {
  finally: function (e) {
    var t = a(this, i.Promise || o.Promise),
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
