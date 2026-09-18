let legacyModule = module,
  legacyExports = exports;
require("./objectSetPrototypeOfPolyfill.js"), legacyModule.exports = require("./coreJsNamespace.js").Object.setPrototypeOf;
