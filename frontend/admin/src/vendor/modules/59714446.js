let legacyModule = module,
  legacyExports = exports;
function r(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function i(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? r(Object(n), !0).forEach(function (t) {
      o(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : r(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function o(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var a = this && this.__importStar || function (e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t["default"] = e, t;
  },
  s = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
      default: e
    };
  };
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var l = a(require("./reactRuntime.js")),
  c = a(require("./propTypesRuntime.js")),
  u = require("./364f6771.js"),
  h = s(require("./554e7276.js"));
function f(e, t) {
  var n = t.table,
    r = n.props,
    o = r.prefixCls,
    a = r.scroll,
    s = e.columns,
    c = e.fixed,
    f = e.tableClassName,
    d = e.getRowKey,
    p = e.handleBodyScroll,
    m = e.handleWheel,
    g = e.expander,
    v = e.isAnyColumnsFixed,
    y = n.saveRef,
    b = n.props.useFixedHeader,
    w = i({}, n.props.bodyStyle),
    x = {};
  if ((a.x || c) && (w.overflowX = w.overflowX || "scroll", w.WebkitTransform = "translate3d (0, 0, 0)"), a.y) {
    c ? (x.maxHeight = w.maxHeight || a.y, x.overflowY = w.overflowY || "scroll") : w.maxHeight = w.maxHeight || a.y, w.overflowY = w.overflowY || "scroll", b = !0;
    var _ = u.measureScrollbar({
      direction: "vertical"
    });
    _ > 0 && c && (w.marginBottom = "-".concat(_, "px"), w.paddingBottom = "0px");
  }
  var E,
    S = l.createElement(h.default, {
      tableClassName: f,
      hasHead: !b,
      hasBody: !0,
      fixed: c,
      columns: s,
      expander: g,
      getRowKey: d,
      isAnyColumnsFixed: v
    });
  if (c && s.length) return "left" === s[0].fixed || !0 === s[0].fixed ? E = "fixedColumnsBodyLeft" : "right" === s[0].fixed && (E = "fixedColumnsBodyRight"), delete w.overflowX, delete w.overflowY, l.createElement("div", {
    key: "bodyTable",
    className: "".concat(o, "-body-outer"),
    style: i({}, w)
  }, l.createElement("div", {
    className: "".concat(o, "-body-inner"),
    style: x,
    ref: y(E),
    onWheel: m,
    onScroll: p
  }, S));
  var k = a && (a.x || a.y);
  return l.createElement("div", {
    tabIndex: k ? -1 : void 0,
    key: "bodyTable",
    className: "".concat(o, "-body"),
    style: w,
    ref: y("bodyTable"),
    onWheel: m,
    onScroll: p
  }, S);
}
legacyExports.default = f, f.contextTypes = {
  table: c.any
};
