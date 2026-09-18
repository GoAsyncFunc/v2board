let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var n = require("./reactRuntime.js"),
  r = require("./66635358.js"),
  o = require("./666f5738.js"),
  l = interopDefault(o),
  a = require("./classNames.js"),
  i = interopDefault(a),
  u = require("./4247522b.js"),
  s = require("./antdWarning.js"),
  h = require("../Icon.js"),
  f = require("./48383455.js"),
  v = require("./43575167.js");
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
var w = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  L = l()(null),
  S = (Object(v["a"])("top", "right", "bottom", "left"), function (e) {
    b(c, e);
    var t = g(c);
    function c() {
      var e;
      return d(this, c), e = t.apply(this, arguments), e.state = {
        push: !1
      }, e.push = function () {
        e.setState({
          push: !0
        });
      }, e.pull = function () {
        e.setState({
          push: !1
        });
      }, e.onDestroyTransitionEnd = function () {
        var t = e.getDestroyOnClose();
        t && (e.props.visible || (e.destroyClose = !0, e.forceUpdate()));
      }, e.getDestroyOnClose = function () {
        return e.props.destroyOnClose && !e.props.visible;
      }, e.getPushTransform = function (e) {
        return "left" === e || "right" === e ? "translateX(".concat("left" === e ? 180 : -180, "px)") : "top" === e || "bottom" === e ? "translateY(".concat("top" === e ? 180 : -180, "px)") : void 0;
      }, e.getRcDrawerStyle = function () {
        var t = e.props,
          c = t.zIndex,
          n = t.placement,
          r = t.style,
          o = e.state.push;
        return m({
          zIndex: c,
          transform: o ? e.getPushTransform(n) : void 0
        }, r);
      }, e.renderBody = function () {
        var t = e.props,
          c = t.bodyStyle,
          r = t.drawerStyle,
          o = t.prefixCls,
          l = t.visible;
        if (e.destroyClose && !l) return null;
        e.destroyClose = !1;
        var a = {},
          i = e.getDestroyOnClose();
        return i && (a.opacity = 0, a.transition = "opacity .3s"), n["createElement"]("div", {
          className: "".concat(o, "-wrapper-body"),
          style: m(m({}, a), r),
          onTransitionEnd: e.onDestroyTransitionEnd
        }, e.renderHeader(), n["createElement"]("div", {
          className: "".concat(o, "-body"),
          style: c
        }, e.props.children));
      }, e.renderProvider = function (t) {
        var c = e.props,
          o = c.prefixCls,
          l = c.placement,
          a = c.className,
          h = c.wrapClassName,
          f = c.width,
          v = c.height,
          p = c.mask,
          d = w(c, ["prefixCls", "placement", "className", "wrapClassName", "width", "height", "mask"]);
        Object(s["a"])(void 0 === h, "Drawer", "wrapClassName is deprecated, please use className instead.");
        var z = p ? "" : "no-mask";
        e.parentDrawer = t;
        var y = {};
        return "left" === l || "right" === l ? y.width = f : y.height = v, n["createElement"](L.Provider, {
          value: C(e)
        }, n["createElement"](r["a"], m({
          handler: !1
        }, Object(u["a"])(d, ["zIndex", "style", "closable", "destroyOnClose", "drawerStyle", "headerStyle", "bodyStyle", "title", "push", "visible", "getPopupContainer", "rootPrefixCls", "getPrefixCls", "renderEmpty", "csp", "pageHeader", "autoInsertSpaceInButton"]), y, {
          prefixCls: o,
          open: e.props.visible,
          showMask: p,
          placement: l,
          style: e.getRcDrawerStyle(),
          className: i()(h, a, z)
        }), e.renderBody()));
      }, e;
    }
    return y(c, [{
      key: "componentDidMount",
      value: function () {
        var e = this.props.visible;
        e && this.parentDrawer && this.parentDrawer.push();
      }
    }, {
      key: "componentDidUpdate",
      value: function (e) {
        var t = this.props.visible;
        e.visible !== t && this.parentDrawer && (t ? this.parentDrawer.push() : this.parentDrawer.pull());
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        this.parentDrawer && (this.parentDrawer.pull(), this.parentDrawer = null);
      }
    }, {
      key: "renderHeader",
      value: function () {
        var e = this.props,
          t = e.title,
          c = e.prefixCls,
          r = e.closable,
          o = e.headerStyle;
        if (!t && !r) return null;
        var l = "".concat(c, t ? "-header" : "-header-no-title");
        return n["createElement"]("div", {
          className: l,
          style: o
        }, t && n["createElement"]("div", {
          className: "".concat(c, "-title")
        }, t), r && this.renderCloseIcon());
      }
    }, {
      key: "renderCloseIcon",
      value: function () {
        var e = this.props,
          t = e.closable,
          c = e.prefixCls,
          r = e.onClose;
        return t && n["createElement"]("button", {
          onClick: r,
          "aria-label": "Close",
          className: "".concat(c, "-close")
        }, n["createElement"](h["a"], {
          type: "close"
        }));
      }
    }, {
      key: "render",
      value: function () {
        return n["createElement"](L.Consumer, null, this.renderProvider);
      }
    }]), c;
  }(n["Component"]));
S.defaultProps = {
  width: 256,
  height: 256,
  closable: !0,
  placement: "right",
  maskClosable: !0,
  mask: !0,
  level: null,
  keyboard: !0
}, legacyExports["a"] = Object(f["c"])({
  prefixCls: "drawer"
})(S);
