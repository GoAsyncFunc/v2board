let legacyModule = module,
  legacyExports = exports;
require("./objectAssignPolyfillRuntime.js"), legacyModule.exports = require("./coreJsNamespace.js").Object.assign;
