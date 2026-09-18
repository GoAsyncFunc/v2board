let legacyModule = module,
  legacyExports = exports;
var r = require("./nativeSymbol.js"),
  i = require("./4150327a.js"),
  o = require("./objectToString.js"),
  a = "[object Null]",
  s = "[object Undefined]",
  l = r ? r.toStringTag : void 0;
function u(e) {
  return null == e ? void 0 === e ? s : a : l && l in Object(e) ? i(e) : o(e);
}
legacyModule.exports = u;
