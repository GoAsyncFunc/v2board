let legacyModule = module,
  legacyExports = exports;
var r = require("./extend.js"),
  i = function () {
    try {
      return !!Object.defineProperty({}, "a", {});
    } catch (e) {
      return !1;
    }
  }(),
  o = (!i && Object.prototype.__defineGetter__, i ? Object.defineProperty : function (e, t, n) {
    "get" in n && e.__defineGetter__ ? e.__defineGetter__(t, n.get) : (!r.hop.call(e, t) || "value" in n) && (e[t] = n.value);
  }),
  a = Object.create || function (e, t) {
    var n, i;
    function a() {}
    for (i in a.prototype = e, n = new a(), t) r.hop.call(t, i) && o(n, i, t[i]);
    return n;
  };
legacyExports.defineProperty = o, legacyExports.objCreate = a;
