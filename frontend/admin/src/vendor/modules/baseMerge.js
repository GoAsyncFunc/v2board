let legacyModule = module,
  legacyExports = exports;
var Stack = require("./stack.js"),
  assignValue = require("./assignValue.js"),
  baseEach = require("./baseEach.js"),
  baseMergeDeep = require("./54314156.js"),
  isObject = require("./isObjectValue.js"),
  getAllKeys = require("./getAllKeys.js"),
  getValue = require("./getValue.js");
function baseMerge(object, source, key, srcIndex, customizer, stack) {
  object !== source && baseEach(source, function (sourceValue, key) {
    if (stack || (stack = new Stack()), isObject(sourceValue)) baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);else {
      var newValue = customizer ? customizer(getValue(object, key), sourceValue, key + "", object, source, stack) : void 0;
      void 0 === newValue && (newValue = sourceValue), assignValue(object, key, newValue);
    }
  }, getAllKeys);
}
legacyModule.exports = baseMerge;
