let legacyModule = module,
  legacyExports = exports;
var r = require("./3239732f.js")("keys"),
  i = require("./uid.js");
legacyModule.exports = function (e) {
  return r[e] || (r[e] = i(e));
};