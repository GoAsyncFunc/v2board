let legacyModule = module,
  legacyExports = exports;
var assignMergeValue = require("./assignMergeValue.js"),
  cloneBuffer = require("./cloneBuffer.js"),
  cloneTypedArray = require("./cloneTypedArray.js"),
  copyArray = require("./copyArray.js"),
  baseGetPrototype = require("./baseGetPrototype.js"),
  isArguments = require("./isArgumentsLegacy.js"),
  isArray = require("./isArray.js"),
  isArrayLikeObject = require("./isArrayLikeObject.js"),
  isBuffer = require("./isBufferCompat.js"),
  isFunction = require("./isFunction.js"),
  isObject = require("./isObjectValue.js"),
  initCloneObject = require("./594f3356.js"),
  isTypedArray = require("./isTypedArray.js"),
  getValue = require("./getValue.js"),
  getAllKeys = require("./baseGetAllKeys.js");
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objectValue = getValue(object, key),
    sourceValue = getValue(source, key),
    stackedValue = stack.get(sourceValue);
  if (stackedValue) assignMergeValue(object, key, stackedValue);else {
    var newValue = customizer ? customizer(objectValue, sourceValue, key + "", object, source, stack) : void 0,
      isCommon = void 0 === newValue;
    if (isCommon) {
      var isSourceArray = isArray(sourceValue),
        isSourceBuffer = !isSourceArray && isBuffer(sourceValue),
        isSourceTypedArray = !isSourceArray && !isSourceBuffer && isTypedArray(sourceValue);
      newValue = sourceValue, isSourceArray || isSourceBuffer || isSourceTypedArray ? isArray(objectValue) ? newValue = objectValue : isArrayLikeObject(objectValue) ? newValue = copyArray(objectValue) : isSourceBuffer ? (isCommon = !1, newValue = cloneBuffer(sourceValue, !0)) : isSourceTypedArray ? (isCommon = !1, newValue = cloneTypedArray(sourceValue, !0)) : newValue = [] : initCloneObject(sourceValue) || isArguments(sourceValue) ? (newValue = objectValue, isArguments(objectValue) ? newValue = getAllKeys(objectValue) : isObject(objectValue) && !isFunction(objectValue) || (newValue = baseGetPrototype(sourceValue))) : isCommon = !1;
    }
    isCommon && (stack.set(sourceValue, newValue), mergeFunc(newValue, sourceValue, srcIndex, customizer, stack), stack["delete"](sourceValue)), assignMergeValue(object, key, newValue);
  }
}
legacyModule.exports = baseMergeDeep;
