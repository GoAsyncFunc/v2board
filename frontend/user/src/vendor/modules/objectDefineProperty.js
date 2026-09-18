let legacyModule = module,
  legacyExports = exports;
require("./objectDefinePropertyPolyfillRuntime.js");
var r = require("./coreJsNamespace.js").Object;
legacyModule.exports = function (e, t, n) {
  return r.defineProperty(e, t, n);
};
