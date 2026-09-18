let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return S;
});
var n = require("./reactRuntime.js"),
  r = require("./propTypesRuntime.js"),
  o = require("./rcSwitchEntry.js"),
  a = interopDefault(o),
  l = require("./classNames.js"),
  i = interopDefault(l),
  u = require("./4247522b.js"),
  s = require("./67306d53.js"),
  h = require("../Icon.js"),
  f = require("./48383455.js"),
  p = require("./36436658.js");
function v(e) {
  "@babel/helpers - typeof";

  return v = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, v(e);
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
var S = function (e) {
  g(c, e);
  var t = C(c);
  function c(e) {
    var r;
    return y(this, c), r = t.call(this, e), r.saveSwitch = function (e) {
      r.rcSwitch = e;
    }, r.renderSwitch = function (e) {
      var t,
        c = e.getPrefixCls,
        o = r.props,
        l = o.prefixCls,
        f = o.size,
        p = o.loading,
        v = o.className,
        y = void 0 === v ? "" : v,
        b = o.disabled,
        z = c("switch", l),
        g = i()(y, (t = {}, d(t, "".concat(z, "-small"), "small" === f), d(t, "".concat(z, "-loading"), p), t)),
        M = p ? n["createElement"](h["a"], {
          type: "loading",
          className: "".concat(z, "-loading-icon")
        }) : null;
      return n["createElement"](s["a"], {
        insertExtraNode: !0
      }, n["createElement"](a.a, m({}, Object(u["a"])(r.props, ["loading"]), {
        prefixCls: z,
        className: g,
        disabled: b || p,
        ref: r.saveSwitch,
        loadingIcon: M
      })));
    }, Object(p["a"])("checked" in e || !("value" in e), "Switch", "`value` is not validate prop, do you mean `checked`?"), r;
  }
  return z(c, [{
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
S.__ANT_SWITCH = !0, S.propTypes = {
  prefixCls: r["string"],
  size: r["oneOf"](["small", "default", "large"]),
  className: r["string"]
};
