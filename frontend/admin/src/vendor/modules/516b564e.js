let legacyModule = module,
  legacyExports = exports;
var r = require("./baseMerge.js"),
  i = require("./createAssigner.js"),
  o = i(function (e, t, n) {
    r(e, t, n);
  });
legacyModule.exports = o;
