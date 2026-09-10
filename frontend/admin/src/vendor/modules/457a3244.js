let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return o;
});
var r = require("./62597459.js"),
  i = require("./344e4f34.js");
function o(e, t) {
  var n,
    o = [],
    a = e.seriesIndex;
  if (null == a || !(n = t.getSeriesByIndex(a))) return {
    point: []
  };
  var s = n.getData(),
    l = i["s"](s, e);
  if (null == l || l < 0 || r["r"](l)) return {
    point: []
  };
  var u = s.getItemGraphicEl(l),
    c = n.coordinateSystem;
  if (n.getTooltipPosition) o = n.getTooltipPosition(l) || [];else if (c && c.dataToPoint) {
    if (e.isStacked) {
      var f = c.getBaseAxis(),
        d = c.getOtherAxis(f),
        h = d.dim,
        p = f.dim,
        g = "x" === h || "radius" === h ? 1 : 0,
        m = s.mapDimension(p),
        v = [];
      v[g] = s.get(m, l), v[1 - g] = s.get(s.getCalculationInfo("stackResultDimension"), l), o = c.dataToPoint(v) || [];
    } else o = c.dataToPoint(s.getValues(r["D"](c.dimensions, function (e) {
      return s.mapDimension(e);
    }), l)) || [];
  } else if (u) {
    var y = u.getBoundingRect().clone();
    y.applyTransform(u.transform), o = [y.x + y.width / 2, y.y + y.height / 2];
  }
  return {
    point: o,
    el: u
  };
}
