let legacyModule = module,
  legacyExports = exports;
var r = require("./nativeSymbolLegacy.js"),
  i = require("./3456657a.js"),
  o = require("./336d3065.js"),
  a = "[object Null]",
  s = "[object Undefined]",
  l = r ? r.toStringTag : void 0;
function u(e) {
  return null == e ? void 0 === e ? s : a : l && l in Object(e) ? i(e) : o(e);
}
legacyModule.exports = u;
