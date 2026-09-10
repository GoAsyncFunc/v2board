let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return o;
}), defineExport(legacyExports, "c", function () {
  return s;
}), defineExport(legacyExports, "b", function () {
  return l;
});
var r = require("./62597459.js"),
  i = require("./674c6b6e.js");
function o(e, t, n) {
  n = n || {};
  var i,
    o,
    s,
    l = n.byIndex,
    u = n.stackedCoordDimension;
  a(t) ? i = t : (o = t.schema, i = o.dimensions, s = t.store);
  var c,
    f,
    d,
    h,
    p = !(!e || !e.get("stack"));
  if (Object(r["j"])(i, function (e, t) {
    Object(r["y"])(e) && (i[t] = e = {
      name: e
    }), p && !e.isExtraCoord && (l || c || !e.ordinalMeta || (c = e), f || "ordinal" === e.type || "time" === e.type || u && u !== e.coordDim || (f = e));
  }), !f || l || c || (l = !0), f) {
    d = "__\0ecstackresult_" + e.id, h = "__\0ecstackedover_" + e.id, c && (c.createInvertedIndices = !0);
    var g = f.coordDim,
      m = f.type,
      v = 0;
    Object(r["j"])(i, function (e) {
      e.coordDim === g && v++;
    });
    var y = {
        name: d,
        coordDim: g,
        coordDimIndex: v,
        type: m,
        isExtraCoord: !0,
        isCalculationCoord: !0,
        storeDimIndex: i.length
      },
      b = {
        name: h,
        coordDim: h,
        coordDimIndex: v + 1,
        type: m,
        isExtraCoord: !0,
        isCalculationCoord: !0,
        storeDimIndex: i.length + 1
      };
    o ? (s && (y.storeDimIndex = s.ensureCalculationDimension(h, m), b.storeDimIndex = s.ensureCalculationDimension(d, m)), o.appendCalculationDimension(y), o.appendCalculationDimension(b)) : (i.push(y), i.push(b));
  }
  return {
    stackedDimension: f && f.name,
    stackedByDimension: c && c.name,
    isStackedByIndex: l,
    stackedOverDimension: h,
    stackResultDimension: d
  };
}
function a(e) {
  return !Object(i["d"])(e.schema);
}
function s(e, t) {
  return !!t && t === e.getCalculationInfo("stackedDimension");
}
function l(e, t) {
  return s(e, t) ? e.getCalculationInfo("stackResultDimension") : t;
}
