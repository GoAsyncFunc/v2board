let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return h;
});
var r = require("./472b6553.js"),
  i = require("./73532f72.js"),
  o = require("./36496336.js"),
  a = require("./624c6677.js"),
  s = require("./54345547.js"),
  l = require("./62597459.js"),
  u = require("./574d6c4a.js"),
  c = require("./61583538.js"),
  f = [],
  d = {
    registerPreprocessor: r["j"],
    registerProcessor: r["k"],
    registerPostInit: r["h"],
    registerPostUpdate: r["i"],
    registerUpdateLifecycle: r["m"],
    registerAction: r["c"],
    registerCoordinateSystem: r["d"],
    registerLayout: r["e"],
    registerVisual: r["n"],
    registerTransform: r["l"],
    registerLoading: r["f"],
    registerMap: r["g"],
    registerImpl: u["b"],
    PRIORITY: r["a"],
    ComponentModel: a["a"],
    ComponentView: i["a"],
    SeriesModel: s["b"],
    ChartView: o["a"],
    registerComponentModel: function (e) {
      a["a"].registerClass(e);
    },
    registerComponentView: function (e) {
      i["a"].registerClass(e);
    },
    registerSeriesModel: function (e) {
      s["b"].registerClass(e);
    },
    registerChartView: function (e) {
      o["a"].registerClass(e);
    },
    registerSubTypeDefaulter: function (e, t) {
      a["a"].registerSubTypeDefaulter(e, t);
    },
    registerPainter: function (e, t) {
      Object(c["b"])(e, t);
    }
  };
function h(e) {
  Object(l["r"])(e) ? Object(l["j"])(e, function (e) {
    h(e);
  }) : Object(l["p"])(f, e) >= 0 || (f.push(e), Object(l["u"])(e) && (e = {
    install: e
  }), e.install(d));
}
