let legacyModule = module,
  legacyExports = exports;
var r = require("./63304f79.js"),
  o = require("./56504f45.js"),
  i = require("./6f786f30.js"),
  a = require("./6b434b35.js")("src"),
  s = require("./62357265.js"),
  c = "toString",
  u = ("" + s).split(c);
require("./62563566.js").inspectSource = function (e) {
  return s.call(e);
}, (legacyModule.exports = function (e, t, n, s) {
  var c = "function" == typeof n;
  c && (i(n, "name") || o(n, "name", t)), e[t] !== n && (c && (i(n, a) || o(n, a, e[t] ? "" + e[t] : u.join(String(t)))), e === r ? e[t] = n : s ? e[t] ? e[t] = n : o(e, t, n) : (delete e[t], o(e, t, n)));
})(Function.prototype, c, function () {
  return "function" == typeof this && this[a] || s.call(this);
});
