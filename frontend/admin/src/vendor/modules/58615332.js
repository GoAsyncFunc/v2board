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
    i = {},
    o = Object.keys(e);
  for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || (i[n] = e[n]);
  return i;
}
function a(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function s(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? a(Object(n), !0).forEach(function (t) {
      l(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : a(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function l(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function c(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function u(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function h(e, t, n) {
  return t && u(e.prototype, t), n && u(e, n), e;
}
function f(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && d(e, t);
}
function d(e, t) {
  return d = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, d(e, t);
}
function p(e) {
  return function () {
    var t,
      n = y(e);
    if (v()) {
      var r = y(this).constructor;
      t = Reflect.construct(n, arguments, r);
    } else t = n.apply(this, arguments);
    return m(this, t);
  };
}
function m(e, t) {
  return !t || "object" !== r(t) && "function" !== typeof t ? g(e) : t;
}
function g(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function v() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function y(e) {
  return y = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, y(e);
}
var b = this && this.__importStar || function (e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t["default"] = e, t;
  },
  w = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
      default: e
    };
  };
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var x = b(require("./reactRuntime.js")),
  _ = w(require("./reactDomRuntime.js")),
  E = w(require("./warningRuntime.js")),
  S = require("./reactReduxRuntime.js"),
  k = require("./reactLifecyclesCompat.js"),
  C = w(require("./classNames.js")),
  O = w(require("./4456666c.js")),
  T = function (e) {
    f(n, e);
    var t = p(n);
    function n() {
      var e;
      return c(this, n), e = t.apply(this, arguments), e.state = {}, e.onTriggerEvent = function (t, n, r) {
        var i = e.props,
          o = i.record,
          a = i.index;
        return function () {
          r && r();
          for (var e = arguments.length, i = new Array(e), s = 0; s < e; s++) i[s] = arguments[s];
          var l = i[0];
          n && n(o, a, l), t && t.apply(void 0, i);
        };
      }, e.onMouseEnter = function () {
        var t = e.props,
          n = t.onHover,
          r = t.rowKey;
        n(!0, r);
      }, e.onMouseLeave = function () {
        var t = e.props,
          n = t.onHover,
          r = t.rowKey;
        n(!1, r);
      }, e;
    }
    return h(n, [{
      key: "componentDidMount",
      value: function () {
        this.state.shouldRender && this.saveRowRef();
      }
    }, {
      key: "shouldComponentUpdate",
      value: function (e) {
        return !(!this.props.visible && !e.visible);
      }
    }, {
      key: "componentDidUpdate",
      value: function () {
        this.state.shouldRender && !this.rowRef && this.saveRowRef();
      }
    }, {
      key: "setExpandedRowHeight",
      value: function () {
        var e = this.props,
          t = e.store,
          n = e.rowKey,
          r = t.getState(),
          i = r.expandedRowsHeight,
          o = this.rowRef.getBoundingClientRect(),
          a = o.height;
        i = s({}, i, l({}, n, a)), t.setState({
          expandedRowsHeight: i
        });
      }
    }, {
      key: "setRowHeight",
      value: function () {
        var e = this.props,
          t = e.store,
          n = e.rowKey,
          r = t.getState(),
          i = r.fixedColumnsBodyRowsHeight,
          o = this.rowRef.getBoundingClientRect(),
          a = o.height;
        t.setState({
          fixedColumnsBodyRowsHeight: s({}, i, l({}, n, a))
        });
      }
    }, {
      key: "getStyle",
      value: function () {
        var e = this.props,
          t = e.height,
          n = e.visible;
        return t && t !== this.style.height && (this.style = s({}, this.style, {
          height: t
        })), n || this.style.display || (this.style = s({}, this.style, {
          display: "none"
        })), this.style;
      }
    }, {
      key: "saveRowRef",
      value: function () {
        this.rowRef = _.default.findDOMNode(this);
        var e = this.props,
          t = e.isAnyColumnsFixed,
          n = e.fixed,
          r = e.expandedRow,
          i = e.ancestorKeys;
        t && this.rowRef && (!n && r && this.setExpandedRowHeight(), !n && i.length >= 0 && this.setRowHeight());
      }
    }, {
      key: "render",
      value: function () {
        if (!this.state.shouldRender) return null;
        var e = this.props,
          t = e.prefixCls,
          n = e.columns,
          r = e.record,
          o = e.rowKey,
          a = e.index,
          l = e.onRow,
          c = e.indent,
          u = e.indentSize,
          h = e.hovered,
          f = e.height,
          d = e.visible,
          p = e.components,
          m = e.hasExpandIcon,
          g = e.renderExpandIcon,
          v = e.renderExpandIconCell,
          y = e.onRowClick,
          b = e.onRowDoubleClick,
          w = e.onRowMouseEnter,
          _ = e.onRowMouseLeave,
          S = e.onRowContextMenu,
          k = p.body.row,
          T = p.body.cell,
          L = this.props.className;
        h && (L += " ".concat(t, "-hover"));
        var A = [];
        v(A);
        for (var P = 0; P < n.length; P += 1) {
          var j = n[P];
          E.default(void 0 === j.onCellClick, "column[onCellClick] is deprecated, please use column[onCell] instead."), A.push(x.createElement(O.default, {
            prefixCls: t,
            record: r,
            indentSize: u,
            indent: c,
            index: a,
            column: j,
            key: j.key || j.dataIndex,
            expandIcon: m(P) && g(),
            component: T
          }));
        }
        var M = l(r, a) || {},
          R = M.className,
          N = M.style,
          D = i(M, ["className", "style"]),
          I = {
            height: f
          };
        d || (I.display = "none"), I = s({}, I, {}, N);
        var $ = C.default(t, L, "".concat(t, "-level-").concat(c), R);
        return x.createElement(k, Object.assign({}, D, {
          onClick: this.onTriggerEvent(D.onClick, y),
          onDoubleClick: this.onTriggerEvent(D.onDoubleClick, b),
          onMouseEnter: this.onTriggerEvent(D.onMouseEnter, w, this.onMouseEnter),
          onMouseLeave: this.onTriggerEvent(D.onMouseLeave, _, this.onMouseLeave),
          onContextMenu: this.onTriggerEvent(D.onContextMenu, S),
          className: $,
          style: I,
          "data-row-key": o
        }), A);
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function (e, t) {
        return t.visible || !t.visible && e.visible ? {
          shouldRender: !0,
          visible: e.visible
        } : {
          visible: e.visible
        };
      }
    }]), n;
  }(x.Component);
function L(e, t) {
  var n = e.expandedRowsHeight,
    r = e.fixedColumnsBodyRowsHeight,
    i = t.fixed,
    o = t.rowKey;
  return i ? n[o] ? n[o] : r[o] ? r[o] : null : null;
}
T.defaultProps = {
  onRow: function () {},
  onHover: function () {},
  hasExpandIcon: function () {},
  renderExpandIcon: function () {},
  renderExpandIconCell: function () {}
}, k.polyfill(T), legacyExports.default = S.connect(function (e, t) {
  var n = e.currentHoverKey,
    r = e.expandedRowKeys,
    i = void 0 === r ? [] : r,
    o = t.rowKey,
    a = t.ancestorKeys,
    s = 0 === a.length || a.every(function (e) {
      return i.includes(e);
    });
  return {
    visible: s,
    hovered: n === o,
    height: L(e, t)
  };
})(T);
