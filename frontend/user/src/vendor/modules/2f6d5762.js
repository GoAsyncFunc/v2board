let legacyModule = module,
  legacyExports = exports;
var r = require("./57474e57.js"),
  o = require("./696c3471.js"),
  i = require("./38424d74.js"),
  a = require("./42467438.js"),
  s = require("./31354243.js").f;
require("./descriptorsLegacySupport.js") && r(r.P + require("./setterSupport.js"), "Object", {
  __lookupGetter__: function (e) {
    var t,
      n = o(this),
      r = i(e, !0);
    do {
      if (t = s(n, r)) return t.get;
    } while (n = a(n));
  }
});
