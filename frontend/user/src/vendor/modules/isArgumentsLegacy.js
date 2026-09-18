let legacyModule = module,
  legacyExports = exports;
var isArguments = require("./isArguments.js"),
  isObjectLike = require("./isObjectLikeLegacy.js"),
  objectPrototype = Object.prototype,
  hasOwnProperty = objectPrototype.hasOwnProperty,
  propertyIsEnumerable = objectPrototype.propertyIsEnumerable,
  isArgumentsObject = isArguments(function () {
    return arguments;
  }()) ? isArguments : function (value) {
    return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
  };
legacyModule.exports = isArgumentsObject;
