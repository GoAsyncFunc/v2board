let legacyModule = module,
  legacyExports = exports;
var r = require("./sharedStore.js")("keys"),
  o = require("./uid.js");
legacyModule.exports = function (e) {
  return r[e] || (r[e] = o(e));
};
