let legacyModule = module,
  legacyExports = exports;
function r(e) {
  "@babel/helpers - typeof";

  return r = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, r(e);
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
function i(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? o(Object(n), !0).forEach(function (t) {
      a(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : o(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function a(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function s(e) {
  return f(e) || l(e) || u(e) || c();
}
function c() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function u(e, t) {
  if (e) {
    if ("string" === typeof e) return p(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(n) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? p(e, t) : void 0;
  }
}
function l(e) {
  if ("undefined" !== typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
}
function f(e) {
  if (Array.isArray(e)) return p(e);
}
function p(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function d(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function h(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function m(e, t, n) {
  return t && h(e.prototype, t), n && h(e, n), e;
}
function v(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && y(e, t);
}
function y(e, t) {
  return y = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, y(e, t);
}
function g(e) {
  return function () {
    var t,
      n = O(e);
    if (x()) {
      var r = O(this).constructor;
      t = Reflect.construct(n, arguments, r);
    } else t = n.apply(this, arguments);
    return b(this, t);
  };
}
function b(e, t) {
  return !t || "object" !== r(t) && "function" !== typeof t ? w(e) : t;
}
function w(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function x() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function O(e) {
  return O = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, O(e);
}
var E = this && this.__importStar || function (e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t["default"] = e, t;
  },
  _ = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
      default: e
    };
  };
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var k = E(require("./reactRuntime.js")),
  S = require("./reactReduxRuntime.js"),
  C = require("./reactLifecyclesCompat.js"),
  j = _(require("./47797478.js")),
  P = _(require("./58615332.js")),
  T = require("./364f6771.js"),
  L = function (e) {
    v(n, e);
    var t = g(n);
    function n(e) {
      var r;
      d(this, n), r = t.call(this, e), r.handleExpandChange = function (e, t, n, o) {
        var i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
        n && n.stopPropagation();
        var a = r.props,
          c = a.onExpandedRowsChange,
          u = a.onExpand,
          l = r.store.getState(),
          f = l.expandedRowKeys;
        if (e) f = [].concat(s(f), [o]);else {
          var p = f.indexOf(o);
          -1 !== p && (f = T.remove(f, o));
        }
        r.props.expandedRowKeys || r.store.setState({
          expandedRowKeys: f
        }), r.latestExpandedRows && j.default(r.latestExpandedRows, f) || (r.latestExpandedRows = f, c(f)), i || u(e, t);
      }, r.renderExpandIndentCell = function (e, t) {
        var n = r.props,
          o = n.prefixCls,
          a = n.expandIconAsCell;
        if (a && "right" !== t && e.length) {
          var s = {
            key: "rc-table-expand-icon-cell",
            className: "".concat(o, "-expand-icon-th"),
            title: "",
            rowSpan: e.length
          };
          e[0].unshift(i({}, s, {
            column: s
          }));
        }
      }, r.renderRows = function (e, t, n, o, i, a, c, u) {
        var l = r.props,
          f = l.expandedRowClassName,
          p = l.expandedRowRender,
          d = l.childrenColumnName,
          h = n[d],
          m = [].concat(s(u), [c]),
          v = i + 1;
        p && t.push(r.renderExpandedRow(n, o, p, f(n, o, i), m, v, a)), h && t.push.apply(t, s(e(h, v, m)));
      };
      var o = e.data,
        a = e.childrenColumnName,
        c = e.defaultExpandAllRows,
        u = e.expandedRowKeys,
        l = e.defaultExpandedRowKeys,
        f = e.getRowKey,
        p = [],
        h = s(o);
      if (c) for (var m = 0; m < h.length; m += 1) {
        var v = h[m];
        p.push(f(v, m)), h = h.concat(v[a] || []);
      } else p = u || l;
      return r.columnManager = e.columnManager, r.store = e.store, r.store.setState({
        expandedRowsHeight: {},
        expandedRowKeys: p
      }), r;
    }
    return m(n, [{
      key: "componentDidMount",
      value: function () {
        this.handleUpdated();
      }
    }, {
      key: "componentDidUpdate",
      value: function () {
        "expandedRowKeys" in this.props && this.store.setState({
          expandedRowKeys: this.props.expandedRowKeys
        }), this.handleUpdated();
      }
    }, {
      key: "handleUpdated",
      value: function () {
        this.latestExpandedRows = null;
      }
    }, {
      key: "renderExpandedRow",
      value: function (e, t, n, r, o, i, a) {
        var s,
          c = this,
          u = this.props,
          l = u.prefixCls,
          f = u.expandIconAsCell,
          p = u.indentSize,
          d = o[o.length - 1],
          h = "".concat(d, "-extra-row"),
          m = {
            body: {
              row: "tr",
              cell: "td"
            }
          };
        s = "left" === a ? this.columnManager.leftLeafColumns().length : "right" === a ? this.columnManager.rightLeafColumns().length : this.columnManager.leafColumns().length;
        var v = [{
          key: "extra-row",
          render: function () {
            var r = c.store.getState(),
              o = r.expandedRowKeys,
              u = void 0 === o ? [] : o,
              l = u.includes(d);
            return {
              props: {
                colSpan: s
              },
              children: "right" !== a ? n(e, t, i, l) : "&nbsp;"
            };
          }
        }];
        return f && "right" !== a && v.unshift({
          key: "expand-icon-placeholder",
          render: function () {
            return null;
          }
        }), k.createElement(P.default, {
          key: h,
          columns: v,
          className: r,
          rowKey: h,
          ancestorKeys: o,
          prefixCls: "".concat(l, "-expanded-row"),
          indentSize: p,
          indent: i,
          fixed: a,
          components: m,
          expandedRow: !0
        });
      }
    }, {
      key: "render",
      value: function () {
        var e = this.props,
          t = e.data,
          n = e.childrenColumnName,
          r = e.children,
          o = t.some(function (e) {
            return e[n];
          });
        return r({
          props: this.props,
          needIndentSpaced: o,
          renderRows: this.renderRows,
          handleExpandChange: this.handleExpandChange,
          renderExpandIndentCell: this.renderExpandIndentCell
        });
      }
    }]), n;
  }(k.Component);
L.defaultProps = {
  expandIconAsCell: !1,
  expandedRowClassName: function () {
    return "";
  },
  expandIconColumnIndex: 0,
  defaultExpandAllRows: !1,
  defaultExpandedRowKeys: [],
  childrenColumnName: "children",
  indentSize: 15,
  onExpand: function () {},
  onExpandedRowsChange: function () {}
}, C.polyfill(L), legacyExports.default = S.connect()(L);
