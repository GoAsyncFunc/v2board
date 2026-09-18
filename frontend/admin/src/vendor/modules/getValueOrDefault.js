let legacyModule = module,
  legacyExports = exports;
var r = require("./baseGet.js");
function i(e, t, n) {
  var i = null == e ? void 0 : r(e, t);
  return void 0 === i ? n : i;
}
legacyModule.exports = i;
