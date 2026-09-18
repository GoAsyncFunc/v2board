let legacyModule = module,
  legacyExports = exports;
var r = require("./77487272.js"),
  i = require("./57474e57.js"),
  o = require("./696c3471.js"),
  a = require("./3639535a.js"),
  s = require("./554c4d54.js"),
  l = require("./4f735664.js"),
  c = require("./61534531.js"),
  u = require("./getIteratorMethod.js");
i(i.S + i.F * !require("./63517958.js")(function (e) {
  Array.from(e);
}), "Array", {
  from: function (e) {
    var t,
      n,
      i,
      h,
      f = o(e),
      d = "function" == typeof this ? this : Array,
      p = arguments.length,
      m = p > 1 ? arguments[1] : void 0,
      g = void 0 !== m,
      v = 0,
      y = u(f);
    if (g && (m = r(m, p > 2 ? arguments[2] : void 0, 2)), void 0 == y || d == Array && s(y)) for (t = l(f.length), n = new d(t); t > v; v++) c(n, v, g ? m(f[v], v) : f[v]);else for (h = y.call(f), n = new d(); !(i = h.next()).done; v++) c(n, v, g ? a(h, m, [i.value, v], !0) : i.value);
    return n.length = v, n;
  }
});
