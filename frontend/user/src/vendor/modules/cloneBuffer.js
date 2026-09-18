let legacyModule = module,
  legacyExports = exports;
(function (moduleObject) {
  var root = require("./rootObject.js"),
    freeExports = legacyExports && !legacyExports.nodeType && legacyExports,
    freeModule = freeExports && "object" == typeof moduleObject && moduleObject && !moduleObject.nodeType && moduleObject,
    moduleExports = freeModule && freeModule.exports === freeExports,
    Buffer = moduleExports ? root.Buffer : void 0,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) return buffer.slice();
    var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    return buffer.copy(result), result;
  }
  moduleObject.exports = cloneBuffer;
}).call(this, require("./moduleObjectPolyfill.js")(legacyModule));
