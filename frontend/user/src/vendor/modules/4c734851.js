let legacyModule = module,
  legacyExports = exports;
var r = require("./4541376d.js"),
  i = require("./6d762f58.js");
function a(e) {
  return r(function (t, n) {
    var r = -1,
      a = n.length,
      o = a > 1 ? n[a - 1] : void 0,
      u = a > 2 ? n[2] : void 0;
    o = e.length > 3 && "function" == typeof o ? (a--, o) : void 0, u && i(n[0], n[1], u) && (o = a < 3 ? void 0 : o, a = 1), t = Object(t);
    while (++r < a) {
      var l = n[r];
      l && e(t, l, r, o);
    }
    return t;
  });
}
legacyModule.exports = a;
