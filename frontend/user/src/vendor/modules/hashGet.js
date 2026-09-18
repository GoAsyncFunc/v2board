let legacyModule = module,
  legacyExports = exports;
var hasNullPrototype = require("./nativeObjectCreate.js"),
  undefinedValue = "__lodash_hash_undefined__",
  objectPrototype = Object.prototype,
  hasOwnProperty = objectPrototype.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (hasNullPrototype) {
    var value = data[key];
    return value === undefinedValue ? void 0 : value;
  }
  return hasOwnProperty.call(data, key) ? data[key] : void 0;
}
legacyModule.exports = hashGet;
