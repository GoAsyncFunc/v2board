let legacyModule = module,
  legacyExports = exports;
var r = require("./6a585148.js"),
  i = require("./isObjectValue.js"),
  o = require("./isSymbol.js"),
  a = NaN,
  s = /^[-+]0x[0-9a-f]+$/i,
  l = /^0b[01]+$/i,
  u = /^0o[0-7]+$/i,
  c = parseInt;
function f(e) {
  if ("number" == typeof e) return e;
  if (o(e)) return a;
  if (i(e)) {
    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
    e = i(t) ? t + "" : t;
  }
  if ("string" != typeof e) return 0 === e ? e : +e;
  e = r(e);
  var n = l.test(e);
  return n || u.test(e) ? c(e.slice(2), n ? 2 : 8) : s.test(e) ? a : +e;
}
legacyModule.exports = f;
