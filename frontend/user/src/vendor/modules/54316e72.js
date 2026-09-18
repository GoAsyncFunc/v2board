let legacyModule = module,
  legacyExports = exports;
var r = require("./objectKeys.js"),
  o = require("./65367737.js"),
  i = require("./4c734157.js");
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
