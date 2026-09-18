let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var n = require("./71317449.js"),
  r = require("./6544496f.js"),
  o = require("./54535951.js"),
  a = interopDefault(o),
  l = require("./48383455.js"),
  i = require("./36436658.js"),
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
function p(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function v(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function m(e, t, c) {
  return t && v(e.prototype, t), c && v(e, c), e;
}
function d(e, t) {
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
function b(e) {
  var t = M();
  return function () {
    var c,
      n = C(e);
    if (t) {
      var r = C(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return z(this, c);
  };
}
function z(e, t) {
  return !t || "object" !== h(t) && "function" !== typeof t ? g(e) : t;
}
function g(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function M() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function C(e) {
  return C = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, C(e);
}
Object(s["a"])("topLeft", "topCenter", "topRight", "bottomLeft", "bottomCenter", "bottomRight");
var H = function (e) {
  d(c, e);
  var t = b(c);
  function c() {
    var e;
    return p(this, c), e = t.apply(this, arguments), e.renderOverlay = function (t) {
      var c,
        r = e.props.overlay;
      c = "function" === typeof r ? r() : r, c = n["Children"].only(c);
      var o = c.props;
      Object(i["a"])(!o.mode || "vertical" === o.mode, "Dropdown", 'mode="'.concat(o.mode, "\" is not supported for Dropdown's Menu."));
      var a = o.selectable,
        l = void 0 !== a && a,
        s = o.focusable,
        h = void 0 === s || s,
        f = n["createElement"]("span", {
          className: "".concat(t, "-menu-submenu-arrow")
        }, n["createElement"](u["a"], {
          type: "right",
          className: "".concat(t, "-menu-submenu-arrow-icon")
        })),
        p = "string" === typeof c.type ? r : n["cloneElement"](c, {
          mode: "vertical",
          selectable: l,
          focusable: h,
          expandIcon: f
        });
      return p;
    }, e.renderDropDown = function (t) {
      var c,
        o = t.getPopupContainer,
        l = t.getPrefixCls,
        i = e.props,
        u = i.prefixCls,
        s = i.children,
        h = i.trigger,
        p = i.disabled,
        v = i.getPopupContainer,
        m = l("dropdown", u),
        d = n["Children"].only(s),
        y = n["cloneElement"](d, {
          className: a()(d.props.className, "".concat(m, "-trigger")),
          disabled: p
        }),
        b = p ? [] : h;
      return b && -1 !== b.indexOf("contextMenu") && (c = !0), n["createElement"](r["a"], f({
        alignPoint: c
      }, e.props, {
        prefixCls: m,
        getPopupContainer: v || o,
        transitionName: e.getTransitionName(),
        trigger: b,
        overlay: function () {
          return e.renderOverlay(m);
        }
      }), y);
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
      return n["createElement"](l["a"], null, this.renderDropDown);
    }
  }]), c;
}(n["Component"]);
H.defaultProps = {
  mouseEnterDelay: .15,
  mouseLeaveDelay: .1,
  placement: "bottomLeft"
};
var O = require("./antdButton.js");
function V(e) {
  "@babel/helpers - typeof";

  return V = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, V(e);
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
function S(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function L(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function k(e, t, c) {
  return t && L(e.prototype, t), c && L(e, c), e;
}
function x(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && E(e, t);
}
function E(e, t) {
  return E = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, E(e, t);
}
function P(e) {
  var t = N();
  return function () {
    var c,
      n = R(e);
    if (t) {
      var r = R(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return T(this, c);
  };
}
function T(e, t) {
  return !t || "object" !== V(t) && "function" !== typeof t ? j(e) : t;
}
function j(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function N() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function R(e) {
  return R = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, R(e);
}
var _ = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  A = O["a"].Group,
  F = function (e) {
    x(c, e);
    var t = P(c);
    function c() {
      var e;
      return S(this, c), e = t.apply(this, arguments), e.renderButton = function (t) {
        var c = t.getPopupContainer,
          r = t.getPrefixCls,
          o = e.props,
          l = o.prefixCls,
          i = o.type,
          s = o.disabled,
          h = o.onClick,
          f = o.htmlType,
          p = o.children,
          v = o.className,
          m = o.overlay,
          d = o.trigger,
          y = o.align,
          b = o.visible,
          z = o.onVisibleChange,
          g = o.placement,
          M = o.getPopupContainer,
          C = o.href,
          V = o.icon,
          S = void 0 === V ? n["createElement"](u["a"], {
            type: "ellipsis"
          }) : V,
          L = o.title,
          k = _(o, ["prefixCls", "type", "disabled", "onClick", "htmlType", "children", "className", "overlay", "trigger", "align", "visible", "onVisibleChange", "placement", "getPopupContainer", "href", "icon", "title"]),
          x = r("dropdown-button", l),
          E = {
            align: y,
            overlay: m,
            disabled: s,
            trigger: s ? [] : d,
            onVisibleChange: z,
            placement: g,
            getPopupContainer: M || c
          };
        return "visible" in e.props && (E.visible = b), n["createElement"](A, w({}, k, {
          className: a()(x, v)
        }), n["createElement"](O["a"], {
          type: i,
          disabled: s,
          onClick: h,
          htmlType: f,
          href: C,
          title: L
        }, p), n["createElement"](H, E, n["createElement"](O["a"], {
          type: i
        }, S)));
      }, e;
    }
    return k(c, [{
      key: "render",
      value: function () {
        return n["createElement"](l["a"], null, this.renderButton);
      }
    }]), c;
  }(n["Component"]);
F.defaultProps = {
  placement: "bottomRight",
  type: "default"
}, H.Button = F;
legacyExports["a"] = H;
