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
    o = {},
    i = Object.keys(e);
  for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
  return o;
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
      c(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : a(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function c(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function u(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function l(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function f(e, t, n) {
  return t && l(e.prototype, t), n && l(e, n), e;
}
function p(e, t) {
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
function h(e) {
  return function () {
    var t,
      n = g(e);
    if (y()) {
      var r = g(this).constructor;
      t = Reflect.construct(n, arguments, r);
    } else t = n.apply(this, arguments);
    return m(this, t);
  };
}
function m(e, t) {
  return !t || "object" !== r(t) && "function" !== typeof t ? v(e) : t;
}
function v(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function y() {
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
  O = w(require("./reactDomRuntime.js")),
  E = w(require("./warningRuntime.js")),
  _ = require("./reactReduxRuntime.js"),
  k = require("./reactLifecyclesCompat.js"),
  S = w(require("./classNames.js")),
  C = w(require("./4456666c.js")),
  j = function (e) {
    p(n, e);
    var t = h(n);
    function n() {
      var e;
      return u(this, n), e = t.apply(this, arguments), e.state = {}, e.onTriggerEvent = function (t, n, r) {
        var o = e.props,
          i = o.record,
          a = o.index;
        return function () {
          r && r();
          for (var e = arguments.length, o = new Array(e), s = 0; s < e; s++) o[s] = arguments[s];
          var c = o[0];
          n && n(i, a, c), t && t.apply(void 0, o);
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
    return f(n, [{
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
          o = r.expandedRowsHeight,
          i = this.rowRef.getBoundingClientRect(),
          a = i.height;
        o = s({}, o, c({}, n, a)), t.setState({
          expandedRowsHeight: o
        });
      }
    }, {
      key: "setRowHeight",
      value: function () {
        var e = this.props,
          t = e.store,
          n = e.rowKey,
          r = t.getState(),
          o = r.fixedColumnsBodyRowsHeight,
          i = this.rowRef.getBoundingClientRect(),
          a = i.height;
        t.setState({
          fixedColumnsBodyRowsHeight: s({}, o, c({}, n, a))
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
        this.rowRef = O.default.findDOMNode(this);
        var e = this.props,
          t = e.isAnyColumnsFixed,
          n = e.fixed,
          r = e.expandedRow,
          o = e.ancestorKeys;
        t && this.rowRef && (!n && r && this.setExpandedRowHeight(), !n && o.length >= 0 && this.setRowHeight());
      }
    }, {
      key: "render",
      value: function () {
        if (!this.state.shouldRender) return null;
        var e = this.props,
          t = e.prefixCls,
          n = e.columns,
          r = e.record,
          i = e.rowKey,
          a = e.index,
          c = e.onRow,
          u = e.indent,
          l = e.indentSize,
          f = e.hovered,
          p = e.height,
          d = e.visible,
          h = e.components,
          m = e.hasExpandIcon,
          v = e.renderExpandIcon,
          y = e.renderExpandIconCell,
          g = e.onRowClick,
          b = e.onRowDoubleClick,
          w = e.onRowMouseEnter,
          O = e.onRowMouseLeave,
          _ = e.onRowContextMenu,
          k = h.body.row,
          j = h.body.cell,
          P = this.props.className;
        f && (P += " ".concat(t, "-hover"));
        var T = [];
        y(T);
        for (var L = 0; L < n.length; L += 1) {
          var N = n[L];
          E.default(void 0 === N.onCellClick, "column[onCellClick] is deprecated, please use column[onCell] instead."), T.push(x.createElement(C.default, {
            prefixCls: t,
            record: r,
            indentSize: l,
            indent: u,
            index: a,
            column: N,
            key: N.key || N.dataIndex,
            expandIcon: m(L) && v(),
            component: j
          }));
        }
        var M = c(r, a) || {},
          A = M.className,
          D = M.style,
          I = o(M, ["className", "style"]),
          R = {
            height: p
          };
        d || (R.display = "none"), R = s({}, R, {}, D);
        var F = S.default(t, P, "".concat(t, "-level-").concat(u), A);
        return x.createElement(k, Object.assign({}, I, {
          onClick: this.onTriggerEvent(I.onClick, g),
          onDoubleClick: this.onTriggerEvent(I.onDoubleClick, b),
          onMouseEnter: this.onTriggerEvent(I.onMouseEnter, w, this.onMouseEnter),
          onMouseLeave: this.onTriggerEvent(I.onMouseLeave, O, this.onMouseLeave),
          onContextMenu: this.onTriggerEvent(I.onContextMenu, _),
          className: F,
          style: R,
          "data-row-key": i
        }), T);
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
function P(e, t) {
  var n = e.expandedRowsHeight,
    r = e.fixedColumnsBodyRowsHeight,
    o = t.fixed,
    i = t.rowKey;
  return o ? n[i] ? n[i] : r[i] ? r[i] : null : null;
}
j.defaultProps = {
  onRow: function () {},
  onHover: function () {},
  hasExpandIcon: function () {},
  renderExpandIcon: function () {},
  renderExpandIconCell: function () {}
}, k.polyfill(j), legacyExports.default = _.connect(function (e, t) {
  var n = e.currentHoverKey,
    r = e.expandedRowKeys,
    o = void 0 === r ? [] : r,
    i = t.rowKey,
    a = t.ancestorKeys,
    s = 0 === a.length || a.every(function (e) {
      return o.includes(e);
    });
  return {
    visible: s,
    hovered: n === i,
    height: P(e, t)
  };
})(j);
