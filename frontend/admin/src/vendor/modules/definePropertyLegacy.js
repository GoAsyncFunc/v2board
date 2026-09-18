let legacyModule = module,
  legacyExports = exports;
var r = require("./354b375a.js"),
  i = require("./65557446.js"),
  o = require("./47384d6f.js"),
  a = Object.defineProperty;
legacyExports.f = require("./descriptorsSupport.js") ? Object.defineProperty : function (e, t, n) {
  if (r(e), t = o(t, !0), r(n), i) try {
    return a(e, t, n);
  } catch (e) {}
  if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
  return "value" in n && (e[t] = n.value), e;
};
