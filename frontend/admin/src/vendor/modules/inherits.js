let legacyModule = module,
  legacyExports = exports;
var r = require("./setPrototypeOfCompat.js");
function i(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, r(e, t);
}
legacyModule.exports = i, legacyModule.exports.__esModule = !0, legacyModule.exports["default"] = legacyModule.exports;
