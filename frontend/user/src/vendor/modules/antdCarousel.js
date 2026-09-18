let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return H;
});
var n = require("./reactRuntime.js"),
  r = require("./73456643.js"),
  o = interopDefault(r),
  l = require("./48383455.js"),
  a = require("./36436658.js");
function i(e) {
  "@babel/helpers - typeof";

  return i = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, i(e);
}
function u() {
  return u = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, u.apply(this, arguments);
}
function s(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function h(e, t) {
  for (var c = 0; c < t.length; c++) {
    var n = t[c];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function f(e, t, c) {
  return t && h(e.prototype, t), c && h(e, c), e;
}
function v(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && p(e, t);
}
function p(e, t) {
  return p = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, p(e, t);
}
function m(e) {
  var t = y();
  return function () {
    var c,
      n = b(e);
    if (t) {
      var r = b(this).constructor;
      c = Reflect.construct(n, arguments, r);
    } else c = n.apply(this, arguments);
    return d(this, c);
  };
}
function d(e, t) {
  return !t || "object" !== i(t) && "function" !== typeof t ? z(e) : t;
}
function z(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function y() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function b(e) {
  return b = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, b(e);
}
if ("undefined" !== typeof window) {
  var M = function (e) {
    return {
      media: e,
      matches: !1,
      addListener: function () {},
      removeListener: function () {}
    };
  };
  window.matchMedia || (window.matchMedia = M);
}
var g = require("./4f533536.js")["default"],
  H = function (e) {
    v(c, e);
    var t = m(c);
    function c(e) {
      var r;
      return s(this, c), r = t.call(this, e), r.saveSlick = function (e) {
        r.slick = e;
      }, r.onWindowResized = function () {
        var e = r.props.autoplay;
        e && r.slick && r.slick.innerSlider && r.slick.innerSlider.autoPlay && r.slick.innerSlider.autoPlay();
      }, r.renderCarousel = function (e) {
        var t = e.getPrefixCls,
          c = u({}, r.props);
        "fade" === c.effect && (c.fade = !0);
        var o = t("carousel", c.prefixCls),
          l = "slick-dots",
          a = r.getDotPosition();
        return c.vertical = "left" === a || "right" === a, c.dotsClass = "".concat(l, " ").concat(l, "-").concat(a || "bottom"), c.vertical && (o = "".concat(o, " ").concat(o, "-vertical")), n["createElement"]("div", {
          className: o
        }, n["createElement"](g, u({
          ref: r.saveSlick
        }, c)));
      }, r.onWindowResized = o()(r.onWindowResized, 500, {
        leading: !1
      }), "vertical" in r.props && Object(a["a"])(!r.props.vertical, "Carousel", "`vertical` is deprecated, please use `dotPosition` instead."), r;
    }
    return f(c, [{
      key: "componentDidMount",
      value: function () {
        var e = this.props.autoplay;
        e && window.addEventListener("resize", this.onWindowResized), this.innerSlider = this.slick && this.slick.innerSlider;
      }
    }, {
      key: "componentDidUpdate",
      value: function (e) {
        n["Children"].count(this.props.children) !== n["Children"].count(e.children) && this.goTo(this.props.initialSlide || 0, !1);
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        var e = this.props.autoplay;
        e && (window.removeEventListener("resize", this.onWindowResized), this.onWindowResized.cancel());
      }
    }, {
      key: "getDotPosition",
      value: function () {
        return this.props.dotPosition ? this.props.dotPosition : "vertical" in this.props && this.props.vertical ? "right" : "bottom";
      }
    }, {
      key: "next",
      value: function () {
        this.slick.slickNext();
      }
    }, {
      key: "prev",
      value: function () {
        this.slick.slickPrev();
      }
    }, {
      key: "goTo",
      value: function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        this.slick.slickGoTo(e, t);
      }
    }, {
      key: "render",
      value: function () {
        return n["createElement"](l["a"], null, this.renderCarousel);
      }
    }]), c;
  }(n["Component"]);
H.defaultProps = {
  dots: !0,
  arrows: !1,
  draggable: !1
};
