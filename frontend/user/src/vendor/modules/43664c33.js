let legacyModule = module,
  legacyExports = exports;
var r = require("./assertObject.js"),
  o = require("./38424d74.js"),
  i = "number";
legacyModule.exports = function (e) {
  if ("string" !== e && e !== i && "default" !== e) throw TypeError("Incorrect hint");
  return o(r(this), e != i);
};
