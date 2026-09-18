let legacyModule = module,
  legacyExports = exports;
var r = require("./globalObject.js"),
  o = require("./definePropertyValue.js"),
  i = require("./hasOwn.js"),
  a = require("./uid.js")("src"),
  s = require("./functionToString.js"),
  c = "toString",
  u = ("" + s).split(c);
require("./coreJsVersion.js").inspectSource = function (e) {
  return s.call(e);
}, (legacyModule.exports = function (e, t, n, s) {
  var c = "function" == typeof n;
  c && (i(n, "name") || o(n, "name", t)), e[t] !== n && (c && (i(n, a) || o(n, a, e[t] ? "" + e[t] : u.join(String(t)))), e === r ? e[t] = n : s ? e[t] ? e[t] = n : o(e, t, n) : (delete e[t], o(e, t, n)));
})(Function.prototype, c, function () {
  return "function" == typeof this && this[a] || s.call(this);
});
