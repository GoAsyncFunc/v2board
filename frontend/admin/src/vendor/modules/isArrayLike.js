let legacyModule = module,
  legacyExports = exports;
var isFunction = require("./isFunction.js"),
  isIndex = require("./isIndex.js");
function isArrayLike(value) {
  return null != value && isIndex(value.length) && !isFunction(value);
}
legacyModule.exports = isArrayLike;
