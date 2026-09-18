let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.NextArrow = legacyExports.PrevArrow = void 0;
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
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function l(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? u(n, !0).forEach(function (t) {
      f(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : u(n).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function f(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function p(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function d(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function h(e, t, n) {
  return t && d(e.prototype, t), n && d(e, n), e;
}
function m(e, t) {
  return !t || "object" !== s(t) && "function" !== typeof t ? v(e) : t;
}
function v(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function y(e) {
  return y = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, y(e);
}
function g(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && b(e, t);
}
function b(e, t) {
  return b = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, b(e, t);
}
var w = function (e) {
  function t() {
    return p(this, t), m(this, y(t).apply(this, arguments));
  }
  return g(t, e), h(t, [{
    key: "clickHandler",
    value: function (e, t) {
      t && t.preventDefault(), this.props.clickHandler(e, t);
    }
  }, {
    key: "render",
    value: function () {
      var e = {
          "slick-arrow": !0,
          "slick-prev": !0
        },
        t = this.clickHandler.bind(this, {
          message: "previous"
        });
      !this.props.infinite && (0 === this.props.currentSlide || this.props.slideCount <= this.props.slidesToShow) && (e["slick-disabled"] = !0, t = null);
      var n,
        i = {
          key: "0",
          "data-role": "none",
          className: (0, o["default"])(e),
          style: {
            display: "block"
          },
          onClick: t
        },
        a = {
          currentSlide: this.props.currentSlide,
          slideCount: this.props.slideCount
        };
      return n = this.props.prevArrow ? r["default"].cloneElement(this.props.prevArrow, l({}, i, {}, a)) : r["default"].createElement("button", c({
        key: "0",
        type: "button"
      }, i), " ", "Previous"), n;
    }
  }]), t;
}(r["default"].PureComponent);
legacyExports.PrevArrow = w;
var x = function (e) {
  function t() {
    return p(this, t), m(this, y(t).apply(this, arguments));
  }
  return g(t, e), h(t, [{
    key: "clickHandler",
    value: function (e, t) {
      t && t.preventDefault(), this.props.clickHandler(e, t);
    }
  }, {
    key: "render",
    value: function () {
      var e = {
          "slick-arrow": !0,
          "slick-next": !0
        },
        t = this.clickHandler.bind(this, {
          message: "next"
        });
      (0, i.canGoNext)(this.props) || (e["slick-disabled"] = !0, t = null);
      var n,
        a = {
          key: "1",
          "data-role": "none",
          className: (0, o["default"])(e),
          style: {
            display: "block"
          },
          onClick: t
        },
        s = {
          currentSlide: this.props.currentSlide,
          slideCount: this.props.slideCount
        };
      return n = this.props.nextArrow ? r["default"].cloneElement(this.props.nextArrow, l({}, a, {}, s)) : r["default"].createElement("button", c({
        key: "1",
        type: "button"
      }, a), " ", "Next"), n;
    }
  }]), t;
}(r["default"].PureComponent);
legacyExports.NextArrow = x;
