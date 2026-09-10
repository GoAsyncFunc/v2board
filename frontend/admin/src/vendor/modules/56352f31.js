let legacyModule = module,
  legacyExports = exports;
var r = require("./3776594a.js"),
  i = require("./4137522b.js"),
  o = require("./38424d74.js"),
  a = Object.defineProperty;
legacyExports.f = require("./385a2f56.js") ? Object.defineProperty : function (e, t, n) {
  if (r(e), t = o(t, !0), r(n), i) try {
    return a(e, t, n);
  } catch (e) {}
  if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
  return "value" in n && (e[t] = n.value), e;
};
