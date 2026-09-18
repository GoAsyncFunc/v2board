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
var i = this && this.__importStar || function (e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t["default"] = e, t;
  },
  o = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
      default: e
    };
  };
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var a = i(require("./reactRuntime.js")),
  s = i(require("./propTypesRuntime.js")),
  l = o(require("./classNames.js")),
  c = require("./364f6771.js"),
  u = o(require("./554e7276.js"));
function h(e, t) {
  var n = t.table,
    i = n.props,
    o = i.prefixCls,
    s = i.scroll,
    h = i.showHeader,
    f = e.columns,
    d = e.fixed,
    p = e.tableClassName,
    m = e.handleBodyScrollLeft,
    g = e.expander,
    v = n.saveRef,
    y = n.props.useFixedHeader,
    b = {},
    w = c.measureScrollbar({
      direction: "vertical"
    });
  if (s.y) {
    y = !0;
    var x = c.measureScrollbar({
      direction: "horizontal",
      prefixCls: o
    });
    x > 0 && !d && (b.marginBottom = "-".concat(x, "px"), b.paddingBottom = "0px", b.minWidth = "".concat(w, "px"), b.overflowX = "scroll", b.overflowY = 0 === w ? "hidden" : "scroll");
  }
  return y && h ? a.createElement("div", {
    key: "headTable",
    ref: d ? null : v("headTable"),
    className: l.default("".concat(o, "-header"), r({}, "".concat(o, "-hide-scrollbar"), w > 0)),
    style: b,
    onScroll: m
  }, a.createElement(u.default, {
    tableClassName: p,
    hasHead: !0,
    hasBody: !1,
    fixed: d,
    columns: f,
    expander: g
  })) : null;
}
legacyExports.default = h, h.contextTypes = {
  table: s.any
};
