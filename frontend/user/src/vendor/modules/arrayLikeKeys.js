var baseTimes = require("./baseTimes.js"),
  isArguments = require("./isArgumentsLegacy.js"),
  isArray = require("./isArray.js"),
  isBuffer = require("./isBufferCompat.js"),
  isIndex = require("./isIndexWithinLength.js"),
  isTypedArray = require("./isTypedArray.js"),
  hasOwnProperty = Object.prototype.hasOwnProperty;

function arrayLikeKeys(value, inherited) {
  var isArrayValue = isArray(value),
    isArgumentsValue = !isArrayValue && isArguments(value),
    isBufferValue = !isArrayValue && !isArgumentsValue && isBuffer(value),
    isTypedArrayValue = !isArrayValue && !isArgumentsValue && !isBufferValue && isTypedArray(value),
    skipIndexes = isArrayValue || isArgumentsValue || isBufferValue || isTypedArrayValue,
    result = skipIndexes ? baseTimes(value.length, String) : [],
    length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBufferValue && (key == "offset" || key == "parent") || isTypedArrayValue && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) result.push(key);
  }
  return result;
}

module.exports = arrayLikeKeys;
