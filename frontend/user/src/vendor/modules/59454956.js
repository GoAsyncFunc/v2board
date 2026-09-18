let legacyModule = module,
  legacyExports = exports;
legacyExports.__esModule = !0;
var r = require("./objectDefinePropertyDefault.js"),
  o = i(r);
function i(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
legacyExports.default = function (e, t, n) {
  return t in e ? (0, o.default)(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
};
