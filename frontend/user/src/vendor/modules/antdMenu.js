let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
var n = require("./reactRuntime.js"),
  r = require("./316a3577.js"),
  o = require("./classNames.js"),
  l = interopDefault(o),
  a = require("./omitProps.js"),
  i = require("./reactLifecyclesCompat.js"),
  u = require("./propTypesRuntime.js"),
  s = require("./createReactContext.js"),
  h = interopDefault(s),
  f = h()({
    inlineCollapsed: !1
  }),
  v = f;
function p(e) {
  "@babel/helpers - typeof";

  return p = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, p(e);
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
function z(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function y(e, t, c) {
  return t && z(e.prototype, t), c && z(e, c), e;
}
function b(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && M(e, t);
}
function M(e, t) {
  return M = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, M(e, t);
}
function g(e) {
  var t = V();
  return function () {
    var c,
      n = O(e);
    if (t) {
      var r = O(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return H(this, c);
  };
}
function H(e, t) {
  return !t || "object" !== p(t) && "function" !== typeof t ? C(e) : t;
}
function C(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function V() {
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
var w = function (e) {
  b(c, e);
  var t = g(c);
  function c() {
    var e;
    return d(this, c), e = t.apply(this, arguments), e.onKeyDown = function (t) {
      e.subMenu.onKeyDown(t);
    }, e.saveSubMenu = function (t) {
      e.subMenu = t;
    }, e;
  }
  return y(c, [{
    key: "render",
    value: function () {
      var e = this,
        t = this.props,
        c = t.rootPrefixCls,
        o = t.popupClassName;
      return n["createElement"](v.Consumer, null, function (t) {
        var a = t.antdMenuTheme;
        return n["createElement"](r["d"], m({}, e.props, {
          ref: e.saveSubMenu,
          popupClassName: l()("".concat(c, "-").concat(a), o)
        }));
      });
    }
  }]), c;
}(n["Component"]);
w.contextTypes = {
  antdMenuTheme: u["string"]
}, w.isSubMenu = 1;
var L = w,
  S = require("./antdTooltip.js"),
  k = require("./48383455.js");
function E(e) {
  "@babel/helpers - typeof";

  return E = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, E(e);
}
function x(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
function P(e) {
  return A(e) || F(e) || T(e) || j();
}
function j() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function T(e, t) {
  if (e) {
    if ("string" === typeof e) return R(e, t);
    var c = Object.prototype.toString.call(e).slice(8, -1);
    return "Object" === c && e.constructor && (c = e.constructor.name), "Map" === c || "Set" === c ? Array.from(e) : "Arguments" === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c) ? R(e, t) : void 0;
  }
}
function F(e) {
  if ("undefined" !== typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
}
function A(e) {
  if (Array.isArray(e)) return R(e);
}
function R(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var c = 0, n = new Array(t); c < t; c++) n[c] = e[c];
  return n;
}
function _() {
  return _ = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, _.apply(this, arguments);
}
function N(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function D(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function I(e, t, c) {
  return t && D(e.prototype, t), c && D(e, c), e;
}
function B(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && q(e, t);
}
function q(e, t) {
  return q = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, q(e, t);
}
function W(e) {
  var t = G();
  return function () {
    var c,
      n = Q(e);
    if (t) {
      var r = Q(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return K(this, c);
  };
}
function K(e, t) {
  return !t || "object" !== E(t) && "function" !== typeof t ? U(e) : t;
}
function U(e) {
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
function Q(e) {
  return Q = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, Q(e);
}
var Y = function (e, t) {
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
      B(l, r);
      var o = W(l);
      function l() {
        var r;
        return N(this, l), r = o.apply(this, arguments), r.renderComponent = function (o) {
          var l = o.getPrefixCls,
            a = r.props.prefixCls,
            i = l(t, a);
          return n["createElement"](e, _({
            prefixCls: i,
            tagName: c
          }, r.props));
        }, r;
      }
      return I(l, [{
        key: "render",
        value: function () {
          return n["createElement"](k["a"], null, this.renderComponent);
        }
      }]), l;
    }(n["Component"]), o.displayName = r, o;
  };
}
var J = function (e) {
    var t = e.prefixCls,
      c = e.className,
      r = e.children,
      o = e.tagName,
      a = Y(e, ["prefixCls", "className", "children", "tagName"]),
      i = l()(c, t);
    return n["createElement"](o, _({
      className: i
    }, a), r);
  },
  $ = function (e) {
    B(c, e);
    var t = W(c);
    function c() {
      var e;
      return N(this, c), e = t.apply(this, arguments), e.state = {
        siders: []
      }, e;
    }
    return I(c, [{
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
          a = e.tagName,
          i = Y(e, ["prefixCls", "className", "children", "hasSider", "tagName"]),
          u = l()(c, t, x({}, "".concat(t, "-has-sider"), "boolean" === typeof o ? o : this.state.siders.length > 0));
        return n["createElement"](X.Provider, {
          value: {
            siderHook: this.getSiderHook()
          }
        }, n["createElement"](a, _({
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
  le = oe;
function ae(e) {
  "@babel/helpers - typeof";

  return ae = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ae(e);
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
function ve(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && pe(e, t);
}
function pe(e, t) {
  return pe = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, pe(e, t);
}
function me(e) {
  var t = ye();
  return function () {
    var c,
      n = be(e);
    if (t) {
      var r = be(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return de(this, c);
  };
}
function de(e, t) {
  return !t || "object" !== ae(t) && "function" !== typeof t ? ze(e) : t;
}
function ze(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function ye() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function be(e) {
  return be = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, be(e);
}
var Me = function (e, t) {
  var c = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
  if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
    var r = 0;
    for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
  }
  return c;
};
if ("undefined" !== typeof window) {
  var ge = function (e) {
    return {
      media: e,
      matches: !1,
      addListener: function () {},
      removeListener: function () {}
    };
  };
  window.matchMedia || (window.matchMedia = ge);
}
var He = {
    xs: "479.98px",
    sm: "575.98px",
    md: "767.98px",
    lg: "991.98px",
    xl: "1199.98px",
    xxl: "1599.98px"
  },
  Ce = h()({}),
  Ve = function () {
    var e = 0;
    return function () {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
      return e += 1, "".concat(t).concat(e);
    };
  }(),
  Oe = function (e) {
    ve(c, e);
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
          v = o.trigger,
          p = o.style,
          m = o.width,
          d = o.collapsedWidth,
          z = o.zeroWidthTriggerStyle,
          y = Me(o, ["prefixCls", "className", "theme", "collapsible", "reverseArrow", "trigger", "style", "width", "collapsedWidth", "zeroWidthTriggerStyle"]),
          b = c("layout-sider", i),
          M = Object(a["a"])(y, ["collapsed", "defaultCollapsed", "onCollapse", "breakpoint", "onBreakpoint", "siderHook", "zeroWidthTriggerStyle"]),
          g = r.state.collapsed ? d : m,
          H = le(g) ? "".concat(g, "px") : String(g),
          C = 0 === parseFloat(String(d || 0)) ? n["createElement"]("span", {
            onClick: r.toggle,
            className: "".concat(b, "-zero-width-trigger ").concat(b, "-zero-width-trigger-").concat(f ? "right" : "left"),
            style: z
          }, n["createElement"](re["a"], {
            type: "bars"
          })) : null,
          V = {
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
          O = r.state.collapsed ? "collapsed" : "expanded",
          w = V[O],
          L = null !== v ? C || n["createElement"]("div", {
            className: "".concat(b, "-trigger"),
            onClick: r.toggle,
            style: {
              width: H
            }
          }, v || w) : null,
          S = ue(ue({}, p), {
            flex: "0 0 ".concat(H),
            maxWidth: H,
            minWidth: H,
            width: H
          }),
          k = l()(u, b, "".concat(b, "-").concat(s), (t = {}, ie(t, "".concat(b, "-collapsed"), !!r.state.collapsed), ie(t, "".concat(b, "-has-trigger"), h && null !== v && !C), ie(t, "".concat(b, "-below"), !!r.state.below), ie(t, "".concat(b, "-zero-width"), 0 === parseFloat(H)), t));
        return n["createElement"]("aside", ue({
          className: k
        }, M, {
          style: S
        }), n["createElement"]("div", {
          className: "".concat(b, "-children")
        }, r.props.children), h || r.state.below && C ? L : null);
      }, r.uniqueId = Ve("ant-sider-"), "undefined" !== typeof window && (o = window.matchMedia), o && e.breakpoint && e.breakpoint in He && (r.mql = o("(max-width: ".concat(He[e.breakpoint], ")"))), i = "collapsed" in e ? e.collapsed : e.defaultCollapsed, r.state = {
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
        return n["createElement"](Ce.Provider, {
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
Oe.defaultProps = {
  collapsible: !1,
  defaultCollapsed: !1,
  reverseArrow: !1,
  width: 200,
  collapsedWidth: 80,
  style: {},
  theme: "dark"
}, Object(i["polyfill"])(Oe);
n["Component"];
function we(e) {
  "@babel/helpers - typeof";

  return we = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, we(e);
}
function Le() {
  return Le = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, Le.apply(this, arguments);
}
function Se(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function ke(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function Ee(e, t, c) {
  return t && ke(e.prototype, t), c && ke(e, c), e;
}
function xe(e, t) {
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
function je(e) {
  var t = Ae();
  return function () {
    var c,
      n = Re(e);
    if (t) {
      var r = Re(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return Te(this, c);
  };
}
function Te(e, t) {
  return !t || "object" !== we(t) && "function" !== typeof t ? Fe(e) : t;
}
function Fe(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Ae() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function Re(e) {
  return Re = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, Re(e);
}
var _e = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  Ne = function (e) {
    xe(c, e);
    var t = je(c);
    function c() {
      var e;
      return Se(this, c), e = t.apply(this, arguments), e.onKeyDown = function (t) {
        e.menuItem.onKeyDown(t);
      }, e.saveMenuItem = function (t) {
        e.menuItem = t;
      }, e.renderItem = function (t) {
        var c = t.siderCollapsed,
          o = e.props,
          l = o.level,
          a = o.children,
          i = o.rootPrefixCls,
          u = e.props,
          s = u.title,
          h = _e(u, ["title"]);
        return n["createElement"](v.Consumer, null, function (t) {
          var o = t.inlineCollapsed,
            u = {
              title: s || (1 === l ? a : "")
            };
          return c || o || (u.title = null, u.visible = !1), n["createElement"](S["a"], Le({}, u, {
            placement: "right",
            overlayClassName: "".concat(i, "-inline-collapsed-tooltip")
          }), n["createElement"](r["b"], Le({}, h, {
            title: s,
            ref: e.saveMenuItem
          })));
        });
      }, e;
    }
    return Ee(c, [{
      key: "render",
      value: function () {
        return n["createElement"](Ce.Consumer, null, this.renderItem);
      }
    }]), c;
  }(n["Component"]);
Ne.isMenuItem = !0;
var De = require("./antdWarning.js"),
  Ie = require("./6f486950.js"),
  Be = function () {
    return {
      height: 0,
      opacity: 0
    };
  },
  qe = function (e) {
    return {
      height: e.scrollHeight,
      opacity: 1
    };
  },
  We = function (e) {
    return {
      height: e.offsetHeight
    };
  },
  Ke = {
    motionName: "ant-motion-collapse",
    onAppearStart: Be,
    onEnterStart: Be,
    onAppearActive: qe,
    onEnterActive: qe,
    onLeaveStart: We,
    onLeaveActive: Be
  },
  Ue = Ke;
function Ge(e) {
  "@babel/helpers - typeof";

  return Ge = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Ge(e);
}
function Qe() {
  return Qe = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, Qe.apply(this, arguments);
}
function Ye(e, t, c) {
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
  return at;
});
var lt = function (e) {
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
        v = Object(a["a"])(o.props, ["collapsedWidth", "siderCollapsed"]),
        p = o.getRealMenuMode(),
        m = o.getOpenMotionProps(p),
        d = c("menu", u),
        z = l()(s, "".concat(d, "-").concat(h), Ye({}, "".concat(d, "-inline-collapsed"), o.getInlineCollapsed())),
        y = Qe({
          openKeys: o.state.openKeys,
          onOpenChange: o.handleOpenChange,
          className: z,
          mode: p
        }, m);
      "inline" !== p && (y.onClick = o.handleClick);
      var b = o.getInlineCollapsed() && (0 === f || "0" === f || "0px" === f);
      return b && (y.openKeys = []), n["createElement"](r["e"], Qe({
        getPopupContainer: t
      }, v, y, {
        prefixCls: d,
        onTransitionEnd: o.handleTransitionEnd,
        onMouseEnter: o.handleMouseEnter
      }));
    }, Object(De["a"])(!("onOpen" in e || "onClose" in e), "Menu", "`onOpen` and `onClose` are removed, please use `onOpenChange` instead, see: https://u.ant.design/menu-on-open-change."), Object(De["a"])(!("inlineCollapsed" in e && "inline" !== e.mode), "Menu", "`inlineCollapsed` should only be used when `mode` is inline."), Object(De["a"])(!(void 0 !== e.siderCollapsed && "inlineCollapsed" in e), "Menu", "`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead."), "openKeys" in e ? i = e.openKeys : "defaultOpenKeys" in e && (i = e.defaultOpenKeys), o.state = {
      openKeys: i || [],
      switchingModeFromInline: !1,
      inlineOpenKeys: [],
      prevProps: e
    }, o;
  }
  return Je(c, [{
    key: "componentWillUnmount",
    value: function () {
      Ie["a"].cancel(this.mountRafId);
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
      } : n ? (Object(De["a"])("string" === typeof n, "Menu", "`openAnimation` do not support object. Please use `motion` instead."), {
        openAnimation: n
      }) : c ? {
        openTransitionName: c
      } : "horizontal" === e ? {
        motion: {
          motionName: "slide-up"
        }
      } : "inline" === e ? {
        motion: Ue
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
      return n["createElement"](v.Provider, {
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
lt.defaultProps = {
  className: "",
  theme: "light",
  focusable: !1
}, Object(i["polyfill"])(lt);
var at = function (e) {
  $e(c, e);
  var t = tt(c);
  function c() {
    return Xe(this, c), t.apply(this, arguments);
  }
  return Je(c, [{
    key: "render",
    value: function () {
      var e = this;
      return n["createElement"](Ce.Consumer, null, function (t) {
        return n["createElement"](lt, Qe({}, e.props, t));
      });
    }
  }]), c;
}(n["Component"]);
at.Divider = r["a"], at.Item = Ne, at.SubMenu = L, at.ItemGroup = r["c"];
