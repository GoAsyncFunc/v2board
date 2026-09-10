let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../app/moduleInterop.js");
var n = require("./modules/71317449.js"),
  r = require("./modules/65474a35.js"),
  o = require("./modules/31377839.js"),
  l = require("./modules/54535951.js"),
  a = interopDefault(l),
  i = require("./modules/7a543168.js"),
  u = require("./modules/756c3562.js"),
  s = require("./Icon.js"),
  h = require("./modules/322f5270.js"),
  f = require("./modules/594d6e48.js"),
  v = require("./modules/48383455.js");
function p(e) {
  "@babel/helpers - typeof";

  return p = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, p(e);
}
function m(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
function d() {
  return d = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, d.apply(this, arguments);
}
function z(e, t) {
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
function M(e, t) {
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
function H(e) {
  var t = O();
  return function () {
    var c,
      n = w(e);
    if (t) {
      var r = w(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return C(this, c);
  };
}
function C(e, t) {
  return !t || "object" !== p(t) && "function" !== typeof t ? V(e) : t;
}
function V(e) {
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
function w(e) {
  return w = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, w(e);
}
var L,
  S = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  k = [],
  E = function (e) {
    L = {
      x: e.pageX,
      y: e.pageY
    }, setTimeout(function () {
      return L = null;
    }, 100);
  };
"undefined" !== typeof window && window.document && window.document.documentElement && Object(i["a"])(document.documentElement, "click", E);
var x = function (e) {
  M(c, e);
  var t = H(c);
  function c() {
    var e;
    return z(this, c), e = t.apply(this, arguments), e.handleCancel = function (t) {
      var c = e.props.onCancel;
      c && c(t);
    }, e.handleOk = function (t) {
      var c = e.props.onOk;
      c && c(t);
    }, e.renderFooter = function (t) {
      var c = e.props,
        r = c.okText,
        o = c.okType,
        l = c.cancelText,
        a = c.confirmLoading;
      return n["createElement"]("div", null, n["createElement"](h["a"], d({
        onClick: e.handleCancel
      }, e.props.cancelButtonProps), l || t.cancelText), n["createElement"](h["a"], d({
        type: o,
        loading: a,
        onClick: e.handleOk
      }, e.props.okButtonProps), r || t.okText));
    }, e.renderModal = function (t) {
      var c = t.getPopupContainer,
        o = t.getPrefixCls,
        l = e.props,
        i = l.prefixCls,
        h = l.footer,
        v = l.visible,
        p = l.wrapClassName,
        z = l.centered,
        y = l.getContainer,
        b = l.closeIcon,
        M = S(l, ["prefixCls", "footer", "visible", "wrapClassName", "centered", "getContainer", "closeIcon"]),
        g = o("modal", i),
        H = n["createElement"](f["a"], {
          componentName: "Modal",
          defaultLocale: Object(u["b"])()
        }, e.renderFooter),
        C = n["createElement"]("span", {
          className: "".concat(g, "-close-x")
        }, b || n["createElement"](s["a"], {
          className: "".concat(g, "-close-icon"),
          type: "close"
        }));
      return n["createElement"](r["a"], d({}, M, {
        getContainer: void 0 === y ? c : y,
        prefixCls: g,
        wrapClassName: a()(m({}, "".concat(g, "-centered"), !!z), p),
        footer: void 0 === h ? H : h,
        visible: v,
        mousePosition: L,
        onClose: e.handleCancel,
        closeIcon: C
      }));
    }, e;
  }
  return b(c, [{
    key: "render",
    value: function () {
      return n["createElement"](v["a"], null, this.renderModal);
    }
  }]), c;
}(n["Component"]);
x.defaultProps = {
  width: 520,
  transitionName: "zoom",
  maskTransitionName: "fade",
  confirmLoading: !1,
  visible: !1,
  okType: "primary"
}, x.propTypes = {
  prefixCls: o["string"],
  onOk: o["func"],
  onCancel: o["func"],
  okText: o["node"],
  cancelText: o["node"],
  centered: o["bool"],
  width: o["oneOfType"]([o["number"], o["string"]]),
  confirmLoading: o["bool"],
  visible: o["bool"],
  footer: o["node"],
  title: o["node"],
  closable: o["bool"],
  closeIcon: o["node"]
};
var P = require("./modules/69386934.js");
function j(e) {
  "@babel/helpers - typeof";

  return j = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, j(e);
}
function T() {
  return T = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, T.apply(this, arguments);
}
function F(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function A(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function R(e, t, c) {
  return t && A(e.prototype, t), c && A(e, c), e;
}
function _(e, t) {
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
function D(e) {
  var t = q();
  return function () {
    var c,
      n = W(e);
    if (t) {
      var r = W(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return I(this, c);
  };
}
function I(e, t) {
  return !t || "object" !== j(t) && "function" !== typeof t ? B(e) : t;
}
function B(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function q() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function W(e) {
  return W = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, W(e);
}
var K = function (e) {
    _(c, e);
    var t = D(c);
    function c(e) {
      var n;
      return F(this, c), n = t.call(this, e), n.onClick = function () {
        var e,
          t = n.props,
          c = t.actionFn,
          r = t.closeModal;
        c ? (c.length ? e = c(r) : (e = c(), e || r()), e && e.then && (n.setState({
          loading: !0
        }), e.then(function () {
          r.apply(void 0, arguments);
        }, function (e) {
          console.error(e), n.setState({
            loading: !1
          });
        }))) : r();
      }, n.state = {
        loading: !1
      }, n;
    }
    return R(c, [{
      key: "componentDidMount",
      value: function () {
        if (this.props.autoFocus) {
          var e = P["findDOMNode"](this);
          this.timeoutId = setTimeout(function () {
            return e.focus();
          });
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        clearTimeout(this.timeoutId);
      }
    }, {
      key: "render",
      value: function () {
        var e = this.props,
          t = e.type,
          c = e.children,
          r = e.buttonProps,
          o = this.state.loading;
        return n["createElement"](h["a"], T({
          type: t,
          onClick: this.onClick,
          loading: o
        }, r), c);
      }
    }]), c;
  }(n["Component"]),
  U = require("./modules/36436658.js");
function G() {
  return G = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, G.apply(this, arguments);
}
function Q(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
var Y = !!P["createPortal"],
  X = function (e) {
    var t = e.onCancel,
      c = e.onOk,
      r = e.close,
      o = e.zIndex,
      l = e.afterClose,
      i = e.visible,
      h = e.keyboard,
      f = e.centered,
      v = e.getContainer,
      p = e.maskStyle,
      m = e.okButtonProps,
      d = e.cancelButtonProps,
      z = e.iconType,
      y = void 0 === z ? "question-circle" : z;
    Object(U["a"])(!("iconType" in e), "Modal", "The property 'iconType' is deprecated. Use the property 'icon' instead.");
    var b = void 0 === e.icon ? y : e.icon,
      M = e.okType || "primary",
      g = e.prefixCls || "ant-modal",
      H = "".concat(g, "-confirm"),
      C = !("okCancel" in e) || e.okCancel,
      V = e.width || 416,
      O = e.style || {},
      w = void 0 === e.mask || e.mask,
      L = void 0 !== e.maskClosable && e.maskClosable,
      S = Object(u["b"])(),
      k = e.okText || (C ? S.okText : S.justOkText),
      E = e.cancelText || S.cancelText,
      P = null !== e.autoFocusButton && (e.autoFocusButton || "ok"),
      j = e.transitionName || "zoom",
      T = e.maskTransitionName || "fade",
      F = a()(H, "".concat(H, "-").concat(e.type), e.className),
      A = C && n["createElement"](K, {
        actionFn: t,
        closeModal: r,
        autoFocus: "cancel" === P,
        buttonProps: d
      }, E),
      R = "string" === typeof b ? n["createElement"](s["a"], {
        type: b
      }) : b;
    return n["createElement"](x, {
      prefixCls: g,
      className: F,
      wrapClassName: a()(Q({}, "".concat(H, "-centered"), !!e.centered)),
      onCancel: function () {
        return r({
          triggerCancel: !0
        });
      },
      visible: i,
      title: "",
      transitionName: j,
      footer: "",
      maskTransitionName: T,
      mask: w,
      maskClosable: L,
      maskStyle: p,
      style: O,
      width: V,
      zIndex: o,
      afterClose: l,
      keyboard: h,
      centered: f,
      getContainer: v
    }, n["createElement"]("div", {
      className: "".concat(H, "-body-wrapper")
    }, n["createElement"]("div", {
      className: "".concat(H, "-body")
    }, R, void 0 === e.title ? null : n["createElement"]("span", {
      className: "".concat(H, "-title")
    }, e.title), n["createElement"]("div", {
      className: "".concat(H, "-content")
    }, e.content)), n["createElement"]("div", {
      className: "".concat(H, "-btns")
    }, A, n["createElement"](K, {
      type: M,
      actionFn: c,
      closeModal: r,
      autoFocus: "ok" === P,
      buttonProps: m
    }, k))));
  };
function Z(e) {
  var t = document.createElement("div");
  document.body.appendChild(t);
  var c = G(G({}, e), {
    close: l,
    visible: !0
  });
  function r() {
    var c = P["unmountComponentAtNode"](t);
    c && t.parentNode && t.parentNode.removeChild(t);
    for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++) r[o] = arguments[o];
    var a = r.some(function (e) {
      return e && e.triggerCancel;
    });
    e.onCancel && a && e.onCancel.apply(e, r);
    for (var i = 0; i < k.length; i++) {
      var u = k[i];
      if (u === l) {
        k.splice(i, 1);
        break;
      }
    }
  }
  function o(e) {
    P["render"](n["createElement"](X, e), t);
  }
  function l() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    c = G(G({}, c), {
      visible: !1,
      afterClose: r.bind.apply(r, [this].concat(t))
    }), Y ? o(c) : r.apply(void 0, t);
  }
  function a(e) {
    c = G(G({}, c), e), o(c);
  }
  return o(c), k.push(l), {
    destroy: l,
    update: a
  };
}
function J() {
  return J = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, J.apply(this, arguments);
}
function $(e) {
  var t = J({
    type: "warning",
    icon: n["createElement"](s["a"], {
      type: "exclamation-circle"
    }),
    okCancel: !1
  }, e);
  return Z(t);
}
x.info = function (e) {
  var t = J({
    type: "info",
    icon: n["createElement"](s["a"], {
      type: "info-circle"
    }),
    okCancel: !1
  }, e);
  return Z(t);
}, x.success = function (e) {
  var t = J({
    type: "success",
    icon: n["createElement"](s["a"], {
      type: "check-circle"
    }),
    okCancel: !1
  }, e);
  return Z(t);
}, x.error = function (e) {
  var t = J({
    type: "error",
    icon: n["createElement"](s["a"], {
      type: "close-circle"
    }),
    okCancel: !1
  }, e);
  return Z(t);
}, x.warning = $, x.warn = $, x.confirm = function (e) {
  var t = J({
    type: "confirm",
    okCancel: !0
  }, e);
  return Z(t);
}, x.destroyAll = function () {
  while (k.length) {
    var e = k.pop();
    e && e();
  }
};
legacyExports["a"] = x;
