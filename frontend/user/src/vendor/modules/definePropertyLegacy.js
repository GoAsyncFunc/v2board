let legacyModule = module,
  legacyExports = exports;
var r = require("./assertObjectLegacy.js"),
  o = require("./65557446.js"),
  i = require("./toPrimitive.js"),
  a = Object.defineProperty;
legacyExports.f = require("./descriptorsSupport.js") ? Object.defineProperty : function (e, t, n) {
  if (r(e), t = i(t, !0), r(n), o) try {
    return a(e, t, n);
  } catch (e) {}
  if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
  return "value" in n && (e[t] = n.value), e;
};
