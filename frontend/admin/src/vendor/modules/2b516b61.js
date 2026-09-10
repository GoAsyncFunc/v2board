let legacyModule = module,
  legacyExports = exports;
var r = require("./666d5263.js"),
  i = require("./7432446e.js"),
  o = require("./63712f2b.js"),
  a = require("./54314156.js"),
  s = require("./476f7951.js"),
  l = require("./6d545452.js"),
  u = require("./6974736a.js");
function c(e, t, n, f, d) {
  e !== t && o(t, function (o, l) {
    if (d || (d = new r()), s(o)) a(e, t, l, n, c, f, d);else {
      var h = f ? f(u(e, l), o, l + "", e, t, d) : void 0;
      void 0 === h && (h = o), i(e, l, h);
    }
  }, l);
}
legacyModule.exports = c;
