let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports["default"] = void 0;
var r = c(require("./71317449.js")),
  o = require("./75654e45.js"),
  i = c(require("./70497364.js")),
  a = c(require("./42425055.js")),
  s = require("./78395a61.js");
function c(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function u(e) {
  return u = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, u(e);
}
function l() {
  return l = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, l.apply(this, arguments);
}
function f(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function p(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? f(n, !0).forEach(function (t) {
      x(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : f(n).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function d(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function h(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function m(e, t, n) {
  return t && h(e.prototype, t), n && h(e, n), e;
}
function v(e, t) {
  return !t || "object" !== u(t) && "function" !== typeof t ? g(e) : t;
}
function y(e) {
  return y = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, y(e);
}
function g(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function b(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && w(e, t);
}
function w(e, t) {
  return w = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, w(e, t);
}
function x(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var O = (0, s.canUseDOM)() && require("./6a705862.js"),
  E = function (e) {
    function t(e) {
      var n;
      return d(this, t), n = v(this, y(t).call(this, e)), x(g(n), "innerSliderRefHandler", function (e) {
        return n.innerSlider = e;
      }), x(g(n), "slickPrev", function () {
        return n.innerSlider.slickPrev();
      }), x(g(n), "slickNext", function () {
        return n.innerSlider.slickNext();
      }), x(g(n), "slickGoTo", function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return n.innerSlider.slickGoTo(e, t);
      }), x(g(n), "slickPause", function () {
        return n.innerSlider.pause("paused");
      }), x(g(n), "slickPlay", function () {
        return n.innerSlider.autoPlay("play");
      }), n.state = {
        breakpoint: null
      }, n._responsiveMediaHandlers = [], n;
    }
    return b(t, e), m(t, [{
      key: "media",
      value: function (e, t) {
        O.register(e, t), this._responsiveMediaHandlers.push({
          query: e,
          handler: t
        });
      }
    }, {
      key: "UNSAFE_componentWillMount",
      value: function () {
        var e = this;
        if (this.props.responsive) {
          var t = this.props.responsive.map(function (e) {
            return e.breakpoint;
          });
          t.sort(function (e, t) {
            return e - t;
          }), t.forEach(function (n, r) {
            var o;
            o = 0 === r ? (0, i["default"])({
              minWidth: 0,
              maxWidth: n
            }) : (0, i["default"])({
              minWidth: t[r - 1] + 1,
              maxWidth: n
            }), (0, s.canUseDOM)() && e.media(o, function () {
              e.setState({
                breakpoint: n
              });
            });
          });
          var n = (0, i["default"])({
            minWidth: t.slice(-1)[0]
          });
          (0, s.canUseDOM)() && this.media(n, function () {
            e.setState({
              breakpoint: null
            });
          });
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        this._responsiveMediaHandlers.forEach(function (e) {
          O.unregister(e.query, e.handler);
        });
      }
    }, {
      key: "render",
      value: function () {
        var e,
          t,
          n = this;
        this.state.breakpoint ? (t = this.props.responsive.filter(function (e) {
          return e.breakpoint === n.state.breakpoint;
        }), e = "unslick" === t[0].settings ? "unslick" : p({}, a["default"], {}, this.props, {}, t[0].settings)) : e = p({}, a["default"], {}, this.props), e.centerMode && (e.slidesToScroll, e.slidesToScroll = 1), e.fade && (e.slidesToShow, e.slidesToScroll, e.slidesToShow = 1, e.slidesToScroll = 1);
        var i = r["default"].Children.toArray(this.props.children);
        i = i.filter(function (e) {
          return "string" === typeof e ? !!e.trim() : !!e;
        }), e.variableWidth && (e.rows > 1 || e.slidesPerRow > 1) && (console.warn("variableWidth is not supported in case of rows > 1 or slidesPerRow > 1"), e.variableWidth = !1);
        for (var s = [], c = null, u = 0; u < i.length; u += e.rows * e.slidesPerRow) {
          for (var f = [], d = u; d < u + e.rows * e.slidesPerRow; d += e.slidesPerRow) {
            for (var h = [], m = d; m < d + e.slidesPerRow; m += 1) {
              if (e.variableWidth && i[m].props.style && (c = i[m].props.style.width), m >= i.length) break;
              h.push(r["default"].cloneElement(i[m], {
                key: 100 * u + 10 * d + m,
                tabIndex: -1,
                style: {
                  width: "".concat(100 / e.slidesPerRow, "%"),
                  display: "inline-block"
                }
              }));
            }
            f.push(r["default"].createElement("div", {
              key: 10 * u + d
            }, h));
          }
          e.variableWidth ? s.push(r["default"].createElement("div", {
            key: u,
            style: {
              width: c
            }
          }, f)) : s.push(r["default"].createElement("div", {
            key: u
          }, f));
        }
        if ("unslick" === e) {
          var v = "regular slider " + (this.props.className || "");
          return r["default"].createElement("div", {
            className: v
          }, s);
        }
        return s.length <= e.slidesToShow && (e.unslick = !0), r["default"].createElement(o.InnerSlider, l({
          style: this.props.style,
          ref: this.innerSliderRefHandler
        }, e), s);
      }
    }]), t;
  }(r["default"].Component);
legacyExports["default"] = E;
