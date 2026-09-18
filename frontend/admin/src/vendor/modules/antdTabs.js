let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
var n = require("./reactRuntime.js"),
  r = require("./reactDomRuntime.js"),
  o = require("./6b33474a.js"),
  a = require("./62546968.js"),
  l = require("./classNames.js"),
  i = interopDefault(l),
  u = require("./4247522b.js"),
  s = require("./76413354.js"),
  h = require("../Icon.js");
function f() {
  return f = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, f.apply(this, arguments);
}
function p(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
function v(e) {
  "@babel/helpers - typeof";

  return v = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, v(e);
}
function m(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function d(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function y(e, t, c) {
  return t && d(e.prototype, t), c && d(e, c), e;
}
function b(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && z(e, t);
}
function z(e, t) {
  return z = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, z(e, t);
}
function g(e) {
  var t = H();
  return function () {
    var c,
      n = O(e);
    if (t) {
      var r = O(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return M(this, c);
  };
}
function M(e, t) {
  return !t || "object" !== v(t) && "function" !== typeof t ? C(e) : t;
}
function C(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function H() {
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
var V = function (e) {
  b(c, e);
  var t = g(c);
  function c() {
    return m(this, c), t.apply(this, arguments);
  }
  return y(c, [{
    key: "render",
    value: function () {
      var e,
        t,
        c = this.props,
        r = c.tabBarStyle,
        o = c.animated,
        a = c.renderTabBar,
        l = c.tabBarExtraContent,
        u = c.tabPosition,
        m = c.prefixCls,
        d = c.className,
        y = c.size,
        b = c.type,
        z = "object" === v(o) ? o.inkBar : o,
        g = "left" === u || "right" === u,
        M = g ? "up" : "left",
        C = g ? "down" : "right",
        H = n["createElement"]("span", {
          className: "".concat(m, "-tab-prev-icon")
        }, n["createElement"](h["a"], {
          type: M,
          className: "".concat(m, "-tab-prev-icon-target")
        })),
        O = n["createElement"]("span", {
          className: "".concat(m, "-tab-next-icon")
        }, n["createElement"](h["a"], {
          type: C,
          className: "".concat(m, "-tab-next-icon-target")
        })),
        V = i()("".concat(m, "-").concat(u, "-bar"), (e = {}, p(e, "".concat(m, "-").concat(y, "-bar"), !!y), p(e, "".concat(m, "-card-bar"), b && b.indexOf("card") >= 0), e), d),
        w = f(f({}, this.props), {
          children: null,
          inkBarAnimated: z,
          extraContent: l,
          style: r,
          prevIcon: H,
          nextIcon: O,
          className: V
        });
      return t = a ? a(w, s["a"]) : n["createElement"](s["a"], w), n["cloneElement"](t);
    }
  }]), c;
}(n["Component"]);
V.defaultProps = {
  animated: !0,
  type: "line"
};
var w = require("./48383455.js"),
  S = require("./36436658.js"),
  L = function (e) {
    if ("undefined" !== typeof window && window.document && window.document.documentElement) {
      var t = Array.isArray(e) ? e : [e],
        c = window.document.documentElement;
      return t.some(function (e) {
        return e in c.style;
      });
    }
    return !1;
  },
  k = L(["flex", "webkitFlex", "Flex", "msFlex"]);
function x() {
  return x = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, x.apply(this, arguments);
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
  "@babel/helpers - typeof";

  return P = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, P(e);
}
function T(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function j(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function N(e, t, c) {
  return t && j(e.prototype, t), c && j(e, c), e;
}
function R(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && _(e, t);
}
function _(e, t) {
  return _ = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, _(e, t);
}
function A(e) {
  var t = D();
  return function () {
    var c,
      n = K(e);
    if (t) {
      var r = K(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return F(this, c);
  };
}
function F(e, t) {
  return !t || "object" !== P(t) && "function" !== typeof t ? I(e) : t;
}
function I(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function D() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function K(e) {
  return K = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, K(e);
}
defineExport(legacyExports, "a", function () {
  return B;
});
var U = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  B = function (e) {
    R(c, e);
    var t = A(c);
    function c() {
      var e;
      return T(this, c), e = t.apply(this, arguments), e.removeTab = function (t, c) {
        if (c.stopPropagation(), t) {
          var n = e.props.onEdit;
          n && n(t, "remove");
        }
      }, e.handleChange = function (t) {
        var c = e.props.onChange;
        c && c(t);
      }, e.createNewTab = function (t) {
        var c = e.props.onEdit;
        c && c(t, "add");
      }, e.renderTabs = function (t) {
        var c,
          r = t.getPrefixCls,
          l = e.props,
          s = l.prefixCls,
          f = l.className,
          p = void 0 === f ? "" : f,
          v = l.size,
          m = l.type,
          d = void 0 === m ? "line" : m,
          y = l.tabPosition,
          b = l.children,
          z = l.animated,
          g = void 0 === z || z,
          M = l.hideAdd,
          C = e.props.tabBarExtraContent,
          H = "object" === P(g) ? g.tabPane : g;
        "line" !== d && (H = "animated" in e.props && H), Object(S["a"])(!(d.indexOf("card") >= 0 && ("small" === v || "large" === v)), "Tabs", "`type=card|editable-card` doesn't have small or large size, it's by design.");
        var O = r("tabs", s),
          w = i()(p, (c = {}, E(c, "".concat(O, "-vertical"), "left" === y || "right" === y), E(c, "".concat(O, "-").concat(v), !!v), E(c, "".concat(O, "-card"), d.indexOf("card") >= 0), E(c, "".concat(O, "-").concat(d), !0), E(c, "".concat(O, "-no-animation"), !H), c)),
          L = [];
        "editable-card" === d && (L = [], n["Children"].forEach(b, function (t, c) {
          if (!n["isValidElement"](t)) return t;
          var r = t.props.closable;
          r = "undefined" === typeof r || r;
          var o = r ? n["createElement"](h["a"], {
            type: "close",
            className: "".concat(O, "-close-x"),
            onClick: function (c) {
              return e.removeTab(t.key, c);
            }
          }) : null;
          L.push(n["cloneElement"](t, {
            tab: n["createElement"]("div", {
              className: r ? void 0 : "".concat(O, "-tab-unclosable")
            }, t.props.tab, o),
            key: t.key || c
          }));
        }), M || (C = n["createElement"]("span", null, n["createElement"](h["a"], {
          type: "plus",
          className: "".concat(O, "-new-tab"),
          onClick: e.createNewTab
        }), C))), C = C ? n["createElement"]("div", {
          className: "".concat(O, "-extra-content")
        }, C) : null;
        var k = U(e.props, []),
          T = i()("".concat(O, "-").concat(y, "-content"), d.indexOf("card") >= 0 && "".concat(O, "-card-content"));
        return n["createElement"](o["b"], x({}, e.props, {
          prefixCls: O,
          className: w,
          tabBarPosition: y,
          renderTabBar: function () {
            return n["createElement"](V, x({}, Object(u["a"])(k, ["className"]), {
              tabBarExtraContent: C
            }));
          },
          renderTabContent: function () {
            return n["createElement"](a["a"], {
              className: T,
              animated: H,
              animatedWithMargin: !0
            });
          },
          onChange: e.handleChange
        }), L.length > 0 ? L : b);
      }, e;
    }
    return N(c, [{
      key: "componentDidMount",
      value: function () {
        var e = " no-flex",
          t = r["findDOMNode"](this);
        t && !k && -1 === t.className.indexOf(e) && (t.className += e);
      }
    }, {
      key: "render",
      value: function () {
        return n["createElement"](w["a"], null, this.renderTabs);
      }
    }]), c;
  }(n["Component"]);
B.TabPane = o["a"], B.defaultProps = {
  hideAdd: !1,
  tabPosition: "top"
};
