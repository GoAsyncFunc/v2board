let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../app/moduleInterop.js");
var n = require("./modules/71317449.js"),
  r = require("./modules/65474a35.js"),
  o = require("./modules/31377839.js"),
  a = require("./modules/54535951.js"),
  l = interopDefault(a),
  i = require("./modules/7a543168.js"),
  u = require("./modules/756c3562.js"),
  s = require("./Icon.js"),
  h = require("./modules/322f5270.js"),
  f = require("./modules/594d6e48.js"),
  p = require("./modules/48383455.js");
function v(e) {
  "@babel/helpers - typeof";

  return v = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, v(e);
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
function y(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function b(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function z(e, t, c) {
  return t && b(e.prototype, t), c && b(e, c), e;
}
function g(e, t) {
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
function C(e) {
  var t = V();
  return function () {
    var c,
      n = w(e);
    if (t) {
      var r = w(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return H(this, c);
  };
}
function H(e, t) {
  return !t || "object" !== v(t) && "function" !== typeof t ? O(e) : t;
}
function O(e) {
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
function w(e) {
  return w = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, w(e);
}
var S,
  L = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  k = [],
  x = function (e) {
    S = {
      x: e.pageX,
      y: e.pageY
    }, setTimeout(function () {
      return S = null;
    }, 100);
  };
"undefined" !== typeof window && window.document && window.document.documentElement && Object(i["a"])(document.documentElement, "click", x);
var E = function (e) {
  g(c, e);
  var t = C(c);
  function c() {
    var e;
    return y(this, c), e = t.apply(this, arguments), e.handleCancel = function (t) {
      var c = e.props.onCancel;
      c && c(t);
    }, e.handleOk = function (t) {
      var c = e.props.onOk;
      c && c(t);
    }, e.renderFooter = function (t) {
      var c = e.props,
        r = c.okText,
        o = c.okType,
        a = c.cancelText,
        l = c.confirmLoading;
      return n["createElement"]("div", null, n["createElement"](h["a"], d({
        onClick: e.handleCancel
      }, e.props.cancelButtonProps), a || t.cancelText), n["createElement"](h["a"], d({
        type: o,
        loading: l,
        onClick: e.handleOk
      }, e.props.okButtonProps), r || t.okText));
    }, e.renderModal = function (t) {
      var c = t.getPopupContainer,
        o = t.getPrefixCls,
        a = e.props,
        i = a.prefixCls,
        h = a.footer,
        p = a.visible,
        v = a.wrapClassName,
        y = a.centered,
        b = a.getContainer,
        z = a.closeIcon,
        g = L(a, ["prefixCls", "footer", "visible", "wrapClassName", "centered", "getContainer", "closeIcon"]),
        M = o("modal", i),
        C = n["createElement"](f["a"], {
          componentName: "Modal",
          defaultLocale: Object(u["b"])()
        }, e.renderFooter),
        H = n["createElement"]("span", {
          className: "".concat(M, "-close-x")
        }, z || n["createElement"](s["a"], {
          className: "".concat(M, "-close-icon"),
          type: "close"
        }));
      return n["createElement"](r["a"], d({}, g, {
        getContainer: void 0 === b ? c : b,
        prefixCls: M,
        wrapClassName: l()(m({}, "".concat(M, "-centered"), !!y), v),
        footer: void 0 === h ? C : h,
        visible: p,
        mousePosition: S,
        onClose: e.handleCancel,
        closeIcon: H
      }));
    }, e;
  }
  return z(c, [{
    key: "render",
    value: function () {
      return n["createElement"](p["a"], null, this.renderModal);
    }
  }]), c;
}(n["Component"]);
E.defaultProps = {
  width: 520,
  transitionName: "zoom",
  maskTransitionName: "fade",
  confirmLoading: !1,
  visible: !1,
  okType: "primary"
}, E.propTypes = {
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
function T(e) {
  "@babel/helpers - typeof";

  return T = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, T(e);
}
function j() {
  return j = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, j.apply(this, arguments);
}
function N(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function R(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function _(e, t, c) {
  return t && R(e.prototype, t), c && R(e, c), e;
}
function A(e, t) {
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
function I(e) {
  var t = U();
  return function () {
    var c,
      n = B(e);
    if (t) {
      var r = B(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return D(this, c);
  };
}
function D(e, t) {
  return !t || "object" !== T(t) && "function" !== typeof t ? K(e) : t;
}
function K(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function U() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function B(e) {
  return B = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, B(e);
}
var q = function (e) {
    A(c, e);
    var t = I(c);
    function c(e) {
      var n;
      return N(this, c), n = t.call(this, e), n.onClick = function () {
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
    return _(c, [{
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
        return n["createElement"](h["a"], j({
          type: t,
          onClick: this.onClick,
          loading: o
        }, r), c);
      }
    }]), c;
  }(n["Component"]),
  W = require("./modules/36436658.js");
function G() {
  return G = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, G.apply(this, arguments);
}
function Y(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
var Q = !!P["createPortal"],
  X = function (e) {
    var t = e.onCancel,
      c = e.onOk,
      r = e.close,
      o = e.zIndex,
      a = e.afterClose,
      i = e.visible,
      h = e.keyboard,
      f = e.centered,
      p = e.getContainer,
      v = e.maskStyle,
      m = e.okButtonProps,
      d = e.cancelButtonProps,
      y = e.iconType,
      b = void 0 === y ? "question-circle" : y;
    Object(W["a"])(!("iconType" in e), "Modal", "The property 'iconType' is deprecated. Use the property 'icon' instead.");
    var z = void 0 === e.icon ? b : e.icon,
      g = e.okType || "primary",
      M = e.prefixCls || "ant-modal",
      C = "".concat(M, "-confirm"),
      H = !("okCancel" in e) || e.okCancel,
      O = e.width || 416,
      V = e.style || {},
      w = void 0 === e.mask || e.mask,
      S = void 0 !== e.maskClosable && e.maskClosable,
      L = Object(u["b"])(),
      k = e.okText || (H ? L.okText : L.justOkText),
      x = e.cancelText || L.cancelText,
      P = null !== e.autoFocusButton && (e.autoFocusButton || "ok"),
      T = e.transitionName || "zoom",
      j = e.maskTransitionName || "fade",
      N = l()(C, "".concat(C, "-").concat(e.type), e.className),
      R = H && n["createElement"](q, {
        actionFn: t,
        closeModal: r,
        autoFocus: "cancel" === P,
        buttonProps: d
      }, x),
      _ = "string" === typeof z ? n["createElement"](s["a"], {
        type: z
      }) : z;
    return n["createElement"](E, {
      prefixCls: M,
      className: N,
      wrapClassName: l()(Y({}, "".concat(C, "-centered"), !!e.centered)),
      onCancel: function () {
        return r({
          triggerCancel: !0
        });
      },
      visible: i,
      title: "",
      transitionName: T,
      footer: "",
      maskTransitionName: j,
      mask: w,
      maskClosable: S,
      maskStyle: v,
      style: V,
      width: O,
      zIndex: o,
      afterClose: a,
      keyboard: h,
      centered: f,
      getContainer: p
    }, n["createElement"]("div", {
      className: "".concat(C, "-body-wrapper")
    }, n["createElement"]("div", {
      className: "".concat(C, "-body")
    }, _, void 0 === e.title ? null : n["createElement"]("span", {
      className: "".concat(C, "-title")
    }, e.title), n["createElement"]("div", {
      className: "".concat(C, "-content")
    }, e.content)), n["createElement"]("div", {
      className: "".concat(C, "-btns")
    }, R, n["createElement"](q, {
      type: g,
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
    close: a,
    visible: !0
  });
  function r() {
    var c = P["unmountComponentAtNode"](t);
    c && t.parentNode && t.parentNode.removeChild(t);
    for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++) r[o] = arguments[o];
    var l = r.some(function (e) {
      return e && e.triggerCancel;
    });
    e.onCancel && l && e.onCancel.apply(e, r);
    for (var i = 0; i < k.length; i++) {
      var u = k[i];
      if (u === a) {
        k.splice(i, 1);
        break;
      }
    }
  }
  function o(e) {
    P["render"](n["createElement"](X, e), t);
  }
  function a() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    c = G(G({}, c), {
      visible: !1,
      afterClose: r.bind.apply(r, [this].concat(t))
    }), Q ? o(c) : r.apply(void 0, t);
  }
  function l(e) {
    c = G(G({}, c), e), o(c);
  }
  return o(c), k.push(a), {
    destroy: a,
    update: l
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
E.info = function (e) {
  var t = J({
    type: "info",
    icon: n["createElement"](s["a"], {
      type: "info-circle"
    }),
    okCancel: !1
  }, e);
  return Z(t);
}, E.success = function (e) {
  var t = J({
    type: "success",
    icon: n["createElement"](s["a"], {
      type: "check-circle"
    }),
    okCancel: !1
  }, e);
  return Z(t);
}, E.error = function (e) {
  var t = J({
    type: "error",
    icon: n["createElement"](s["a"], {
      type: "close-circle"
    }),
    okCancel: !1
  }, e);
  return Z(t);
}, E.warning = $, E.warn = $, E.confirm = function (e) {
  var t = J({
    type: "confirm",
    okCancel: !0
  }, e);
  return Z(t);
}, E.destroyAll = function () {
  while (k.length) {
    var e = k.pop();
    e && e();
  }
};
legacyExports["a"] = E;
