let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return L;
});
var n = require("./reactRuntime.js"),
  r = require("./31377839.js"),
  o = require("./58496443.js"),
  l = interopDefault(o),
  a = require("./classNames.js"),
  i = interopDefault(a),
  u = require("./4247522b.js"),
  s = require("./67306d53.js"),
  h = require("../Icon.js"),
  f = require("./48383455.js"),
  v = require("./36436658.js");
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
function d(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
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
var L = function (e) {
  M(c, e);
  var t = H(c);
  function c(e) {
    var r;
    return z(this, c), r = t.call(this, e), r.saveSwitch = function (e) {
      r.rcSwitch = e;
    }, r.renderSwitch = function (e) {
      var t,
        c = e.getPrefixCls,
        o = r.props,
        a = o.prefixCls,
        f = o.size,
        v = o.loading,
        p = o.className,
        z = void 0 === p ? "" : p,
        y = o.disabled,
        b = c("switch", a),
        M = i()(z, (t = {}, d(t, "".concat(b, "-small"), "small" === f), d(t, "".concat(b, "-loading"), v), t)),
        g = v ? n["createElement"](h["a"], {
          type: "loading",
          className: "".concat(b, "-loading-icon")
        }) : null;
      return n["createElement"](s["a"], {
        insertExtraNode: !0
      }, n["createElement"](l.a, m({}, Object(u["a"])(r.props, ["loading"]), {
        prefixCls: b,
        className: M,
        disabled: y || v,
        ref: r.saveSwitch,
        loadingIcon: g
      })));
    }, Object(v["a"])("checked" in e || !("value" in e), "Switch", "`value` is not validate prop, do you mean `checked`?"), r;
  }
  return b(c, [{
    key: "focus",
    value: function () {
      this.rcSwitch.focus();
    }
  }, {
    key: "blur",
    value: function () {
      this.rcSwitch.blur();
    }
  }, {
    key: "render",
    value: function () {
      return n["createElement"](f["a"], null, this.renderSwitch);
    }
  }]), c;
}(n["Component"]);
L.__ANT_SWITCH = !0, L.propTypes = {
  prefixCls: r["string"],
  size: r["oneOf"](["small", "default", "large"]),
  className: r["string"]
};
