let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.InnerSlider = void 0;
var r = d(require("./71317449.js")),
  o = d(require("./69386934.js")),
  i = d(require("./7278616c.js")),
  a = d(require("./392f352f.js")),
  s = d(require("./54535951.js")),
  c = require("./78395a61.js"),
  u = require("./555a762f.js"),
  l = require("./61615730.js"),
  f = require("./4b4f6e4c.js"),
  p = d(require("./6264674b.js"));
function d(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function h() {
  return h = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, h.apply(this, arguments);
}
function m(e, t) {
  if (null == e) return {};
  var n,
    r,
    o = v(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function v(e, t) {
  if (null == e) return {};
  var n,
    r,
    o = {},
    i = Object.keys(e);
  for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
  return o;
}
function y(e) {
  return y = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, y(e);
}
function g(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function b(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? g(n, !0).forEach(function (t) {
      S(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : g(n).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function w(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function x(e, t) {
  return !t || "object" !== y(t) && "function" !== typeof t ? E(e) : t;
}
function O(e) {
  return O = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, O(e);
}
function E(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && k(e, t);
}
function k(e, t) {
  return k = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, k(e, t);
}
function S(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var C = function (e) {
  function t(e) {
    var n;
    return w(this, t), n = x(this, O(t).call(this, e)), S(E(n), "listRefHandler", function (e) {
      return n.list = e;
    }), S(E(n), "trackRefHandler", function (e) {
      return n.track = e;
    }), S(E(n), "adaptHeight", function () {
      if (n.props.adaptiveHeight && n.list) {
        var e = n.list.querySelector('[data-index="'.concat(n.state.currentSlide, '"]'));
        n.list.style.height = (0, c.getHeight)(e) + "px";
      }
    }), S(E(n), "UNSAFE_componentWillMount", function () {
      if (n.ssrInit(), n.props.onInit && n.props.onInit(), n.props.lazyLoad) {
        var e = (0, c.getOnDemandLazySlides)(b({}, n.props, {}, n.state));
        e.length > 0 && (n.setState(function (t) {
          return {
            lazyLoadedList: t.lazyLoadedList.concat(e)
          };
        }), n.props.onLazyLoad && n.props.onLazyLoad(e));
      }
    }), S(E(n), "componentDidMount", function () {
      var e = b({
        listRef: n.list,
        trackRef: n.track
      }, n.props);
      n.updateState(e, !0, function () {
        n.adaptHeight(), n.props.autoplay && n.autoPlay("update");
      }), "progressive" === n.props.lazyLoad && (n.lazyLoadTimer = setInterval(n.progressiveLazyLoad, 1e3)), n.ro = new p["default"](function () {
        n.state.animating ? (n.onWindowResized(!1), n.callbackTimers.push(setTimeout(function () {
          return n.onWindowResized();
        }, n.props.speed))) : n.onWindowResized();
      }), n.ro.observe(n.list), Array.prototype.forEach.call(document.querySelectorAll(".slick-slide"), function (e) {
        e.onfocus = n.props.pauseOnFocus ? n.onSlideFocus : null, e.onblur = n.props.pauseOnFocus ? n.onSlideBlur : null;
      }), window && (window.addEventListener ? window.addEventListener("resize", n.onWindowResized) : window.attachEvent("onresize", n.onWindowResized));
    }), S(E(n), "componentWillUnmount", function () {
      n.animationEndCallback && clearTimeout(n.animationEndCallback), n.lazyLoadTimer && clearInterval(n.lazyLoadTimer), n.callbackTimers.length && (n.callbackTimers.forEach(function (e) {
        return clearTimeout(e);
      }), n.callbackTimers = []), window.addEventListener ? window.removeEventListener("resize", n.onWindowResized) : window.detachEvent("onresize", n.onWindowResized), n.autoplayTimer && clearInterval(n.autoplayTimer);
    }), S(E(n), "UNSAFE_componentWillReceiveProps", function (e) {
      for (var t = b({
          listRef: n.list,
          trackRef: n.track
        }, e, {}, n.state), o = !1, i = 0, a = Object.keys(n.props); i < a.length; i++) {
        var s = a[i];
        if (!e.hasOwnProperty(s)) {
          o = !0;
          break;
        }
        if ("object" !== y(e[s]) && "function" !== typeof e[s] && e[s] !== n.props[s]) {
          o = !0;
          break;
        }
      }
      n.updateState(t, o, function () {
        n.state.currentSlide >= r["default"].Children.count(e.children) && n.changeSlide({
          message: "index",
          index: r["default"].Children.count(e.children) - e.slidesToShow,
          currentSlide: n.state.currentSlide
        }), e.autoplay ? n.autoPlay("update") : n.pause("paused");
      });
    }), S(E(n), "componentDidUpdate", function () {
      if (n.checkImagesLoad(), n.props.onReInit && n.props.onReInit(), n.props.lazyLoad) {
        var e = (0, c.getOnDemandLazySlides)(b({}, n.props, {}, n.state));
        e.length > 0 && (n.setState(function (t) {
          return {
            lazyLoadedList: t.lazyLoadedList.concat(e)
          };
        }), n.props.onLazyLoad && n.props.onLazyLoad(e));
      }
      n.adaptHeight();
    }), S(E(n), "onWindowResized", function (e) {
      n.debouncedResize && n.debouncedResize.cancel(), n.debouncedResize = (0, a["default"])(function () {
        return n.resizeWindow(e);
      }, 50), n.debouncedResize();
    }), S(E(n), "resizeWindow", function () {
      var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
      if (o["default"].findDOMNode(n.track)) {
        var t = b({
          listRef: n.list,
          trackRef: n.track
        }, n.props, {}, n.state);
        n.updateState(t, e, function () {
          n.props.autoplay ? n.autoPlay("update") : n.pause("paused");
        }), n.setState({
          animating: !1
        }), clearTimeout(n.animationEndCallback), delete n.animationEndCallback;
      }
    }), S(E(n), "updateState", function (e, t, o) {
      var i = (0, c.initializedState)(e);
      e = b({}, e, {}, i, {
        slideIndex: i.currentSlide
      });
      var a = (0, c.getTrackLeft)(e);
      e = b({}, e, {
        left: a
      });
      var s = (0, c.getTrackCSS)(e);
      (t || r["default"].Children.count(n.props.children) !== r["default"].Children.count(e.children)) && (i["trackStyle"] = s), n.setState(i, o);
    }), S(E(n), "ssrInit", function () {
      if (n.props.variableWidth) {
        var e = 0,
          t = 0,
          o = [],
          i = (0, c.getPreClones)(b({}, n.props, {}, n.state, {
            slideCount: n.props.children.length
          })),
          a = (0, c.getPostClones)(b({}, n.props, {}, n.state, {
            slideCount: n.props.children.length
          }));
        n.props.children.forEach(function (t) {
          o.push(t.props.style.width), e += t.props.style.width;
        });
        for (var s = 0; s < i; s++) t += o[o.length - 1 - s], e += o[o.length - 1 - s];
        for (var u = 0; u < a; u++) e += o[u];
        for (var l = 0; l < n.state.currentSlide; l++) t += o[l];
        var f = {
          width: e + "px",
          left: -t + "px"
        };
        if (n.props.centerMode) {
          var p = "".concat(o[n.state.currentSlide], "px");
          f.left = "calc(".concat(f.left, " + (100% - ").concat(p, ") / 2 ) ");
        }
        n.setState({
          trackStyle: f
        });
      } else {
        var d = r["default"].Children.count(n.props.children),
          h = b({}, n.props, {}, n.state, {
            slideCount: d
          }),
          m = (0, c.getPreClones)(h) + (0, c.getPostClones)(h) + d,
          v = 100 / n.props.slidesToShow * m,
          y = 100 / m,
          g = -y * ((0, c.getPreClones)(h) + n.state.currentSlide) * v / 100;
        n.props.centerMode && (g += (100 - y * v / 100) / 2);
        var w = {
          width: v + "%",
          left: g + "%"
        };
        n.setState({
          slideWidth: y + "%",
          trackStyle: w
        });
      }
    }), S(E(n), "checkImagesLoad", function () {
      var e = document.querySelectorAll(".slick-slide img"),
        t = e.length,
        r = 0;
      Array.prototype.forEach.call(e, function (e) {
        var o = function () {
          return ++r && r >= t && n.onWindowResized();
        };
        if (e.onclick) {
          var i = e.onclick;
          e.onclick = function () {
            i(), e.parentNode.focus();
          };
        } else e.onclick = function () {
          return e.parentNode.focus();
        };
        e.onload || (n.props.lazyLoad ? e.onload = function () {
          n.adaptHeight(), n.callbackTimers.push(setTimeout(n.onWindowResized, n.props.speed));
        } : (e.onload = o, e.onerror = function () {
          o(), n.props.onLazyLoadError && n.props.onLazyLoadError();
        }));
      });
    }), S(E(n), "progressiveLazyLoad", function () {
      for (var e = [], t = b({}, n.props, {}, n.state), r = n.state.currentSlide; r < n.state.slideCount + (0, c.getPostClones)(t); r++) if (n.state.lazyLoadedList.indexOf(r) < 0) {
        e.push(r);
        break;
      }
      for (var o = n.state.currentSlide - 1; o >= -(0, c.getPreClones)(t); o--) if (n.state.lazyLoadedList.indexOf(o) < 0) {
        e.push(o);
        break;
      }
      e.length > 0 ? (n.setState(function (t) {
        return {
          lazyLoadedList: t.lazyLoadedList.concat(e)
        };
      }), n.props.onLazyLoad && n.props.onLazyLoad(e)) : n.lazyLoadTimer && (clearInterval(n.lazyLoadTimer), delete n.lazyLoadTimer);
    }), S(E(n), "slideHandler", function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        r = n.props,
        o = r.asNavFor,
        i = r.beforeChange,
        a = r.onLazyLoad,
        s = r.speed,
        u = r.afterChange,
        l = n.state.currentSlide,
        f = (0, c.slideHandler)(b({
          index: e
        }, n.props, {}, n.state, {
          trackRef: n.track,
          useCSS: n.props.useCSS && !t
        })),
        p = f.state,
        d = f.nextState;
      if (p) {
        i && i(l, p.currentSlide);
        var h = p.lazyLoadedList.filter(function (e) {
          return n.state.lazyLoadedList.indexOf(e) < 0;
        });
        a && h.length > 0 && a(h), n.setState(p, function () {
          o && o.innerSlider.slideHandler(e), d && (n.animationEndCallback = setTimeout(function () {
            var e = d.animating,
              t = m(d, ["animating"]);
            n.setState(t, function () {
              n.callbackTimers.push(setTimeout(function () {
                return n.setState({
                  animating: e
                });
              }, 10)), u && u(p.currentSlide), delete n.animationEndCallback;
            });
          }, s));
        });
      }
    }), S(E(n), "changeSlide", function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        r = b({}, n.props, {}, n.state),
        o = (0, c.changeSlide)(r, e);
      (0 === o || o) && (!0 === t ? n.slideHandler(o, t) : n.slideHandler(o));
    }), S(E(n), "clickHandler", function (e) {
      !1 === n.clickable && (e.stopPropagation(), e.preventDefault()), n.clickable = !0;
    }), S(E(n), "keyHandler", function (e) {
      var t = (0, c.keyHandler)(e, n.props.accessibility, n.props.rtl);
      "" !== t && n.changeSlide({
        message: t
      });
    }), S(E(n), "selectHandler", function (e) {
      n.changeSlide(e);
    }), S(E(n), "disableBodyScroll", function () {
      var e = function (e) {
        e = e || window.event, e.preventDefault && e.preventDefault(), e.returnValue = !1;
      };
      window.ontouchmove = e;
    }), S(E(n), "enableBodyScroll", function () {
      window.ontouchmove = null;
    }), S(E(n), "swipeStart", function (e) {
      n.props.verticalSwiping && n.disableBodyScroll();
      var t = (0, c.swipeStart)(e, n.props.swipe, n.props.draggable);
      "" !== t && n.setState(t);
    }), S(E(n), "swipeMove", function (e) {
      var t = (0, c.swipeMove)(e, b({}, n.props, {}, n.state, {
        trackRef: n.track,
        listRef: n.list,
        slideIndex: n.state.currentSlide
      }));
      t && (t["swiping"] && (n.clickable = !1), n.setState(t));
    }), S(E(n), "swipeEnd", function (e) {
      var t = (0, c.swipeEnd)(e, b({}, n.props, {}, n.state, {
        trackRef: n.track,
        listRef: n.list,
        slideIndex: n.state.currentSlide
      }));
      if (t) {
        var r = t["triggerSlideHandler"];
        delete t["triggerSlideHandler"], n.setState(t), void 0 !== r && (n.slideHandler(r), n.props.verticalSwiping && n.enableBodyScroll());
      }
    }), S(E(n), "slickPrev", function () {
      n.callbackTimers.push(setTimeout(function () {
        return n.changeSlide({
          message: "previous"
        });
      }, 0));
    }), S(E(n), "slickNext", function () {
      n.callbackTimers.push(setTimeout(function () {
        return n.changeSlide({
          message: "next"
        });
      }, 0));
    }), S(E(n), "slickGoTo", function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      if (e = Number(e), isNaN(e)) return "";
      n.callbackTimers.push(setTimeout(function () {
        return n.changeSlide({
          message: "index",
          index: e,
          currentSlide: n.state.currentSlide
        }, t);
      }, 0));
    }), S(E(n), "play", function () {
      var e;
      if (n.props.rtl) e = n.state.currentSlide - n.props.slidesToScroll;else {
        if (!(0, c.canGoNext)(b({}, n.props, {}, n.state))) return !1;
        e = n.state.currentSlide + n.props.slidesToScroll;
      }
      n.slideHandler(e);
    }), S(E(n), "autoPlay", function (e) {
      n.autoplayTimer && clearInterval(n.autoplayTimer);
      var t = n.state.autoplaying;
      if ("update" === e) {
        if ("hovered" === t || "focused" === t || "paused" === t) return;
      } else if ("leave" === e) {
        if ("paused" === t || "focused" === t) return;
      } else if ("blur" === e && ("paused" === t || "hovered" === t)) return;
      n.autoplayTimer = setInterval(n.play, n.props.autoplaySpeed + 50), n.setState({
        autoplaying: "playing"
      });
    }), S(E(n), "pause", function (e) {
      n.autoplayTimer && (clearInterval(n.autoplayTimer), n.autoplayTimer = null);
      var t = n.state.autoplaying;
      "paused" === e ? n.setState({
        autoplaying: "paused"
      }) : "focused" === e ? "hovered" !== t && "playing" !== t || n.setState({
        autoplaying: "focused"
      }) : "playing" === t && n.setState({
        autoplaying: "hovered"
      });
    }), S(E(n), "onDotsOver", function () {
      return n.props.autoplay && n.pause("hovered");
    }), S(E(n), "onDotsLeave", function () {
      return n.props.autoplay && "hovered" === n.state.autoplaying && n.autoPlay("leave");
    }), S(E(n), "onTrackOver", function () {
      return n.props.autoplay && n.pause("hovered");
    }), S(E(n), "onTrackLeave", function () {
      return n.props.autoplay && "hovered" === n.state.autoplaying && n.autoPlay("leave");
    }), S(E(n), "onSlideFocus", function () {
      return n.props.autoplay && n.pause("focused");
    }), S(E(n), "onSlideBlur", function () {
      return n.props.autoplay && "focused" === n.state.autoplaying && n.autoPlay("blur");
    }), S(E(n), "render", function () {
      var e,
        t,
        o,
        i = (0, s["default"])("slick-slider", n.props.className, {
          "slick-vertical": n.props.vertical,
          "slick-initialized": !0
        }),
        a = b({}, n.props, {}, n.state),
        p = (0, c.extractObject)(a, ["fade", "cssEase", "speed", "infinite", "centerMode", "focusOnSelect", "currentSlide", "lazyLoad", "lazyLoadedList", "rtl", "slideWidth", "slideHeight", "listHeight", "vertical", "slidesToShow", "slidesToScroll", "slideCount", "trackStyle", "variableWidth", "unslick", "centerPadding"]),
        d = n.props.pauseOnHover;
      if (p = b({}, p, {
        onMouseEnter: d ? n.onTrackOver : null,
        onMouseLeave: d ? n.onTrackLeave : null,
        onMouseOver: d ? n.onTrackOver : null,
        focusOnSelect: n.props.focusOnSelect ? n.selectHandler : null
      }), !0 === n.props.dots && n.state.slideCount >= n.props.slidesToShow) {
        var m = (0, c.extractObject)(a, ["dotsClass", "slideCount", "slidesToShow", "currentSlide", "slidesToScroll", "clickHandler", "children", "customPaging", "infinite", "appendDots"]),
          v = n.props.pauseOnDotsHover;
        m = b({}, m, {
          clickHandler: n.changeSlide,
          onMouseEnter: v ? n.onDotsLeave : null,
          onMouseOver: v ? n.onDotsOver : null,
          onMouseLeave: v ? n.onDotsLeave : null
        }), e = r["default"].createElement(l.Dots, m);
      }
      var y = (0, c.extractObject)(a, ["infinite", "centerMode", "currentSlide", "slideCount", "slidesToShow", "prevArrow", "nextArrow"]);
      y.clickHandler = n.changeSlide, n.props.arrows && (t = r["default"].createElement(f.PrevArrow, y), o = r["default"].createElement(f.NextArrow, y));
      var g = null;
      n.props.vertical && (g = {
        height: n.state.listHeight
      });
      var w = null;
      !1 === n.props.vertical ? !0 === n.props.centerMode && (w = {
        padding: "0px " + n.props.centerPadding
      }) : !0 === n.props.centerMode && (w = {
        padding: n.props.centerPadding + " 0px"
      });
      var x = b({}, g, {}, w),
        O = n.props.touchMove,
        E = {
          className: "slick-list",
          style: x,
          onClick: n.clickHandler,
          onMouseDown: O ? n.swipeStart : null,
          onMouseMove: n.state.dragging && O ? n.swipeMove : null,
          onMouseUp: O ? n.swipeEnd : null,
          onMouseLeave: n.state.dragging && O ? n.swipeEnd : null,
          onTouchStart: O ? n.swipeStart : null,
          onTouchMove: n.state.dragging && O ? n.swipeMove : null,
          onTouchEnd: O ? n.swipeEnd : null,
          onTouchCancel: n.state.dragging && O ? n.swipeEnd : null,
          onKeyDown: n.props.accessibility ? n.keyHandler : null
        },
        _ = {
          className: i,
          dir: "ltr",
          style: n.props.style
        };
      return n.props.unslick && (E = {
        className: "slick-list"
      }, _ = {
        className: i
      }), r["default"].createElement("div", _, n.props.unslick ? "" : t, r["default"].createElement("div", h({
        ref: n.listRefHandler
      }, E), r["default"].createElement(u.Track, h({
        ref: n.trackRefHandler
      }, p), n.props.children)), n.props.unslick ? "" : o, n.props.unslick ? "" : e);
    }), n.list = null, n.track = null, n.state = b({}, i["default"], {
      currentSlide: n.props.initialSlide,
      slideCount: r["default"].Children.count(n.props.children)
    }), n.callbackTimers = [], n.clickable = !0, n.debouncedResize = null, n;
  }
  return _(t, e), t;
}(r["default"].Component);
legacyExports.InnerSlider = C;
