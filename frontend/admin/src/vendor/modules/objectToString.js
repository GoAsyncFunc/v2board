let legacyModule = module,
  legacyExports = exports;
var objectPrototype = Object.prototype,
  objectToString = objectPrototype.toString;
function getObjectToString(value) {
  return objectToString.call(value);
}
legacyModule.exports = getObjectToString;
