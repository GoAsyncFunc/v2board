let legacyModule = module,
  legacyExports = exports;
var cloneArrayBuffer = require("./cloneArrayBuffer.js");
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
legacyModule.exports = cloneTypedArray;
