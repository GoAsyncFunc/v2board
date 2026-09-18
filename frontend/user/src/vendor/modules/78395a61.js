let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.canUseDOM = legacyExports.slidesOnLeft = legacyExports.slidesOnRight = legacyExports.siblingDirection = legacyExports.getTotalSlides = legacyExports.getPostClones = legacyExports.getPreClones = legacyExports.getTrackLeft = legacyExports.getTrackAnimateCSS = legacyExports.getTrackCSS = legacyExports.checkSpecKeys = legacyExports.getSlideCount = legacyExports.checkNavigable = legacyExports.getNavigableIndexes = legacyExports.swipeEnd = legacyExports.swipeMove = legacyExports.swipeStart = legacyExports.keyHandler = legacyExports.changeSlide = legacyExports.slideHandler = legacyExports.initializedState = legacyExports.extractObject = legacyExports.canGoNext = legacyExports.getSwipeDirection = legacyExports.getHeight = legacyExports.getWidth = legacyExports.lazySlidesOnRight = legacyExports.lazySlidesOnLeft = legacyExports.lazyEndIndex = legacyExports.lazyStartIndex = legacyExports.getRequiredLazySlides = legacyExports.getOnDemandLazySlides = void 0;
var r = i(require("./reactRuntime.js")),
  o = i(require("./69386934.js"));
