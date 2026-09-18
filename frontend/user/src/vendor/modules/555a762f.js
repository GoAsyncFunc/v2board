let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.Track = void 0;
var r = a(require("./reactRuntime.js")),
  o = a(require("./classNames.js")),
  i = require("./78395a61.js");
function a(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function s(e) {
  return s = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, s(e);
}
function c() {
  return c = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, c.apply(this, arguments);
}
function u(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function l(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function f(e, t, n) {
  return t && l(e.prototype, t), n && l(e, n), e;
}
function p(e, t) {
  return !t || "object" !== s(t) && "function" !== typeof t ? d(e) : t;
}
function d(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function h(e) {
  return h = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, h(e);
}
function m(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && v(e, t);
}
function v(e, t) {
  return v = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, v(e, t);
}
function y(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function g(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? y(n, !0).forEach(function (t) {
      b(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : y(n).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function b(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var w = function (e) {
    var t, n, r, o, i;
    i = e.rtl ? e.slideCount - 1 - e.index : e.index, r = i < 0 || i >= e.slideCount, e.centerMode ? (o = Math.floor(e.slidesToShow / 2), n = (i - e.currentSlide) % e.slideCount === 0, i > e.currentSlide - o - 1 && i <= e.currentSlide + o && (t = !0)) : t = e.currentSlide <= i && i < e.currentSlide + e.slidesToShow;
    var a = i === e.currentSlide;
    return {
      "slick-slide": !0,
      "slick-active": t,
      "slick-center": n,
      "slick-cloned": r,
      "slick-current": a
    };
  },
  x = function (e) {
    var t = {};
    return void 0 !== e.variableWidth && !1 !== e.variableWidth || (t.width = e.slideWidth), e.fade && (t.position = "relative", e.vertical ? t.top = -e.index * parseInt(e.slideHeight) : t.left = -e.index * parseInt(e.slideWidth), t.opacity = e.currentSlide === e.index ? 1 : 0, t.transition = "opacity " + e.speed + "ms " + e.cssEase + ", visibility " + e.speed + "ms " + e.cssEase, t.WebkitTransition = "opacity " + e.speed + "ms " + e.cssEase + ", visibility " + e.speed + "ms " + e.cssEase), t;
  },
  O = function (e, t) {
    return e.key || t;
  },
  E = function (e) {
    var t,
      n = [],
      a = [],
      s = [],
      c = r["default"].Children.count(e.children),
      u = (0, i.lazyStartIndex)(e),
      l = (0, i.lazyEndIndex)(e);
    return r["default"].Children.forEach(e.children, function (f, p) {
      var d,
        h = {
          message: "children",
          index: p,
          slidesToScroll: e.slidesToScroll,
          currentSlide: e.currentSlide
        };
      d = !e.lazyLoad || e.lazyLoad && e.lazyLoadedList.indexOf(p) >= 0 ? f : r["default"].createElement("div", null);
      var m = x(g({}, e, {
          index: p
        })),
        v = d.props.className || "",
        y = w(g({}, e, {
          index: p
        }));
      if (n.push(r["default"].cloneElement(d, {
        key: "original" + O(d, p),
        "data-index": p,
        className: (0, o["default"])(y, v),
        tabIndex: "-1",
        "aria-hidden": !y["slick-active"],
        style: g({
          outline: "none"
        }, d.props.style || {}, {}, m),
        onClick: function (t) {
          d.props && d.props.onClick && d.props.onClick(t), e.focusOnSelect && e.focusOnSelect(h);
        }
      })), e.infinite && !1 === e.fade) {
        var b = c - p;
        b <= (0, i.getPreClones)(e) && c !== e.slidesToShow && (t = -b, t >= u && (d = f), y = w(g({}, e, {
          index: t
        })), a.push(r["default"].cloneElement(d, {
          key: "precloned" + O(d, t),
          "data-index": t,
          tabIndex: "-1",
          className: (0, o["default"])(y, v),
          "aria-hidden": !y["slick-active"],
          style: g({}, d.props.style || {}, {}, m),
          onClick: function (t) {
            d.props && d.props.onClick && d.props.onClick(t), e.focusOnSelect && e.focusOnSelect(h);
          }
        }))), c !== e.slidesToShow && (t = c + p, t < l && (d = f), y = w(g({}, e, {
          index: t
        })), s.push(r["default"].cloneElement(d, {
          key: "postcloned" + O(d, t),
          "data-index": t,
          tabIndex: "-1",
          className: (0, o["default"])(y, v),
          "aria-hidden": !y["slick-active"],
          style: g({}, d.props.style || {}, {}, m),
          onClick: function (t) {
            d.props && d.props.onClick && d.props.onClick(t), e.focusOnSelect && e.focusOnSelect(h);
          }
        })));
      }
    }), e.rtl ? a.concat(n, s).reverse() : a.concat(n, s);
  },
  _ = function (e) {
    function t() {
      return u(this, t), p(this, h(t).apply(this, arguments));
    }
    return m(t, e), f(t, [{
      key: "render",
      value: function () {
        var e = E(this.props),
          t = this.props,
          n = t.onMouseEnter,
          o = t.onMouseOver,
          i = t.onMouseLeave,
          a = {
            onMouseEnter: n,
            onMouseOver: o,
            onMouseLeave: i
          };
        return r["default"].createElement("div", c({
          className: "slick-track",
          style: this.props.trackStyle
        }, a), e);
      }
    }]), t;
  }(r["default"].PureComponent);
legacyExports.Track = _;
