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
function o(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? i(Object(n), !0).forEach(function (t) {
      a(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : i(Object(n)).forEach(function (t) {
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
  return h(e) || u(e) || c(e) || l();
}
function l() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function c(e, t) {
  if (e) {
    if ("string" === typeof e) return f(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(n) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? f(e, t) : void 0;
  }
}
function u(e) {
  if ("undefined" !== typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
}
function h(e) {
  if (Array.isArray(e)) return f(e);
}
function f(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function d(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function p(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function m(e, t, n) {
  return t && p(e.prototype, t), n && p(e, n), e;
}
function g(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && v(e, t);
}
function v(e, t) {
  return v = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, v(e, t);
}
function y(e) {
  return function () {
    var t,
      n = _(e);
    if (x()) {
      var r = _(this).constructor;
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
function _(e) {
  return _ = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, _(e);
}
var E = this && this.__importStar || function (e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t["default"] = e, t;
  },
  S = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
      default: e
    };
  };
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var k = E(require("./reactRuntime.js")),
  C = require("./reactReduxRuntime.js"),
  O = require("./reactLifecyclesCompat.js"),
  T = S(require("./47797478.js")),
  L = S(require("./58615332.js")),
  A = require("./364f6771.js"),
  P = function (e) {
    g(n, e);
    var t = y(n);
    function n(e) {
      var r;
      d(this, n), r = t.call(this, e), r.handleExpandChange = function (e, t, n, i) {
        var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
        n && n.stopPropagation();
        var a = r.props,
          l = a.onExpandedRowsChange,
          c = a.onExpand,
          u = r.store.getState(),
          h = u.expandedRowKeys;
        if (e) h = [].concat(s(h), [i]);else {
          var f = h.indexOf(i);
          -1 !== f && (h = A.remove(h, i));
        }
        r.props.expandedRowKeys || r.store.setState({
          expandedRowKeys: h
        }), r.latestExpandedRows && T.default(r.latestExpandedRows, h) || (r.latestExpandedRows = h, l(h)), o || c(e, t);
      }, r.renderExpandIndentCell = function (e, t) {
        var n = r.props,
          i = n.prefixCls,
          a = n.expandIconAsCell;
        if (a && "right" !== t && e.length) {
          var s = {
            key: "rc-table-expand-icon-cell",
            className: "".concat(i, "-expand-icon-th"),
            title: "",
            rowSpan: e.length
          };
          e[0].unshift(o({}, s, {
            column: s
          }));
        }
      }, r.renderRows = function (e, t, n, i, o, a, l, c) {
        var u = r.props,
          h = u.expandedRowClassName,
          f = u.expandedRowRender,
          d = u.childrenColumnName,
          p = n[d],
          m = [].concat(s(c), [l]),
          g = o + 1;
        f && t.push(r.renderExpandedRow(n, i, f, h(n, i, o), m, g, a)), p && t.push.apply(t, s(e(p, g, m)));
      };
      var i = e.data,
        a = e.childrenColumnName,
        l = e.defaultExpandAllRows,
        c = e.expandedRowKeys,
        u = e.defaultExpandedRowKeys,
        h = e.getRowKey,
        f = [],
        p = s(i);
      if (l) for (var m = 0; m < p.length; m += 1) {
        var g = p[m];
        f.push(h(g, m)), p = p.concat(g[a] || []);
      } else f = c || u;
      return r.columnManager = e.columnManager, r.store = e.store, r.store.setState({
        expandedRowsHeight: {},
        expandedRowKeys: f
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
      value: function (e, t, n, r, i, o, a) {
        var s,
          l = this,
          c = this.props,
          u = c.prefixCls,
          h = c.expandIconAsCell,
          f = c.indentSize,
          d = i[i.length - 1],
          p = "".concat(d, "-extra-row"),
          m = {
            body: {
              row: "tr",
              cell: "td"
            }
          };
        s = "left" === a ? this.columnManager.leftLeafColumns().length : "right" === a ? this.columnManager.rightLeafColumns().length : this.columnManager.leafColumns().length;
        var g = [{
          key: "extra-row",
          render: function () {
            var r = l.store.getState(),
              i = r.expandedRowKeys,
              c = void 0 === i ? [] : i,
              u = c.includes(d);
            return {
              props: {
                colSpan: s
              },
              children: "right" !== a ? n(e, t, o, u) : "&nbsp;"
            };
          }
        }];
        return h && "right" !== a && g.unshift({
          key: "expand-icon-placeholder",
          render: function () {
            return null;
          }
        }), k.createElement(L.default, {
          key: p,
          columns: g,
          className: r,
          rowKey: p,
          ancestorKeys: i,
          prefixCls: "".concat(u, "-expanded-row"),
          indentSize: f,
          indent: o,
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
          i = t.some(function (e) {
            return e[n];
          });
        return r({
          props: this.props,
          needIndentSpaced: i,
          renderRows: this.renderRows,
          handleExpandChange: this.handleExpandChange,
          renderExpandIndentCell: this.renderExpandIndentCell
        });
      }
    }]), n;
  }(k.Component);
P.defaultProps = {
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
}, O.polyfill(P), legacyExports.default = C.connect()(P);