function i(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function a(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function s(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? a(n, !0).forEach(function (t) {
      c(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : a(n).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function c(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var u = function (e) {
  for (var t = [], n = f(e), r = p(e), o = n; o < r; o++) e.lazyLoadedList.indexOf(o) < 0 && t.push(o);
  return t;
};
legacyExports.getOnDemandLazySlides = u;
var l = function (e) {
  for (var t = [], n = f(e), r = p(e), o = n; o < r; o++) t.push(o);
  return t;
};
legacyExports.getRequiredLazySlides = l;
var f = function (e) {
  return e.currentSlide - d(e);
};
legacyExports.lazyStartIndex = f;
var p = function (e) {
  return e.currentSlide + h(e);
};
legacyExports.lazyEndIndex = p;
var d = function (e) {
  return e.centerMode ? Math.floor(e.slidesToShow / 2) + (parseInt(e.centerPadding) > 0 ? 1 : 0) : 0;
};
legacyExports.lazySlidesOnLeft = d;
var h = function (e) {
  return e.centerMode ? Math.floor((e.slidesToShow - 1) / 2) + 1 + (parseInt(e.centerPadding) > 0 ? 1 : 0) : e.slidesToShow;
};
legacyExports.lazySlidesOnRight = h;
var m = function (e) {
  return e && e.offsetWidth || 0;
};
legacyExports.getWidth = m;
var v = function (e) {
  return e && e.offsetHeight || 0;
};
legacyExports.getHeight = v;
var y = function (e) {
  var t,
    n,
    r,
    o,
    i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
  return t = e.startX - e.curX, n = e.startY - e.curY, r = Math.atan2(n, t), o = Math.round(180 * r / Math.PI), o < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 || o <= 360 && o >= 315 ? "left" : o >= 135 && o <= 225 ? "right" : !0 === i ? o >= 35 && o <= 135 ? "up" : "down" : "vertical";
};
legacyExports.getSwipeDirection = y;
var g = function (e) {
  var t = !0;
  return e.infinite || (e.centerMode && e.currentSlide >= e.slideCount - 1 ? t = !1 : (e.slideCount <= e.slidesToShow || e.currentSlide >= e.slideCount - e.slidesToShow) && (t = !1)), t;
};
legacyExports.canGoNext = g;
var b = function (e, t) {
  var n = {};
  return t.forEach(function (t) {
    return n[t] = e[t];
  }), n;
};
legacyExports.extractObject = b;
var w = function (e) {
  var t,
    n = r["default"].Children.count(e.children),
    i = Math.ceil(m(o["default"].findDOMNode(e.listRef))),
    a = Math.ceil(m(o["default"].findDOMNode(e.trackRef)));
  if (e.vertical) t = i;else {
    var s = e.centerMode && 2 * parseInt(e.centerPadding);
    "string" === typeof e.centerPadding && "%" === e.centerPadding.slice(-1) && (s *= i / 100), t = Math.ceil((i - s) / e.slidesToShow);
  }
  var c = o["default"].findDOMNode(e.listRef) && v(o["default"].findDOMNode(e.listRef).querySelector('[data-index="0"]')),
    l = c * e.slidesToShow,
    f = void 0 === e.currentSlide ? e.initialSlide : e.currentSlide;
  e.rtl && void 0 === e.currentSlide && (f = n - 1 - e.initialSlide);
  var p = e.lazyLoadedList || [],
    d = u({
      currentSlide: f,
      lazyLoadedList: p
    }, e);
  p.concat(d);
  var h = {
    slideCount: n,
    slideWidth: t,
    listWidth: i,
    trackWidth: a,
    currentSlide: f,
    slideHeight: c,
    listHeight: l,
    lazyLoadedList: p
  };
  return null === e.autoplaying && e.autoplay && (h["autoplaying"] = "playing"), h;
};
legacyExports.initializedState = w;
var x = function (e) {
  var t = e.waitForAnimate,
    n = e.animating,
    r = e.fade,
    o = e.infinite,
    i = e.index,
    a = e.slideCount,
    c = e.lazyLoadedList,
    l = e.lazyLoad,
    f = e.currentSlide,
    p = e.centerMode,
    d = e.slidesToScroll,
    h = e.slidesToShow,
    m = e.useCSS;
  if (t && n) return {};
  var v,
    y,
    b,
    w = i,
    x = {},
    O = {};
  if (r) {
    if (!o && (i < 0 || i >= a)) return {};
    i < 0 ? w = i + a : i >= a && (w = i - a), l && c.indexOf(w) < 0 && c.push(w), x = {
      animating: !0,
      currentSlide: w,
      lazyLoadedList: c
    }, O = {
      animating: !1
    };
  } else v = w, w < 0 ? (v = w + a, o ? a % d !== 0 && (v = a - a % d) : v = 0) : !g(e) && w > f ? w = v = f : p && w >= a ? (w = o ? a : a - 1, v = o ? 0 : a - 1) : w >= a && (v = w - a, o ? a % d !== 0 && (v = 0) : v = a - h), y = M(s({}, e, {
    slideIndex: w
  })), b = M(s({}, e, {
    slideIndex: v
  })), o || (y === b && (w = v), y = b), l && c.concat(u(s({}, e, {
    currentSlide: w
  }))), m ? (x = {
    animating: !0,
    currentSlide: v,
    trackStyle: N(s({}, e, {
      left: y
    })),
    lazyLoadedList: c
  }, O = {
    animating: !1,
    currentSlide: v,
    trackStyle: L(s({}, e, {
      left: b
    })),
    swipeLeft: null
  }) : x = {
    currentSlide: v,
    trackStyle: L(s({}, e, {
      left: b
    })),
    lazyLoadedList: c
  };
  return {
    state: x,
    nextState: O
  };
};
legacyExports.slideHandler = x;
var O = function (e, t) {
  var n,
    r,
    o,
    i,
    a,
    c = e.slidesToScroll,
    u = e.slidesToShow,
    l = e.slideCount,
    f = e.currentSlide,
    p = e.lazyLoad,
    d = e.infinite;
  if (i = l % c !== 0, n = i ? 0 : (l - f) % c, "previous" === t.message) o = 0 === n ? c : u - n, a = f - o, p && !d && (r = f - o, a = -1 === r ? l - 1 : r);else if ("next" === t.message) o = 0 === n ? c : n, a = f + o, p && !d && (a = (f + c) % l + n);else if ("dots" === t.message) {
    if (a = t.index * t.slidesToScroll, a === t.currentSlide) return null;
  } else if ("children" === t.message) {
    if (a = t.index, a === t.currentSlide) return null;
    if (d) {
      var h = R(s({}, e, {
        targetSlide: a
      }));
      a > t.currentSlide && "left" === h ? a -= l : a < t.currentSlide && "right" === h && (a += l);
    }
  } else if ("index" === t.message && (a = Number(t.index), a === t.currentSlide)) return null;
  return a;
};
legacyExports.changeSlide = O;
var E = function (e, t, n) {
  return e.target.tagName.match("TEXTAREA|INPUT|SELECT") || !t ? "" : 37 === e.keyCode ? n ? "next" : "previous" : 39 === e.keyCode ? n ? "previous" : "next" : "";
};
legacyExports.keyHandler = E;
var _ = function (e, t, n) {
  return "IMG" === e.target.tagName && e.preventDefault(), !t || !n && -1 !== e.type.indexOf("mouse") ? "" : {
    dragging: !0,
    touchObject: {
      startX: e.touches ? e.touches[0].pageX : e.clientX,
      startY: e.touches ? e.touches[0].pageY : e.clientY,
      curX: e.touches ? e.touches[0].pageX : e.clientX,
      curY: e.touches ? e.touches[0].pageY : e.clientY
    }
  };
};
legacyExports.swipeStart = _;
var k = function (e, t) {
  var n = t.scrolling,
    r = t.animating,
    o = t.vertical,
    i = t.swipeToSlide,
    a = t.verticalSwiping,
    c = t.rtl,
    u = t.currentSlide,
    l = t.edgeFriction,
    f = t.edgeDragged,
    p = t.onEdge,
    d = t.swiped,
    h = t.swiping,
    m = t.slideCount,
    v = t.slidesToScroll,
    b = t.infinite,
    w = t.touchObject,
    x = t.swipeEvent,
    O = t.listHeight,
    E = t.listWidth;
  if (!n) {
    if (r) return e.preventDefault();
    o && i && a && e.preventDefault();
    var _,
      k = {},
      S = M(t);
    w.curX = e.touches ? e.touches[0].pageX : e.clientX, w.curY = e.touches ? e.touches[0].pageY : e.clientY, w.swipeLength = Math.round(Math.sqrt(Math.pow(w.curX - w.startX, 2)));
    var C = Math.round(Math.sqrt(Math.pow(w.curY - w.startY, 2)));
    if (!a && !h && C > 10) return {
      scrolling: !0
    };
    a && (w.swipeLength = C);
    var j = (c ? -1 : 1) * (w.curX > w.startX ? 1 : -1);
    a && (j = w.curY > w.startY ? 1 : -1);
    var P = Math.ceil(m / v),
      T = y(t.touchObject, a),
      N = w.swipeLength;
    return b || (0 === u && "right" === T || u + 1 >= P && "left" === T || !g(t) && "left" === T) && (N = w.swipeLength * l, !1 === f && p && (p(T), k["edgeDragged"] = !0)), !d && x && (x(T), k["swiped"] = !0), _ = o ? S + N * (O / E) * j : c ? S - N * j : S + N * j, a && (_ = S + N * j), k = s({}, k, {
      touchObject: w,
      swipeLeft: _,
      trackStyle: L(s({}, t, {
        left: _
      }))
    }), Math.abs(w.curX - w.startX) < .8 * Math.abs(w.curY - w.startY) ? k : (w.swipeLength > 10 && (k["swiping"] = !0, e.preventDefault()), k);
  }
};
legacyExports.swipeMove = k;
var S = function (e, t) {
  var n = t.dragging,
    r = t.swipe,
    o = t.touchObject,
    i = t.listWidth,
    a = t.touchThreshold,
    c = t.verticalSwiping,
    u = t.listHeight,
    l = t.currentSlide,
    f = t.swipeToSlide,
    p = t.scrolling,
    d = t.onSwipe;
  if (!n) return r && e.preventDefault(), {};
  var h = c ? u / a : i / a,
    m = y(o, c),
    v = {
      dragging: !1,
      edgeDragged: !1,
      scrolling: !1,
      swiping: !1,
      swiped: !1,
      swipeLeft: null,
      touchObject: {}
    };
  if (p) return v;
  if (!o.swipeLength) return v;
  if (o.swipeLength > h) {
    var g, b;
    switch (e.preventDefault(), d && d(m), m) {
      case "left":
      case "up":
        b = l + P(t), g = f ? j(t, b) : b, v["currentDirection"] = 0;
        break;
      case "right":
      case "down":
        b = l - P(t), g = f ? j(t, b) : b, v["currentDirection"] = 1;
        break;
      default:
        g = l;
    }
    v["triggerSlideHandler"] = g;
  } else {
    var w = M(t);
    v["trackStyle"] = N(s({}, t, {
      left: w
    }));
  }
  return v;
};
legacyExports.swipeEnd = S;
var C = function (e) {
  var t = e.infinite ? 2 * e.slideCount : e.slideCount,
    n = e.infinite ? -1 * e.slidesToShow : 0,
    r = e.infinite ? -1 * e.slidesToShow : 0,
    o = [];
  while (n < t) o.push(n), n = r + e.slidesToScroll, r += Math.min(e.slidesToScroll, e.slidesToShow);
  return o;
};
legacyExports.getNavigableIndexes = C;
var j = function (e, t) {
  var n = C(e),
    r = 0;
  if (t > n[n.length - 1]) t = n[n.length - 1];else for (var o in n) {
    if (t < n[o]) {
      t = r;
      break;
    }
    r = n[o];
  }
  return t;
};
legacyExports.checkNavigable = j;
var P = function (e) {
  var t = e.centerMode ? e.slideWidth * Math.floor(e.slidesToShow / 2) : 0;
  if (e.swipeToSlide) {
    var n,
      r = o["default"].findDOMNode(e.listRef),
      i = r.querySelectorAll(".slick-slide");
    if (Array.from(i).every(function (r) {
      if (e.vertical) {
        if (r.offsetTop + v(r) / 2 > -1 * e.swipeLeft) return n = r, !1;
      } else if (r.offsetLeft - t + m(r) / 2 > -1 * e.swipeLeft) return n = r, !1;
      return !0;
    }), !n) return 0;
    var a = !0 === e.rtl ? e.slideCount - e.currentSlide : e.currentSlide,
      s = Math.abs(n.dataset.index - a) || 1;
    return s;
  }
  return e.slidesToScroll;
};
legacyExports.getSlideCount = P;
var T = function (e, t) {
  return t.reduce(function (t, n) {
    return t && e.hasOwnProperty(n);
  }, !0) ? null : console.error("Keys Missing:", e);
};
legacyExports.checkSpecKeys = T;
var L = function (e) {
  var t, n;
  T(e, ["left", "variableWidth", "slideCount", "slidesToShow", "slideWidth"]);
  var r = e.slideCount + 2 * e.slidesToShow;
  e.vertical ? n = r * e.slideHeight : t = I(e) * e.slideWidth;
  var o = {
    opacity: 1,
    transition: "",
    WebkitTransition: ""
  };
  if (e.useTransform) {
    var i = e.vertical ? "translate3d(0px, " + e.left + "px, 0px)" : "translate3d(" + e.left + "px, 0px, 0px)",
      a = e.vertical ? "translate3d(0px, " + e.left + "px, 0px)" : "translate3d(" + e.left + "px, 0px, 0px)",
      c = e.vertical ? "translateY(" + e.left + "px)" : "translateX(" + e.left + "px)";
    o = s({}, o, {
      WebkitTransform: i,
      transform: a,
      msTransform: c
    });
  } else e.vertical ? o["top"] = e.left : o["left"] = e.left;
  return e.fade && (o = {
    opacity: 1
  }), t && (o.width = t), n && (o.height = n), window && !window.addEventListener && window.attachEvent && (e.vertical ? o.marginTop = e.left + "px" : o.marginLeft = e.left + "px"), o;
};
legacyExports.getTrackCSS = L;
var N = function (e) {
  T(e, ["left", "variableWidth", "slideCount", "slidesToShow", "slideWidth", "speed", "cssEase"]);
  var t = L(e);
  return e.useTransform ? (t.WebkitTransition = "-webkit-transform " + e.speed + "ms " + e.cssEase, t.transition = "transform " + e.speed + "ms " + e.cssEase) : e.vertical ? t.transition = "top " + e.speed + "ms " + e.cssEase : t.transition = "left " + e.speed + "ms " + e.cssEase, t;
};
legacyExports.getTrackAnimateCSS = N;
var M = function (e) {
  if (e.unslick) return 0;
  T(e, ["slideIndex", "trackRef", "infinite", "centerMode", "slideCount", "slidesToShow", "slidesToScroll", "slideWidth", "listWidth", "variableWidth", "slideHeight"]);
  var t,
    n,
    r = e.slideIndex,
    i = e.trackRef,
    a = e.infinite,
    s = e.centerMode,
    c = e.slideCount,
    u = e.slidesToShow,
    l = e.slidesToScroll,
    f = e.slideWidth,
    p = e.listWidth,
    d = e.variableWidth,
    h = e.slideHeight,
    m = e.fade,
    v = e.vertical,
    y = 0,
    g = 0;
  if (m || 1 === e.slideCount) return 0;
  var b = 0;
  if (a ? (b = -A(e), c % l !== 0 && r + l > c && (b = -(r > c ? u - (r - c) : c % l)), s && (b += parseInt(u / 2))) : (c % l !== 0 && r + l > c && (b = u - c % l), s && (b = parseInt(u / 2))), y = b * f, g = b * h, t = v ? r * h * -1 + g : r * f * -1 + y, !0 === d) {
    var w,
      x = o["default"].findDOMNode(i);
    if (w = r + A(e), n = x && x.childNodes[w], t = n ? -1 * n.offsetLeft : 0, !0 === s) {
      w = a ? r + A(e) : r, n = x && x.children[w], t = 0;
      for (var O = 0; O < w; O++) t -= x && x.children[O] && x.children[O].offsetWidth;
      t -= parseInt(e.centerPadding), t += n && (p - n.offsetWidth) / 2;
    }
  }
  return t;
};
legacyExports.getTrackLeft = M;
var A = function (e) {
  return e.unslick || !e.infinite ? 0 : e.variableWidth ? e.slideCount : e.slidesToShow + (e.centerMode ? 1 : 0);
};
legacyExports.getPreClones = A;
var D = function (e) {
  return e.unslick || !e.infinite ? 0 : e.slideCount;
};
legacyExports.getPostClones = D;
var I = function (e) {
  return 1 === e.slideCount ? 1 : A(e) + e.slideCount + D(e);
};
legacyExports.getTotalSlides = I;
var R = function (e) {
  return e.targetSlide > e.currentSlide ? e.targetSlide > e.currentSlide + F(e) ? "left" : "right" : e.targetSlide < e.currentSlide - V(e) ? "right" : "left";
};
legacyExports.siblingDirection = R;
var F = function (e) {
  var t = e.slidesToShow,
    n = e.centerMode,
    r = e.rtl,
    o = e.centerPadding;
  if (n) {
    var i = (t - 1) / 2 + 1;
    return parseInt(o) > 0 && (i += 1), r && t % 2 === 0 && (i += 1), i;
  }
  return r ? 0 : t - 1;
};
legacyExports.slidesOnRight = F;
var V = function (e) {
  var t = e.slidesToShow,
    n = e.centerMode,
    r = e.rtl,
    o = e.centerPadding;
  if (n) {
    var i = (t - 1) / 2 + 1;
    return parseInt(o) > 0 && (i += 1), r || t % 2 !== 0 || (i += 1), i;
  }
  return r ? t - 1 : 0;
};
legacyExports.slidesOnLeft = V;
var z = function () {
  return !("undefined" === typeof window || !window.document || !window.document.createElement);
};
legacyExports.canUseDOM = z;
