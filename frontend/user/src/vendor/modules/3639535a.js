let legacyModule = module,
  legacyExports = exports;
var r = require("./3776594a.js");
legacyModule.exports = function (e, t, n, o) {
  try {
    return o ? t(r(n)[0], n[1]) : t(n);
  } catch (t) {
    var i = e["return"];
    throw void 0 !== i && r(i.call(e)), t;
  }
};
