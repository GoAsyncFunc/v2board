let legacyModule = module,
  legacyExports = exports;
var r = require("./57474e57.js"),
  i = require("./696c3471.js"),
  o = require("./38424d74.js"),
  a = require("./42467438.js"),
  s = require("./31354243.js").f;
require("./385a2f56.js") && r(r.P + require("./setterSupport.js"), "Object", {
  __lookupSetter__: function (e) {
    var t,
      n = i(this),
      r = o(e, !0);
    do {
      if (t = s(n, r)) return t.set;
    } while (n = a(n));
  }
});
