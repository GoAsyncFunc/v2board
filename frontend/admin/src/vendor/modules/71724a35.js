let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
var n,
  r = require("./reactRuntime.js"),
  o = require("./classNames.js"),
  a = interopDefault(o),
  l = require("./31377839.js"),
  i = require("./48383455.js"),
  u = require("./6f2f322b.js"),
  s = require("./43575167.js");
function h(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
function f() {
  return f = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, f.apply(this, arguments);
}
if ("undefined" !== typeof window) {
  var p = function (e) {
    return {
      media: e,
      matches: !1,
      addListener: function () {},
      removeListener: function () {}
    };
  };
  window.matchMedia || (window.matchMedia = p), n = require("./6a705862.js");
}
var v = ["xxl", "xl", "lg", "md", "sm", "xs"],
  m = {
    xs: "(max-width: 575px)",
    sm: "(min-width: 576px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 992px)",
    xl: "(min-width: 1200px)",
    xxl: "(min-width: 1600px)"
  },
  d = [],
  y = -1,
  b = {},
  z = {
    dispatch: function (e) {
      return b = e, !(d.length < 1) && (d.forEach(function (e) {
        e.func(b);
      }), !0);
    },
    subscribe: function (e) {
      0 === d.length && this.register();
      var t = (++y).toString();
      return d.push({
        token: t,
        func: e
      }), e(b), t;
    },
    unsubscribe: function (e) {
      d = d.filter(function (t) {
        return t.token !== e;
      }), 0 === d.length && this.unregister();
    },
    unregister: function () {
      Object.keys(m).map(function (e) {
        return n.unregister(m[e]);
      });
    },
    register: function () {
      var e = this;
      Object.keys(m).map(function (t) {
        return n.register(m[t], {
          match: function () {
            var c = f(f({}, b), h({}, t, !0));
            e.dispatch(c);
          },
          unmatch: function () {
            var c = f(f({}, b), h({}, t, !1));
            e.dispatch(c);
          },
          destroy: function () {}
        });
      });
    }
  },
  g = z;
function M(e) {
  "@babel/helpers - typeof";

  return M = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, M(e);
}
function C() {
  return C = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, C.apply(this, arguments);
}
function H(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
function O(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function V(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function w(e, t, c) {
  return t && V(e.prototype, t), c && V(e, c), e;
}
function S(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && L(e, t);
}
function L(e, t) {
  return L = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, L(e, t);
}
function k(e) {
  var t = P();
  return function () {
    var c,
      n = T(e);
    if (t) {
      var r = T(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return x(this, c);
  };
}
function x(e, t) {
  return !t || "object" !== M(t) && "function" !== typeof t ? E(e) : t;
}
function E(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function P() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function T(e) {
  return T = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, T(e);
}
defineExport(legacyExports, "a", function () {
  return _;
});
var j = function (e, t) {
    var c = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
    if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
      var r = 0;
      for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
    }
    return c;
  },
  N = Object(s["a"])("top", "middle", "bottom", "stretch"),
  R = Object(s["a"])("start", "end", "center", "space-around", "space-between"),
  _ = function (e) {
    S(c, e);
    var t = k(c);
    function c() {
      var e;
      return O(this, c), e = t.apply(this, arguments), e.state = {
        screens: {}
      }, e.renderRow = function (t) {
        var c,
          n = t.getPrefixCls,
          o = e.props,
          l = o.prefixCls,
          i = o.type,
          s = o.justify,
          h = o.align,
          f = o.className,
          p = o.style,
          v = o.children,
          m = j(o, ["prefixCls", "type", "justify", "align", "className", "style", "children"]),
          d = n("row", l),
          y = e.getGutter(),
          b = a()((c = {}, H(c, d, !i), H(c, "".concat(d, "-").concat(i), i), H(c, "".concat(d, "-").concat(i, "-").concat(s), i && s), H(c, "".concat(d, "-").concat(i, "-").concat(h), i && h), c), f),
          z = C(C(C({}, y[0] > 0 ? {
            marginLeft: y[0] / -2,
            marginRight: y[0] / -2
          } : {}), y[1] > 0 ? {
            marginTop: y[1] / -2,
            marginBottom: y[1] / -2
          } : {}), p),
          g = C({}, m);
        return delete g.gutter, r["createElement"](u["a"].Provider, {
          value: {
            gutter: y
          }
        }, r["createElement"]("div", C({}, g, {
          className: b,
          style: z
        }), v));
      }, e;
    }
    return w(c, [{
      key: "componentDidMount",
      value: function () {
        var e = this;
        this.token = g.subscribe(function (t) {
          var c = e.props.gutter;
          ("object" === M(c) || Array.isArray(c) && ("object" === M(c[0]) || "object" === M(c[1]))) && e.setState({
            screens: t
          });
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        g.unsubscribe(this.token);
      }
    }, {
      key: "getGutter",
      value: function () {
        var e = [0, 0],
          t = this.props.gutter,
          c = this.state.screens,
          n = Array.isArray(t) ? t : [t, 0];
        return n.forEach(function (t, n) {
          if ("object" === M(t)) for (var r = 0; r < v.length; r++) {
            var o = v[r];
            if (c[o] && void 0 !== t[o]) {
              e[n] = t[o];
              break;
            }
          } else e[n] = t || 0;
        }), e;
      }
    }, {
      key: "render",
      value: function () {
        return r["createElement"](i["a"], null, this.renderRow);
      }
    }]), c;
  }(r["Component"]);
_.defaultProps = {
  gutter: 0
}, _.propTypes = {
  type: l["oneOf"](["flex"]),
  align: l["oneOf"](N),
  justify: l["oneOf"](R),
  className: l["string"],
  children: l["node"],
  gutter: l["oneOfType"]([l["object"], l["number"], l["array"]]),
  prefixCls: l["string"]
};
