let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var n = require("./71317449.js"),
  r = require("./31377839.js"),
  o = require("./54535951.js"),
  a = interopDefault(o),
  l = require("./56434c38.js"),
  i = require("./4247522b.js"),
  u = require("../Icon.js"),
  s = require("./48383455.js"),
  h = require("./67306d53.js"),
  f = require("./43575167.js");
function p() {
  return p = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, p.apply(this, arguments);
}
function v(e, t, c) {
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
  return !t || "object" !== V(t) && "function" !== typeof t ? C(e) : t;
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
function V(e) {
  "@babel/helpers - typeof";

  return V = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
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
  S = /^[\u4e00-\u9fa5]{2}$/,
  L = S.test.bind(S);
function k(e) {
  return "string" === typeof e;
}
function x(e, t) {
  if (null != e) {
    var c = t ? " " : "";
    return "string" !== typeof e && "number" !== typeof e && k(e.type) && L(e.props.children) ? n["cloneElement"](e, {}, e.props.children.split("").join(c)) : "string" === typeof e ? (L(e) && (e = e.split("").join(c)), n["createElement"]("span", null, e)) : e;
  }
}
function E(e, t) {
  var c = !1,
    r = [];
  return n["Children"].forEach(e, function (e) {
    var t = V(e),
      n = "string" === t || "number" === t;
    if (c && n) {
      var o = r.length - 1,
        a = r[o];
      r[o] = "".concat(a).concat(e);
    } else r.push(e);
    c = n;
  }), n["Children"].map(r, function (e) {
    return x(e, t);
  });
}
Object(f["a"])("default", "primary", "ghost", "dashed", "danger", "link");
var P = Object(f["a"])("circle", "circle-outline", "round"),
  T = Object(f["a"])("large", "default", "small"),
  j = Object(f["a"])("submit", "button", "reset"),
  N = function (e) {
    b(c, e);
    var t = g(c);
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
          l = r.props,
          s = l.prefixCls,
          f = l.type,
          m = l.shape,
          d = l.size,
          y = l.className,
          b = l.children,
          z = l.icon,
          g = l.ghost,
          M = l.block,
          C = w(l, ["prefixCls", "type", "shape", "size", "className", "children", "icon", "ghost", "block"]),
          H = r.state,
          O = H.loading,
          V = H.hasTwoCNChar,
          S = c("btn", s),
          L = !1 !== o,
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
        var x = O ? "loading" : z,
          P = a()(S, y, (t = {}, v(t, "".concat(S, "-").concat(f), f), v(t, "".concat(S, "-").concat(m), m), v(t, "".concat(S, "-").concat(k), k), v(t, "".concat(S, "-icon-only"), !b && 0 !== b && x), v(t, "".concat(S, "-loading"), !!O), v(t, "".concat(S, "-background-ghost"), g), v(t, "".concat(S, "-two-chinese-chars"), V && L), v(t, "".concat(S, "-block"), M), t)),
          T = x ? n["createElement"](u["a"], {
            type: x
          }) : null,
          j = b || 0 === b ? E(b, r.isNeedInserted() && L) : null,
          N = Object(i["a"])(C, ["htmlType", "loading"]);
        if (void 0 !== N.href) return n["createElement"]("a", p({}, N, {
          className: P,
          onClick: r.handleClick,
          ref: r.saveButtonRef
        }), T, j);
        var R = C,
          _ = R.htmlType,
          A = w(R, ["htmlType"]),
          F = n["createElement"]("button", p({}, Object(i["a"])(A, ["loading"]), {
            type: _,
            className: P,
            onClick: r.handleClick,
            ref: r.saveButtonRef
          }), T, j);
        return "link" === f ? F : n["createElement"](h["a"], null, F);
      }, r.state = {
        loading: e.loading,
        hasTwoCNChar: !1
      }, r;
    }
    return y(c, [{
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
          this.isNeedInserted() && L(e) ? this.state.hasTwoCNChar || this.setState({
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
N.__ANT_BUTTON = !0, N.defaultProps = {
  loading: !1,
  ghost: !1,
  block: !1,
  htmlType: "button"
}, N.propTypes = {
  type: r["string"],
  shape: r["oneOf"](P),
  size: r["oneOf"](T),
  htmlType: r["oneOf"](j),
  onClick: r["func"],
  loading: r["oneOfType"]([r["bool"], r["object"]]),
  className: r["string"],
  icon: r["string"],
  block: r["bool"],
  title: r["string"]
}, Object(l["polyfill"])(N);
var R = N,
  _ = require("./79694f36.js");
R.Group = _["a"];
legacyExports["a"] = R;
