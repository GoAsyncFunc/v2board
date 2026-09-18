let legacyModule = module,
  legacyExports = exports;
var r = require("./sharedStore.js")("keys"),
  i = require("./6b434b35.js");
legacyModule.exports = function (e) {
  return r[e] || (r[e] = i(e));
};
