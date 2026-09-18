let legacyModule = module,
  legacyExports = exports;
var r = require("./rawClassNameLegacy.js");
legacyModule.exports = Object("z").propertyIsEnumerable(0) ? Object : function (e) {
  return "String" == r(e) ? e.split("") : Object(e);
};
