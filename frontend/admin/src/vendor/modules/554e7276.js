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
function s(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function l(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function c(e, t, n) {
  return t && l(e.prototype, t), n && l(e, n), e;
}
function u(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && h(e, t);
}
function h(e, t) {
  return h = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, h(e, t);
}
function f(e) {
  return function () {
    var t,
      n = g(e);
    if (m()) {
      var r = g(this).constructor;
      t = Reflect.construct(n, arguments, r);
    } else t = n.apply(this, arguments);
    return d(this, t);
  };
}
function d(e, t) {
  return !t || "object" !== r(t) && "function" !== typeof t ? p(e) : t;
}
function p(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function m() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function g(e) {
  return g = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, g(e);
}
var v = this && this.__importStar || function (e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t["default"] = e, t;
  },
  y = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
      default: e
    };
  };
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var b = v(require("./reactRuntime.js")),
  w = v(require("./propTypesRuntime.js")),
  x = require("./7849304a.js"),
  _ = y(require("./classNames.js")),
  E = y(require("./7a536442.js")),
  S = y(require("./564d537a.js")),
  k = y(require("./58615332.js")),
  C = y(require("./7a677138.js")),
  O = function (e) {
    u(n, e);
    var t = f(n);
    function n() {
      var e;
      return s(this, n), e = t.apply(this, arguments), e.handleRowHover = function (t, n) {
        e.props.store.setState({
          currentHoverKey: t ? n : null
        });
      }, e.renderRows = function (t, n) {
        for (var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], i = e.context.table, o = i.columnManager, a = i.components, s = i.props, l = s.prefixCls, c = s.childrenColumnName, u = s.rowClassName, h = s.rowRef, f = s.onRowClick, d = s.onRowDoubleClick, p = s.onRowContextMenu, m = s.onRowMouseEnter, g = s.onRowMouseLeave, v = s.onRow, y = e.props, w = y.getRowKey, x = y.fixed, _ = y.expander, E = y.isAnyColumnsFixed, S = [], O = function (i) {
            var s = t[i],
              y = w(s, i),
              O = "string" === typeof u ? u : u(s, i, n),
              T = {};
            o.isAnyColumnsFixed() && (T.onHover = e.handleRowHover);
            var L = void 0;
            L = "left" === x ? o.leftLeafColumns() : "right" === x ? o.rightLeafColumns() : e.getColumns(o.leafColumns());
            var A = "".concat(l, "-row"),
              P = b.createElement(C.default, Object.assign({}, _.props, {
                fixed: x,
                index: i,
                prefixCls: A,
                record: s,
                key: y,
                rowKey: y,
                onRowClick: f,
                needIndentSpaced: _.needIndentSpaced,
                onExpandedChange: _.handleExpandChange
              }), function (e) {
                return b.createElement(k.default, Object.assign({
                  fixed: x,
                  indent: n,
                  className: O,
                  record: s,
                  index: i,
                  prefixCls: A,
                  childrenColumnName: c,
                  columns: L,
                  onRow: v,
                  onRowDoubleClick: d,
                  onRowContextMenu: p,
                  onRowMouseEnter: m,
                  onRowMouseLeave: g
                }, T, {
                  rowKey: y,
                  ancestorKeys: r,
                  ref: h(s, i, n),
                  components: a,
                  isAnyColumnsFixed: E
                }, e));
              });
            S.push(P), _.renderRows(e.renderRows, S, s, i, n, x, y, r);
          }, T = 0; T < t.length; T += 1) O(T);
        return S;
      }, e;
    }
    return c(n, [{
      key: "getColumns",
      value: function (e) {
        var t = this.props,
          n = t.columns,
          r = void 0 === n ? [] : n,
          i = t.fixed,
          a = this.context.table,
          s = a.props.prefixCls;
        return (e || r).map(function (e) {
          return o({}, e, {
            className: e.fixed && !i ? _.default("".concat(s, "-fixed-columns-in-body"), e.className) : e.className
          });
        });
      }
    }, {
      key: "render",
      value: function () {
        var e = this.context.table,
          t = e.components,
          n = e.props,
          r = n.prefixCls,
          i = n.scroll,
          o = n.data,
          a = n.getBodyWrapper,
          s = this.props,
          l = s.expander,
          c = s.tableClassName,
          u = s.hasHead,
          h = s.hasBody,
          f = s.fixed,
          d = s.isAnyColumnsFixed,
          p = {};
        if (!f && i.x) {
          var m = d ? "max-content" : "auto";
          p.width = !0 === i.x ? m : i.x;
        }
        var g,
          v = h ? t.table : "table",
          y = t.body.wrapper;
        h && (g = b.createElement(y, {
          className: "".concat(r, "-tbody")
        }, this.renderRows(o, 0)), a && (g = a(g)));
        var w = this.getColumns();
        return b.createElement(v, {
          className: c,
          style: p,
          key: "table"
        }, b.createElement(E.default, {
          columns: w,
          fixed: f
        }), u && b.createElement(S.default, {
          expander: l,
          columns: w,
          fixed: f
        }), g);
      }
    }]), n;
  }(b.Component);
O.contextTypes = {
  table: w.any
}, legacyExports.default = x.connect()(O);
