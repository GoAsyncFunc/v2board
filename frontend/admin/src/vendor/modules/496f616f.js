let legacyModule = module,
  legacyExports = exports;
var r = require("./68654e57.js"),
  i = Math.max;
function o(e, t, n) {
  return t = i(void 0 === t ? e.length - 1 : t, 0), function () {
    var o = arguments,
      a = -1,
      s = i(o.length - t, 0),
      l = Array(s);
    while (++a < s) l[a] = o[t + a];
    a = -1;
    var u = Array(t + 1);
    while (++a < t) u[a] = o[a];
    return u[t] = n(l), r(e, this, u);
  };
}
legacyModule.exports = o;
