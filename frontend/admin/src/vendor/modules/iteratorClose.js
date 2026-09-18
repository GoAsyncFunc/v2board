let legacyModule = module,
  legacyExports = exports;
var r = require("./assertObject.js");
legacyModule.exports = function (e, t, n, i) {
  try {
    return i ? t(r(n)[0], n[1]) : t(n);
  } catch (t) {
    var o = e["return"];
    throw void 0 !== o && r(o.call(e)), t;
  }
};
