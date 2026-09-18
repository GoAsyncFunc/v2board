let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
var n = require("./reactRuntime.js"),
  r = require("./propTypesRuntime.js"),
  o = require("./classNames.js"),
  a = interopDefault(o),
  l = require("./4247522b.js"),
  i = require("./57394854.js"),
  u = require("./48383455.js"),
  s = require("./4e554263.js"),
  h = require("./71724a35.js"),
  f = require("./2f6b7070.js");
function p(e) {
  if (!n["isValidElement"](e)) return e;
  for (var t = arguments.length, c = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) c[r - 1] = arguments[r];
  return n["cloneElement"].apply(n, [e].concat(c));
}
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
  return !t || "object" !== v(t) && "function" !== typeof t ? H(e) : t;
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
function w() {
  return w = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, w.apply(this, arguments);
}
var S = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  L = function (e) {
    return n["createElement"](u["a"], null, function (t) {
      var c = t.getPrefixCls,
        r = e.prefixCls,
        o = e.className,
        l = e.avatar,
        i = e.title,
        u = e.description,
        s = S(e, ["prefixCls", "className", "avatar", "title", "description"]),
        h = c("list", r),
        f = a()("".concat(h, "-item-meta"), o),
        p = n["createElement"]("div", {
          className: "".concat(h, "-item-meta-content")
        }, i && n["createElement"]("h4", {
          className: "".concat(h, "-item-meta-title")
        }, i), u && n["createElement"]("div", {
          className: "".concat(h, "-item-meta-description")
        }, u));
      return n["createElement"]("div", w({}, s, {
        className: f
      }), l && n["createElement"]("div", {
        className: "".concat(h, "-item-meta-avatar")
      }, l), (i || u) && p);
    });
  };
