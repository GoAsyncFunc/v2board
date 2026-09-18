let legacyModule = module,
  legacyExports = exports;
var r = this && this.__importStar || function (e) {
  if (e && e.__esModule) return e;
  var t = {};
  if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
  return t["default"] = e, t;
};
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var i = r(require("./reactRuntime.js")),
  o = r(require("./propTypesRuntime.js")),
  a = require("./364f6771.js"),
  s = function (e, t) {
    var n,
      r = t.table,
      o = r.props,
      s = o.prefixCls,
      l = o.expandIconAsCell,
      c = e.fixed,
      u = [];
    return l && "right" !== c && u.push(i.createElement("col", {
      className: "".concat(s, "-expand-icon-col"),
      key: "rc-table-expand-icon-col"
    })), n = "left" === c ? r.columnManager.leftLeafColumns() : "right" === c ? r.columnManager.rightLeafColumns() : r.columnManager.leafColumns(), u = u.concat(n.map(function (e) {
      var t = e.key,
        n = e.dataIndex,
        r = e.width,
        o = e[a.INTERNAL_COL_DEFINE],
        s = void 0 !== t ? t : n;
      return i.createElement("col", Object.assign({
        key: s,
        style: {
          width: r,
          minWidth: r
        }
      }, o));
    })), i.createElement("colgroup", null, u);
  };
s.contextTypes = {
  table: o.any
}, legacyExports.default = s;
