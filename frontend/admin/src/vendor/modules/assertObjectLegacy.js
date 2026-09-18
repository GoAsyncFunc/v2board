let legacyModule = module,
  legacyExports = exports;
var isObject = require("./isObject.js");
legacyModule.exports = function assertObject(value) {
  if (!isObject(value)) throw TypeError(value + " is not an object!");
  return value;
};
