let legacyModule = module,
  legacyExports = exports;
var r = require("./extend.js"),
  o = function () {
    try {
      return !!Object.defineProperty({}, "a", {});
    } catch (e) {
      return !1;
    }
  }(),
  i = (!o && Object.prototype.__defineGetter__, o ? Object.defineProperty : function (e, t, n) {
    "get" in n && e.__defineGetter__ ? e.__defineGetter__(t, n.get) : (!r.hop.call(e, t) || "value" in n) && (e[t] = n.value);
  }),
  a = Object.create || function (e, t) {
    var n, o;
    function a() {}
    for (o in a.prototype = e, n = new a(), t) r.hop.call(t, o) && i(n, o, t[o]);
    return n;
  };
legacyExports.defineProperty = i, legacyExports.objCreate = a;
