let legacyModule = module,
  legacyExports = exports;
var r = require("./3776594a.js"),
  i = require("./38424d74.js"),
  o = "number";
legacyModule.exports = function (e) {
  if ("string" !== e && e !== o && "default" !== e) throw TypeError("Incorrect hint");
  return i(r(this), e != o);
};
