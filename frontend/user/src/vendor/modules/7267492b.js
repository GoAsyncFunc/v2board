let legacyModule = module,
  legacyExports = exports;
var r = require("./652b4c55.js"),
  i = require("./3456657a.js"),
  a = require("./336d3065.js"),
  o = "[object Null]",
  u = "[object Undefined]",
  l = r ? r.toStringTag : void 0;
function s(e) {
  return null == e ? void 0 === e ? u : o : l && l in Object(e) ? i(e) : a(e);
}
legacyModule.exports = s;
