let legacyModule = module,
  legacyExports = exports;
legacyExports.__esModule = !0;
var r = require("./50327359.js"),
  i = o(r);
function o(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
legacyExports.default = i.default || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t];
    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
  }
  return e;
};