function k(e, t) {
  return e[t] && Math.floor(24 / e[t]);
}
var x = function (e) {
  z(c, e);
  var t = M(c);
  function c() {
    var e;
    return d(this, c), e = t.apply(this, arguments), e.renderItem = function (t) {
      var c = t.getPrefixCls,
        r = e.context,
        o = r.grid,
        l = r.itemLayout,
        i = e.props,
        u = i.prefixCls,
        s = i.children,
        h = i.actions,
        v = i.extra,
        d = i.className,
        y = S(i, ["prefixCls", "children", "actions", "extra", "className"]),
        b = c("list", u),
        z = h && h.length > 0 && n["createElement"]("ul", {
          className: "".concat(b, "-item-action"),
          key: "actions"
        }, h.map(function (e, t) {
          return n["createElement"]("li", {
            key: "".concat(b, "-item-action-").concat(t)
          }, e, t !== h.length - 1 && n["createElement"]("em", {
            className: "".concat(b, "-item-action-split")
          }));
        })),
        g = o ? "div" : "li",
        M = n["createElement"](g, w({}, y, {
          className: a()("".concat(b, "-item"), d, m({}, "".concat(b, "-item-no-flex"), !e.isFlexMode()))
        }), "vertical" === l && v ? [n["createElement"]("div", {
          className: "".concat(b, "-item-main"),
          key: "content"
        }, s, z), n["createElement"]("div", {
          className: "".concat(b, "-item-extra"),
          key: "extra"
        }, v)] : [s, z, p(v, {
          key: "extra"
        })]);
      return o ? n["createElement"](f["a"], {
        span: k(o, "column"),
        xs: k(o, "xs"),
        sm: k(o, "sm"),
        md: k(o, "md"),
        lg: k(o, "lg"),
        xl: k(o, "xl"),
        xxl: k(o, "xxl")
      }, M) : M;
    }, e;
  }
  return b(c, [{
    key: "isItemContainsTextNodeAndNotSingular",
    value: function () {
      var e,
        t = this.props.children;
      return n["Children"].forEach(t, function (t) {
        "string" === typeof t && (e = !0);
      }), e && n["Children"].count(t) > 1;
    }
  }, {
    key: "isFlexMode",
    value: function () {
      var e = this.props.extra,
        t = this.context.itemLayout;
      return "vertical" === t ? !!e : !this.isItemContainsTextNodeAndNotSingular();
    }
  }, {
    key: "render",
    value: function () {
      return n["createElement"](u["a"], null, this.renderItem);
    }
  }]), c;
}(n["Component"]);
function E(e) {
  "@babel/helpers - typeof";

  return E = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, E(e);
}
function P(e) {
  return R(e) || N(e) || j(e) || T();
}
function T() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function j(e, t) {
  if (e) {
    if ("string" === typeof e) return _(e, t);
    var c = Object.prototype.toString.call(e).slice(8, -1);
    return "Object" === c && e.constructor && (c = e.constructor.name), "Map" === c || "Set" === c ? Array.from(e) : "Arguments" === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c) ? _(e, t) : void 0;
  }
}
function N(e) {
  if ("undefined" !== typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
}
function R(e) {
  if (Array.isArray(e)) return _(e);
}
function _(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var c = 0, n = new Array(t); c < t; c++) n[c] = e[c];
  return n;
}
function A() {
  return A = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, A.apply(this, arguments);
}
function F(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
function I(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function D(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function K(e, t, c) {
  return t && D(e.prototype, t), c && D(e, c), e;
}
function U(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && B(e, t);
}
function B(e, t) {
  return B = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, B(e, t);
}
function q(e) {
  var t = Y();
  return function () {
    var c,
      n = Q(e);
    if (t) {
      var r = Q(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return W(this, c);
  };
}
function W(e, t) {
  return !t || "object" !== E(t) && "function" !== typeof t ? G(e) : t;
}
function G(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Y() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function Q(e) {
  return Q = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, Q(e);
}
x.Meta = L, x.contextTypes = {
  grid: r["any"],
  itemLayout: r["string"]
}, defineExport(legacyExports, "a", function () {
  return Z;
});
var X = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  Z = function (e) {
    U(c, e);
    var t = q(c);
    function c(e) {
      var r;
      I(this, c), r = t.call(this, e), r.defaultPaginationProps = {
        current: 1,
        total: 0
      }, r.keys = {}, r.onPaginationChange = r.triggerPaginationEvent("onChange"), r.onPaginationShowSizeChange = r.triggerPaginationEvent("onShowSizeChange"), r.renderItem = function (e, t) {
        var c,
          n = r.props,
          o = n.renderItem,
          a = n.rowKey;
        return o ? (c = "function" === typeof a ? a(e) : "string" === typeof a ? e[a] : e.key, c || (c = "list-item-".concat(t)), r.keys[t] = c, o(e, t)) : null;
      }, r.renderEmpty = function (e, t) {
        var c = r.props.locale;
        return n["createElement"]("div", {
          className: "".concat(e, "-empty-text")
        }, c && c.emptyText || t("List"));
      }, r.renderList = function (e) {
        var t,
          c = e.getPrefixCls,
          o = e.renderEmpty,
          u = r.state,
          f = u.paginationCurrent,
          p = u.paginationSize,
          v = r.props,
          m = v.prefixCls,
          d = v.bordered,
          y = v.split,
          b = v.className,
          z = v.children,
          g = v.itemLayout,
          M = v.loadMore,
          C = v.pagination,
          H = v.grid,
          O = v.dataSource,
          V = void 0 === O ? [] : O,
          w = v.size,
          S = v.header,
          L = v.footer,
          k = v.loading,
          x = X(v, ["prefixCls", "bordered", "split", "className", "children", "itemLayout", "loadMore", "pagination", "grid", "dataSource", "size", "header", "footer", "loading"]),
          E = c("list", m),
          T = k;
        "boolean" === typeof T && (T = {
          spinning: T
        });
        var j = T && T.spinning,
          N = "";
        switch (w) {
          case "large":
            N = "lg";
            break;
          case "small":
            N = "sm";
            break;
          default:
            break;
        }
        var R = a()(E, b, (t = {}, F(t, "".concat(E, "-vertical"), "vertical" === g), F(t, "".concat(E, "-").concat(N), N), F(t, "".concat(E, "-split"), y), F(t, "".concat(E, "-bordered"), d), F(t, "".concat(E, "-loading"), j), F(t, "".concat(E, "-grid"), H), F(t, "".concat(E, "-something-after-last-item"), r.isSomethingAfterLastItem()), t)),
          _ = A(A(A({}, r.defaultPaginationProps), {
            total: V.length,
            current: f,
            pageSize: p
          }), C || {}),
          I = Math.ceil(_.total / _.pageSize);
        _.current > I && (_.current = I);
        var D,
          K = C ? n["createElement"]("div", {
            className: "".concat(E, "-pagination")
          }, n["createElement"](s["a"], A({}, _, {
            onChange: r.onPaginationChange,
            onShowSizeChange: r.onPaginationShowSizeChange
          }))) : null,
          U = P(V);
        if (C && V.length > (_.current - 1) * _.pageSize && (U = P(V).splice((_.current - 1) * _.pageSize, _.pageSize)), D = j && n["createElement"]("div", {
          style: {
            minHeight: 53
          }
        }), U.length > 0) {
          var B = U.map(function (e, t) {
              return r.renderItem(e, t);
            }),
            q = [];
          n["Children"].forEach(B, function (e, t) {
            q.push(n["cloneElement"](e, {
              key: r.keys[t]
            }));
          }), D = H ? n["createElement"](h["a"], {
            gutter: H.gutter
          }, q) : n["createElement"]("ul", {
            className: "".concat(E, "-items")
          }, q);
        } else z || j || (D = r.renderEmpty(E, o));
        var W = _.position || "bottom";
        return n["createElement"]("div", A({
          className: R
        }, Object(l["a"])(x, ["rowKey", "renderItem", "locale"])), ("top" === W || "both" === W) && K, S && n["createElement"]("div", {
          className: "".concat(E, "-header")
        }, S), n["createElement"](i["a"], T, D, z), L && n["createElement"]("div", {
          className: "".concat(E, "-footer")
        }, L), M || ("bottom" === W || "both" === W) && K);
      };
      var o = e.pagination,
        u = o && "object" === E(o) ? o : {};
      return r.state = {
        paginationCurrent: u.defaultCurrent || 1,
        paginationSize: u.defaultPageSize || 10
      }, r;
    }
    return K(c, [{
      key: "getChildContext",
      value: function () {
        return {
          grid: this.props.grid,
          itemLayout: this.props.itemLayout
        };
      }
    }, {
      key: "triggerPaginationEvent",
      value: function (e) {
        var t = this;
        return function (c, n) {
          var r = t.props.pagination;
          t.setState({
            paginationCurrent: c,
            paginationSize: n
          }), r && r[e] && r[e](c, n);
        };
      }
    }, {
      key: "isSomethingAfterLastItem",
      value: function () {
        var e = this.props,
          t = e.loadMore,
          c = e.pagination,
          n = e.footer;
        return !!(t || c || n);
      }
    }, {
      key: "render",
      value: function () {
        return n["createElement"](u["a"], null, this.renderList);
      }
    }]), c;
  }(n["Component"]);
Z.Item = x, Z.childContextTypes = {
  grid: r["any"],
  itemLayout: r["string"]
}, Z.defaultProps = {
  dataSource: [],
  bordered: !1,
  split: !0,
  loading: !1,
  pagination: !1
};
