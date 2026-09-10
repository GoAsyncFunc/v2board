let legacyModule = module,
  legacyExports = exports;
(function (t) {
  function n(e, n, r, i) {
    if ("function" !== typeof e) throw new TypeError('"callback" argument must be a function');
    var o,
      a,
      s = arguments.length;
    switch (s) {
      case 0:
      case 1:
        return t.nextTick(e);
      case 2:
        return t.nextTick(function () {
          e.call(null, n);
        });
      case 3:
        return t.nextTick(function () {
          e.call(null, n, r);
        });
      case 4:
        return t.nextTick(function () {
          e.call(null, n, r, i);
        });
      default:
        o = new Array(s - 1), a = 0;
        while (a < o.length) o[a++] = arguments[a];
        return t.nextTick(function () {
          e.apply(null, o);
        });
    }
  }
  "undefined" === typeof t || !t.version || 0 === t.version.indexOf("v0.") || 0 === t.version.indexOf("v1.") && 0 !== t.version.indexOf("v1.8.") ? legacyModule.exports = {
    nextTick: n
  } : legacyModule.exports = t;
}).call(this, require("./51324967.js"));
