let legacyModule = module,
  legacyExports = exports;
var r = require("./nativeSymbol.js"),
  i = require("./4150327a.js"),
  a = require("./objectToString.js"),
  o = "[object Null]",
  u = "[object Undefined]",
  l = r ? r.toStringTag : void 0;
function s(e) {
  return null == e ? void 0 === e ? u : o : l && l in Object(e) ? i(e) : a(e);
}
legacyModule.exports = s;
