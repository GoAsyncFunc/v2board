let legacyModule = module,
  legacyExports = exports;
var r = require("./nativeSymbol.js"),
  i = Object.prototype,
  a = i.hasOwnProperty,
  o = i.toString,
  u = r ? r.toStringTag : void 0;
function l(e) {
  var t = a.call(e, u),
    n = e[u];
  try {
    e[u] = void 0;
    var r = !0;
  } catch (e) {}
  var i = o.call(e);
  return r && (t ? e[u] = n : delete e[u]), i;
}
legacyModule.exports = l;
