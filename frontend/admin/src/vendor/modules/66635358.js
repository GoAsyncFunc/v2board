let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./31572f39.js"),
  i = require("./71317449.js"),
  o = require("./56434c38.js"),
  a = require("./54535951.js"),
  s = interopDefault(a),
  l = require("./71783446.js"),
  c = require("./34496c57.js");
function u(e) {
  return Array.isArray(e) ? e : [e];
}
var h = {
    transition: "transitionend",
    WebkitTransition: "webkitTransitionEnd",
    MozTransition: "transitionend",
    OTransition: "oTransitionEnd otransitionend"
  },
  f = Object.keys(h).filter(function (e) {
    if ("undefined" === typeof document) return !1;
    var t = document.getElementsByTagName("html")[0];
    return e in (t ? t.style : {});
  })[0],
  d = h[f];
function p(e, t, n, r) {
  e.addEventListener ? e.addEventListener(t, n, r) : e.attachEvent && e.attachEvent("on".concat(t), n);
}
function m(e, t, n, r) {
  e.removeEventListener ? e.removeEventListener(t, n, r) : e.attachEvent && e.detachEvent("on".concat(t), n);
}
function g(e, t) {
  var n = "function" === typeof e ? e(t) : e;
  return Array.isArray(n) ? 2 === n.length ? n : [n[0], n[1]] : [n];
}
var v = function (e) {
    return !isNaN(parseFloat(e)) && isFinite(e);
  },
  y = !("undefined" !== typeof window && window.document && window.document.createElement),
  b = function e(t, n, r, i) {
    if (!n || n === document || n instanceof Document) return !1;
    if (n === t.parentNode) return !0;
    var o = Math.max(Math.abs(r), Math.abs(i)) === Math.abs(i),
      a = Math.max(Math.abs(r), Math.abs(i)) === Math.abs(r),
      s = n.scrollHeight - n.clientHeight,
      l = n.scrollWidth - n.clientWidth,
      c = document.defaultView.getComputedStyle(n),
      u = "auto" === c.overflowY || "scroll" === c.overflowY,
      h = "auto" === c.overflowX || "scroll" === c.overflowX,
      f = s && u,
      d = l && h;
    return !!(o && (!f || f && (n.scrollTop >= s && i < 0 || n.scrollTop <= 0 && i > 0)) || a && (!d || d && (n.scrollLeft >= l && l < 0 || n.scrollLeft <= 0 && l > 0))) && e(t, n.parentNode, r, i);
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
function _(e, t) {
  if (null == e) return {};
  var n,
    r,
    i = E(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
  }
  return i;
}
function E(e, t) {
  if (null == e) return {};
  var n,
    r,
    i = {},
    o = Object.keys(e);
  for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || (i[n] = e[n]);
  return i;
}
function S(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function k(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function C(e, t, n) {
  return t && k(e.prototype, t), n && k(e, n), e;
}
function O(e, t) {
  return !t || "object" !== w(t) && "function" !== typeof t ? L(e) : t;
}
function T(e) {
  return T = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, T(e);
}
function L(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function A(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && P(e, t);
}
function P(e, t) {
  return P = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, P(e, t);
}
var j = {},
  M = function (e) {
    function t(e) {
      var n;
      return S(this, t), n = O(this, T(t).call(this, e)), n.domFocus = function () {
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
            i = e.changedTouches[0].clientY - n.startPos.y;
          (t === n.maskDom || t === n.handlerDom || t === n.contentDom && b(t, e.target, r, i)) && e.preventDefault();
        }
      }, n.transitionEnd = function (e) {
        var t = e.target;
        m(t, d, n.transitionEnd), t.style.transition = "";
      }, n.onKeyDown = function (e) {
        if (e.keyCode === c["a"].ESC) {
          var t = n.props.onClose;
          e.stopPropagation(), t && t(e);
        }
      }, n.onWrapperTransitionEnd = function (e) {
        var t = n.props,
          r = t.open,
          i = t.afterVisibleChange;
        e.target === n.contentWrapper && e.propertyName.match(/transform$/) && (n.dom.style.transition = "", !r && n.getCurrentDrawerSome() && (document.body.style.overflowX = "", n.maskDom && (n.maskDom.style.left = "", n.maskDom.style.width = "")), i && i(!!r));
      }, n.openLevelTransition = function () {
        var e = n.props,
          t = e.open,
          r = e.width,
          i = e.height,
          o = n.getHorizontalBoolAndPlacementName(),
          a = o.isHorizontal,
          s = o.placementName,
          l = n.contentDom ? n.contentDom.getBoundingClientRect()[a ? "width" : "height"] : 0,
          c = (a ? r : i) || l;
        n.setLevelAndScrolling(t, s, c);
      }, n.setLevelTransform = function (e, t, r, i) {
        var o = n.props,
          a = o.placement,
          s = o.levelMove,
          l = o.duration,
          c = o.ease,
          u = o.showMask;
        n.levelDom.forEach(function (o) {
          o.style.transition = "transform ".concat(l, " ").concat(c), p(o, d, n.transitionEnd);
          var h = e ? r : 0;
          if (s) {
            var f = g(s, {
              target: o,
              open: e
            });
            h = e ? f[0] : f[1] || 0;
          }
          var m = "number" === typeof h ? "".concat(h, "px") : h,
            v = "left" === a || "top" === a ? m : "-".concat(m);
          v = u && "right" === a && i ? "calc(".concat(v, " + ").concat(i, "px)") : v, o.style.transform = h ? "".concat(t, "(").concat(v, ")") : "";
        });
      }, n.setLevelAndScrolling = function (e, t, r) {
        var i = n.props.onChange;
        if (!y) {
          var o = document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth ? Object(l["a"])(!0) : 0;
          n.setLevelTransform(e, t, r, o), n.toggleScrollingToDrawerAndBody(o);
        }
        i && i(e);
      }, n.toggleScrollingToDrawerAndBody = function (e) {
        var t = n.props,
          r = t.getOpenCount,
          i = t.getContainer,
          o = t.showMask,
          a = t.open,
          s = i && i(),
          l = r && r();
        if (s && s.parentNode === document.body && o) {
          var c = ["touchstart"],
            u = [document.body, n.maskDom, n.handlerDom, n.contentDom];
          a && "hidden" !== document.body.style.overflow ? (e && n.addScrollingEffect(e), 1 === l && (document.body.style.overflow = "hidden"), document.body.style.touchAction = "none", u.forEach(function (e, t) {
            e && p(e, c[t] || "touchmove", t ? n.removeMoveHandler : n.removeStartHandler, n.passive);
          })) : n.getCurrentDrawerSome() && (l || (document.body.style.overflow = ""), document.body.style.touchAction = "", e && n.remScrollingEffect(e), u.forEach(function (e, t) {
            e && m(e, c[t] || "touchmove", t ? n.removeMoveHandler : n.removeStartHandler, n.passive);
          }));
        }
      }, n.addScrollingEffect = function (e) {
        var t = n.props,
          r = t.placement,
          i = t.duration,
          o = t.ease,
          a = t.getOpenCount,
          s = t.switchScrollingEffect,
          l = a && a();
        1 === l && s();
        var c = "width ".concat(i, " ").concat(o),
          u = "transform ".concat(i, " ").concat(o);
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
          n.dom && (n.dom.style.transition = "".concat(u, ",").concat(c), n.dom.style.width = "", n.dom.style.transform = "");
        });
      }, n.remScrollingEffect = function (e) {
        var t,
          r = n.props,
          i = r.placement,
          o = r.duration,
          a = r.ease,
          s = r.getOpenCount,
          l = r.switchScrollingEffect,
          c = s && s();
        c || l(!0), f && (document.body.style.overflowX = "hidden"), n.dom.style.transition = "none";
        var u = "width ".concat(o, " ").concat(a),
          h = "transform ".concat(o, " ").concat(a);
        switch (i) {
          case "left":
            n.dom.style.width = "100%", u = "width 0s ".concat(a, " ").concat(o);
            break;
          case "right":
            n.dom.style.transform = "translateX(".concat(e, "px)"), n.dom.style.width = "100%", u = "width 0s ".concat(a, " ").concat(o), n.maskDom && (n.maskDom.style.left = "-".concat(e, "px"), n.maskDom.style.width = "calc(100% + ".concat(e, "px)"));
            break;
          case "top":
          case "bottom":
            n.dom.style.width = "calc(100% + ".concat(e, "px)"), n.dom.style.height = "100%", n.dom.style.transform = "translateZ(0)", t = "height 0s ".concat(a, " ").concat(o);
            break;
          default:
            break;
        }
        clearTimeout(n.timeout), n.timeout = setTimeout(function () {
          n.dom && (n.dom.style.transition = "".concat(h, ",").concat(t ? "".concat(t, ",") : "").concat(u), n.dom.style.transform = "", n.dom.style.width = "", n.dom.style.height = "");
        });
      }, n.getCurrentDrawerSome = function () {
        return !Object.keys(j).some(function (e) {
          return j[e];
        });
      }, n.getLevelDom = function (e) {
        var t = e.level,
          r = e.getContainer;
        if (!y) {
          var i = r && r(),
            o = i ? i.parentNode : null;
          if (n.levelDom = [], "all" === t) {
            var a = o ? Array.prototype.slice.call(o.children) : [];
            a.forEach(function (e) {
              "SCRIPT" !== e.nodeName && "STYLE" !== e.nodeName && "LINK" !== e.nodeName && e !== i && n.levelDom.push(e);
            });
          } else t && u(t).forEach(function (e) {
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
        _self: L(n)
      }, n;
    }
    return A(t, e), C(t, [{
      key: "componentDidMount",
      value: function () {
        var e = this;
        if (!y) {
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
        this.drawerId = "drawer_id_".concat(Number((Date.now() + Math.random()).toString().replace(".", Math.round(9 * Math.random()).toString())).toString(16)), this.getLevelDom(this.props), n && (j[this.drawerId] = n, this.openLevelTransition(), this.forceUpdate(function () {
          e.domFocus();
        }));
      }
    }, {
      key: "componentDidUpdate",
      value: function (e) {
        var t = this.props.open;
        t !== e.open && (t && this.domFocus(), j[this.drawerId] = !!t, this.openLevelTransition());
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        var e = this.props,
          t = e.getOpenCount,
          n = e.open,
          r = e.switchScrollingEffect,
          i = "function" === typeof t && t();
        delete j[this.drawerId], n && (this.setLevelTransform(!1), document.body.style.touchAction = ""), i || (document.body.style.overflow = "", r(!0));
      }
    }, {
      key: "render",
      value: function () {
        var e,
          t = this,
          n = this.props,
          r = n.className,
          o = n.children,
          a = n.style,
          l = n.width,
          c = n.height,
          u = (n.defaultOpen, n.open),
          h = n.prefixCls,
          f = n.placement,
          d = (n.level, n.levelMove, n.ease, n.duration, n.getContainer, n.handler),
          p = (n.onChange, n.afterVisibleChange, n.showMask),
          m = n.maskClosable,
          g = n.maskStyle,
          y = n.onClose,
          b = n.onHandleClick,
          w = n.keyboard,
          E = (n.getOpenCount, n.switchScrollingEffect, _(n, ["className", "children", "style", "width", "height", "defaultOpen", "open", "prefixCls", "placement", "level", "levelMove", "ease", "duration", "getContainer", "handler", "onChange", "afterVisibleChange", "showMask", "maskClosable", "maskStyle", "onClose", "onHandleClick", "keyboard", "getOpenCount", "switchScrollingEffect"])),
          S = !!this.dom && u,
          k = s()(h, (e = {}, x(e, "".concat(h, "-").concat(f), !0), x(e, "".concat(h, "-open"), S), x(e, r || "", !!r), x(e, "no-mask", !p), e)),
          C = this.getHorizontalBoolAndPlacementName(),
          O = C.placementName,
          T = "left" === f || "top" === f ? "-100%" : "100%",
          L = S ? "" : "".concat(O, "(").concat(T, ")"),
          A = d && i["cloneElement"](d, {
            onClick: function (e) {
              d.props.onClick && d.props.onClick(), b && b(e);
            },
            ref: function (e) {
              t.handlerDom = e;
            }
          });
        return i["createElement"]("div", Object.assign({}, E, {
          tabIndex: -1,
          className: k,
          style: a,
          ref: function (e) {
            t.dom = e;
          },
          onKeyDown: S && w ? this.onKeyDown : void 0,
          onTransitionEnd: this.onWrapperTransitionEnd
        }), p && i["createElement"]("div", {
          className: "".concat(h, "-mask"),
          onClick: m ? y : void 0,
          style: g,
          ref: function (e) {
            t.maskDom = e;
          }
        }), i["createElement"]("div", {
          className: "".concat(h, "-content-wrapper"),
          style: {
            transform: L,
            msTransform: L,
            width: v(l) ? "".concat(l, "px") : l,
            height: v(c) ? "".concat(c, "px") : c
          },
          ref: function (e) {
            t.contentWrapper = e;
          }
        }, i["createElement"]("div", {
          className: "".concat(h, "-content"),
          ref: function (e) {
            t.contentDom = e;
          },
          onTouchStart: S && p ? this.removeStartHandler : void 0,
          onTouchMove: S && p ? this.removeMoveHandler : void 0
        }, o), A));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function (e, t) {
        var n = t.prevProps,
          r = t._self,
          i = {
            prevProps: e
          };
        if (void 0 !== n) {
          var o = e.placement,
            a = e.level;
          o !== n.placement && (r.contentDom = null), a !== n.level && r.getLevelDom(e);
        }
        return i;
      }
    }]), t;
  }(i["Component"]);
M.defaultProps = {
  switchScrollingEffect: function () {}
};
var R = Object(o["polyfill"])(M);
function N(e) {
  return N = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, N(e);
}
function D(e, t) {
  if (null == e) return {};
  var n,
    r,
    i = I(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
  }
  return i;
}
function I(e, t) {
  if (null == e) return {};
  var n,
    r,
    i = {},
    o = Object.keys(e);
  for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || (i[n] = e[n]);
  return i;
}
function $(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function F(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function B(e, t, n) {
  return t && F(e.prototype, t), n && F(e, n), e;
}
function V(e, t) {
  return !t || "object" !== N(t) && "function" !== typeof t ? W(e) : t;
}
function W(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function H(e) {
  return H = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, H(e);
}
function U(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && z(e, t);
}
function z(e, t) {
  return z = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, z(e, t);
}
var G = function (e) {
  function t(e) {
    var n;
    $(this, t), n = V(this, H(t).call(this, e)), n.onHandleClick = function (e) {
      var t = n.props,
        r = t.onHandleClick,
        i = t.open;
      if (r && r(e), "undefined" === typeof i) {
        var o = n.state.open;
        n.setState({
          open: !o
        });
      }
    }, n.onClose = function (e) {
      var t = n.props,
        r = t.onClose,
        i = t.open;
      r && r(e), "undefined" === typeof i && n.setState({
        open: !1
      });
    };
    var r = "undefined" !== typeof e.open ? e.open : !!e.defaultOpen;
    return n.state = {
      open: r
    }, "onMaskClick" in e && console.warn("`onMaskClick` are removed, please use `onClose` instead."), n;
  }
  return U(t, e), B(t, [{
    key: "render",
    value: function () {
      var e = this,
        t = this.props,
        n = (t.defaultOpen, t.getContainer),
        o = t.wrapperClassName,
        a = t.forceRender,
        s = t.handler,
        l = D(t, ["defaultOpen", "getContainer", "wrapperClassName", "forceRender", "handler"]),
        c = this.state.open;
      if (!n) return i["createElement"]("div", {
        className: o,
        ref: function (t) {
          e.dom = t;
        }
      }, i["createElement"](R, Object.assign({}, l, {
        open: c,
        handler: s,
        getContainer: function () {
          return e.dom;
        },
        onClose: this.onClose,
        onHandleClick: this.onHandleClick
      })));
      var u = !!s || a;
      return i["createElement"](r["a"], {
        visible: c,
        forceRender: u,
        getContainer: n,
        wrapperClassName: o
      }, function (t) {
        var n = t.visible,
          r = t.afterClose,
          o = D(t, ["visible", "afterClose"]);
        return i["createElement"](R, Object.assign({}, l, o, {
          open: void 0 !== n ? n : c,
          afterVisibleChange: void 0 !== r ? r : l.afterVisibleChange,
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
}(i["Component"]);
G.defaultProps = {
  prefixCls: "drawer",
  placement: "left",
  getContainer: "body",
  defaultOpen: !1,
  level: "all",
  duration: ".3s",
  ease: "cubic-bezier(0.78, 0.14, 0.15, 0.86)",
  onChange: function () {},
  afterVisibleChange: function () {},
  handler: i["createElement"]("div", {
    className: "drawer-handle"
  }, i["createElement"]("i", {
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
var q = Object(o["polyfill"])(G);
legacyExports["a"] = q;
