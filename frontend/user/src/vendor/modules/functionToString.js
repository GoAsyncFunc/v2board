let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = require("./sharedStore.js")("native-function-to-string", Function.toString);
