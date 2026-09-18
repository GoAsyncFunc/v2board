let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var n = require("./reactRuntime.js"),
  r = require("./classNames.js"),
  o = interopDefault(r),
  l = require("./4247522b.js"),
  a = require("./reactLifecyclesCompat.js"),
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
  return !t || "object" !== s(t) && "function" !== typeof t ? M(e) : t;
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
var C = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  V = function (e) {
    d(c, e);
    var t = y(c);
    function c() {
      var e;
      return v(this, c), e = t.apply(this, arguments), e.handleClick = function () {
        var t = e.props,
          c = t.checked,
          n = t.onChange;
        n && n(!c);
      }, e.renderCheckableTag = function (t) {
        var c,
          r = t.getPrefixCls,
          l = e.props,
          a = l.prefixCls,
          i = l.className,
          u = l.checked,
          s = C(l, ["prefixCls", "className", "checked"]),
          v = r("tag", a),
          p = o()(v, (c = {}, f(c, "".concat(v, "-checkable"), !0), f(c, "".concat(v, "-checkable-checked"), u), c), i);
        return delete s.onChange, n["createElement"]("span", h({}, s, {
          className: p,
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
  O = require("./30395766.js"),
  w = require("./36436658.js"),
  L = require("./67306d53.js");
function S(e) {
  "@babel/helpers - typeof";

  return S = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, S(e);
}
function k(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
function E() {
  return E = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, E.apply(this, arguments);
}
function x(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function P(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function j(e, t, c) {
  return t && P(e.prototype, t), c && P(e, c), e;
}
function T(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && F(e, t);
}
function F(e, t) {
  return F = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, F(e, t);
}
function A(e) {
  var t = N();
  return function () {
    var c,
      n = D(e);
    if (t) {
      var r = D(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return R(this, c);
  };
}
function R(e, t) {
  return !t || "object" !== S(t) && "function" !== typeof t ? _(e) : t;
}
function _(e) {
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
function D(e) {
  return D = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, D(e);
}
var I = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  B = new RegExp("^(".concat(O["a"].join("|"), ")(-inverse)?$")),
  q = function (e) {
    T(c, e);
    var t = A(c);
    function c(e) {
      var r;
      return x(this, c), r = t.call(this, e), r.state = {
        visible: !0
      }, r.handleIconClick = function (e) {
        e.stopPropagation(), r.setVisible(!1, e);
      }, r.renderTag = function (e) {
        var t = r.props,
          c = t.children,
          o = I(t, ["children"]),
          a = "onClick" in o || c && "a" === c.type,
          i = Object(l["a"])(o, ["onClose", "afterClose", "color", "visible", "closable", "prefixCls"]);
        return a ? n["createElement"](L["a"], null, n["createElement"]("span", E({}, i, {
          className: r.getTagClassName(e),
          style: r.getTagStyle()
        }), c, r.renderCloseIcon())) : n["createElement"]("span", E({}, i, {
          className: r.getTagClassName(e),
          style: r.getTagStyle()
        }), c, r.renderCloseIcon());
      }, Object(w["a"])(!("afterClose" in e), "Tag", "'afterClose' will be deprecated, please use 'onClose', we will remove this in the next version."), r;
    }
    return j(c, [{
      key: "getTagStyle",
      value: function () {
        var e = this.props,
          t = e.color,
          c = e.style,
          n = this.isPresetColor();
        return E({
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
          l = n.className,
          a = n.color,
          i = this.state.visible,
          u = this.isPresetColor(),
          s = c("tag", r);
        return o()(s, (t = {}, k(t, "".concat(s, "-").concat(a), u), k(t, "".concat(s, "-has-color"), a && !u), k(t, "".concat(s, "-hidden"), !i), t), l);
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
        return !!e && B.test(e);
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
q.CheckableTag = V, q.defaultProps = {
  closable: !1
}, Object(a["polyfill"])(q);
legacyExports["a"] = q;
