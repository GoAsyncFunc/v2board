let legacyModule = module,
  legacyExports = exports;
var r = require("./objectKeys.js"),
  i = require("./getOwnPropertySymbols.js"),
  o = require("./propertyIsEnumerable.js");
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
