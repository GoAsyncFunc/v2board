let legacyModule = module,
  legacyExports = exports;
var r = require("./constantFactory.js"),
  i = require("./4f306f53.js"),
  a = require("./identity.js"),
  o = i ? function (e, t) {
    return i(e, "toString", {
      configurable: !0,
      enumerable: !1,
      value: r(t),
      writable: !0
    });
  } : a;
legacyModule.exports = o;
