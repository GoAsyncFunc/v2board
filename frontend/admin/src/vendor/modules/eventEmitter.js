let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = require("./eventEmitterRuntime.js").EventEmitter;
