let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
var n = require("./reactRuntime.js"),
  r = require("./316a3577.js"),
  o = require("./classNames.js"),
  a = interopDefault(o),
  l = require("./4247522b.js"),
  i = require("./reactLifecyclesCompat.js"),
  u = require("./propTypesRuntime.js"),
  s = require("./666f5738.js"),
  h = interopDefault(s),
  f = h()({
    inlineCollapsed: !1
  }),
  p = f;
function v(e) {
  "@babel/helpers - typeof";

  return v = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, v(e);
}
function m() {
  return m = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, m.apply(this, arguments);
}
function d(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function y(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function b(e, t, c) {
  return t && y(e.prototype, t), c && y(e, c), e;
}
function z(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && g(e, t);
}
function g(e, t) {
  return g = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, g(e, t);
}
function M(e) {
  var t = O();
  return function () {
    var c,
      n = V(e);
    if (t) {
      var r = V(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return C(this, c);
  };
}
function C(e, t) {
  return !t || "object" !== v(t) && "function" !== typeof t ? H(e) : t;
}
function H(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function O() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function V(e) {
  return V = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, V(e);
}
var w = function (e) {
  z(c, e);
  var t = M(c);
  function c() {
    var e;
    return d(this, c), e = t.apply(this, arguments), e.onKeyDown = function (t) {
      e.subMenu.onKeyDown(t);
    }, e.saveSubMenu = function (t) {
      e.subMenu = t;
    }, e;
  }
  return b(c, [{
    key: "render",
    value: function () {
      var e = this,
        t = this.props,
        c = t.rootPrefixCls,
        o = t.popupClassName;
      return n["createElement"](p.Consumer, null, function (t) {
        var l = t.antdMenuTheme;
        return n["createElement"](r["d"], m({}, e.props, {
          ref: e.saveSubMenu,
          popupClassName: a()("".concat(c, "-").concat(l), o)
        }));
      });
    }
  }]), c;
}(n["Component"]);
w.contextTypes = {
  antdMenuTheme: u["string"]
}, w.isSubMenu = 1;
var S = w,
  L = require("./antdTooltip.js"),
  k = require("./48383455.js");
function x(e) {
  "@babel/helpers - typeof";

  return x = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, x(e);
}
function E(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
function P(e) {
  return R(e) || N(e) || j(e) || T();
}
function T() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function j(e, t) {
  if (e) {
    if ("string" === typeof e) return _(e, t);
    var c = Object.prototype.toString.call(e).slice(8, -1);
    return "Object" === c && e.constructor && (c = e.constructor.name), "Map" === c || "Set" === c ? Array.from(e) : "Arguments" === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c) ? _(e, t) : void 0;
  }
}
function N(e) {
  if ("undefined" !== typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
}
function R(e) {
  if (Array.isArray(e)) return _(e);
}
function _(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var c = 0, n = new Array(t); c < t; c++) n[c] = e[c];
  return n;
}
function A() {
  return A = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, A.apply(this, arguments);
}
function F(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function I(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function D(e, t, c) {
  return t && I(e.prototype, t), c && I(e, c), e;
}
function K(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && U(e, t);
}
function U(e, t) {
  return U = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, U(e, t);
}
function B(e) {
  var t = G();
  return function () {
    var c,
      n = Y(e);
    if (t) {
      var r = Y(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return q(this, c);
  };
}
function q(e, t) {
  return !t || "object" !== x(t) && "function" !== typeof t ? W(e) : t;
}
function W(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function G() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function Y(e) {
  return Y = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, Y(e);
}
var Q = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  X = h()({
    siderHook: {
      addSider: function () {
        return null;
      },
      removeSider: function () {
        return null;
      }
    }
  });
function Z(e) {
  var t = e.suffixCls,
    c = e.tagName,
    r = e.displayName;
  return function (e) {
    var o;
    return o = function (r) {
      K(a, r);
      var o = B(a);
      function a() {
        var r;
        return F(this, a), r = o.apply(this, arguments), r.renderComponent = function (o) {
          var a = o.getPrefixCls,
            l = r.props.prefixCls,
            i = a(t, l);
          return n["createElement"](e, A({
            prefixCls: i,
            tagName: c
          }, r.props));
        }, r;
      }
      return D(a, [{
        key: "render",
        value: function () {
          return n["createElement"](k["a"], null, this.renderComponent);
        }
      }]), a;
    }(n["Component"]), o.displayName = r, o;
  };
}
var J = function (e) {
    var t = e.prefixCls,
      c = e.className,
      r = e.children,
      o = e.tagName,
      l = Q(e, ["prefixCls", "className", "children", "tagName"]),
      i = a()(c, t);
    return n["createElement"](o, A({
      className: i
    }, l), r);
  },
  $ = function (e) {
    K(c, e);
    var t = B(c);
    function c() {
      var e;
      return F(this, c), e = t.apply(this, arguments), e.state = {
        siders: []
      }, e;
    }
    return D(c, [{
      key: "getSiderHook",
      value: function () {
        var e = this;
        return {
          addSider: function (t) {
            e.setState(function (e) {
              return {
                siders: [].concat(P(e.siders), [t])
              };
            });
          },
          removeSider: function (t) {
            e.setState(function (e) {
              return {
                siders: e.siders.filter(function (e) {
                  return e !== t;
                })
              };
            });
          }
        };
      }
    }, {
      key: "render",
      value: function () {
        var e = this.props,
          t = e.prefixCls,
          c = e.className,
          r = e.children,
          o = e.hasSider,
          l = e.tagName,
          i = Q(e, ["prefixCls", "className", "children", "hasSider", "tagName"]),
          u = a()(c, t, E({}, "".concat(t, "-has-sider"), "boolean" === typeof o ? o : this.state.siders.length > 0));
        return n["createElement"](X.Provider, {
          value: {
            siderHook: this.getSiderHook()
          }
        }, n["createElement"](l, A({
          className: u
        }, i), r));
      }
    }]), c;
  }(n["Component"]),
  ee = Z({
    suffixCls: "layout",
    tagName: "section",
    displayName: "Layout"
  })($),
  te = Z({
    suffixCls: "layout-header",
    tagName: "header",
    displayName: "Header"
  })(J),
  ce = Z({
    suffixCls: "layout-footer",
    tagName: "footer",
    displayName: "Footer"
  })(J),
  ne = Z({
    suffixCls: "layout-content",
    tagName: "main",
    displayName: "Content"
  })(J);
ee.Header = te, ee.Footer = ce, ee.Content = ne;
var re = require("../Icon.js"),
  oe = function (e) {
    return !isNaN(parseFloat(e)) && isFinite(e);
  },
  ae = oe;
function le(e) {
  "@babel/helpers - typeof";

  return le = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, le(e);
}
function ie(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
function ue() {
  return ue = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, ue.apply(this, arguments);
}
function se(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function he(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function fe(e, t, c) {
  return t && he(e.prototype, t), c && he(e, c), e;
}
function pe(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && ve(e, t);
}
function ve(e, t) {
  return ve = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, ve(e, t);
}
function me(e) {
  var t = be();
  return function () {
    var c,
      n = ze(e);
    if (t) {
      var r = ze(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return de(this, c);
  };
}
function de(e, t) {
  return !t || "object" !== le(t) && "function" !== typeof t ? ye(e) : t;
}
function ye(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function be() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function ze(e) {
  return ze = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, ze(e);
}
var ge = function (e, t) {
  var c = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
  if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
    var r = 0;
    for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
  }
  return c;
};
if ("undefined" !== typeof window) {
  var Me = function (e) {
    return {
      media: e,
      matches: !1,
      addListener: function () {},
      removeListener: function () {}
    };
  };
  window.matchMedia || (window.matchMedia = Me);
}
var Ce = {
    xs: "479.98px",
    sm: "575.98px",
    md: "767.98px",
    lg: "991.98px",
    xl: "1199.98px",
    xxl: "1599.98px"
  },
  He = h()({}),
  Oe = function () {
    var e = 0;
    return function () {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
      return e += 1, "".concat(t).concat(e);
    };
  }(),
  Ve = function (e) {
    pe(c, e);
    var t = me(c);
    function c(e) {
      var r, o, i;
      return se(this, c), r = t.call(this, e), r.responsiveHandler = function (e) {
        r.setState({
          below: e.matches
        });
        var t = r.props.onBreakpoint;
        t && t(e.matches), r.state.collapsed !== e.matches && r.setCollapsed(e.matches, "responsive");
      }, r.setCollapsed = function (e, t) {
        "collapsed" in r.props || r.setState({
          collapsed: e
        });
        var c = r.props.onCollapse;
        c && c(e, t);
      }, r.toggle = function () {
        var e = !r.state.collapsed;
        r.setCollapsed(e, "clickTrigger");
      }, r.belowShowChange = function () {
        r.setState(function (e) {
          var t = e.belowShow;
          return {
            belowShow: !t
          };
        });
      }, r.renderSider = function (e) {
        var t,
          c = e.getPrefixCls,
          o = r.props,
          i = o.prefixCls,
          u = o.className,
          s = o.theme,
          h = o.collapsible,
          f = o.reverseArrow,
          p = o.trigger,
          v = o.style,
          m = o.width,
          d = o.collapsedWidth,
          y = o.zeroWidthTriggerStyle,
          b = ge(o, ["prefixCls", "className", "theme", "collapsible", "reverseArrow", "trigger", "style", "width", "collapsedWidth", "zeroWidthTriggerStyle"]),
          z = c("layout-sider", i),
          g = Object(l["a"])(b, ["collapsed", "defaultCollapsed", "onCollapse", "breakpoint", "onBreakpoint", "siderHook", "zeroWidthTriggerStyle"]),
          M = r.state.collapsed ? d : m,
          C = ae(M) ? "".concat(M, "px") : String(M),
          H = 0 === parseFloat(String(d || 0)) ? n["createElement"]("span", {
            onClick: r.toggle,
            className: "".concat(z, "-zero-width-trigger ").concat(z, "-zero-width-trigger-").concat(f ? "right" : "left"),
            style: y
          }, n["createElement"](re["a"], {
            type: "bars"
          })) : null,
          O = {
            expanded: f ? n["createElement"](re["a"], {
              type: "right"
            }) : n["createElement"](re["a"], {
              type: "left"
            }),
            collapsed: f ? n["createElement"](re["a"], {
              type: "left"
            }) : n["createElement"](re["a"], {
              type: "right"
            })
          },
          V = r.state.collapsed ? "collapsed" : "expanded",
          w = O[V],
          S = null !== p ? H || n["createElement"]("div", {
            className: "".concat(z, "-trigger"),
            onClick: r.toggle,
            style: {
              width: C
            }
          }, p || w) : null,
          L = ue(ue({}, v), {
            flex: "0 0 ".concat(C),
            maxWidth: C,
            minWidth: C,
            width: C
          }),
          k = a()(u, z, "".concat(z, "-").concat(s), (t = {}, ie(t, "".concat(z, "-collapsed"), !!r.state.collapsed), ie(t, "".concat(z, "-has-trigger"), h && null !== p && !H), ie(t, "".concat(z, "-below"), !!r.state.below), ie(t, "".concat(z, "-zero-width"), 0 === parseFloat(C)), t));
        return n["createElement"]("aside", ue({
          className: k
        }, g, {
          style: L
        }), n["createElement"]("div", {
          className: "".concat(z, "-children")
        }, r.props.children), h || r.state.below && H ? S : null);
      }, r.uniqueId = Oe("ant-sider-"), "undefined" !== typeof window && (o = window.matchMedia), o && e.breakpoint && e.breakpoint in Ce && (r.mql = o("(max-width: ".concat(Ce[e.breakpoint], ")"))), i = "collapsed" in e ? e.collapsed : e.defaultCollapsed, r.state = {
        collapsed: i,
        below: !1
      }, r;
    }
    return fe(c, [{
      key: "componentDidMount",
      value: function () {
        this.mql && (this.mql.addListener(this.responsiveHandler), this.responsiveHandler(this.mql)), this.props.siderHook && this.props.siderHook.addSider(this.uniqueId);
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        this.mql && this.mql.removeListener(this.responsiveHandler), this.props.siderHook && this.props.siderHook.removeSider(this.uniqueId);
      }
    }, {
      key: "render",
      value: function () {
        var e = this.state.collapsed,
          t = this.props.collapsedWidth;
        return n["createElement"](He.Provider, {
          value: {
            siderCollapsed: e,
            collapsedWidth: t
          }
        }, n["createElement"](k["a"], null, this.renderSider));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function (e) {
        return "collapsed" in e ? {
          collapsed: e.collapsed
        } : null;
      }
    }]), c;
  }(n["Component"]);
Ve.defaultProps = {
  collapsible: !1,
  defaultCollapsed: !1,
  reverseArrow: !1,
  width: 200,
  collapsedWidth: 80,
  style: {},
  theme: "dark"
}, Object(i["polyfill"])(Ve);
n["Component"];
function we(e) {
  "@babel/helpers - typeof";

  return we = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, we(e);
}
function Se() {
  return Se = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, Se.apply(this, arguments);
}
function Le(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function ke(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function xe(e, t, c) {
  return t && ke(e.prototype, t), c && ke(e, c), e;
}
function Ee(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && Pe(e, t);
}
function Pe(e, t) {
  return Pe = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, Pe(e, t);
}
function Te(e) {
  var t = Re();
  return function () {
    var c,
      n = _e(e);
    if (t) {
      var r = _e(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return je(this, c);
  };
}
function je(e, t) {
  return !t || "object" !== we(t) && "function" !== typeof t ? Ne(e) : t;
}
function Ne(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Re() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function _e(e) {
  return _e = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, _e(e);
}
var Ae = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  Fe = function (e) {
    Ee(c, e);
    var t = Te(c);
    function c() {
      var e;
      return Le(this, c), e = t.apply(this, arguments), e.onKeyDown = function (t) {
        e.menuItem.onKeyDown(t);
      }, e.saveMenuItem = function (t) {
        e.menuItem = t;
      }, e.renderItem = function (t) {
        var c = t.siderCollapsed,
          o = e.props,
          a = o.level,
          l = o.children,
          i = o.rootPrefixCls,
          u = e.props,
          s = u.title,
          h = Ae(u, ["title"]);
        return n["createElement"](p.Consumer, null, function (t) {
          var o = t.inlineCollapsed,
            u = {
              title: s || (1 === a ? l : "")
            };
          return c || o || (u.title = null, u.visible = !1), n["createElement"](L["a"], Se({}, u, {
            placement: "right",
            overlayClassName: "".concat(i, "-inline-collapsed-tooltip")
          }), n["createElement"](r["b"], Se({}, h, {
            title: s,
            ref: e.saveMenuItem
          })));
        });
      }, e;
    }
    return xe(c, [{
      key: "render",
      value: function () {
        return n["createElement"](He.Consumer, null, this.renderItem);
      }
    }]), c;
  }(n["Component"]);
Fe.isMenuItem = !0;
var Ie = require("./antdWarning.js"),
  De = require("./6f486950.js"),
  Ke = function () {
    return {
      height: 0,
      opacity: 0
    };
  },
  Ue = function (e) {
    return {
      height: e.scrollHeight,
      opacity: 1
    };
  },
  Be = function (e) {
    return {
      height: e.offsetHeight
    };
  },
  qe = {
    motionName: "ant-motion-collapse",
    onAppearStart: Ke,
    onEnterStart: Ke,
    onAppearActive: Ue,
    onEnterActive: Ue,
    onLeaveStart: Be,
    onLeaveActive: Ke
  },
  We = qe;
function Ge(e) {
  "@babel/helpers - typeof";

  return Ge = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Ge(e);
}
function Ye() {
  return Ye = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, Ye.apply(this, arguments);
}
function Qe(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
function Xe(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Ze(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function Je(e, t, c) {
  return t && Ze(e.prototype, t), c && Ze(e, c), e;
}
function $e(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && et(e, t);
}
function et(e, t) {
  return et = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, et(e, t);
}
function tt(e) {
  var t = rt();
  return function () {
    var c,
      n = ot(e);
    if (t) {
      var r = ot(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return ct(this, c);
  };
}
function ct(e, t) {
  return !t || "object" !== Ge(t) && "function" !== typeof t ? nt(e) : t;
}
function nt(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function rt() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function ot(e) {
  return ot = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, ot(e);
}
defineExport(legacyExports, "a", function () {
  return lt;
});
var at = function (e) {
  $e(c, e);
  var t = tt(c);
  function c(e) {
    var o, i;
    return Xe(this, c), o = t.call(this, e), o.handleMouseEnter = function (e) {
      o.restoreModeVerticalFromInline();
      var t = o.props.onMouseEnter;
      t && t(e);
    }, o.handleTransitionEnd = function (e) {
      var t = "width" === e.propertyName && e.target === e.currentTarget,
        c = e.target.className,
        n = "[object SVGAnimatedString]" === Object.prototype.toString.call(c) ? c.animVal : c,
        r = "font-size" === e.propertyName && n.indexOf("anticon") >= 0;
      (t || r) && o.restoreModeVerticalFromInline();
    }, o.handleClick = function (e) {
      o.handleOpenChange([]);
      var t = o.props.onClick;
      t && t(e);
    }, o.handleOpenChange = function (e) {
      o.setOpenKeys(e);
      var t = o.props.onOpenChange;
      t && t(e);
    }, o.renderMenu = function (e) {
      var t = e.getPopupContainer,
        c = e.getPrefixCls,
        i = o.props,
        u = i.prefixCls,
        s = i.className,
        h = i.theme,
        f = i.collapsedWidth,
        p = Object(l["a"])(o.props, ["collapsedWidth", "siderCollapsed"]),
        v = o.getRealMenuMode(),
        m = o.getOpenMotionProps(v),
        d = c("menu", u),
        y = a()(s, "".concat(d, "-").concat(h), Qe({}, "".concat(d, "-inline-collapsed"), o.getInlineCollapsed())),
        b = Ye({
          openKeys: o.state.openKeys,
          onOpenChange: o.handleOpenChange,
          className: y,
          mode: v
        }, m);
      "inline" !== v && (b.onClick = o.handleClick);
      var z = o.getInlineCollapsed() && (0 === f || "0" === f || "0px" === f);
      return z && (b.openKeys = []), n["createElement"](r["e"], Ye({
        getPopupContainer: t
      }, p, b, {
        prefixCls: d,
        onTransitionEnd: o.handleTransitionEnd,
        onMouseEnter: o.handleMouseEnter
      }));
    }, Object(Ie["a"])(!("onOpen" in e || "onClose" in e), "Menu", "`onOpen` and `onClose` are removed, please use `onOpenChange` instead, see: https://u.ant.design/menu-on-open-change."), Object(Ie["a"])(!("inlineCollapsed" in e && "inline" !== e.mode), "Menu", "`inlineCollapsed` should only be used when `mode` is inline."), Object(Ie["a"])(!(void 0 !== e.siderCollapsed && "inlineCollapsed" in e), "Menu", "`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead."), "openKeys" in e ? i = e.openKeys : "defaultOpenKeys" in e && (i = e.defaultOpenKeys), o.state = {
      openKeys: i || [],
      switchingModeFromInline: !1,
      inlineOpenKeys: [],
      prevProps: e
    }, o;
  }
  return Je(c, [{
    key: "componentWillUnmount",
    value: function () {
      De["a"].cancel(this.mountRafId);
    }
  }, {
    key: "setOpenKeys",
    value: function (e) {
      "openKeys" in this.props || this.setState({
        openKeys: e
      });
    }
  }, {
    key: "getRealMenuMode",
    value: function () {
      var e = this.getInlineCollapsed();
      if (this.state.switchingModeFromInline && e) return "inline";
      var t = this.props.mode;
      return e ? "vertical" : t;
    }
  }, {
    key: "getInlineCollapsed",
    value: function () {
      var e = this.props.inlineCollapsed;
      return void 0 !== this.props.siderCollapsed ? this.props.siderCollapsed : e;
    }
  }, {
    key: "getOpenMotionProps",
    value: function (e) {
      var t = this.props,
        c = t.openTransitionName,
        n = t.openAnimation,
        r = t.motion;
      return r ? {
        motion: r
      } : n ? (Object(Ie["a"])("string" === typeof n, "Menu", "`openAnimation` do not support object. Please use `motion` instead."), {
        openAnimation: n
      }) : c ? {
        openTransitionName: c
      } : "horizontal" === e ? {
        motion: {
          motionName: "slide-up"
        }
      } : "inline" === e ? {
        motion: We
      } : {
        motion: {
          motionName: this.state.switchingModeFromInline ? "" : "zoom-big"
        }
      };
    }
  }, {
    key: "restoreModeVerticalFromInline",
    value: function () {
      var e = this.state.switchingModeFromInline;
      e && this.setState({
        switchingModeFromInline: !1
      });
    }
  }, {
    key: "render",
    value: function () {
      return n["createElement"](p.Provider, {
        value: {
          inlineCollapsed: this.getInlineCollapsed() || !1,
          antdMenuTheme: this.props.theme
        }
      }, n["createElement"](k["a"], null, this.renderMenu));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function (e, t) {
      var c = t.prevProps,
        n = {
          prevProps: e
        };
      return "inline" === c.mode && "inline" !== e.mode && (n.switchingModeFromInline = !0), "openKeys" in e ? n.openKeys = e.openKeys : ((e.inlineCollapsed && !c.inlineCollapsed || e.siderCollapsed && !c.siderCollapsed) && (n.switchingModeFromInline = !0, n.inlineOpenKeys = t.openKeys, n.openKeys = []), (!e.inlineCollapsed && c.inlineCollapsed || !e.siderCollapsed && c.siderCollapsed) && (n.openKeys = t.inlineOpenKeys, n.inlineOpenKeys = [])), n;
    }
  }]), c;
}(n["Component"]);
at.defaultProps = {
  className: "",
  theme: "light",
  focusable: !1
}, Object(i["polyfill"])(at);
var lt = function (e) {
  $e(c, e);
  var t = tt(c);
  function c() {
    return Xe(this, c), t.apply(this, arguments);
  }
  return Je(c, [{
    key: "render",
    value: function () {
      var e = this;
      return n["createElement"](He.Consumer, null, function (t) {
        return n["createElement"](at, Ye({}, e.props, t));
      });
    }
  }]), c;
}(n["Component"]);
lt.Divider = r["a"], lt.Item = Fe, lt.SubMenu = S, lt.ItemGroup = r["c"];
