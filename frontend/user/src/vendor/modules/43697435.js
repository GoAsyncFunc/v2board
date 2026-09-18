let legacyModule = module,
  legacyExports = exports;
function r(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var o = this && this.__importStar || function (e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t["default"] = e, t;
  },
  i = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
      default: e
    };
  };
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var a = o(require("./reactRuntime.js")),
  s = o(require("./31377839.js")),
  c = i(require("./classNames.js")),
  u = require("./364f6771.js"),
  l = i(require("./554e7276.js"));
function f(e, t) {
  var n = t.table,
    o = n.props,
    i = o.prefixCls,
    s = o.scroll,
    f = o.showHeader,
    p = e.columns,
    d = e.fixed,
    h = e.tableClassName,
    m = e.handleBodyScrollLeft,
    v = e.expander,
    y = n.saveRef,
    g = n.props.useFixedHeader,
    b = {},
    w = u.measureScrollbar({
      direction: "vertical"
    });
  if (s.y) {
    g = !0;
    var x = u.measureScrollbar({
      direction: "horizontal",
      prefixCls: i
    });
    x > 0 && !d && (b.marginBottom = "-".concat(x, "px"), b.paddingBottom = "0px", b.minWidth = "".concat(w, "px"), b.overflowX = "scroll", b.overflowY = 0 === w ? "hidden" : "scroll");
  }
  return g && f ? a.createElement("div", {
    key: "headTable",
    ref: d ? null : y("headTable"),
    className: c.default("".concat(i, "-header"), r({}, "".concat(i, "-hide-scrollbar"), w > 0)),
    style: b,
    onScroll: m
  }, a.createElement(l.default, {
    tableClassName: h,
    hasHead: !0,
    hasBody: !1,
    fixed: d,
    columns: p,
    expander: v
  })) : null;
}
legacyExports.default = f, f.contextTypes = {
  table: s.any
};
