let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../app/moduleInterop.js");
var n = require("./modules/71317449.js"),
  r = require("./modules/54535951.js"),
  o = interopDefault(r),
  a = require("./modules/4f707471.js"),
  l = require("./modules/59454956.js"),
  i = interopDefault(l),
  u = require("./modules/51624c5a.js"),
  s = interopDefault(u),
  h = require("./modules/6a6f3659.js"),
  f = interopDefault(h),
  p = require("./modules/69436335.js"),
  v = interopDefault(p),
  m = require("./modules/56376f43.js"),
  d = interopDefault(m),
  y = require("./modules/46597733.js"),
  b = interopDefault(y),
  z = require("./modules/6d526730.js"),
  g = interopDefault(z),
  M = require("./modules/62616333.js"),
  C = {
    primaryColor: "#333",
    secondaryColor: "#E6E6E6"
  },
  H = function (e) {
    function t() {
      return v()(this, t), b()(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
    }
    return g()(t, e), d()(t, [{
      key: "render",
      value: function () {
        var e,
          c = this.props,
          n = c.type,
          r = c.className,
          o = c.onClick,
          a = c.style,
          l = c.primaryColor,
          u = c.secondaryColor,
          h = f()(c, ["type", "className", "onClick", "style", "primaryColor", "secondaryColor"]),
          p = void 0,
          v = C;
        if (l && (v = {
          primaryColor: l,
          secondaryColor: u || Object(M["c"])(l)
        }), Object(M["d"])(n)) p = n;else if ("string" === typeof n && (p = t.get(n, v), !p)) return null;
        return p ? (p && "function" === typeof p.icon && (p = s()({}, p, {
          icon: p.icon(v.primaryColor, v.secondaryColor)
        })), Object(M["b"])(p.icon, "svg-" + p.name, s()((e = {
          className: r,
          onClick: o,
          style: a
        }, i()(e, "data-icon", p.name), i()(e, "width", "1em"), i()(e, "height", "1em"), i()(e, "fill", "currentColor"), i()(e, "aria-hidden", "true"), i()(e, "focusable", "false"), e), h))) : (Object(M["e"])("type should be string or icon definiton, but got " + n), null);
      }
    }], [{
      key: "add",
      value: function () {
        for (var e = this, t = arguments.length, c = Array(t), n = 0; n < t; n++) c[n] = arguments[n];
        c.forEach(function (t) {
          e.definitions.set(Object(M["f"])(t.name, t.theme), t);
        });
      }
    }, {
      key: "clear",
      value: function () {
        this.definitions.clear();
      }
    }, {
      key: "get",
      value: function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : C;
        if (e) {
          var c = this.definitions.get(e);
          return c && "function" === typeof c.icon && (c = s()({}, c, {
            icon: c.icon(t.primaryColor, t.secondaryColor)
          })), c;
        }
      }
    }, {
      key: "setTwoToneColors",
      value: function (e) {
        var t = e.primaryColor,
          c = e.secondaryColor;
        C.primaryColor = t, C.secondaryColor = c || Object(M["c"])(t);
      }
    }, {
      key: "getTwoToneColors",
      value: function () {
        return s()({}, C);
      }
    }]), t;
  }(n["Component"]);
H.displayName = "IconReact", H.definitions = new M["a"]();
var O = H;
function V() {
  return V = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, V.apply(this, arguments);
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
  S = new Set();
function L() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    t = e.scriptUrl,
    c = e.extraCommonProps,
    r = void 0 === c ? {} : c;
  if ("undefined" !== typeof document && "undefined" !== typeof window && "function" === typeof document.createElement && "string" === typeof t && t.length && !S.has(t)) {
    var o = document.createElement("script");
    o.setAttribute("src", t), o.setAttribute("data-namespace", t), S.add(t), document.body.appendChild(o);
  }
  var a = function (e) {
    var t = e.type,
      c = e.children,
      o = w(e, ["type", "children"]),
      a = null;
    return e.type && (a = n["createElement"]("use", {
      xlinkHref: "#".concat(t)
    })), c && (a = c), n["createElement"]($, V({}, r, o), a);
  };
  return a.displayName = "Iconfont", a;
}
var k = require("./modules/36436658.js"),
  x = {
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": !0,
    focusable: "false"
  },
  E = /-fill$/,
  P = /-o$/,
  T = /-twotone$/;
