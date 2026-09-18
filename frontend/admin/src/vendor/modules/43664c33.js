let legacyModule = module,
  legacyExports = exports;
var r = require("./assertObject.js"),
  i = require("./toPrimitive.js"),
  o = "number";
legacyModule.exports = function (e) {
  if ("string" !== e && e !== o && "default" !== e) throw TypeError("Incorrect hint");
  return i(r(this), e != o);
};
