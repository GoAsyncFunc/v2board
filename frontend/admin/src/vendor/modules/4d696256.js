let legacyModule = module,
  legacyExports = exports;
function r(e, t) {
  if (null == e) return {};
  var n,
    r,
    o = i(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function i(e, t) {
  if (null == e) return {};
  var n,
    r,
    i = {},
    o = Object.keys(e);
  for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || (i[n] = e[n]);
  return i;
}
function o(e, t) {
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
    t % 2 ? o(Object(n), !0).forEach(function (t) {
      s(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : o(Object(n)).forEach(function (t) {
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
var l = this && this.__importStar || function (e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t["default"] = e, t;
  },
  c = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
      default: e
    };
  };
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var u = l(require("./71317449.js")),
  h = require("./7849304a.js"),
  f = c(require("./54535951.js"));
function d(e) {
  var t = e.row,
    n = e.index,
    i = e.height,
    o = e.components,
    l = e.onHeaderRow,
    c = e.prefixCls,
    h = o.header.row,
    d = o.header.cell,
    p = l(t.map(function (e) {
      return e.column;
    }), n),
    m = p ? p.style : {},
    g = a({
      height: t.length > 1 && 0 === n && i && "auto" !== i ? parseInt(i.toString(), 10) : i
    }, m);
  return u.createElement(h, Object.assign({}, p, {
    style: g
  }), t.map(function (e, t) {
    var n,
      i = e.column,
      o = e.isLast,
      l = r(e, ["column", "isLast"]),
      h = i.onHeaderCell ? i.onHeaderCell(i) : {};
    return i.align && (h.style = a({}, h.style, {
      textAlign: i.align
    })), h.className = f.default(h.className, i.className, (n = {}, s(n, "".concat(c, "-align-").concat(i.align), !!i.align), s(n, "".concat(c, "-row-cell-ellipsis"), !!i.ellipsis), s(n, "".concat(c, "-row-cell-break-word"), !!i.width), s(n, "".concat(c, "-row-cell-last"), o), n)), u.createElement(d, Object.assign({}, l, h, {
      key: i.key || i.dataIndex || t
    }));
  }));
}
function p(e, t) {
  var n = e.fixedColumnsHeadRowsHeight,
    r = t.columns,
    i = t.rows,
    o = t.fixed,
    a = n[0];
  return o && a && r ? "auto" === a ? "auto" : a / i.length : null;
}
legacyExports.default = h.connect(function (e, t) {
  return {
    height: p(e, t)
  };
})(d);
