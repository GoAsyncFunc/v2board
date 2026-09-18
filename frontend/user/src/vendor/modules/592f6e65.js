let legacyModule = module,
  legacyExports = exports;
var r = require("./toLength.js"),
  o = require("./30336e69.js"),
  i = require("./requireObjectCoercible.js");
legacyModule.exports = function (e, t, n, a) {
  var s = String(i(e)),
    c = s.length,
    u = void 0 === n ? " " : String(n),
    l = r(t);
  if (l <= c || "" == u) return s;
  var f = l - c,
    p = o.call(u, Math.ceil(f / u.length));
  return p.length > f && (p = p.slice(0, f)), a ? p + s : s + p;
};
