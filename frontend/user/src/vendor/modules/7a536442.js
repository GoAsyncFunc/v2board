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
var o = r(require("./71317449.js")),
  i = r(require("./31377839.js")),
  a = require("./364f6771.js"),
  s = function (e, t) {
    var n,
      r = t.table,
      i = r.props,
      s = i.prefixCls,
      c = i.expandIconAsCell,
      u = e.fixed,
      l = [];
    return c && "right" !== u && l.push(o.createElement("col", {
      className: "".concat(s, "-expand-icon-col"),
      key: "rc-table-expand-icon-col"
    })), n = "left" === u ? r.columnManager.leftLeafColumns() : "right" === u ? r.columnManager.rightLeafColumns() : r.columnManager.leafColumns(), l = l.concat(n.map(function (e) {
      var t = e.key,
        n = e.dataIndex,
        r = e.width,
        i = e[a.INTERNAL_COL_DEFINE],
        s = void 0 !== t ? t : n;
      return o.createElement("col", Object.assign({
        key: s,
        style: {
          width: r,
          minWidth: r
        }
      }, i));
    })), o.createElement("colgroup", null, l);
  };
s.contextTypes = {
  table: i.any
}, legacyExports.default = s;
