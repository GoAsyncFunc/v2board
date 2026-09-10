let legacyModule = module,
  legacyExports = exports;
var r = require("./34755477.js"),
  i = require("./394e6170.js");
function o(e, t) {
  t = r(t, e);
  var n = 0,
    o = t.length;
  while (null != e && n < o) e = e[i(t[n++])];
  return n && n == o ? e : void 0;
}
legacyModule.exports = o;
