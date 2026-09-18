let legacyModule = module,
  legacyExports = exports;
(function (globalObject) {
  var rootObject = "object" == typeof globalObject && globalObject && globalObject.Object === Object && globalObject;
  legacyModule.exports = rootObject;
}).call(this, require("./globalObjectLegacy.js"));
