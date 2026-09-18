let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var n = require("./reactRuntime.js"),
  r = require("./6544496f.js"),
  o = require("./classNames.js"),
  l = interopDefault(o),
  a = require("./48383455.js"),
  i = require("./antdWarning.js"),
  u = require("../Icon.js"),
  s = require("./43575167.js");
function h(e) {
  "@babel/helpers - typeof";

  return h = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, h(e);
}
function f() {
  return f = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, f.apply(this, arguments);
}
function v(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function p(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function m(e, t, c) {
  return t && p(e.prototype, t), c && p(e, c), e;
}
function d(e, t) {
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
function y(e) {
  var t = g();
  return function () {
    var c,
      n = H(e);
    if (t) {
      var r = H(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return b(this, c);
  };
}
function b(e, t) {
  return !t || "object" !== h(t) && "function" !== typeof t ? M(e) : t;
}
function M(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function g() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function H(e) {
  return H = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, H(e);
}
Object(s["a"])("topLeft", "topCenter", "topRight", "bottomLeft", "bottomCenter", "bottomRight");
var C = function (e) {
  d(c, e);
  var t = y(c);
  function c() {
    var e;
    return v(this, c), e = t.apply(this, arguments), e.renderOverlay = function (t) {
      var c,
        r = e.props.overlay;
      c = "function" === typeof r ? r() : r, c = n["Children"].only(c);
      var o = c.props;
      Object(i["a"])(!o.mode || "vertical" === o.mode, "Dropdown", 'mode="'.concat(o.mode, "\" is not supported for Dropdown's Menu."));
      var l = o.selectable,
        a = void 0 !== l && l,
        s = o.focusable,
        h = void 0 === s || s,
        f = n["createElement"]("span", {
          className: "".concat(t, "-menu-submenu-arrow")
        }, n["createElement"](u["a"], {
          type: "right",
          className: "".concat(t, "-menu-submenu-arrow-icon")
        })),
        v = "string" === typeof c.type ? r : n["cloneElement"](c, {
          mode: "vertical",
          selectable: a,
          focusable: h,
          expandIcon: f
        });
      return v;
    }, e.renderDropDown = function (t) {
      var c,
        o = t.getPopupContainer,
        a = t.getPrefixCls,
        i = e.props,
        u = i.prefixCls,
        s = i.children,
        h = i.trigger,
        v = i.disabled,
        p = i.getPopupContainer,
        m = a("dropdown", u),
        d = n["Children"].only(s),
        z = n["cloneElement"](d, {
          className: l()(d.props.className, "".concat(m, "-trigger")),
          disabled: v
        }),
        y = v ? [] : h;
      return y && -1 !== y.indexOf("contextMenu") && (c = !0), n["createElement"](r["a"], f({
        alignPoint: c
      }, e.props, {
        prefixCls: m,
        getPopupContainer: p || o,
        transitionName: e.getTransitionName(),
        trigger: y,
        overlay: function () {
          return e.renderOverlay(m);
        }
      }), z);
    }, e;
  }
  return m(c, [{
    key: "getTransitionName",
    value: function () {
      var e = this.props,
        t = e.placement,
        c = void 0 === t ? "" : t,
        n = e.transitionName;
      return void 0 !== n ? n : c.indexOf("top") >= 0 ? "slide-down" : "slide-up";
    }
  }, {
    key: "render",
    value: function () {
      return n["createElement"](a["a"], null, this.renderDropDown);
    }
  }]), c;
}(n["Component"]);
C.defaultProps = {
  mouseEnterDelay: .15,
  mouseLeaveDelay: .1,
  placement: "bottomLeft"
};
var V = require("./antdButton.js");
function O(e) {
  "@babel/helpers - typeof";

  return O = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, O(e);
}
function w() {
  return w = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, w.apply(this, arguments);
}
function L(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function S(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function k(e, t, c) {
  return t && S(e.prototype, t), c && S(e, c), e;
}
function E(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && x(e, t);
}
function x(e, t) {
  return x = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, x(e, t);
}
function P(e) {
  var t = F();
  return function () {
    var c,
      n = A(e);
    if (t) {
      var r = A(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return j(this, c);
  };
}
function j(e, t) {
  return !t || "object" !== O(t) && "function" !== typeof t ? T(e) : t;
}
function T(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function F() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function A(e) {
  return A = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, A(e);
}
var R = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  _ = V["a"].Group,
  N = function (e) {
    E(c, e);
    var t = P(c);
    function c() {
      var e;
      return L(this, c), e = t.apply(this, arguments), e.renderButton = function (t) {
        var c = t.getPopupContainer,
          r = t.getPrefixCls,
          o = e.props,
          a = o.prefixCls,
          i = o.type,
          s = o.disabled,
          h = o.onClick,
          f = o.htmlType,
          v = o.children,
          p = o.className,
          m = o.overlay,
          d = o.trigger,
          z = o.align,
          y = o.visible,
          b = o.onVisibleChange,
          M = o.placement,
          g = o.getPopupContainer,
          H = o.href,
          O = o.icon,
          L = void 0 === O ? n["createElement"](u["a"], {
            type: "ellipsis"
          }) : O,
          S = o.title,
          k = R(o, ["prefixCls", "type", "disabled", "onClick", "htmlType", "children", "className", "overlay", "trigger", "align", "visible", "onVisibleChange", "placement", "getPopupContainer", "href", "icon", "title"]),
          E = r("dropdown-button", a),
          x = {
            align: z,
            overlay: m,
            disabled: s,
            trigger: s ? [] : d,
            onVisibleChange: b,
            placement: M,
            getPopupContainer: g || c
          };
        return "visible" in e.props && (x.visible = y), n["createElement"](_, w({}, k, {
          className: l()(E, p)
        }), n["createElement"](V["a"], {
          type: i,
          disabled: s,
          onClick: h,
          htmlType: f,
          href: H,
          title: S
        }, v), n["createElement"](C, x, n["createElement"](V["a"], {
          type: i
        }, L)));
      }, e;
    }
    return k(c, [{
      key: "render",
      value: function () {
        return n["createElement"](a["a"], null, this.renderButton);
      }
    }]), c;
  }(n["Component"]);
N.defaultProps = {
  placement: "bottomRight",
  type: "default"
}, C.Button = N;
legacyExports["a"] = C;
