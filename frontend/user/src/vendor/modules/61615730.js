let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.Dots = void 0;
var r = i(require("./reactRuntime.js")),
  o = i(require("./classNames.js"));
function i(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function a(e) {
  return a = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, a(e);
}
function s(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function c(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? s(n, !0).forEach(function (t) {
      u(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : s(n).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function u(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function l(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function f(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function p(e, t, n) {
  return t && f(e.prototype, t), n && f(e, n), e;
}
function d(e, t) {
  return !t || "object" !== a(t) && "function" !== typeof t ? h(e) : t;
}
function h(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function m(e) {
  return m = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, m(e);
}
function v(e, t) {
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
var g = function (e) {
    var t;
    return t = e.infinite ? Math.ceil(e.slideCount / e.slidesToScroll) : Math.ceil((e.slideCount - e.slidesToShow) / e.slidesToScroll) + 1, t;
  },
  b = function (e) {
    function t() {
      return l(this, t), d(this, m(t).apply(this, arguments));
    }
    return v(t, e), p(t, [{
      key: "clickHandler",
      value: function (e, t) {
        t.preventDefault(), this.props.clickHandler(e);
      }
    }, {
      key: "render",
      value: function () {
        var e = this,
          t = g({
            slideCount: this.props.slideCount,
            slidesToScroll: this.props.slidesToScroll,
            slidesToShow: this.props.slidesToShow,
            infinite: this.props.infinite
          }),
          n = this.props,
          i = n.onMouseEnter,
          a = n.onMouseOver,
          s = n.onMouseLeave,
          u = {
            onMouseEnter: i,
            onMouseOver: a,
            onMouseLeave: s
          },
          l = Array.apply(null, Array(t + 1).join("0").split("")).map(function (t, n) {
            var i = n * e.props.slidesToScroll,
              a = n * e.props.slidesToScroll + (e.props.slidesToScroll - 1),
              s = (0, o["default"])({
                "slick-active": e.props.currentSlide >= i && e.props.currentSlide <= a
              }),
              c = {
                message: "dots",
                index: n,
                slidesToScroll: e.props.slidesToScroll,
                currentSlide: e.props.currentSlide
              },
              u = e.clickHandler.bind(e, c);
            return r["default"].createElement("li", {
              key: n,
              className: s
            }, r["default"].cloneElement(e.props.customPaging(n), {
              onClick: u
            }));
          });
        return r["default"].cloneElement(this.props.appendDots(l), c({
          className: this.props.dotsClass
        }, u));
      }
    }]), t;
  }(r["default"].PureComponent);
legacyExports.Dots = b;
