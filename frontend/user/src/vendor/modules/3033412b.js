let legacyModule = module,
  legacyExports = exports;
var r = require("./isArguments.js"),
  i = require("./isObjectLikeLegacy.js"),
  a = Object.prototype,
  o = a.hasOwnProperty,
  u = a.propertyIsEnumerable,
  l = r(function () {
    return arguments;
  }()) ? r : function (e) {
    return i(e) && o.call(e, "callee") && !u.call(e, "callee");
  };
legacyModule.exports = l;
