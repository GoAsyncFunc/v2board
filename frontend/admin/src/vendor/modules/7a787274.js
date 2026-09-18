let legacyModule = module,
  legacyExports = exports;
var r = require("./57474e57.js"),
  i = require("./3838566e.js"),
  o = require("./794c4d59.js"),
  a = require("./3776594a.js"),
  s = require("./53706333.js"),
  l = require("./4f735664.js"),
  c = require("./75382b75.js"),
  u = require("./globalObject.js").ArrayBuffer,
  h = require("./56657959.js"),
  f = o.ArrayBuffer,
  d = o.DataView,
  p = i.ABV && u.isView,
  m = f.prototype.slice,
  g = i.VIEW,
  v = "ArrayBuffer";
r(r.G + r.W + r.F * (u !== f), {
  ArrayBuffer: f
}), r(r.S + r.F * !i.CONSTR, v, {
  isView: function (e) {
    return p && p(e) || c(e) && g in e;
  }
}), r(r.P + r.U + r.F * require("./77555779.js")(function () {
  return !new f(2).slice(1, void 0).byteLength;
}), v, {
  slice: function (e, t) {
    if (void 0 !== m && void 0 === t) return m.call(a(this), e);
    var n = a(this).byteLength,
      r = s(e, n),
      i = s(void 0 === t ? n : t, n),
      o = new (h(this, f))(l(i - r)),
      c = new d(this),
      u = new d(o),
      p = 0;
    while (r < i) u.setUint8(p++, c.getUint8(r++));
    return o;
  }
}), require("./67527169.js")(v);
