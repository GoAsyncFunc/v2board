let legacyModule = module,
  legacyExports = exports;
var r = this && this.__importStar || function (e) {
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
var o = r(require("./reactRuntime.js")),
  a = r(require("./31377839.js")),
  s = i(require("./4d696256.js"));
function l(e) {
  var t = e.columns,
    n = void 0 === t ? [] : t,
    r = e.currentRow,
    i = void 0 === r ? 0 : r,
    o = e.rows,
    a = void 0 === o ? [] : o,
    s = e.isLast,
    c = void 0 === s || s;
  return a[i] = a[i] || [], n.forEach(function (e, t) {
    if (e.rowSpan && a.length < e.rowSpan) while (a.length < e.rowSpan) a.push([]);
    var r = c && t === n.length - 1,
      o = {
        key: e.key,
        className: e.className || "",
        children: e.title,
        isLast: r,
        column: e
      };
    e.children && l({
      columns: e.children,
      currentRow: i + 1,
      rows: a,
      isLast: r
    }), "colSpan" in e && (o.colSpan = e.colSpan), "rowSpan" in e && (o.rowSpan = e.rowSpan), 0 !== o.colSpan && a[i].push(o);
  }), a.filter(function (e) {
    return e.length > 0;
  });
}
var c = function (e, t) {
  var n = t.table,
    r = n.components,
    i = n.props,
    a = i.prefixCls,
    c = i.showHeader,
    u = i.onHeaderRow,
    h = e.expander,
    f = e.columns,
    d = e.fixed;
  if (!c) return null;
  var p = l({
    columns: f
  });
  h.renderExpandIndentCell(p, d);
  var m = r.header.wrapper;
  return o.createElement(m, {
    className: "".concat(a, "-thead")
  }, p.map(function (e, t) {
    return o.createElement(s.default, {
      prefixCls: a,
      key: t,
      index: t,
      fixed: d,
      columns: f,
      rows: p,
      row: e,
      components: r,
      onHeaderRow: u
    });
  }));
};
c.contextTypes = {
  table: a.any
}, legacyExports.default = c;
