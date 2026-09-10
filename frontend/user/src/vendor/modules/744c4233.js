let legacyModule = module,
  legacyExports = exports;
var r = require("./6a585148.js"),
  i = require("./476f7951.js"),
  a = require("./2f396161.js"),
  o = NaN,
  u = /^[-+]0x[0-9a-f]+$/i,
  l = /^0b[01]+$/i,
  s = /^0o[0-7]+$/i,
  c = parseInt;
function f(e) {
  if ("number" == typeof e) return e;
  if (a(e)) return o;
  if (i(e)) {
    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
    e = i(t) ? t + "" : t;
  }
  if ("string" != typeof e) return 0 === e ? e : +e;
  e = r(e);
  var n = l.test(e);
  return n || s.test(e) ? c(e.slice(2), n ? 2 : 8) : u.test(e) ? o : +e;
}
legacyModule.exports = f;
