let legacyModule = module,
  legacyExports = exports;
var r = require("./68654e57.js"),
  i = Math.max;
function a(e, t, n) {
  return t = i(void 0 === t ? e.length - 1 : t, 0), function () {
    var a = arguments,
      o = -1,
      u = i(a.length - t, 0),
      l = Array(u);
    while (++o < u) l[o] = a[t + o];
    o = -1;
    var s = Array(t + 1);
    while (++o < t) s[o] = a[o];
    return s[t] = n(l), r(e, this, s);
  };
}
legacyModule.exports = a;
