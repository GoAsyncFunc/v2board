let legacyModule = module,
  legacyExports = exports;
var r = require("./rootObject.js"),
  i = function () {
    return r.Date.now();
  };
legacyModule.exports = i;
