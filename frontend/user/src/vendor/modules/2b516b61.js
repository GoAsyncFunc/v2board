let legacyModule = module,
  legacyExports = exports;
var r = require("./stack.js"),
  i = require("./assignValue.js"),
  a = require("./63712f2b.js"),
  o = require("./54314156.js"),
  u = require("./isObjectValue.js"),
  l = require("./6d545452.js"),
  s = require("./getValue.js");
function c(e, t, n, f, d) {
  e !== t && a(t, function (a, l) {
    if (d || (d = new r()), u(a)) o(e, t, l, n, c, f, d);else {
      var h = f ? f(s(e, l), a, l + "", e, t, d) : void 0;
      void 0 === h && (h = a), i(e, l, h);
    }
  }, l);
}
legacyModule.exports = c;
