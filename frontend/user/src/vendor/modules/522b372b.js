let legacyModule = module,
  legacyExports = exports;
var r = require("./objectKeysLegacy.js"),
  o = require("./getOwnPropertySymbolsLegacy.js"),
  i = require("./propertyIsEnumerableLegacy.js");
legacyModule.exports = function (e) {
  var t = r(e),
    n = o.f;
  if (n) {
    var a,
      s = n(e),
      c = i.f,
      u = 0;
    while (s.length > u) c.call(e, a = s[u++]) && t.push(a);
  }
  return t;
};