function j(e) {
  var t = null;
  return E.test(e) ? t = "filled" : P.test(e) ? t = "outlined" : T.test(e) && (t = "twoTone"), t;
}
function N(e) {
  return e.replace(E, "").replace(P, "").replace(T, "");
}
function R(e, t) {
  var c = e;
  return "filled" === t ? c += "-fill" : "outlined" === t ? c += "-o" : "twoTone" === t ? c += "-twotone" : Object(k["a"])(!1, "Icon", "This icon '".concat(e, "' has unknown theme '").concat(t, "'")), c;
}
function _(e) {
  var t = e;
  switch (e) {
    case "cross":
      t = "close";
      break;
    case "interation":
      t = "interaction";
      break;
    case "canlendar":
      t = "calendar";
      break;
    case "colum-height":
      t = "column-height";
      break;
    default:
  }
  return Object(k["a"])(t === e, "Icon", "Icon '".concat(e, "' was a typo and is now deprecated, please use '").concat(t, "' instead.")), t;
}
var A = require("./modules/594d6e48.js");
function F(e) {
  return O.setTwoToneColors({
    primaryColor: e
  });
}
function I() {
  var e = O.getTwoToneColors();
  return e.primaryColor;
}
function D() {
  return D = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, D.apply(this, arguments);
}
function K(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
function U(e) {
  return G(e) || W(e) || q(e) || B();
}
function B() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function q(e, t) {
  if (e) {
    if ("string" === typeof e) return Y(e, t);
    var c = Object.prototype.toString.call(e).slice(8, -1);
    return "Object" === c && e.constructor && (c = e.constructor.name), "Map" === c || "Set" === c ? Array.from(e) : "Arguments" === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c) ? Y(e, t) : void 0;
  }
}
function W(e) {
  if ("undefined" !== typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
}
function G(e) {
  if (Array.isArray(e)) return Y(e);
}
function Y(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var c = 0, n = new Array(t); c < t; c++) n[c] = e[c];
  return n;
}
var Q = function (e, t) {
  var c = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
  if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
    var r = 0;
    for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
  }
  return c;
};
O.add.apply(O, U(Object.keys(a).map(function (e) {
  return a[e];
}))), F("#1890ff");
var X,
  Z = "outlined";
var J = function (e) {
  var t,
    c = e.className,
    r = e.type,
    a = e.component,
    l = e.viewBox,
    i = e.spin,
    u = e.rotate,
    s = e.tabIndex,
    h = e.onClick,
    f = e.children,
    p = e.theme,
    v = e.twoToneColor,
    m = Q(e, ["className", "type", "component", "viewBox", "spin", "rotate", "tabIndex", "onClick", "children", "theme", "twoToneColor"]);
  Object(k["a"])(Boolean(r || a || f), "Icon", "Should have `type` prop or `component` prop or `children`.");
  var d = o()((t = {}, K(t, "anticon", !0), K(t, "anticon-".concat(r), Boolean(r)), t), c),
    y = o()(K({}, "anticon-spin", !!i || "loading" === r)),
    b = u ? {
      msTransform: "rotate(".concat(u, "deg)"),
      transform: "rotate(".concat(u, "deg)")
    } : void 0,
    z = D(D({}, x), {
      className: y,
      style: b,
      viewBox: l
    });
  l || delete z.viewBox;
  var g = function () {
      if (a) return n["createElement"](a, z, f);
      if (f) return Object(k["a"])(Boolean(l) || 1 === n["Children"].count(f) && n["isValidElement"](f) && "use" === n["Children"].only(f).type, "Icon", "Make sure that you provide correct `viewBox` prop (default `0 0 1024 1024`) to the icon."), n["createElement"]("svg", D({}, z, {
        viewBox: l
      }), f);
      if ("string" === typeof r) {
        var e = r;
        if (p) {
          var t = j(r);
          Object(k["a"])(!t || p === t, "Icon", "The icon name '".concat(r, "' already specify a theme '").concat(t, "',") + " the 'theme' prop '".concat(p, "' will be ignored."));
        }
        return e = R(N(_(e)), X || p || Z), n["createElement"](O, {
          className: y,
          type: e,
          primaryColor: v,
          style: b
        });
      }
    },
    M = s;
  return void 0 === M && h && (M = -1), n["createElement"](A["a"], {
    componentName: "Icon"
  }, function (e) {
    return n["createElement"]("i", D({
      "aria-label": r && "".concat(e.icon, ": ").concat(r)
    }, m, {
      tabIndex: M,
      onClick: h,
      className: d
    }), g());
  });
};
J.createFromIconfontCN = L, J.getTwoToneColor = I, J.setTwoToneColor = F;
var $ = legacyExports["a"] = J;
