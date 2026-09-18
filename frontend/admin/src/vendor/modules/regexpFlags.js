let legacyModule = module,
  legacyExports = exports;
var r = require("./assertObject.js");
legacyModule.exports = function () {
  var e = r(this),
    t = "";
  return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.unicode && (t += "u"), e.sticky && (t += "y"), t;
};
