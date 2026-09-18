let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var n = require("./reactRuntime.js"),
  r = require("./classNames.js"),
  o = interopDefault(r),
  a = require("./4247522b.js"),
  l = require("./reactLifecyclesCompat.js"),
  i = require("../Icon.js"),
  u = require("./48383455.js");
function s(e) {
  "@babel/helpers - typeof";

  return s = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, s(e);
}
function h() {
  return h = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, h.apply(this, arguments);
}
function f(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
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
  return !t || "object" !== s(t) && "function" !== typeof t ? g(e) : t;
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
var H = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  O = function (e) {
    d(c, e);
    var t = b(c);
    function c() {
      var e;
      return p(this, c), e = t.apply(this, arguments), e.handleClick = function () {
        var t = e.props,
          c = t.checked,
          n = t.onChange;
        n && n(!c);
      }, e.renderCheckableTag = function (t) {
        var c,
          r = t.getPrefixCls,
          a = e.props,
          l = a.prefixCls,
          i = a.className,
          u = a.checked,
          s = H(a, ["prefixCls", "className", "checked"]),
          p = r("tag", l),
          v = o()(p, (c = {}, f(c, "".concat(p, "-checkable"), !0), f(c, "".concat(p, "-checkable-checked"), u), c), i);
        return delete s.onChange, n["createElement"]("span", h({}, s, {
          className: v,
          onClick: e.handleClick
        }));
      }, e;
    }
    return m(c, [{
      key: "render",
      value: function () {
        return n["createElement"](u["a"], null, this.renderCheckableTag);
      }
    }]), c;
  }(n["Component"]),
  V = require("./30395766.js"),
  w = require("./36436658.js"),
  S = require("./67306d53.js");
function L(e) {
  "@babel/helpers - typeof";

  return L = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, L(e);
}
function k(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
function x() {
  return x = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, x.apply(this, arguments);
}
function E(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function P(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function T(e, t, c) {
  return t && P(e.prototype, t), c && P(e, c), e;
}
function j(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && N(e, t);
}
function N(e, t) {
  return N = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, N(e, t);
}
function R(e) {
  var t = F();
  return function () {
    var c,
      n = I(e);
    if (t) {
      var r = I(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return _(this, c);
  };
}
function _(e, t) {
  return !t || "object" !== L(t) && "function" !== typeof t ? A(e) : t;
}
function A(e) {
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
function I(e) {
  return I = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, I(e);
}
var D = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  K = new RegExp("^(".concat(V["a"].join("|"), ")(-inverse)?$")),
  U = function (e) {
    j(c, e);
    var t = R(c);
    function c(e) {
      var r;
      return E(this, c), r = t.call(this, e), r.state = {
        visible: !0
      }, r.handleIconClick = function (e) {
        e.stopPropagation(), r.setVisible(!1, e);
      }, r.renderTag = function (e) {
        var t = r.props,
          c = t.children,
          o = D(t, ["children"]),
          l = "onClick" in o || c && "a" === c.type,
          i = Object(a["a"])(o, ["onClose", "afterClose", "color", "visible", "closable", "prefixCls"]);
        return l ? n["createElement"](S["a"], null, n["createElement"]("span", x({}, i, {
          className: r.getTagClassName(e),
          style: r.getTagStyle()
        }), c, r.renderCloseIcon())) : n["createElement"]("span", x({}, i, {
          className: r.getTagClassName(e),
          style: r.getTagStyle()
        }), c, r.renderCloseIcon());
      }, Object(w["a"])(!("afterClose" in e), "Tag", "'afterClose' will be deprecated, please use 'onClose', we will remove this in the next version."), r;
    }
    return T(c, [{
      key: "getTagStyle",
      value: function () {
        var e = this.props,
          t = e.color,
          c = e.style,
          n = this.isPresetColor();
        return x({
          backgroundColor: t && !n ? t : void 0
        }, c);
      }
    }, {
      key: "getTagClassName",
      value: function (e) {
        var t,
          c = e.getPrefixCls,
          n = this.props,
          r = n.prefixCls,
          a = n.className,
          l = n.color,
          i = this.state.visible,
          u = this.isPresetColor(),
          s = c("tag", r);
        return o()(s, (t = {}, k(t, "".concat(s, "-").concat(l), u), k(t, "".concat(s, "-has-color"), l && !u), k(t, "".concat(s, "-hidden"), !i), t), a);
      }
    }, {
      key: "setVisible",
      value: function (e, t) {
        var c = this.props,
          n = c.onClose,
          r = c.afterClose;
        n && n(t), r && !n && r(), t.defaultPrevented || "visible" in this.props || this.setState({
          visible: e
        });
      }
    }, {
      key: "isPresetColor",
      value: function () {
        var e = this.props.color;
        return !!e && K.test(e);
      }
    }, {
      key: "renderCloseIcon",
      value: function () {
        var e = this.props.closable;
        return e ? n["createElement"](i["a"], {
          type: "close",
          onClick: this.handleIconClick
        }) : null;
      }
    }, {
      key: "render",
      value: function () {
        return n["createElement"](u["a"], null, this.renderTag);
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function (e) {
        return "visible" in e ? {
          visible: e.visible
        } : null;
      }
    }]), c;
  }(n["Component"]);
U.CheckableTag = O, U.defaultProps = {
  closable: !1
}, Object(l["polyfill"])(U);
legacyExports["a"] = U;
