let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return O;
});
var n = require("./71317449.js"),
  r = require("./54535951.js"),
  o = interopDefault(r),
  l = require("./6a666a59.js"),
  a = require("./6d682f6c.js"),
  i = require("../Icon.js"),
  u = require("./322f5270.js"),
  s = require("./48383455.js");
function h(e) {
  "@babel/helpers - typeof";

  return h = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, h(e);
}
function f(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
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
function p(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function m(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function d(e, t, c) {
  return t && m(e.prototype, t), c && m(e, c), e;
}
function z(e, t) {
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
  var t = H();
  return function () {
    var c,
      n = C(e);
    if (t) {
      var r = C(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return M(this, c);
  };
}
function M(e, t) {
  return !t || "object" !== h(t) && "function" !== typeof t ? g(e) : t;
}
function g(e) {
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
function C(e) {
  return C = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, C(e);
}
var V = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  O = function (e) {
    z(c, e);
    var t = b(c);
    function c() {
      var e;
      return p(this, c), e = t.apply(this, arguments), e.saveInput = function (t) {
        e.input = t;
      }, e.onChange = function (t) {
        var c = e.props,
          n = c.onChange,
          r = c.onSearch;
        t && t.target && "click" === t.type && r && r(t.target.value, t), n && n(t);
      }, e.onSearch = function (t) {
        var c = e.props,
          n = c.onSearch,
          r = c.loading,
          o = c.disabled;
        r || o || (n && n(e.input.input.value, t), Object(l["isMobile"])({
          tablet: !0
        }) || e.input.focus());
      }, e.renderLoading = function (t) {
        var c = e.props,
          r = c.enterButton,
          o = c.size;
        return r ? n["createElement"](u["a"], {
          className: "".concat(t, "-button"),
          type: "primary",
          size: o,
          key: "enterButton"
        }, n["createElement"](i["a"], {
          type: "loading"
        })) : n["createElement"](i["a"], {
          className: "".concat(t, "-icon"),
          type: "loading",
          key: "loadingIcon"
        });
      }, e.renderSuffix = function (t) {
        var c = e.props,
          r = c.suffix,
          o = c.enterButton,
          l = c.loading;
        if (l && !o) return [r, e.renderLoading(t)];
        if (o) return r;
        var a = n["createElement"](i["a"], {
          className: "".concat(t, "-icon"),
          type: "search",
          key: "searchIcon",
          onClick: e.onSearch
        });
        return r ? [n["isValidElement"](r) ? n["cloneElement"](r, {
          key: "suffix"
        }) : null, a] : a;
      }, e.renderAddonAfter = function (t) {
        var c,
          r = e.props,
          o = r.enterButton,
          l = r.size,
          a = r.disabled,
          s = r.addonAfter,
          h = r.loading,
          f = "".concat(t, "-button");
        if (h && o) return [e.renderLoading(t), s];
        if (!o) return s;
        var p = o,
          m = p.type && !0 === p.type.__ANT_BUTTON;
        return c = m || "button" === p.type ? n["cloneElement"](p, v({
          onClick: e.onSearch,
          key: "enterButton"
        }, m ? {
          className: f,
          size: l
        } : {})) : n["createElement"](u["a"], {
          className: f,
          type: "primary",
          size: l,
          disabled: a,
          key: "enterButton",
          onClick: e.onSearch
        }, !0 === o ? n["createElement"](i["a"], {
          type: "search"
        }) : o), s ? [c, n["isValidElement"](s) ? n["cloneElement"](s, {
          key: "addonAfter"
        }) : null] : c;
      }, e.renderSearch = function (t) {
        var c = t.getPrefixCls,
          r = e.props,
          l = r.prefixCls,
          i = r.inputPrefixCls,
          u = r.size,
          s = r.enterButton,
          h = r.className,
          p = V(r, ["prefixCls", "inputPrefixCls", "size", "enterButton", "className"]);
        delete p.onSearch, delete p.loading;
        var m,
          d,
          z = c("input-search", l),
          y = c("input", i);
        s ? m = o()(z, h, (d = {}, f(d, "".concat(z, "-enter-button"), !!s), f(d, "".concat(z, "-").concat(u), !!u), d)) : m = o()(z, h);
        return n["createElement"](a["a"], v({
          onPressEnter: e.onSearch
        }, p, {
          size: u,
          prefixCls: y,
          addonAfter: e.renderAddonAfter(z),
          suffix: e.renderSuffix(z),
          onChange: e.onChange,
          ref: e.saveInput,
          className: m
        }));
      }, e;
    }
    return d(c, [{
      key: "focus",
      value: function () {
        this.input.focus();
      }
    }, {
      key: "blur",
      value: function () {
        this.input.blur();
      }
    }, {
      key: "render",
      value: function () {
        return n["createElement"](s["a"], null, this.renderSearch);
      }
    }]), c;
  }(n["Component"]);
O.defaultProps = {
  enterButton: !1
};
