let legacyModule = module,
  legacyExports = exports;
function r(e, t) {
  if (null == e) return {};
  var n,
    r,
    i = o(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
  }
  return i;
}
function o(e, t) {
  if (null == e) return {};
  var n,
    r,
    o = {},
    i = Object.keys(e);
  for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
  return o;
}
function i(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function a(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? i(Object(n), !0).forEach(function (t) {
      s(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : i(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function s(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var c = this && this.__importStar || function (e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t["default"] = e, t;
  },
  u = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
      default: e
    };
  };
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var l = c(require("./reactRuntime.js")),
  f = require("./7849304a.js"),
  p = u(require("./classNames.js"));
function d(e) {
  var t = e.row,
    n = e.index,
    o = e.height,
    i = e.components,
    c = e.onHeaderRow,
    u = e.prefixCls,
    f = i.header.row,
    d = i.header.cell,
    h = c(t.map(function (e) {
      return e.column;
    }), n),
    m = h ? h.style : {},
    v = a({
      height: t.length > 1 && 0 === n && o && "auto" !== o ? parseInt(o.toString(), 10) : o
    }, m);
  return l.createElement(f, Object.assign({}, h, {
    style: v
  }), t.map(function (e, t) {
    var n,
      o = e.column,
      i = e.isLast,
      c = r(e, ["column", "isLast"]),
      f = o.onHeaderCell ? o.onHeaderCell(o) : {};
    return o.align && (f.style = a({}, f.style, {
      textAlign: o.align
    })), f.className = p.default(f.className, o.className, (n = {}, s(n, "".concat(u, "-align-").concat(o.align), !!o.align), s(n, "".concat(u, "-row-cell-ellipsis"), !!o.ellipsis), s(n, "".concat(u, "-row-cell-break-word"), !!o.width), s(n, "".concat(u, "-row-cell-last"), i), n)), l.createElement(d, Object.assign({}, c, f, {
      key: o.key || o.dataIndex || t
    }));
  }));
}
function h(e, t) {
  var n = e.fixedColumnsHeadRowsHeight,
    r = t.columns,
    o = t.rows,
    i = t.fixed,
    a = n[0];
  return i && a && r ? "auto" === a ? "auto" : a / o.length : null;
}
legacyExports.default = f.connect(function (e, t) {
  return {
    height: h(e, t)
  };
})(d);
