let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./31572f39.js"),
  o = require("./reactRuntime.js"),
  i = require("./reactLifecyclesCompat.js"),
  a = require("./classNames.js"),
  s = interopDefault(a),
  c = require("./71783446.js"),
  u = require("./34496c57.js");
function l(e) {
  return Array.isArray(e) ? e : [e];
}
var f = {
    transition: "transitionend",
    WebkitTransition: "webkitTransitionEnd",
    MozTransition: "transitionend",
    OTransition: "oTransitionEnd otransitionend"
  },
  p = Object.keys(f).filter(function (e) {
    if ("undefined" === typeof document) return !1;
    var t = document.getElementsByTagName("html")[0];
    return e in (t ? t.style : {});
  })[0],
  d = f[p];
function h(e, t, n, r) {
  e.addEventListener ? e.addEventListener(t, n, r) : e.attachEvent && e.attachEvent("on".concat(t), n);
}
function m(e, t, n, r) {
  e.removeEventListener ? e.removeEventListener(t, n, r) : e.attachEvent && e.detachEvent("on".concat(t), n);
}
function v(e, t) {
  var n = "function" === typeof e ? e(t) : e;
  return Array.isArray(n) ? 2 === n.length ? n : [n[0], n[1]] : [n];
}
var y = function (e) {
    return !isNaN(parseFloat(e)) && isFinite(e);
  },
  g = !("undefined" !== typeof window && window.document && window.document.createElement),
  b = function e(t, n, r, o) {
    if (!n || n === document || n instanceof Document) return !1;
    if (n === t.parentNode) return !0;
    var i = Math.max(Math.abs(r), Math.abs(o)) === Math.abs(o),
      a = Math.max(Math.abs(r), Math.abs(o)) === Math.abs(r),
      s = n.scrollHeight - n.clientHeight,
      c = n.scrollWidth - n.clientWidth,
      u = document.defaultView.getComputedStyle(n),
      l = "auto" === u.overflowY || "scroll" === u.overflowY,
      f = "auto" === u.overflowX || "scroll" === u.overflowX,
      p = s && l,
      d = c && f;
    return !!(i && (!p || p && (n.scrollTop >= s && o < 0 || n.scrollTop <= 0 && o > 0)) || a && (!d || d && (n.scrollLeft >= c && c < 0 || n.scrollLeft <= 0 && c > 0))) && e(t, n.parentNode, r, o);
  };
