let legacyModule = module,
  legacyExports = exports;
var r = require("./sharedStore.js")("keys"),
  o = require("./6b434b35.js");
legacyModule.exports = function (e) {
  return r[e] || (r[e] = o(e));
};
