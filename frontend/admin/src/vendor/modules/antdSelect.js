let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return k;
});
var n = require("./reactRuntime.js"),
  r = require("./propTypesRuntime.js"),
  o = require("./4c64484d.js"),
  a = require("./classNames.js"),
  l = interopDefault(a),
  i = require("./4247522b.js"),
  u = require("./48383455.js"),
  s = require("./36436658.js"),
  h = require("../Icon.js"),
  f = require("./43575167.js");
function p(e) {
  "@babel/helpers - typeof";

  return p = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, p(e);
}
function v() {
  return v = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, v.apply(this, arguments);
}
function m(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
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
  return !t || "object" !== p(t) && "function" !== typeof t ? H(e) : t;
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
var w = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  S = Object(f["a"])("default", "large", "small"),
  L = (Object(f["a"])("default", "multiple", "tags", "combobox", "SECRET_COMBOBOX_MODE_DO_NOT_USE"), {
    prefixCls: r["string"],
    className: r["string"],
    size: r["oneOf"](S),
    notFoundContent: r["any"],
    showSearch: r["bool"],
    optionLabelProp: r["string"],
    transitionName: r["string"],
    choiceTransitionName: r["string"],
    id: r["string"]
  }),
  k = function (e) {
    z(c, e);
    var t = M(c);
    function c(e) {
      var r;
      return d(this, c), r = t.call(this, e), r.saveSelect = function (e) {
        r.rcSelect = e;
      }, r.renderSelect = function (e) {
        var t,
          c = e.getPopupContainer,
          a = e.getPrefixCls,
          u = e.renderEmpty,
          s = r.props,
          f = s.prefixCls,
          p = s.className,
          d = void 0 === p ? "" : p,
          y = s.size,
          b = s.mode,
          z = s.getPopupContainer,
          g = s.removeIcon,
          M = s.clearIcon,
          C = s.menuItemSelectedIcon,
          H = s.showArrow,
          O = w(s, ["prefixCls", "className", "size", "mode", "getPopupContainer", "removeIcon", "clearIcon", "menuItemSelectedIcon", "showArrow"]),
          V = Object(i["a"])(O, ["inputIcon"]),
          S = a("select", f),
          L = l()((t = {}, m(t, "".concat(S, "-lg"), "large" === y), m(t, "".concat(S, "-sm"), "small" === y), m(t, "".concat(S, "-show-arrow"), H), t), d),
          k = r.props.optionLabelProp;
        r.isCombobox() && (k = k || "value");
        var x = {
            multiple: "multiple" === b,
            tags: "tags" === b,
            combobox: r.isCombobox()
          },
          E = g && (n["isValidElement"](g) ? n["cloneElement"](g, {
            className: l()(g.props.className, "".concat(S, "-remove-icon"))
          }) : g) || n["createElement"](h["a"], {
            type: "close",
            className: "".concat(S, "-remove-icon")
          }),
          P = M && (n["isValidElement"](M) ? n["cloneElement"](M, {
            className: l()(M.props.className, "".concat(S, "-clear-icon"))
          }) : M) || n["createElement"](h["a"], {
            type: "close-circle",
            theme: "filled",
            className: "".concat(S, "-clear-icon")
          }),
          T = C && (n["isValidElement"](C) ? n["cloneElement"](C, {
            className: l()(C.props.className, "".concat(S, "-selected-icon"))
          }) : C) || n["createElement"](h["a"], {
            type: "check",
            className: "".concat(S, "-selected-icon")
          });
        return n["createElement"](o["c"], v({
          inputIcon: r.renderSuffixIcon(S),
          removeIcon: E,
          clearIcon: P,
          menuItemSelectedIcon: T,
          showArrow: H
        }, V, x, {
          prefixCls: S,
          className: L,
          optionLabelProp: k || "children",
          notFoundContent: r.getNotFoundContent(u),
          getPopupContainer: z || c,
          ref: r.saveSelect
        }));
      }, Object(s["a"])("combobox" !== e.mode, "Select", "The combobox mode is deprecated, it will be removed in next major version, please use AutoComplete instead"), r;
    }
    return b(c, [{
      key: "getNotFoundContent",
      value: function (e) {
        var t = this.props.notFoundContent;
        return void 0 !== t ? t : this.isCombobox() ? null : e("Select");
      }
    }, {
      key: "focus",
      value: function () {
        this.rcSelect.focus();
      }
    }, {
      key: "blur",
      value: function () {
        this.rcSelect.blur();
      }
    }, {
      key: "isCombobox",
      value: function () {
        var e = this.props.mode;
        return "combobox" === e || e === c.SECRET_COMBOBOX_MODE_DO_NOT_USE;
      }
    }, {
      key: "renderSuffixIcon",
      value: function (e) {
        var t = this.props,
          c = t.loading,
          r = t.suffixIcon;
        return r ? n["isValidElement"](r) ? n["cloneElement"](r, {
          className: l()(r.props.className, "".concat(e, "-arrow-icon"))
        }) : r : c ? n["createElement"](h["a"], {
          type: "loading"
        }) : n["createElement"](h["a"], {
          type: "down",
          className: "".concat(e, "-arrow-icon")
        });
      }
    }, {
      key: "render",
      value: function () {
        return n["createElement"](u["a"], null, this.renderSelect);
      }
    }]), c;
  }(n["Component"]);
k.Option = o["b"], k.OptGroup = o["a"], k.SECRET_COMBOBOX_MODE_DO_NOT_USE = "SECRET_COMBOBOX_MODE_DO_NOT_USE", k.defaultProps = {
  showSearch: !1,
  transitionName: "slide-up",
  choiceTransitionName: "zoom"
}, k.propTypes = L;
