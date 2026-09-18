let legacyModule = module,
  legacyExports = exports;
(function (t) {
  (function () {
    var n, r, i, o, a, s;
    "undefined" !== typeof performance && null !== performance && performance.now ? legacyModule.exports = function () {
      return performance.now();
    } : "undefined" !== typeof t && null !== t && t.hrtime ? (legacyModule.exports = function () {
      return (n() - a) / 1e6;
    }, r = t.hrtime, n = function () {
      var e;
      return e = r(), 1e9 * e[0] + e[1];
    }, o = n(), s = 1e9 * t.uptime(), a = o - s) : Date.now ? (legacyModule.exports = function () {
      return Date.now() - i;
    }, i = Date.now()) : (legacyModule.exports = function () {
      return new Date().getTime() - i;
    }, i = new Date().getTime());
  }).call(this);
}).call(this, require("./processRuntime.js"));
