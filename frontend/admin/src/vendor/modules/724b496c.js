let legacyModule = module,
  legacyExports = exports;
var r = require("./63304f79.js"),
  i = require("./56504f45.js"),
  o = require("./6f786f30.js"),
  a = require("./6b434b35.js")("src"),
  s = require("./62357265.js"),
  l = "toString",
  c = ("" + s).split(l);
require("./62563566.js").inspectSource = function (e) {
  return s.call(e);
}, (legacyModule.exports = function (e, t, n, s) {
  var l = "function" == typeof n;
  l && (o(n, "name") || i(n, "name", t)), e[t] !== n && (l && (o(n, a) || i(n, a, e[t] ? "" + e[t] : c.join(String(t)))), e === r ? e[t] = n : s ? e[t] ? e[t] = n : i(e, t, n) : (delete e[t], i(e, t, n)));
})(Function.prototype, l, function () {
  return "function" == typeof this && this[a] || s.call(this);
});
