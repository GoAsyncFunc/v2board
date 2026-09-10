let legacyModule = module,
  legacyExports = exports;
legacyExports.__esModule = !0;
var r = require("./73334d6c.js"),
  i = c(r),
  o = require("./41795542.js"),
  a = c(o),
  s = require("./454a6979.js"),
  l = c(s);
function c(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
legacyExports.default = function (e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + ("undefined" === typeof t ? "undefined" : (0, l.default)(t)));
  e.prototype = (0, a.default)(t && t.prototype, {
    constructor: {
      value: e,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), t && (i.default ? (0, i.default)(e, t) : e.__proto__ = t);
};
