let legacyModule = module,
  legacyExports = exports;
var r = require("./isArguments.js"),
  i = require("./isObjectLikeLegacy.js"),
  o = Object.prototype,
  a = o.hasOwnProperty,
  s = o.propertyIsEnumerable,
  l = r(function () {
    return arguments;
  }()) ? r : function (e) {
    return i(e) && a.call(e, "callee") && !s.call(e, "callee");
  };
legacyModule.exports = l;
