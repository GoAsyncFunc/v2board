let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var n = require("./reactRuntime.js"),
  r = require("./propTypesRuntime.js"),
  o = require("./classNames.js"),
  l = interopDefault(o),
  a = require("./reactLifecyclesCompat.js"),
  i = require("./omitProps.js"),
  u = require("../Icon.js"),
  s = require("./48383455.js"),
  h = require("./67306d53.js"),
  f = require("./tuple.js");
function v() {
  return v = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, v.apply(this, arguments);
}
function p(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
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
function z(e, t, c) {
  return t && d(e.prototype, t), c && d(e, c), e;
}
function y(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && b(e, t);
}
function b(e, t) {
  return b = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, b(e, t);
}
function M(e) {
  var t = C();
  return function () {
    var c,
      n = V(e);
    if (t) {
      var r = V(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return g(this, c);
  };
}
function g(e, t) {
  return !t || "object" !== O(t) && "function" !== typeof t ? H(e) : t;
}
function H(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function C() {
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
function O(e) {
  "@babel/helpers - typeof";

  return O = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
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
  L = /^[\u4e00-\u9fa5]{2}$/,
  S = L.test.bind(L);
function k(e) {
  return "string" === typeof e;
}
function E(e, t) {
  if (null != e) {
    var c = t ? " " : "";
    return "string" !== typeof e && "number" !== typeof e && k(e.type) && S(e.props.children) ? n["cloneElement"](e, {}, e.props.children.split("").join(c)) : "string" === typeof e ? (S(e) && (e = e.split("").join(c)), n["createElement"]("span", null, e)) : e;
  }
}
function x(e, t) {
  var c = !1,
    r = [];
  return n["Children"].forEach(e, function (e) {
    var t = O(e),
      n = "string" === t || "number" === t;
    if (c && n) {
      var o = r.length - 1,
        l = r[o];
      r[o] = "".concat(l).concat(e);
    } else r.push(e);
    c = n;
  }), n["Children"].map(r, function (e) {
    return E(e, t);
  });
}
Object(f["a"])("default", "primary", "ghost", "dashed", "danger", "link");
var P = Object(f["a"])("circle", "circle-outline", "round"),
  j = Object(f["a"])("large", "default", "small"),
  T = Object(f["a"])("submit", "button", "reset"),
  F = function (e) {
    y(c, e);
    var t = M(c);
    function c(e) {
      var r;
      return m(this, c), r = t.call(this, e), r.saveButtonRef = function (e) {
        r.buttonNode = e;
      }, r.handleClick = function (e) {
        var t = r.state.loading,
          c = r.props.onClick;
        t || c && c(e);
      }, r.renderButton = function (e) {
        var t,
          c = e.getPrefixCls,
          o = e.autoInsertSpaceInButton,
          a = r.props,
          s = a.prefixCls,
          f = a.type,
          m = a.shape,
          d = a.size,
          z = a.className,
          y = a.children,
          b = a.icon,
          M = a.ghost,
          g = a.block,
          H = w(a, ["prefixCls", "type", "shape", "size", "className", "children", "icon", "ghost", "block"]),
          C = r.state,
          V = C.loading,
          O = C.hasTwoCNChar,
          L = c("btn", s),
          S = !1 !== o,
          k = "";
        switch (d) {
          case "large":
            k = "lg";
            break;
          case "small":
            k = "sm";
            break;
          default:
            break;
        }
        var E = V ? "loading" : b,
          P = l()(L, z, (t = {}, p(t, "".concat(L, "-").concat(f), f), p(t, "".concat(L, "-").concat(m), m), p(t, "".concat(L, "-").concat(k), k), p(t, "".concat(L, "-icon-only"), !y && 0 !== y && E), p(t, "".concat(L, "-loading"), !!V), p(t, "".concat(L, "-background-ghost"), M), p(t, "".concat(L, "-two-chinese-chars"), O && S), p(t, "".concat(L, "-block"), g), t)),
          j = E ? n["createElement"](u["a"], {
            type: E
          }) : null,
          T = y || 0 === y ? x(y, r.isNeedInserted() && S) : null,
          F = Object(i["a"])(H, ["htmlType", "loading"]);
        if (void 0 !== F.href) return n["createElement"]("a", v({}, F, {
          className: P,
          onClick: r.handleClick,
          ref: r.saveButtonRef
        }), j, T);
        var A = H,
          R = A.htmlType,
          _ = w(A, ["htmlType"]),
          N = n["createElement"]("button", v({}, Object(i["a"])(_, ["loading"]), {
            type: R,
            className: P,
            onClick: r.handleClick,
            ref: r.saveButtonRef
          }), j, T);
        return "link" === f ? N : n["createElement"](h["a"], null, N);
      }, r.state = {
        loading: e.loading,
        hasTwoCNChar: !1
      }, r;
    }
    return z(c, [{
      key: "componentDidMount",
      value: function () {
        this.fixTwoCNChar();
      }
    }, {
      key: "componentDidUpdate",
      value: function (e) {
        var t = this;
        this.fixTwoCNChar(), e.loading && "boolean" !== typeof e.loading && clearTimeout(this.delayTimeout);
        var c = this.props.loading;
        c && "boolean" !== typeof c && c.delay ? this.delayTimeout = window.setTimeout(function () {
          t.setState({
            loading: c
          });
        }, c.delay) : e.loading !== c && this.setState({
          loading: c
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        this.delayTimeout && clearTimeout(this.delayTimeout);
      }
    }, {
      key: "fixTwoCNChar",
      value: function () {
        if (this.buttonNode) {
          var e = this.buttonNode.textContent;
          this.isNeedInserted() && S(e) ? this.state.hasTwoCNChar || this.setState({
            hasTwoCNChar: !0
          }) : this.state.hasTwoCNChar && this.setState({
            hasTwoCNChar: !1
          });
        }
      }
    }, {
      key: "isNeedInserted",
      value: function () {
        var e = this.props,
          t = e.icon,
          c = e.children,
          r = e.type;
        return 1 === n["Children"].count(c) && !t && "link" !== r;
      }
    }, {
      key: "render",
      value: function () {
        return n["createElement"](s["a"], null, this.renderButton);
      }
    }]), c;
  }(n["Component"]);
F.__ANT_BUTTON = !0, F.defaultProps = {
  loading: !1,
  ghost: !1,
  block: !1,
  htmlType: "button"
}, F.propTypes = {
  type: r["string"],
  shape: r["oneOf"](P),
  size: r["oneOf"](j),
  htmlType: r["oneOf"](T),
  onClick: r["func"],
  loading: r["oneOfType"]([r["bool"], r["object"]]),
  className: r["string"],
  icon: r["string"],
  block: r["bool"],
  title: r["string"]
}, Object(a["polyfill"])(F);
var A = F;
function R() {
  return R = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, R.apply(this, arguments);
}
function _(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
var N = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  D = function (e) {
    return n["createElement"](s["a"], null, function (t) {
      var c = t.getPrefixCls,
        r = e.prefixCls,
        o = e.size,
        a = e.className,
        i = N(e, ["prefixCls", "size", "className"]),
        u = c("btn-group", r),
        s = "";
      switch (o) {
        case "large":
          s = "lg";
          break;
        case "small":
          s = "sm";
          break;
        default:
          break;
      }
      var h = l()(u, _({}, "".concat(u, "-").concat(s), s), a);
      return n["createElement"]("div", R({}, i, {
        className: h
      }));
    });
  },
  I = D;
A.Group = I;
legacyExports["a"] = A;
