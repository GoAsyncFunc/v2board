let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var n = require("./71317449.js"),
  r = require("./56434c38.js"),
  o = require("./4f4c4553.js"),
  a = require("./54535951.js"),
  l = interopDefault(a),
  i = require("./37697874.js");
function u() {
  return u = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, u.apply(this, arguments);
}
var s = {
    adjustX: 1,
    adjustY: 1
  },
  h = {
    adjustX: 0,
    adjustY: 0
  },
  f = [0, 0];
function p(e) {
  return "boolean" === typeof e ? e ? s : h : u(u({}, h), e);
}
function v() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    t = e.arrowWidth,
    c = void 0 === t ? 5 : t,
    n = e.horizontalArrowShift,
    r = void 0 === n ? 16 : n,
    o = e.verticalArrowShift,
    a = void 0 === o ? 12 : o,
    l = e.autoAdjustOverflow,
    s = void 0 === l || l,
    h = {
      left: {
        points: ["cr", "cl"],
        offset: [-4, 0]
      },
      right: {
        points: ["cl", "cr"],
        offset: [4, 0]
      },
      top: {
        points: ["bc", "tc"],
        offset: [0, -4]
      },
      bottom: {
        points: ["tc", "bc"],
        offset: [0, 4]
      },
      topLeft: {
        points: ["bl", "tc"],
        offset: [-(r + c), -4]
      },
      leftTop: {
        points: ["tr", "cl"],
        offset: [-4, -(a + c)]
      },
      topRight: {
        points: ["br", "tc"],
        offset: [r + c, -4]
      },
      rightTop: {
        points: ["tl", "cr"],
        offset: [4, -(a + c)]
      },
      bottomRight: {
        points: ["tr", "bc"],
        offset: [r + c, 4]
      },
      rightBottom: {
        points: ["bl", "cr"],
        offset: [4, a + c]
      },
      bottomLeft: {
        points: ["tl", "bc"],
        offset: [-(r + c), 4]
      },
      leftBottom: {
        points: ["br", "cl"],
        offset: [-4, a + c]
      }
    };
  return Object.keys(h).forEach(function (t) {
    h[t] = e.arrowPointAtCenter ? u(u({}, h[t]), {
      overflow: p(s),
      targetOffset: f
    }) : u(u({}, i["a"][t]), {
      overflow: p(s)
    }), h[t].ignoreShake = !0;
  }), h;
}
var m = require("./48383455.js");
function d(e) {
  "@babel/helpers - typeof";

  return d = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, d(e);
}
function y(e, t, c) {
  return t in e ? Object.defineProperty(e, t, {
    value: c,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = c, e;
}
function b(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function z(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function g(e, t, c) {
  return t && z(e.prototype, t), c && z(e, c), e;
}
function M(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && C(e, t);
}
function C(e, t) {
  return C = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, C(e, t);
}
function H(e) {
  var t = w();
  return function () {
    var c,
      n = S(e);
    if (t) {
      var r = S(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return O(this, c);
  };
}
function O(e, t) {
  return !t || "object" !== d(t) && "function" !== typeof t ? V(e) : t;
}
function V(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function w() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function S(e) {
  return S = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, S(e);
}
function L() {
  return L = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, L.apply(this, arguments);
}
var k = function (e, t) {
  var c = {},
    n = L({}, e);
  return t.forEach(function (t) {
    e && t in e && (c[t] = e[t], delete n[t]);
  }), {
    picked: c,
    omitted: n
  };
};
function x(e) {
  var t = e.type;
  if ((!0 === t.__ANT_BUTTON || !0 === t.__ANT_SWITCH || !0 === t.__ANT_CHECKBOX || "button" === e.type) && e.props.disabled) {
    var c = k(e.props.style, ["position", "left", "right", "top", "bottom", "float", "display", "zIndex"]),
      r = c.picked,
      o = c.omitted,
      a = L(L({
        display: "inline-block"
      }, r), {
        cursor: "not-allowed",
        width: e.props.block ? "100%" : null
      }),
      l = L(L({}, o), {
        pointerEvents: "none"
      }),
      i = n["cloneElement"](e, {
        style: l,
        className: null
      });
    return n["createElement"]("span", {
      style: a,
      className: e.props.className
    }, i);
  }
  return e;
}
var E = function (e) {
  M(c, e);
  var t = H(c);
  function c(e) {
    var r;
    return b(this, c), r = t.call(this, e), r.onVisibleChange = function (e) {
      var t = r.props.onVisibleChange;
      "visible" in r.props || r.setState({
        visible: !r.isNoTitle() && e
      }), t && !r.isNoTitle() && t(e);
    }, r.saveTooltip = function (e) {
      r.tooltip = e;
    }, r.onPopupAlign = function (e, t) {
      var c = r.getPlacements(),
        n = Object.keys(c).filter(function (e) {
          return c[e].points[0] === t.points[0] && c[e].points[1] === t.points[1];
        })[0];
      if (n) {
        var o = e.getBoundingClientRect(),
          a = {
            top: "50%",
            left: "50%"
          };
        n.indexOf("top") >= 0 || n.indexOf("Bottom") >= 0 ? a.top = "".concat(o.height - t.offset[1], "px") : (n.indexOf("Top") >= 0 || n.indexOf("bottom") >= 0) && (a.top = "".concat(-t.offset[1], "px")), n.indexOf("left") >= 0 || n.indexOf("Right") >= 0 ? a.left = "".concat(o.width - t.offset[0], "px") : (n.indexOf("right") >= 0 || n.indexOf("Left") >= 0) && (a.left = "".concat(-t.offset[0], "px")), e.style.transformOrigin = "".concat(a.left, " ").concat(a.top);
      }
    }, r.renderTooltip = function (e) {
      var t = e.getPopupContainer,
        c = e.getPrefixCls,
        a = V(r),
        i = a.props,
        u = a.state,
        s = i.prefixCls,
        h = i.openClassName,
        f = i.getPopupContainer,
        p = i.getTooltipContainer,
        v = i.children,
        m = c("tooltip", s),
        d = u.visible;
      "visible" in i || !r.isNoTitle() || (d = !1);
      var b = x(n["isValidElement"](v) ? v : n["createElement"]("span", null, v)),
        z = b.props,
        g = l()(z.className, y({}, h || "".concat(m, "-open"), !0));
      return n["createElement"](o["a"], L({}, r.props, {
        prefixCls: m,
        getTooltipContainer: f || p || t,
        ref: r.saveTooltip,
        builtinPlacements: r.getPlacements(),
        overlay: r.getOverlay(),
        visible: d,
        onVisibleChange: r.onVisibleChange,
        onPopupAlign: r.onPopupAlign
      }), d ? n["cloneElement"](b, {
        className: g
      }) : b);
    }, r.state = {
      visible: !!e.visible || !!e.defaultVisible
    }, r;
  }
  return g(c, [{
    key: "getPopupDomNode",
    value: function () {
      return this.tooltip.getPopupDomNode();
    }
  }, {
    key: "getPlacements",
    value: function () {
      var e = this.props,
        t = e.builtinPlacements,
        c = e.arrowPointAtCenter,
        n = e.autoAdjustOverflow;
      return t || v({
        arrowPointAtCenter: c,
        verticalArrowShift: 8,
        autoAdjustOverflow: n
      });
    }
  }, {
    key: "isNoTitle",
    value: function () {
      var e = this.props,
        t = e.title,
        c = e.overlay;
      return !t && !c && 0 !== t;
    }
  }, {
    key: "getOverlay",
    value: function () {
      var e = this.props,
        t = e.title,
        c = e.overlay;
      return 0 === t ? t : c || t || "";
    }
  }, {
    key: "render",
    value: function () {
      return n["createElement"](m["a"], null, this.renderTooltip);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function (e) {
      return "visible" in e ? {
        visible: e.visible
      } : null;
    }
  }]), c;
}(n["Component"]);
E.defaultProps = {
  placement: "top",
  transitionName: "zoom-big-fast",
  mouseEnterDelay: .1,
  mouseLeaveDelay: .1,
  arrowPointAtCenter: !1,
  autoAdjustOverflow: !0
}, Object(r["polyfill"])(E);
legacyExports["a"] = E;
