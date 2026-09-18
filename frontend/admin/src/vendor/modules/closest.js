let legacyModule = module,
  legacyExports = exports;
var r = require("./57354376.js");
legacyModule.exports = function (e, t, n) {
  n = n || document, e = {
    parentNode: e
  };
  while ((e = e.parentNode) && e !== n) if (r(e, t)) return e;
};
