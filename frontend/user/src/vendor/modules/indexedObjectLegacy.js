let legacyModule = module,
  legacyExports = exports;
var rawClassName = require("./rawClassNameLegacy.js");
legacyModule.exports = Object("z").propertyIsEnumerable(0) ? Object : function (value) {
  return "String" == rawClassName(value) ? value.split("") : Object(value);
};
