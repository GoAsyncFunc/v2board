let legacyModule = module,
  legacyExports = exports;
var r = require("./34755477.js"),
  i = require("./toKey.js");
function a(e, t) {
  t = r(t, e);
  var n = 0,
    a = t.length;
  while (null != e && n < a) e = e[i(t[n++])];
  return n && n == a ? e : void 0;
}
legacyModule.exports = a;
