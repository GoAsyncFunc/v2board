let legacyModule = module,
  legacyExports = exports;
var r = require("./objectKeys.js"),
  o = require("./getOwnPropertySymbols.js"),
  i = require("./propertyIsEnumerable.js");
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
