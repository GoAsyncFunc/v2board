let legacyModule = module,
  legacyExports = exports;
var r = require("./6e6d6e63.js"),
  i = require("./4150327a.js"),
  a = require("./4b664e4d.js"),
  o = "[object Null]",
  u = "[object Undefined]",
  l = r ? r.toStringTag : void 0;
function s(e) {
  return null == e ? void 0 === e ? u : o : l && l in Object(e) ? i(e) : a(e);
}
legacyModule.exports = s;
