let legacyModule = module,
  legacyExports = exports;
var r = require("./objectKeysLegacy.js"),
  i = require("./getOwnPropertySymbolsLegacy.js"),
  o = require("./propertyIsEnumerableLegacy.js");
legacyModule.exports = function (e) {
  var t = r(e),
    n = i.f;
  if (n) {
    var a,
      s = n(e),
      l = o.f,
      c = 0;
    while (s.length > c) l.call(e, a = s[c++]) && t.push(a);
  }
  return t;
};
