let legacyModule = module,
  legacyExports = exports;
legacyExports.__esModule = !0;
var r = require("./454a6979.js"),
  i = o(r);
function o(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
legacyExports.default = function (e, t) {
  if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !t || "object" !== ("undefined" === typeof t ? "undefined" : (0, i.default)(t)) && "function" !== typeof t ? e : t;
};
