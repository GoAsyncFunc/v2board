let legacyModule = module,
  legacyExports = exports;
(function (e) {
  var rootObject = require("./rootObject.js"),
    falseValue = require("./falseValue.js"),
    exportsObject = legacyExports && !legacyExports.nodeType && legacyExports,
    moduleObject = exportsObject && "object" == typeof e && e && !e.nodeType && e,
    hasCommonJsExports = moduleObject && moduleObject.exports === exportsObject,
    bufferConstructor = hasCommonJsExports ? rootObject.Buffer : void 0,
    bufferIsBuffer = bufferConstructor ? bufferConstructor.isBuffer : void 0,
    isBuffer = bufferIsBuffer || falseValue;
  e.exports = isBuffer;
}).call(this, require("./moduleObjectPolyfill.js")(legacyModule));
