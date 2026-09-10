let legacyModule = module,
  legacyExports = exports;
(function (t) {
  function n(e, t) {
    if (r("noDeprecation")) return e;
    var n = !1;
    function i() {
      if (!n) {
        if (r("throwDeprecation")) throw new Error(t);
        r("traceDeprecation") ? console.trace(t) : console.warn(t), n = !0;
      }
      return e.apply(this, arguments);
    }
    return i;
  }
  function r(e) {
    try {
      if (!t.localStorage) return !1;
    } catch (e) {
      return !1;
    }
    var n = t.localStorage[e];
    return null != n && "true" === String(n).toLowerCase();
  }
  legacyModule.exports = n;
}).call(this, require("./794c706a.js"));
