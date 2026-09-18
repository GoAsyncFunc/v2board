let legacyModule = module,
  legacyExports = exports;
var r = require("./constantFactory.js"),
  i = require("./4f306f53.js"),
  o = require("./identity.js"),
  a = i ? function (e, t) {
    return i(e, "toString", {
      configurable: !0,
      enumerable: !1,
      value: r(t),
      writable: !0
    });
  } : o;
legacyModule.exports = a;
