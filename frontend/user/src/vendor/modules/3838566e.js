let legacyModule = module,
  legacyExports = exports;
var r,
  o = require("./globalObject.js"),
  i = require("./56504f45.js"),
  a = require("./6b434b35.js"),
  s = a("typed_array"),
  c = a("view"),
  u = !(!o.ArrayBuffer || !o.DataView),
  l = u,
  f = 0,
  p = 9,
  d = "Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(",");
while (f < p) (r = o[d[f++]]) ? (i(r.prototype, s, !0), i(r.prototype, c, !0)) : l = !1;
legacyModule.exports = {
  ABV: u,
  CONSTR: l,
  TYPED: s,
  VIEW: c
};
