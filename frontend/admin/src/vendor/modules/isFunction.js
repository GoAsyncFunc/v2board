let legacyModule = module,
  legacyExports = exports;
var getTag = require("./getTag.js"),
  isObject = require("./isObjectValue.js"),
  asyncFunctionTag = "[object AsyncFunction]",
  functionTag = "[object Function]",
  generatorFunctionTag = "[object GeneratorFunction]",
  proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject(value)) return !1;
  var tag = getTag(value);
  return tag == functionTag || tag == generatorFunctionTag || tag == asyncFunctionTag || tag == proxyTag;
}
legacyModule.exports = isFunction;
