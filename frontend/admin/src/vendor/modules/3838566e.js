let legacyModule = module,
  legacyExports = exports;
var r,
  i = require("./globalObject.js"),
  o = require("./definePropertyValue.js"),
  a = require("./uid.js"),
  s = a("typed_array"),
  l = a("view"),
  c = !(!i.ArrayBuffer || !i.DataView),
  u = c,
  h = 0,
  f = 9,
  d = "Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(",");
while (h < f) (r = i[d[h++]]) ? (o(r.prototype, s, !0), o(r.prototype, l, !0)) : u = !1;
legacyModule.exports = {
  ABV: c,
  CONSTR: u,
  TYPED: s,
  VIEW: l
};
