let legacyModule = module,
  legacyExports = exports;
var r = require("./globalObject.js"),
  i = require("./56504f45.js"),
  o = require("./hasOwn.js"),
  a = require("./uid.js")("src"),
  s = require("./functionToString.js"),
  l = "toString",
  c = ("" + s).split(l);
require("./coreJsVersion.js").inspectSource = function (e) {
  return s.call(e);
}, (legacyModule.exports = function (e, t, n, s) {
  var l = "function" == typeof n;
  l && (o(n, "name") || i(n, "name", t)), e[t] !== n && (l && (o(n, a) || i(n, a, e[t] ? "" + e[t] : c.join(String(t)))), e === r ? e[t] = n : s ? e[t] ? e[t] = n : i(e, t, n) : (delete e[t], i(e, t, n)));
})(Function.prototype, l, function () {
  return "function" == typeof this && this[a] || s.call(this);
});
