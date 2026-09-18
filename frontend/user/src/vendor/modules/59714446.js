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
function o(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? r(Object(n), !0).forEach(function (t) {
      i(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : r(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function i(e, t, n) {
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
var c = a(require("./reactRuntime.js")),
  u = a(require("./propTypesRuntime.js")),
  l = require("./rcTableUtils.js"),
  f = s(require("./554e7276.js"));
function p(e, t) {
  var n = t.table,
    r = n.props,
    i = r.prefixCls,
    a = r.scroll,
    s = e.columns,
    u = e.fixed,
    p = e.tableClassName,
    d = e.getRowKey,
    h = e.handleBodyScroll,
    m = e.handleWheel,
    v = e.expander,
    y = e.isAnyColumnsFixed,
    g = n.saveRef,
    b = n.props.useFixedHeader,
    w = o({}, n.props.bodyStyle),
    x = {};
  if ((a.x || u) && (w.overflowX = w.overflowX || "scroll", w.WebkitTransform = "translate3d (0, 0, 0)"), a.y) {
    u ? (x.maxHeight = w.maxHeight || a.y, x.overflowY = w.overflowY || "scroll") : w.maxHeight = w.maxHeight || a.y, w.overflowY = w.overflowY || "scroll", b = !0;
    var O = l.measureScrollbar({
      direction: "vertical"
    });
    O > 0 && u && (w.marginBottom = "-".concat(O, "px"), w.paddingBottom = "0px");
  }
  var E,
    _ = c.createElement(f.default, {
      tableClassName: p,
      hasHead: !b,
      hasBody: !0,
      fixed: u,
      columns: s,
      expander: v,
      getRowKey: d,
      isAnyColumnsFixed: y
    });
  if (u && s.length) return "left" === s[0].fixed || !0 === s[0].fixed ? E = "fixedColumnsBodyLeft" : "right" === s[0].fixed && (E = "fixedColumnsBodyRight"), delete w.overflowX, delete w.overflowY, c.createElement("div", {
    key: "bodyTable",
    className: "".concat(i, "-body-outer"),
    style: o({}, w)
  }, c.createElement("div", {
    className: "".concat(i, "-body-inner"),
    style: x,
    ref: g(E),
    onWheel: m,
    onScroll: h
  }, _));
  var k = a && (a.x || a.y);
  return c.createElement("div", {
    tabIndex: k ? -1 : void 0,
    key: "bodyTable",
    className: "".concat(i, "-body"),
    style: w,
    ref: g("bodyTable"),
    onWheel: m,
    onScroll: h
  }, _);
}
legacyExports.default = p, p.contextTypes = {
  table: u.any
};
