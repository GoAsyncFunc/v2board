let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../app/moduleInterop.js");
var n = require("./modules/71317449.js"),
  r = require("./modules/54535951.js"),
  o = interopDefault(r),
  l = require("./modules/4f707471.js"),
  a = require("./modules/59454956.js"),
  i = interopDefault(a),
  u = require("./modules/51624c5a.js"),
  s = interopDefault(u),
  h = require("./modules/6a6f3659.js"),
  f = interopDefault(h),
  v = require("./modules/69436335.js"),
  p = interopDefault(v),
  m = require("./modules/56376f43.js"),
  d = interopDefault(m),
  z = require("./modules/46597733.js"),
  y = interopDefault(z),
  b = require("./modules/6d526730.js"),
  M = interopDefault(b),
  g = require("./modules/62616333.js"),
  H = {
    primaryColor: "#333",
    secondaryColor: "#E6E6E6"
  },
  C = function (e) {
    function t() {
      return p()(this, t), y()(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
    }
    return M()(t, e), d()(t, [{
      key: "render",
      value: function () {
        var e,
          c = this.props,
          n = c.type,
          r = c.className,
          o = c.onClick,
          l = c.style,
          a = c.primaryColor,
          u = c.secondaryColor,
          h = f()(c, ["type", "className", "onClick", "style", "primaryColor", "secondaryColor"]),
          v = void 0,
          p = H;
        if (a && (p = {
          primaryColor: a,
          secondaryColor: u || Object(g["c"])(a)
        }), Object(g["d"])(n)) v = n;else if ("string" === typeof n && (v = t.get(n, p), !v)) return null;
        return v ? (v && "function" === typeof v.icon && (v = s()({}, v, {
          icon: v.icon(p.primaryColor, p.secondaryColor)
        })), Object(g["b"])(v.icon, "svg-" + v.name, s()((e = {
          className: r,
          onClick: o,
          style: l
        }, i()(e, "data-icon", v.name), i()(e, "width", "1em"), i()(e, "height", "1em"), i()(e, "fill", "currentColor"), i()(e, "aria-hidden", "true"), i()(e, "focusable", "false"), e), h))) : (Object(g["e"])("type should be string or icon definiton, but got " + n), null);
      }
    }], [{
      key: "add",
      value: function () {
        for (var e = this, t = arguments.length, c = Array(t), n = 0; n < t; n++) c[n] = arguments[n];
        c.forEach(function (t) {
          e.definitions.set(Object(g["f"])(t.name, t.theme), t);
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
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : H;
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
        H.primaryColor = t, H.secondaryColor = c || Object(g["c"])(t);
      }
    }, {
      key: "getTwoToneColors",
      value: function () {
        return s()({}, H);
      }
    }]), t;
  }(n["Component"]);
C.displayName = "IconReact", C.definitions = new g["a"]();
var V = C;
function O() {
  return O = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, O.apply(this, arguments);
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
  L = new Set();
function S() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    t = e.scriptUrl,
    c = e.extraCommonProps,
    r = void 0 === c ? {} : c;
  if ("undefined" !== typeof document && "undefined" !== typeof window && "function" === typeof document.createElement && "string" === typeof t && t.length && !L.has(t)) {
    var o = document.createElement("script");
    o.setAttribute("src", t), o.setAttribute("data-namespace", t), L.add(t), document.body.appendChild(o);
  }
  var l = function (e) {
    var t = e.type,
      c = e.children,
      o = w(e, ["type", "children"]),
      l = null;
    return e.type && (l = n["createElement"]("use", {
      xlinkHref: "#".concat(t)
    })), c && (l = c), n["createElement"]($, O({}, r, o), l);
  };
  return l.displayName = "Iconfont", l;
}
var k = require("./modules/36436658.js"),
  E = {
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": !0,
    focusable: "false"
  },
  x = /-fill$/,
  P = /-o$/,
  j = /-twotone$/;
function T(e) {
  var t = null;
  return x.test(e) ? t = "filled" : P.test(e) ? t = "outlined" : j.test(e) && (t = "twoTone"), t;
}
function F(e) {
  return e.replace(x, "").replace(P, "").replace(j, "");
}
function A(e, t) {
  var c = e;
  return "filled" === t ? c += "-fill" : "outlined" === t ? c += "-o" : "twoTone" === t ? c += "-twotone" : Object(k["a"])(!1, "Icon", "This icon '".concat(e, "' has unknown theme '").concat(t, "'")), c;
}
function R(e) {
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
var _ = require("./modules/594d6e48.js");
function N(e) {
  return V.setTwoToneColors({
    primaryColor: e
  });
}
function D() {
  var e = V.getTwoToneColors();
  return e.primaryColor;
}
function I() {
  return I = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, I.apply(this, arguments);
}
function B(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
function q(e) {
  return G(e) || U(e) || K(e) || W();
}
function W() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function K(e, t) {
  if (e) {
    if ("string" === typeof e) return Q(e, t);
    var c = Object.prototype.toString.call(e).slice(8, -1);
    return "Object" === c && e.constructor && (c = e.constructor.name), "Map" === c || "Set" === c ? Array.from(e) : "Arguments" === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c) ? Q(e, t) : void 0;
  }
}
function U(e) {
  if ("undefined" !== typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
}
function G(e) {
  if (Array.isArray(e)) return Q(e);
}
function Q(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var c = 0, n = new Array(t); c < t; c++) n[c] = e[c];
  return n;
}
var Y = function (e, t) {
  var c = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (c[n] = e[n]);
  if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
    var r = 0;
    for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (c[n[r]] = e[n[r]]);
  }
  return c;
};
V.add.apply(V, q(Object.keys(l).map(function (e) {
  return l[e];
}))), N("#1890ff");
var X,
  Z = "outlined";
var J = function (e) {
  var t,
    c = e.className,
    r = e.type,
    l = e.component,
    a = e.viewBox,
    i = e.spin,
    u = e.rotate,
    s = e.tabIndex,
    h = e.onClick,
    f = e.children,
    v = e.theme,
    p = e.twoToneColor,
    m = Y(e, ["className", "type", "component", "viewBox", "spin", "rotate", "tabIndex", "onClick", "children", "theme", "twoToneColor"]);
  Object(k["a"])(Boolean(r || l || f), "Icon", "Should have `type` prop or `component` prop or `children`.");
  var d = o()((t = {}, B(t, "anticon", !0), B(t, "anticon-".concat(r), Boolean(r)), t), c),
    z = o()(B({}, "anticon-spin", !!i || "loading" === r)),
    y = u ? {
      msTransform: "rotate(".concat(u, "deg)"),
      transform: "rotate(".concat(u, "deg)")
    } : void 0,
    b = I(I({}, E), {
      className: z,
      style: y,
      viewBox: a
    });
  a || delete b.viewBox;
  var M = function () {
      if (l) return n["createElement"](l, b, f);
      if (f) return Object(k["a"])(Boolean(a) || 1 === n["Children"].count(f) && n["isValidElement"](f) && "use" === n["Children"].only(f).type, "Icon", "Make sure that you provide correct `viewBox` prop (default `0 0 1024 1024`) to the icon."), n["createElement"]("svg", I({}, b, {
        viewBox: a
      }), f);
      if ("string" === typeof r) {
        var e = r;
        if (v) {
          var t = T(r);
          Object(k["a"])(!t || v === t, "Icon", "The icon name '".concat(r, "' already specify a theme '").concat(t, "',") + " the 'theme' prop '".concat(v, "' will be ignored."));
        }
        return e = A(F(R(e)), X || v || Z), n["createElement"](V, {
          className: z,
          type: e,
          primaryColor: p,
          style: y
        });
      }
    },
    g = s;
  return void 0 === g && h && (g = -1), n["createElement"](_["a"], {
    componentName: "Icon"
  }, function (e) {
    return n["createElement"]("i", I({
      "aria-label": r && "".concat(e.icon, ": ").concat(r)
    }, m, {
      tabIndex: g,
      onClick: h,
      className: d
    }), M());
  });
};
J.createFromIconfontCN = S, J.getTwoToneColor = D, J.setTwoToneColor = N;
var $ = legacyExports["a"] = J;
