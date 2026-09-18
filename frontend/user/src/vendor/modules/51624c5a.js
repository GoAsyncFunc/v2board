let legacyModule = module,
  legacyExports = exports;
legacyExports.__esModule = !0;
var r = require("./objectAssignDefault.js"),
  o = i(r);
function i(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
legacyExports.default = o.default || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t];
    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
  }
  return e;
};
