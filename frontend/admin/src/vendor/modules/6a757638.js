let legacyModule = module,
  legacyExports = exports;
var r = require("./4d725064.js"),
  i = require("./baseAssignValue.js");
function o(e, t, n, o) {
  var a = !n;
  n || (n = {});
  var s = -1,
    l = t.length;
  while (++s < l) {
    var u = t[s],
      c = o ? o(n[u], e[u], u, n, e) : void 0;
    void 0 === c && (c = e[u]), a ? i(n, u, c) : r(n, u, c);
  }
  return n;
}
legacyModule.exports = o;
