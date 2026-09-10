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
function s(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function c(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function u(e, t, n) {
  return t && c(e.prototype, t), n && c(e, n), e;
}
function l(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && f(e, t);
}
function f(e, t) {
  return f = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, f(e, t);
}
function p(e) {
  return function () {
    var t,
      n = v(e);
    if (m()) {
      var r = v(this).constructor;
      t = Reflect.construct(n, arguments, r);
    } else t = n.apply(this, arguments);
    return d(this, t);
  };
}
function d(e, t) {
  return !t || "object" !== r(t) && "function" !== typeof t ? h(e) : t;
}
function h(e) {
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
function v(e) {
  return v = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, v(e);
}
var y = this && this.__importStar || function (e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t["default"] = e, t;
  },
  g = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
      default: e
    };
  };
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var b = y(require("./71317449.js")),
  w = y(require("./31377839.js")),
  x = require("./7849304a.js"),
  O = g(require("./54535951.js")),
  E = g(require("./7a536442.js")),
  _ = g(require("./564d537a.js")),
  k = g(require("./58615332.js")),
  S = g(require("./7a677138.js")),
  C = function (e) {
    l(n, e);
    var t = p(n);
    function n() {
      var e;
      return s(this, n), e = t.apply(this, arguments), e.handleRowHover = function (t, n) {
        e.props.store.setState({
          currentHoverKey: t ? n : null
        });
      }, e.renderRows = function (t, n) {
        for (var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], o = e.context.table, i = o.columnManager, a = o.components, s = o.props, c = s.prefixCls, u = s.childrenColumnName, l = s.rowClassName, f = s.rowRef, p = s.onRowClick, d = s.onRowDoubleClick, h = s.onRowContextMenu, m = s.onRowMouseEnter, v = s.onRowMouseLeave, y = s.onRow, g = e.props, w = g.getRowKey, x = g.fixed, O = g.expander, E = g.isAnyColumnsFixed, _ = [], C = function (o) {
            var s = t[o],
              g = w(s, o),
              C = "string" === typeof l ? l : l(s, o, n),
              j = {};
            i.isAnyColumnsFixed() && (j.onHover = e.handleRowHover);
            var P = void 0;
            P = "left" === x ? i.leftLeafColumns() : "right" === x ? i.rightLeafColumns() : e.getColumns(i.leafColumns());
            var T = "".concat(c, "-row"),
              L = b.createElement(S.default, Object.assign({}, O.props, {
                fixed: x,
                index: o,
                prefixCls: T,
                record: s,
                key: g,
                rowKey: g,
                onRowClick: p,
                needIndentSpaced: O.needIndentSpaced,
                onExpandedChange: O.handleExpandChange
              }), function (e) {
                return b.createElement(k.default, Object.assign({
                  fixed: x,
                  indent: n,
                  className: C,
                  record: s,
                  index: o,
                  prefixCls: T,
                  childrenColumnName: u,
                  columns: P,
                  onRow: y,
                  onRowDoubleClick: d,
                  onRowContextMenu: h,
                  onRowMouseEnter: m,
                  onRowMouseLeave: v
                }, j, {
                  rowKey: g,
                  ancestorKeys: r,
                  ref: f(s, o, n),
                  components: a,
                  isAnyColumnsFixed: E
                }, e));
              });
            _.push(L), O.renderRows(e.renderRows, _, s, o, n, x, g, r);
          }, j = 0; j < t.length; j += 1) C(j);
        return _;
      }, e;
    }
    return u(n, [{
      key: "getColumns",
      value: function (e) {
        var t = this.props,
          n = t.columns,
          r = void 0 === n ? [] : n,
          o = t.fixed,
          a = this.context.table,
          s = a.props.prefixCls;
        return (e || r).map(function (e) {
          return i({}, e, {
            className: e.fixed && !o ? O.default("".concat(s, "-fixed-columns-in-body"), e.className) : e.className
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
          o = n.scroll,
          i = n.data,
          a = n.getBodyWrapper,
          s = this.props,
          c = s.expander,
          u = s.tableClassName,
          l = s.hasHead,
          f = s.hasBody,
          p = s.fixed,
          d = s.isAnyColumnsFixed,
          h = {};
        if (!p && o.x) {
          var m = d ? "max-content" : "auto";
          h.width = !0 === o.x ? m : o.x;
        }
        var v,
          y = f ? t.table : "table",
          g = t.body.wrapper;
        f && (v = b.createElement(g, {
          className: "".concat(r, "-tbody")
        }, this.renderRows(i, 0)), a && (v = a(v)));
        var w = this.getColumns();
        return b.createElement(y, {
          className: u,
          style: h,
          key: "table"
        }, b.createElement(E.default, {
          columns: w,
          fixed: p
        }), l && b.createElement(_.default, {
          expander: c,
          columns: w,
          fixed: p
        }), v);
      }
    }]), n;
  }(b.Component);
C.contextTypes = {
  table: w.any
}, legacyExports.default = x.connect()(C);
