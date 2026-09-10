let legacyModule = module,
  legacyExports = exports;
var r = this && this.__importStar || function (e) {
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
var i = r(require("./71317449.js")),
  a = r(require("./31377839.js")),
  s = o(require("./4d696256.js"));
function c(e) {
  var t = e.columns,
    n = void 0 === t ? [] : t,
    r = e.currentRow,
    o = void 0 === r ? 0 : r,
    i = e.rows,
    a = void 0 === i ? [] : i,
    s = e.isLast,
    u = void 0 === s || s;
  return a[o] = a[o] || [], n.forEach(function (e, t) {
    if (e.rowSpan && a.length < e.rowSpan) while (a.length < e.rowSpan) a.push([]);
    var r = u && t === n.length - 1,
      i = {
        key: e.key,
        className: e.className || "",
        children: e.title,
        isLast: r,
        column: e
      };
    e.children && c({
      columns: e.children,
      currentRow: o + 1,
      rows: a,
      isLast: r
    }), "colSpan" in e && (i.colSpan = e.colSpan), "rowSpan" in e && (i.rowSpan = e.rowSpan), 0 !== i.colSpan && a[o].push(i);
  }), a.filter(function (e) {
    return e.length > 0;
  });
}
var u = function (e, t) {
  var n = t.table,
    r = n.components,
    o = n.props,
    a = o.prefixCls,
    u = o.showHeader,
    l = o.onHeaderRow,
    f = e.expander,
    p = e.columns,
    d = e.fixed;
  if (!u) return null;
  var h = c({
    columns: p
  });
  f.renderExpandIndentCell(h, d);
  var m = r.header.wrapper;
  return i.createElement(m, {
    className: "".concat(a, "-thead")
  }, h.map(function (e, t) {
    return i.createElement(s.default, {
      prefixCls: a,
      key: t,
      index: t,
      fixed: d,
      columns: p,
      rows: h,
      row: e,
      components: r,
      onHeaderRow: l
    });
  }));
};
u.contextTypes = {
  table: a.any
}, legacyExports.default = u;
