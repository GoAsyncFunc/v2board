let legacyModule = module,
  legacyExports = exports;
var NativeUint8Array = require("./nativeUint8Array.js");
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  return new NativeUint8Array(result).set(new NativeUint8Array(arrayBuffer)), result;
}
legacyModule.exports = cloneArrayBuffer;
