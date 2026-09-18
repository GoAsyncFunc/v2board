let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var n = require("./reactRuntime.js"),
  r = require("./reactLifecyclesCompat.js"),
  o = require("./4f4c4553.js"),
  l = require("./classNames.js"),
  a = interopDefault(l),
  i = require("./tooltipPlacements.js");
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
function v(e) {
  return "boolean" === typeof e ? e ? s : h : u(u({}, h), e);
}
function p() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    t = e.arrowWidth,
    c = void 0 === t ? 5 : t,
    n = e.horizontalArrowShift,
    r = void 0 === n ? 16 : n,
    o = e.verticalArrowShift,
    l = void 0 === o ? 12 : o,
    a = e.autoAdjustOverflow,
    s = void 0 === a || a,
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
        offset: [-4, -(l + c)]
      },
      topRight: {
        points: ["br", "tc"],
        offset: [r + c, -4]
      },
      rightTop: {
        points: ["tl", "cr"],
        offset: [4, -(l + c)]
      },
      bottomRight: {
        points: ["tr", "bc"],
        offset: [r + c, 4]
      },
      rightBottom: {
        points: ["bl", "cr"],
        offset: [4, l + c]
      },
      bottomLeft: {
        points: ["tl", "bc"],
        offset: [-(r + c), 4]
      },
      leftBottom: {
        points: ["br", "cl"],
        offset: [-4, l + c]
      }
    };
  return Object.keys(h).forEach(function (t) {
    h[t] = e.arrowPointAtCenter ? u(u({}, h[t]), {
      overflow: v(s),
      targetOffset: f
    }) : u(u({}, i["a"][t]), {
      overflow: v(s)
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
function z(e, t, c) {
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
function M(e, t, c) {
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
  }), t && H(e, t);
}
function H(e, t) {
  return H = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, H(e, t);
}
function C(e) {
  var t = w();
  return function () {
    var c,
      n = L(e);
    if (t) {
      var r = L(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return V(this, c);
  };
}
function V(e, t) {
  return !t || "object" !== d(t) && "function" !== typeof t ? O(e) : t;
}
function O(e) {
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
function L(e) {
  return L = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, L(e);
}
function S() {
  return S = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, S.apply(this, arguments);
}
var k = function (e, t) {
  var c = {},
    n = S({}, e);
  return t.forEach(function (t) {
    e && t in e && (c[t] = e[t], delete n[t]);
  }), {
    picked: c,
    omitted: n
  };
};
function E(e) {
  var t = e.type;
  if ((!0 === t.__ANT_BUTTON || !0 === t.__ANT_SWITCH || !0 === t.__ANT_CHECKBOX || "button" === e.type) && e.props.disabled) {
    var c = k(e.props.style, ["position", "left", "right", "top", "bottom", "float", "display", "zIndex"]),
      r = c.picked,
      o = c.omitted,
      l = S(S({
        display: "inline-block"
      }, r), {
        cursor: "not-allowed",
        width: e.props.block ? "100%" : null
      }),
      a = S(S({}, o), {
        pointerEvents: "none"
      }),
      i = n["cloneElement"](e, {
        style: a,
        className: null
      });
    return n["createElement"]("span", {
      style: l,
      className: e.props.className
    }, i);
  }
  return e;
}
var x = function (e) {
  g(c, e);
  var t = C(c);
  function c(e) {
    var r;
    return y(this, c), r = t.call(this, e), r.onVisibleChange = function (e) {
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
          l = {
            top: "50%",
            left: "50%"
          };
        n.indexOf("top") >= 0 || n.indexOf("Bottom") >= 0 ? l.top = "".concat(o.height - t.offset[1], "px") : (n.indexOf("Top") >= 0 || n.indexOf("bottom") >= 0) && (l.top = "".concat(-t.offset[1], "px")), n.indexOf("left") >= 0 || n.indexOf("Right") >= 0 ? l.left = "".concat(o.width - t.offset[0], "px") : (n.indexOf("right") >= 0 || n.indexOf("Left") >= 0) && (l.left = "".concat(-t.offset[0], "px")), e.style.transformOrigin = "".concat(l.left, " ").concat(l.top);
      }
    }, r.renderTooltip = function (e) {
      var t = e.getPopupContainer,
        c = e.getPrefixCls,
        l = O(r),
        i = l.props,
        u = l.state,
        s = i.prefixCls,
        h = i.openClassName,
        f = i.getPopupContainer,
        v = i.getTooltipContainer,
        p = i.children,
        m = c("tooltip", s),
        d = u.visible;
      "visible" in i || !r.isNoTitle() || (d = !1);
      var y = E(n["isValidElement"](p) ? p : n["createElement"]("span", null, p)),
        b = y.props,
        M = a()(b.className, z({}, h || "".concat(m, "-open"), !0));
      return n["createElement"](o["a"], S({}, r.props, {
        prefixCls: m,
        getTooltipContainer: f || v || t,
        ref: r.saveTooltip,
        builtinPlacements: r.getPlacements(),
        overlay: r.getOverlay(),
        visible: d,
        onVisibleChange: r.onVisibleChange,
        onPopupAlign: r.onPopupAlign
      }), d ? n["cloneElement"](y, {
        className: M
      }) : y);
    }, r.state = {
      visible: !!e.visible || !!e.defaultVisible
    }, r;
  }
  return M(c, [{
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
      return t || p({
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
x.defaultProps = {
  placement: "top",
  transitionName: "zoom-big-fast",
  mouseEnterDelay: .1,
  mouseLeaveDelay: .1,
  arrowPointAtCenter: !1,
  autoAdjustOverflow: !0
}, Object(r["polyfill"])(x);
legacyExports["a"] = x;