function w(e) {
  return w = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, w(e);
}
function x(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function O(e, t) {
  if (null == e) return {};
  var n,
    r,
    o = E(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function E(e, t) {
  if (null == e) return {};
  var n,
    r,
    o = {},
    i = Object.keys(e);
  for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
  return o;
}
function _(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function k(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function S(e, t, n) {
  return t && k(e.prototype, t), n && k(e, n), e;
}
function C(e, t) {
  return !t || "object" !== w(t) && "function" !== typeof t ? P(e) : t;
}
function j(e) {
  return j = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, j(e);
}
function P(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function T(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && L(e, t);
}
function L(e, t) {
  return L = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, L(e, t);
}
var N = {},
  M = function (e) {
    function t(e) {
      var n;
      return _(this, t), n = C(this, j(t).call(this, e)), n.domFocus = function () {
        n.dom && n.dom.focus();
      }, n.removeStartHandler = function (e) {
        e.touches.length > 1 || (n.startPos = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        });
      }, n.removeMoveHandler = function (e) {
        if (!(e.changedTouches.length > 1)) {
          var t = e.currentTarget,
            r = e.changedTouches[0].clientX - n.startPos.x,
            o = e.changedTouches[0].clientY - n.startPos.y;
          (t === n.maskDom || t === n.handlerDom || t === n.contentDom && b(t, e.target, r, o)) && e.preventDefault();
        }
      }, n.transitionEnd = function (e) {
        var t = e.target;
        m(t, d, n.transitionEnd), t.style.transition = "";
      }, n.onKeyDown = function (e) {
        if (e.keyCode === u["a"].ESC) {
          var t = n.props.onClose;
          e.stopPropagation(), t && t(e);
        }
      }, n.onWrapperTransitionEnd = function (e) {
        var t = n.props,
          r = t.open,
          o = t.afterVisibleChange;
        e.target === n.contentWrapper && e.propertyName.match(/transform$/) && (n.dom.style.transition = "", !r && n.getCurrentDrawerSome() && (document.body.style.overflowX = "", n.maskDom && (n.maskDom.style.left = "", n.maskDom.style.width = "")), o && o(!!r));
      }, n.openLevelTransition = function () {
        var e = n.props,
          t = e.open,
          r = e.width,
          o = e.height,
          i = n.getHorizontalBoolAndPlacementName(),
          a = i.isHorizontal,
          s = i.placementName,
          c = n.contentDom ? n.contentDom.getBoundingClientRect()[a ? "width" : "height"] : 0,
          u = (a ? r : o) || c;
        n.setLevelAndScrolling(t, s, u);
      }, n.setLevelTransform = function (e, t, r, o) {
        var i = n.props,
          a = i.placement,
          s = i.levelMove,
          c = i.duration,
          u = i.ease,
          l = i.showMask;
        n.levelDom.forEach(function (i) {
          i.style.transition = "transform ".concat(c, " ").concat(u), h(i, d, n.transitionEnd);
          var f = e ? r : 0;
          if (s) {
            var p = v(s, {
              target: i,
              open: e
            });
            f = e ? p[0] : p[1] || 0;
          }
          var m = "number" === typeof f ? "".concat(f, "px") : f,
            y = "left" === a || "top" === a ? m : "-".concat(m);
          y = l && "right" === a && o ? "calc(".concat(y, " + ").concat(o, "px)") : y, i.style.transform = f ? "".concat(t, "(").concat(y, ")") : "";
        });
      }, n.setLevelAndScrolling = function (e, t, r) {
        var o = n.props.onChange;
        if (!g) {
          var i = document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth ? Object(c["a"])(!0) : 0;
          n.setLevelTransform(e, t, r, i), n.toggleScrollingToDrawerAndBody(i);
        }
        o && o(e);
      }, n.toggleScrollingToDrawerAndBody = function (e) {
        var t = n.props,
          r = t.getOpenCount,
          o = t.getContainer,
          i = t.showMask,
          a = t.open,
          s = o && o(),
          c = r && r();
        if (s && s.parentNode === document.body && i) {
          var u = ["touchstart"],
            l = [document.body, n.maskDom, n.handlerDom, n.contentDom];
          a && "hidden" !== document.body.style.overflow ? (e && n.addScrollingEffect(e), 1 === c && (document.body.style.overflow = "hidden"), document.body.style.touchAction = "none", l.forEach(function (e, t) {
            e && h(e, u[t] || "touchmove", t ? n.removeMoveHandler : n.removeStartHandler, n.passive);
          })) : n.getCurrentDrawerSome() && (c || (document.body.style.overflow = ""), document.body.style.touchAction = "", e && n.remScrollingEffect(e), l.forEach(function (e, t) {
            e && m(e, u[t] || "touchmove", t ? n.removeMoveHandler : n.removeStartHandler, n.passive);
          }));
        }
      }, n.addScrollingEffect = function (e) {
        var t = n.props,
          r = t.placement,
          o = t.duration,
          i = t.ease,
          a = t.getOpenCount,
          s = t.switchScrollingEffect,
          c = a && a();
        1 === c && s();
        var u = "width ".concat(o, " ").concat(i),
          l = "transform ".concat(o, " ").concat(i);
        switch (n.dom.style.transition = "none", r) {
          case "right":
            n.dom.style.transform = "translateX(-".concat(e, "px)");
            break;
          case "top":
          case "bottom":
            n.dom.style.width = "calc(100% - ".concat(e, "px)"), n.dom.style.transform = "translateZ(0)";
            break;
          default:
            break;
        }
        clearTimeout(n.timeout), n.timeout = setTimeout(function () {
          n.dom && (n.dom.style.transition = "".concat(l, ",").concat(u), n.dom.style.width = "", n.dom.style.transform = "");
        });
      }, n.remScrollingEffect = function (e) {
        var t,
          r = n.props,
          o = r.placement,
          i = r.duration,
          a = r.ease,
          s = r.getOpenCount,
          c = r.switchScrollingEffect,
          u = s && s();
        u || c(!0), p && (document.body.style.overflowX = "hidden"), n.dom.style.transition = "none";
        var l = "width ".concat(i, " ").concat(a),
          f = "transform ".concat(i, " ").concat(a);
        switch (o) {
          case "left":
            n.dom.style.width = "100%", l = "width 0s ".concat(a, " ").concat(i);
            break;
          case "right":
            n.dom.style.transform = "translateX(".concat(e, "px)"), n.dom.style.width = "100%", l = "width 0s ".concat(a, " ").concat(i), n.maskDom && (n.maskDom.style.left = "-".concat(e, "px"), n.maskDom.style.width = "calc(100% + ".concat(e, "px)"));
            break;
          case "top":
          case "bottom":
            n.dom.style.width = "calc(100% + ".concat(e, "px)"), n.dom.style.height = "100%", n.dom.style.transform = "translateZ(0)", t = "height 0s ".concat(a, " ").concat(i);
            break;
          default:
            break;
        }
        clearTimeout(n.timeout), n.timeout = setTimeout(function () {
          n.dom && (n.dom.style.transition = "".concat(f, ",").concat(t ? "".concat(t, ",") : "").concat(l), n.dom.style.transform = "", n.dom.style.width = "", n.dom.style.height = "");
        });
      }, n.getCurrentDrawerSome = function () {
        return !Object.keys(N).some(function (e) {
          return N[e];
        });
      }, n.getLevelDom = function (e) {
        var t = e.level,
          r = e.getContainer;
        if (!g) {
          var o = r && r(),
            i = o ? o.parentNode : null;
          if (n.levelDom = [], "all" === t) {
            var a = i ? Array.prototype.slice.call(i.children) : [];
            a.forEach(function (e) {
              "SCRIPT" !== e.nodeName && "STYLE" !== e.nodeName && "LINK" !== e.nodeName && e !== o && n.levelDom.push(e);
            });
          } else t && l(t).forEach(function (e) {
            document.querySelectorAll(e).forEach(function (e) {
              n.levelDom.push(e);
            });
          });
        }
      }, n.getHorizontalBoolAndPlacementName = function () {
        var e = n.props.placement,
          t = "left" === e || "right" === e,
          r = "translate".concat(t ? "X" : "Y");
        return {
          isHorizontal: t,
          placementName: r
        };
      }, n.state = {
        _self: P(n)
      }, n;
    }
    return T(t, e), S(t, [{
      key: "componentDidMount",
      value: function () {
        var e = this;
        if (!g) {
          var t = !1;
          try {
            window.addEventListener("test", null, Object.defineProperty({}, "passive", {
              get: function () {
                return t = !0, null;
              }
            }));
          } catch (e) {}
          this.passive = !!t && {
            passive: !1
          };
        }
        var n = this.props.open;
        this.drawerId = "drawer_id_".concat(Number((Date.now() + Math.random()).toString().replace(".", Math.round(9 * Math.random()).toString())).toString(16)), this.getLevelDom(this.props), n && (N[this.drawerId] = n, this.openLevelTransition(), this.forceUpdate(function () {
          e.domFocus();
        }));
      }
    }, {
      key: "componentDidUpdate",
      value: function (e) {
        var t = this.props.open;
        t !== e.open && (t && this.domFocus(), N[this.drawerId] = !!t, this.openLevelTransition());
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        var e = this.props,
          t = e.getOpenCount,
          n = e.open,
          r = e.switchScrollingEffect,
          o = "function" === typeof t && t();
        delete N[this.drawerId], n && (this.setLevelTransform(!1), document.body.style.touchAction = ""), o || (document.body.style.overflow = "", r(!0));
      }
    }, {
      key: "render",
      value: function () {
        var e,
          t = this,
          n = this.props,
          r = n.className,
          i = n.children,
          a = n.style,
          c = n.width,
          u = n.height,
          l = (n.defaultOpen, n.open),
          f = n.prefixCls,
          p = n.placement,
          d = (n.level, n.levelMove, n.ease, n.duration, n.getContainer, n.handler),
          h = (n.onChange, n.afterVisibleChange, n.showMask),
          m = n.maskClosable,
          v = n.maskStyle,
          g = n.onClose,
          b = n.onHandleClick,
          w = n.keyboard,
          E = (n.getOpenCount, n.switchScrollingEffect, O(n, ["className", "children", "style", "width", "height", "defaultOpen", "open", "prefixCls", "placement", "level", "levelMove", "ease", "duration", "getContainer", "handler", "onChange", "afterVisibleChange", "showMask", "maskClosable", "maskStyle", "onClose", "onHandleClick", "keyboard", "getOpenCount", "switchScrollingEffect"])),
          _ = !!this.dom && l,
          k = s()(f, (e = {}, x(e, "".concat(f, "-").concat(p), !0), x(e, "".concat(f, "-open"), _), x(e, r || "", !!r), x(e, "no-mask", !h), e)),
          S = this.getHorizontalBoolAndPlacementName(),
          C = S.placementName,
          j = "left" === p || "top" === p ? "-100%" : "100%",
          P = _ ? "" : "".concat(C, "(").concat(j, ")"),
          T = d && o["cloneElement"](d, {
            onClick: function (e) {
              d.props.onClick && d.props.onClick(), b && b(e);
            },
            ref: function (e) {
              t.handlerDom = e;
            }
          });
        return o["createElement"]("div", Object.assign({}, E, {
          tabIndex: -1,
          className: k,
          style: a,
          ref: function (e) {
            t.dom = e;
          },
          onKeyDown: _ && w ? this.onKeyDown : void 0,
          onTransitionEnd: this.onWrapperTransitionEnd
        }), h && o["createElement"]("div", {
          className: "".concat(f, "-mask"),
          onClick: m ? g : void 0,
          style: v,
          ref: function (e) {
            t.maskDom = e;
          }
        }), o["createElement"]("div", {
          className: "".concat(f, "-content-wrapper"),
          style: {
            transform: P,
            msTransform: P,
            width: y(c) ? "".concat(c, "px") : c,
            height: y(u) ? "".concat(u, "px") : u
          },
          ref: function (e) {
            t.contentWrapper = e;
          }
        }, o["createElement"]("div", {
          className: "".concat(f, "-content"),
          ref: function (e) {
            t.contentDom = e;
          },
          onTouchStart: _ && h ? this.removeStartHandler : void 0,
          onTouchMove: _ && h ? this.removeMoveHandler : void 0
        }, i), T));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function (e, t) {
        var n = t.prevProps,
          r = t._self,
          o = {
            prevProps: e
          };
        if (void 0 !== n) {
          var i = e.placement,
            a = e.level;
          i !== n.placement && (r.contentDom = null), a !== n.level && r.getLevelDom(e);
        }
        return o;
      }
    }]), t;
  }(o["Component"]);
M.defaultProps = {
  switchScrollingEffect: function () {}
};
var A = Object(i["polyfill"])(M);
function D(e) {
  return D = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, D(e);
}
function I(e, t) {
  if (null == e) return {};
  var n,
    r,
    o = R(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function R(e, t) {
  if (null == e) return {};
  var n,
    r,
    o = {},
    i = Object.keys(e);
  for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
  return o;
}
function F(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function V(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function z(e, t, n) {
  return t && V(e.prototype, t), n && V(e, n), e;
}
function B(e, t) {
  return !t || "object" !== D(t) && "function" !== typeof t ? W(e) : t;
}
function W(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function U(e) {
  return U = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, U(e);
}
function q(e, t) {
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
var Y = function (e) {
  function t(e) {
    var n;
    F(this, t), n = B(this, U(t).call(this, e)), n.onHandleClick = function (e) {
      var t = n.props,
        r = t.onHandleClick,
        o = t.open;
      if (r && r(e), "undefined" === typeof o) {
        var i = n.state.open;
        n.setState({
          open: !i
        });
      }
    }, n.onClose = function (e) {
      var t = n.props,
        r = t.onClose,
        o = t.open;
      r && r(e), "undefined" === typeof o && n.setState({
        open: !1
      });
    };
    var r = "undefined" !== typeof e.open ? e.open : !!e.defaultOpen;
    return n.state = {
      open: r
    }, "onMaskClick" in e && console.warn("`onMaskClick` are removed, please use `onClose` instead."), n;
  }
  return q(t, e), z(t, [{
    key: "render",
    value: function () {
      var e = this,
        t = this.props,
        n = (t.defaultOpen, t.getContainer),
        i = t.wrapperClassName,
        a = t.forceRender,
        s = t.handler,
        c = I(t, ["defaultOpen", "getContainer", "wrapperClassName", "forceRender", "handler"]),
        u = this.state.open;
      if (!n) return o["createElement"]("div", {
        className: i,
        ref: function (t) {
          e.dom = t;
        }
      }, o["createElement"](A, Object.assign({}, c, {
        open: u,
        handler: s,
        getContainer: function () {
          return e.dom;
        },
        onClose: this.onClose,
        onHandleClick: this.onHandleClick
      })));
      var l = !!s || a;
      return o["createElement"](r["a"], {
        visible: u,
        forceRender: l,
        getContainer: n,
        wrapperClassName: i
      }, function (t) {
        var n = t.visible,
          r = t.afterClose,
          i = I(t, ["visible", "afterClose"]);
        return o["createElement"](A, Object.assign({}, c, i, {
          open: void 0 !== n ? n : u,
          afterVisibleChange: void 0 !== r ? r : c.afterVisibleChange,
          handler: s,
          onClose: e.onClose,
          onHandleClick: e.onHandleClick
        }));
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function (e, t) {
      var n = t.prevProps,
        r = {
          prevProps: e
        };
      return "undefined" !== typeof n && e.open !== n.open && (r.open = e.open), r;
    }
  }]), t;
}(o["Component"]);
Y.defaultProps = {
  prefixCls: "drawer",
  placement: "left",
  getContainer: "body",
  defaultOpen: !1,
  level: "all",
  duration: ".3s",
  ease: "cubic-bezier(0.78, 0.14, 0.15, 0.86)",
  onChange: function () {},
  afterVisibleChange: function () {},
  handler: o["createElement"]("div", {
    className: "drawer-handle"
  }, o["createElement"]("i", {
    className: "drawer-handle-icon"
  })),
  showMask: !0,
  maskClosable: !0,
  maskStyle: {},
  wrapperClassName: "",
  className: "",
  keyboard: !0,
  forceRender: !1
};
var G = Object(i["polyfill"])(Y);
legacyExports["a"] = G;
