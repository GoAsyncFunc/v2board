let legacyModule = module,
  legacyExports = exports;
var r = require("./57474e57.js"),
  o = require("./3838566e.js"),
  i = require("./794c4d59.js"),
  a = require("./assertObject.js"),
  s = require("./53706333.js"),
  c = require("./4f735664.js"),
  u = require("./isObject.js"),
  l = require("./globalObject.js").ArrayBuffer,
  f = require("./56657959.js"),
  p = i.ArrayBuffer,
  d = i.DataView,
  h = o.ABV && l.isView,
  m = p.prototype.slice,
  v = o.VIEW,
  y = "ArrayBuffer";
r(r.G + r.W + r.F * (l !== p), {
  ArrayBuffer: p
}), r(r.S + r.F * !o.CONSTR, y, {
  isView: function (e) {
    return h && h(e) || u(e) && v in e;
  }
}), r(r.P + r.U + r.F * require("./tryCatchTest.js")(function () {
  return !new p(2).slice(1, void 0).byteLength;
}), y, {
  slice: function (e, t) {
    if (void 0 !== m && void 0 === t) return m.call(a(this), e);
    var n = a(this).byteLength,
      r = s(e, n),
      o = s(void 0 === t ? n : t, n),
      i = new (f(this, p))(c(o - r)),
      u = new d(this),
      l = new d(i),
      h = 0;
    while (r < o) l.setUint8(h++, u.getUint8(r++));
    return i;
  }
}), require("./67527169.js")(y);
