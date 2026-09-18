let legacyModule = module,
  legacyExports = exports;
var r = require("./4f735664.js"),
  i = require("./30336e69.js"),
  o = require("./requireObjectCoercible.js");
legacyModule.exports = function (e, t, n, a) {
  var s = String(o(e)),
    l = s.length,
    c = void 0 === n ? " " : String(n),
    u = r(t);
  if (u <= l || "" == c) return s;
  var h = u - l,
    f = i.call(c, Math.ceil(h / c.length));
  return f.length > h && (f = f.slice(0, h)), a ? f + s : s + f;
};
