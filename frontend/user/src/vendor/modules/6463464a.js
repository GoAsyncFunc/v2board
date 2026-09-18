let legacyModule = module,
  legacyExports = exports;
var r = require("./77487272.js"),
  o = require("./57474e57.js"),
  i = require("./696c3471.js"),
  a = require("./3639535a.js"),
  s = require("./554c4d54.js"),
  c = require("./4f735664.js"),
  u = require("./61534531.js"),
  l = require("./getIteratorMethod.js");
o(o.S + o.F * !require("./63517958.js")(function (e) {
  Array.from(e);
}), "Array", {
  from: function (e) {
    var t,
      n,
      o,
      f,
      p = i(e),
      d = "function" == typeof this ? this : Array,
      h = arguments.length,
      m = h > 1 ? arguments[1] : void 0,
      v = void 0 !== m,
      y = 0,
      g = l(p);
    if (v && (m = r(m, h > 2 ? arguments[2] : void 0, 2)), void 0 == g || d == Array && s(g)) for (t = c(p.length), n = new d(t); t > y; y++) u(n, y, v ? m(p[y], y) : p[y]);else for (f = g.call(p), n = new d(); !(o = f.next()).done; y++) u(n, y, v ? a(f, m, [o.value, y], !0) : o.value);
    return n.length = y, n;
  }
});
