let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./reactRuntime.js"),
  i = interopDefault(r),
  o = require("./7849304a.js"),
  a = require("./34496c57.js"),
  s = require("./32475336.js"),
  l = require("./47797478.js"),
  c = interopDefault(l),
  u = require("./classNames.js"),
  h = interopDefault(u);
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
function d(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? f(Object(n), !0).forEach(function (t) {
      p(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : f(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function p(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function m(e, t) {
  return y(e) || v(e, t) || g();
}
function g() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function v(e, t) {
  if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) {
    var n = [],
      r = !0,
      i = !1,
      o = void 0;
    try {
      for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done); r = !0) if (n.push(a.value), t && n.length === t) break;
    } catch (e) {
      i = !0, o = e;
    } finally {
      try {
        r || null == s["return"] || s["return"]();
      } finally {
        if (i) throw o;
      }
    }
    return n;
  }
}
function y(e) {
  if (Array.isArray(e)) return e;
}
var b = /iPhone/i,
  w = /iPod/i,
  x = /iPad/i,
  _ = /\bAndroid(?:.+)Mobile\b/i,
  E = /Android/i,
  S = /\bAndroid(?:.+)SD4930UR\b/i,
  k = /\bAndroid(?:.+)(?:KF[A-Z]{2,4})\b/i,
  C = /Windows Phone/i,
  O = /\bWindows(?:.+)ARM\b/i,
  T = /BlackBerry/i,
  L = /BB10/i,
  A = /Opera Mini/i,
  P = /\b(CriOS|Chrome)(?:.+)Mobile/i,
  j = /Mobile(?:.+)Firefox\b/i;
function M(e, t) {
  return e.test(t);
}
function R(e) {
  var t = e || ("undefined" !== typeof navigator ? navigator.userAgent : ""),
    n = t.split("[FBAN");
  if ("undefined" !== typeof n[1]) {
    var r = n,
      i = m(r, 1);
    t = i[0];
  }
  if (n = t.split("Twitter"), "undefined" !== typeof n[1]) {
    var o = n,
      a = m(o, 1);
    t = a[0];
  }
  var s = {
    apple: {
      phone: M(b, t) && !M(C, t),
      ipod: M(w, t),
      tablet: !M(b, t) && M(x, t) && !M(C, t),
      device: (M(b, t) || M(w, t) || M(x, t)) && !M(C, t)
    },
    amazon: {
      phone: M(S, t),
      tablet: !M(S, t) && M(k, t),
      device: M(S, t) || M(k, t)
    },
    android: {
      phone: !M(C, t) && M(S, t) || !M(C, t) && M(_, t),
      tablet: !M(C, t) && !M(S, t) && !M(_, t) && (M(k, t) || M(E, t)),
      device: !M(C, t) && (M(S, t) || M(k, t) || M(_, t) || M(E, t)) || M(/\bokhttp\b/i, t)
    },
    windows: {
      phone: M(C, t),
      tablet: M(O, t),
      device: M(C, t) || M(O, t)
    },
    other: {
      blackberry: M(T, t),
      blackberry10: M(L, t),
      opera: M(A, t),
      firefox: M(j, t),
      chrome: M(P, t),
      device: M(T, t) || M(L, t) || M(A, t) || M(j, t) || M(P, t)
    },
    any: null,
    phone: null,
    tablet: null
  };
  return s.any = s.apple.device || s.android.device || s.windows.device || s.other.device, s.phone = s.apple.phone || s.android.phone || s.windows.phone, s.tablet = s.apple.tablet || s.android.tablet || s.windows.tablet, s;
}
var N = d({}, R(), {
    isMobile: R
  }),
  D = N;
function I(e) {
  return I = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, I(e);
}
function $() {}
function F(e, t, n) {
  var r = t || "";
  return e.key || "".concat(r, "item_").concat(n);
}
function B(e) {
  return "".concat(e, "-menu-");
}
function V(e, t) {
  var n = -1;
  r["Children"].forEach(e, function (e) {
    n += 1, e && e.type && e.type.isMenuItemGroup ? r["Children"].forEach(e.props.children, function (e) {
      n += 1, t(e, n);
    }) : t(e, n);
  });
}
function W(e, t, n) {
  e && !n.find && r["Children"].forEach(e, function (e) {
    if (e) {
      var r = e.type;
      if (!r || !(r.isSubMenu || r.isMenuItem || r.isMenuItemGroup)) return;
      -1 !== t.indexOf(e.key) ? n.find = !0 : e.props.children && W(e.props.children, t, n);
    }
  });
}
var H = ["defaultSelectedKeys", "selectedKeys", "defaultOpenKeys", "openKeys", "mode", "getPopupContainer", "onSelect", "onDeselect", "onDestroy", "openTransitionName", "openAnimation", "subMenuOpenDelay", "subMenuCloseDelay", "forceSubMenuRender", "triggerSubMenuAction", "level", "selectable", "multiple", "onOpenChange", "visible", "focusable", "defaultActiveFirst", "prefixCls", "inlineIndent", "parentMenu", "title", "rootPrefixCls", "eventKey", "active", "onItemHover", "onTitleMouseEnter", "onTitleMouseLeave", "onTitleClick", "popupAlign", "popupOffset", "isOpen", "renderMenuItem", "manualRef", "subMenuKey", "disabled", "index", "isSelected", "store", "activeKey", "builtinPlacements", "overflowedIndicator", "motion", "attribute", "value", "popupClassName", "inlineCollapsed", "menu", "theme", "itemIcon", "expandIcon"],
  U = function (e) {
    var t = e && "function" === typeof e.getBoundingClientRect && e.getBoundingClientRect().width;
    return t && (t = +t.toFixed(6)), t || 0;
  },
  z = function (e, t, n) {
    e && "object" === I(e.style) && (e.style[t] = n);
  },
  G = function () {
    return D.any;
  },
  q = require("./reactDomRuntime.js"),
  K = interopDefault(q),
  Y = require("./6264674b.js"),
  X = require("./75636958.js"),
  Q = require("./59454956.js"),
  Z = interopDefault(Q),
  J = require("./51624c5a.js"),
  ee = interopDefault(J),
  te = require("./69436335.js"),
  ne = interopDefault(te),
  re = require("./56376f43.js"),
  ie = interopDefault(re),
  oe = require("./46597733.js"),
  ae = interopDefault(oe),
  se = require("./6d526730.js"),
  le = interopDefault(se),
  ce = require("./propTypesRuntime.js"),
  ue = interopDefault(ce),
  he = require("./reactLifecyclesCompat.js");
function fe(e) {
  return e instanceof HTMLElement ? e : K.a.findDOMNode(e);
}
var de = require("./78456b55.js"),
  pe = interopDefault(de),
  me = !("undefined" === typeof window || !window.document || !window.document.createElement);
function ge(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n["ms" + e] = "MS" + t, n["O" + e] = "o" + t.toLowerCase(), n;
}
function ve(e, t) {
  var n = {
    animationend: ge("Animation", "AnimationEnd"),
    transitionend: ge("Transition", "TransitionEnd")
  };
  return e && ("AnimationEvent" in t || delete n.animationend.animation, "TransitionEvent" in t || delete n.transitionend.transition), n;
}
var ye = ve(me, "undefined" !== typeof window ? window : {}),
  be = {};
me && (be = document.createElement("div").style);
var we = {};
function xe(e) {
  if (we[e]) return we[e];
  var t = ye[e];
  if (t) for (var n = Object.keys(t), r = n.length, i = 0; i < r; i += 1) {
    var o = n[i];
    if (Object.prototype.hasOwnProperty.call(t, o) && o in be) return we[e] = t[o], we[e];
  }
  return "";
}
var _e = xe("animationend"),
  Ee = xe("transitionend"),
  Se = !(!_e || !Ee);
function ke(e, t) {
  if (!e) return null;
  if ("object" === typeof e) {
    var n = t.replace(/-\w/g, function (e) {
      return e[1].toUpperCase();
    });
    return e[n];
  }
  return e + "-" + t;
}
var Ce = "none",
  Oe = "appear",
  Te = "enter",
  Le = "leave",
  Ae = {
    eventProps: ue.a.object,
    visible: ue.a.bool,
    children: ue.a.func,
    motionName: ue.a.oneOfType([ue.a.string, ue.a.object]),
    motionAppear: ue.a.bool,
    motionEnter: ue.a.bool,
    motionLeave: ue.a.bool,
    motionLeaveImmediately: ue.a.bool,
    motionDeadline: ue.a.number,
    removeOnLeave: ue.a.bool,
    leavedClassName: ue.a.string,
    onAppearStart: ue.a.func,
    onAppearActive: ue.a.func,
    onAppearEnd: ue.a.func,
    onEnterStart: ue.a.func,
    onEnterActive: ue.a.func,
    onEnterEnd: ue.a.func,
    onLeaveStart: ue.a.func,
    onLeaveActive: ue.a.func,
    onLeaveEnd: ue.a.func
  };
function Pe(e) {
  var t = e,
    n = !!i.a.forwardRef;
  function r(e) {
    return !(!e.motionName || !t);
  }
  "object" === typeof e && (t = e.transitionSupport, n = "forwardRef" in e ? e.forwardRef : n);
  var o = function (e) {
    function t() {
      ne()(this, t);
      var e = ae()(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
      return e.onDomUpdate = function () {
        var t = e.state,
          n = t.status,
          i = t.newStatus,
          o = e.props,
          a = o.onAppearStart,
          s = o.onEnterStart,
          l = o.onLeaveStart,
          c = o.onAppearActive,
          u = o.onEnterActive,
          h = o.onLeaveActive,
          f = o.motionAppear,
          d = o.motionEnter,
          p = o.motionLeave;
        if (r(e.props)) {
          var m = e.getElement();
          e.$cacheEle !== m && (e.removeEventListener(e.$cacheEle), e.addEventListener(m), e.$cacheEle = m), i && n === Oe && f ? e.updateStatus(a, null, null, function () {
            e.updateActiveStatus(c, Oe);
          }) : i && n === Te && d ? e.updateStatus(s, null, null, function () {
            e.updateActiveStatus(u, Te);
          }) : i && n === Le && p && e.updateStatus(l, null, null, function () {
            e.updateActiveStatus(h, Le);
          });
        }
      }, e.onMotionEnd = function (t) {
        var n = e.state,
          r = n.status,
          i = n.statusActive,
          o = e.props,
          a = o.onAppearEnd,
          s = o.onEnterEnd,
          l = o.onLeaveEnd;
        r === Oe && i ? e.updateStatus(a, {
          status: Ce
        }, t) : r === Te && i ? e.updateStatus(s, {
          status: Ce
        }, t) : r === Le && i && e.updateStatus(l, {
          status: Ce
        }, t);
      }, e.setNodeRef = function (t) {
        var n = e.props.internalRef;
        e.node = t, "function" === typeof n ? n(t) : n && "current" in n && (n.current = t);
      }, e.getElement = function () {
        try {
          return fe(e.node || e);
        } catch (t) {
          return e.$cacheEle;
        }
      }, e.addEventListener = function (t) {
        t && (t.addEventListener(Ee, e.onMotionEnd), t.addEventListener(_e, e.onMotionEnd));
      }, e.removeEventListener = function (t) {
        t && (t.removeEventListener(Ee, e.onMotionEnd), t.removeEventListener(_e, e.onMotionEnd));
      }, e.updateStatus = function (t, n, r, i) {
        var o = t ? t(e.getElement(), r) : null;
        if (!1 !== o && !e._destroyed) {
          var a = void 0;
          i && (a = function () {
            e.nextFrame(i);
          }), e.setState(ee()({
            statusStyle: "object" === typeof o ? o : null,
            newStatus: !1
          }, n), a);
        }
      }, e.updateActiveStatus = function (t, n) {
        e.nextFrame(function () {
          var r = e.state.status;
          if (r === n) {
            var i = e.props.motionDeadline;
            e.updateStatus(t, {
              statusActive: !0
            }), i > 0 && setTimeout(function () {
              e.onMotionEnd({
                deadline: !0
              });
            }, i);
          }
        });
      }, e.nextFrame = function (t) {
        e.cancelNextFrame(), e.raf = pe()(t);
      }, e.cancelNextFrame = function () {
        e.raf && (pe.a.cancel(e.raf), e.raf = null);
      }, e.state = {
        status: Ce,
        statusActive: !1,
        newStatus: !1,
        statusStyle: null
      }, e.$cacheEle = null, e.node = null, e.raf = null, e;
    }
    return le()(t, e), ie()(t, [{
      key: "componentDidMount",
      value: function () {
        this.onDomUpdate();
      }
    }, {
      key: "componentDidUpdate",
      value: function () {
        this.onDomUpdate();
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        this._destroyed = !0, this.removeEventListener(this.$cacheEle), this.cancelNextFrame();
      }
    }, {
      key: "render",
      value: function () {
        var e,
          t = this.state,
          n = t.status,
          i = t.statusActive,
          o = t.statusStyle,
          a = this.props,
          s = a.children,
          l = a.motionName,
          c = a.visible,
          u = a.removeOnLeave,
          f = a.leavedClassName,
          d = a.eventProps;
        return s ? n !== Ce && r(this.props) ? s(ee()({}, d, {
          className: h()((e = {}, Z()(e, ke(l, n), n !== Ce), Z()(e, ke(l, n + "-active"), n !== Ce && i), Z()(e, l, "string" === typeof l), e)),
          style: o
        }), this.setNodeRef) : c ? s(ee()({}, d), this.setNodeRef) : u ? null : s(ee()({}, d, {
          className: f
        }), this.setNodeRef) : null;
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function (e, t) {
        var n = t.prevProps,
          i = t.status;
        if (!r(e)) return {};
        var o = e.visible,
          a = e.motionAppear,
          s = e.motionEnter,
          l = e.motionLeave,
          c = e.motionLeaveImmediately,
          u = {
            prevProps: e
          };
        return (i === Oe && !a || i === Te && !s || i === Le && !l) && (u.status = Ce, u.statusActive = !1, u.newStatus = !1), !n && o && a && (u.status = Oe, u.statusActive = !1, u.newStatus = !0), n && !n.visible && o && s && (u.status = Te, u.statusActive = !1, u.newStatus = !0), (n && n.visible && !o && l || !n && c && !o && l) && (u.status = Le, u.statusActive = !1, u.newStatus = !0), u;
      }
    }]), t;
  }(i.a.Component);
  return o.propTypes = ee()({}, Ae, {
    internalRef: ue.a.oneOfType([ue.a.object, ue.a.func])
  }), o.defaultProps = {
    visible: !0,
    motionEnter: !0,
    motionAppear: !0,
    motionLeave: !0,
    removeOnLeave: !0
  }, Object(he["polyfill"])(o), n ? i.a.forwardRef(function (e, t) {
    return i.a.createElement(o, ee()({
      internalRef: t
    }, e));
  }) : o;
}
var je = Pe(Se),
  Me = {
    adjustX: 1,
    adjustY: 1
  },
  Re = {
    topLeft: {
      points: ["bl", "tl"],
      overflow: Me,
      offset: [0, -7]
    },
    bottomLeft: {
      points: ["tl", "bl"],
      overflow: Me,
      offset: [0, 7]
    },
    leftTop: {
      points: ["tr", "tl"],
      overflow: Me,
      offset: [-4, 0]
    },
    rightTop: {
      points: ["tl", "tr"],
      overflow: Me,
      offset: [4, 0]
    }
  },
  Ne = Re;
function De(e) {
  return De = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, De(e);
}
function Ie(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function $e(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function Fe(e, t, n) {
  return t && $e(e.prototype, t), n && $e(e, n), e;
}
function Be(e, t) {
  return !t || "object" !== De(t) && "function" !== typeof t ? We(e) : t;
}
function Ve(e) {
  return Ve = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, Ve(e);
}
function We(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function He(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && Ue(e, t);
}
function Ue(e, t) {
  return Ue = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, Ue(e, t);
}
function ze(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Ge(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? ze(Object(n), !0).forEach(function (t) {
      qe(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ze(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function qe(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var Ke = 0,
  Ye = {
    horizontal: "bottomLeft",
    vertical: "rightTop",
    "vertical-left": "rightTop",
    "vertical-right": "leftTop"
  },
  Xe = function (e, t, n) {
    var r = B(t),
      i = e.getState();
    e.setState({
      defaultActiveFirst: Ge({}, i.defaultActiveFirst, qe({}, r, n))
    });
  },
  Qe = function (e) {
    function t(e) {
      var n;
      Ie(this, t), n = Be(this, Ve(t).call(this, e)), n.onDestroy = function (e) {
        n.props.onDestroy(e);
      }, n.onKeyDown = function (e) {
        var t = e.keyCode,
          r = n.menuInstance,
          i = n.props,
          o = i.isOpen,
          s = i.store;
        if (t === a["a"].ENTER) return n.onTitleClick(e), Xe(s, n.props.eventKey, !0), !0;
        if (t === a["a"].RIGHT) return o ? r.onKeyDown(e) : (n.triggerOpenChange(!0), Xe(s, n.props.eventKey, !0)), !0;
        if (t === a["a"].LEFT) {
          var l;
          if (!o) return;
          return l = r.onKeyDown(e), l || (n.triggerOpenChange(!1), l = !0), l;
        }
        return !o || t !== a["a"].UP && t !== a["a"].DOWN ? void 0 : r.onKeyDown(e);
      }, n.onOpenChange = function (e) {
        n.props.onOpenChange(e);
      }, n.onPopupVisibleChange = function (e) {
        n.triggerOpenChange(e, e ? "mouseenter" : "mouseleave");
      }, n.onMouseEnter = function (e) {
        var t = n.props,
          r = t.eventKey,
          i = t.onMouseEnter,
          o = t.store;
        Xe(o, n.props.eventKey, !1), i({
          key: r,
          domEvent: e
        });
      }, n.onMouseLeave = function (e) {
        var t = n.props,
          r = t.parentMenu,
          i = t.eventKey,
          o = t.onMouseLeave;
        r.subMenuInstance = We(n), o({
          key: i,
          domEvent: e
        });
      }, n.onTitleMouseEnter = function (e) {
        var t = n.props,
          r = t.eventKey,
          i = t.onItemHover,
          o = t.onTitleMouseEnter;
        i({
          key: r,
          hover: !0
        }), o({
          key: r,
          domEvent: e
        });
      }, n.onTitleMouseLeave = function (e) {
        var t = n.props,
          r = t.parentMenu,
          i = t.eventKey,
          o = t.onItemHover,
          a = t.onTitleMouseLeave;
        r.subMenuInstance = We(n), o({
          key: i,
          hover: !1
        }), a({
          key: i,
          domEvent: e
        });
      }, n.onTitleClick = function (e) {
        var t = We(n),
          r = t.props;
        r.onTitleClick({
          key: r.eventKey,
          domEvent: e
        }), "hover" !== r.triggerSubMenuAction && (n.triggerOpenChange(!r.isOpen, "click"), Xe(r.store, n.props.eventKey, !1));
      }, n.onSubMenuClick = function (e) {
        "function" === typeof n.props.onClick && n.props.onClick(n.addKeyPath(e));
      }, n.onSelect = function (e) {
        n.props.onSelect(e);
      }, n.onDeselect = function (e) {
        n.props.onDeselect(e);
      }, n.getPrefixCls = function () {
        return "".concat(n.props.rootPrefixCls, "-submenu");
      }, n.getActiveClassName = function () {
        return "".concat(n.getPrefixCls(), "-active");
      }, n.getDisabledClassName = function () {
        return "".concat(n.getPrefixCls(), "-disabled");
      }, n.getSelectedClassName = function () {
        return "".concat(n.getPrefixCls(), "-selected");
      }, n.getOpenClassName = function () {
        return "".concat(n.props.rootPrefixCls, "-submenu-open");
      }, n.saveMenuInstance = function (e) {
        n.menuInstance = e;
      }, n.addKeyPath = function (e) {
        return Ge({}, e, {
          keyPath: (e.keyPath || []).concat(n.props.eventKey)
        });
      }, n.triggerOpenChange = function (e, t) {
        var r = n.props.eventKey,
          i = function () {
            n.onOpenChange({
              key: r,
              item: We(n),
              trigger: t,
              open: e
            });
          };
        "mouseenter" === t ? n.mouseenterTimeout = setTimeout(function () {
          i();
        }, 0) : i();
      }, n.isChildrenSelected = function () {
        var e = {
          find: !1
        };
        return W(n.props.children, n.props.selectedKeys, e), e.find;
      }, n.isOpen = function () {
        return -1 !== n.props.openKeys.indexOf(n.props.eventKey);
      }, n.adjustWidth = function () {
        if (n.subMenuTitle && n.menuInstance) {
          var e = q["findDOMNode"](n.menuInstance);
          e.offsetWidth >= n.subMenuTitle.offsetWidth || (e.style.minWidth = "".concat(n.subMenuTitle.offsetWidth, "px"));
        }
      }, n.saveSubMenuTitle = function (e) {
        n.subMenuTitle = e;
      };
      var r = e.store,
        i = e.eventKey,
        o = r.getState(),
        s = o.defaultActiveFirst;
      n.isRootMenu = !1;
      var l = !1;
      return s && (l = s[i]), Xe(r, i, l), n;
    }
    return He(t, e), Fe(t, [{
      key: "componentDidMount",
      value: function () {
        this.componentDidUpdate();
      }
    }, {
      key: "componentDidUpdate",
      value: function () {
        var e = this,
          t = this.props,
          n = t.mode,
          r = t.parentMenu,
          i = t.manualRef;
        i && i(this), "horizontal" === n && r.isRootMenu && this.props.isOpen && (this.minWidthTimeout = setTimeout(function () {
          return e.adjustWidth();
        }, 0));
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        var e = this.props,
          t = e.onDestroy,
          n = e.eventKey;
        t && t(n), this.minWidthTimeout && clearTimeout(this.minWidthTimeout), this.mouseenterTimeout && clearTimeout(this.mouseenterTimeout);
      }
    }, {
      key: "renderChildren",
      value: function (e) {
        var t = this,
          n = this.props,
          i = {
            mode: "horizontal" === n.mode ? "vertical" : n.mode,
            visible: this.props.isOpen,
            level: n.level + 1,
            inlineIndent: n.inlineIndent,
            focusable: !1,
            onClick: this.onSubMenuClick,
            onSelect: this.onSelect,
            onDeselect: this.onDeselect,
            onDestroy: this.onDestroy,
            selectedKeys: n.selectedKeys,
            eventKey: "".concat(n.eventKey, "-menu-"),
            openKeys: n.openKeys,
            motion: n.motion,
            onOpenChange: this.onOpenChange,
            subMenuOpenDelay: n.subMenuOpenDelay,
            parentMenu: this,
            subMenuCloseDelay: n.subMenuCloseDelay,
            forceSubMenuRender: n.forceSubMenuRender,
            triggerSubMenuAction: n.triggerSubMenuAction,
            builtinPlacements: n.builtinPlacements,
            defaultActiveFirst: n.store.getState().defaultActiveFirst[B(n.eventKey)],
            multiple: n.multiple,
            prefixCls: n.rootPrefixCls,
            id: this.internalMenuId,
            manualRef: this.saveMenuInstance,
            itemIcon: n.itemIcon,
            expandIcon: n.expandIcon
          },
          o = this.haveRendered;
        if (this.haveRendered = !0, this.haveOpened = this.haveOpened || i.visible || i.forceSubMenuRender, !this.haveOpened) return r["createElement"]("div", null);
        var a = Ge({}, n.motion, {
          leavedClassName: "".concat(n.rootPrefixCls, "-hidden"),
          removeOnLeave: !1,
          motionAppear: o || !i.visible || "inline" !== i.mode
        });
        return r["createElement"](je, Object.assign({
          visible: i.visible
        }, a), function (n) {
          var o = n.className,
            a = n.style,
            s = h()("".concat(i.prefixCls, "-sub"), o);
          return r["createElement"](Ht, Object.assign({}, i, {
            id: t.internalMenuId,
            className: s,
            style: a
          }), e);
        });
      }
    }, {
      key: "render",
      value: function () {
        var e,
          t = Ge({}, this.props),
          n = t.isOpen,
          i = this.getPrefixCls(),
          o = "inline" === t.mode,
          a = h()(i, "".concat(i, "-").concat(t.mode), (e = {}, qe(e, t.className, !!t.className), qe(e, this.getOpenClassName(), n), qe(e, this.getActiveClassName(), t.active || n && !o), qe(e, this.getDisabledClassName(), t.disabled), qe(e, this.getSelectedClassName(), this.isChildrenSelected()), e));
        this.internalMenuId || (t.eventKey ? this.internalMenuId = "".concat(t.eventKey, "$Menu") : (Ke += 1, this.internalMenuId = "$__$".concat(Ke, "$Menu")));
        var s = {},
          l = {},
          c = {};
        t.disabled || (s = {
          onMouseLeave: this.onMouseLeave,
          onMouseEnter: this.onMouseEnter
        }, l = {
          onClick: this.onTitleClick
        }, c = {
          onMouseEnter: this.onTitleMouseEnter,
          onMouseLeave: this.onTitleMouseLeave
        });
        var u = {};
        o && (u.paddingLeft = t.inlineIndent * t.level);
        var f = {};
        this.props.isOpen && (f = {
          "aria-owns": this.internalMenuId
        });
        var d = null;
        "horizontal" !== t.mode && (d = this.props.expandIcon, "function" === typeof this.props.expandIcon && (d = r["createElement"](this.props.expandIcon, Ge({}, this.props))));
        var p = r["createElement"]("div", Object.assign({
            ref: this.saveSubMenuTitle,
            style: u,
            className: "".concat(i, "-title")
          }, c, l, {
            "aria-expanded": n
          }, f, {
            "aria-haspopup": "true",
            title: "string" === typeof t.title ? t.title : void 0
          }), t.title, d || r["createElement"]("i", {
            className: "".concat(i, "-arrow")
          })),
          m = this.renderChildren(t.children),
          g = t.parentMenu.isRootMenu ? t.parentMenu.props.getPopupContainer : function (e) {
            return e.parentNode;
          },
          v = Ye[t.mode],
          y = t.popupOffset ? {
            offset: t.popupOffset
          } : {},
          b = "inline" === t.mode ? "" : t.popupClassName,
          w = t.disabled,
          x = t.triggerSubMenuAction,
          _ = t.subMenuOpenDelay,
          E = t.forceSubMenuRender,
          S = t.subMenuCloseDelay,
          k = t.builtinPlacements;
        return H.forEach(function (e) {
          return delete t[e];
        }), delete t.onClick, r["createElement"]("li", Object.assign({}, t, s, {
          className: a,
          role: "menuitem"
        }), o && p, o && m, !o && r["createElement"](X["a"], {
          prefixCls: i,
          popupClassName: "".concat(i, "-popup ").concat(b),
          getPopupContainer: g,
          builtinPlacements: Object.assign({}, Ne, k),
          popupPlacement: v,
          popupVisible: n,
          popupAlign: y,
          popup: m,
          action: w ? [] : [x],
          mouseEnterDelay: _,
          mouseLeaveDelay: S,
          onPopupVisibleChange: this.onPopupVisibleChange,
          forceRender: E
        }, p));
      }
    }]), t;
  }(r["Component"]);
Qe.defaultProps = {
  onMouseEnter: $,
  onMouseLeave: $,
  onTitleMouseEnter: $,
  onTitleMouseLeave: $,
  onTitleClick: $,
  manualRef: $,
  mode: "vertical",
  title: ""
};
var Ze = Object(o["connect"])(function (e, t) {
  var n = e.openKeys,
    r = e.activeKey,
    i = e.selectedKeys,
    o = t.eventKey,
    a = t.subMenuKey;
  return {
    isOpen: n.indexOf(o) > -1,
    active: r[a] === o,
    selectedKeys: i
  };
})(Qe);
Ze.isSubMenu = !0;
var Je = Ze;
function et(e) {
  return et = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, et(e);
}
function tt(e) {
  return it(e) || rt(e) || nt();
}
function nt() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function rt(e) {
  if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
}
function it(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = new Array(e.length); t < e.length; t++) n[t] = e[t];
    return n;
  }
}
function ot(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function at(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? ot(Object(n), !0).forEach(function (t) {
      st(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ot(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function st(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function lt(e, t) {
  if (null == e) return {};
  var n,
    r,
    i = ct(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
  }
  return i;
}
function ct(e, t) {
  if (null == e) return {};
  var n,
    r,
    i = {},
    o = Object.keys(e);
  for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || (i[n] = e[n]);
  return i;
}
function ut(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function ht(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function ft(e, t, n) {
  return t && ht(e.prototype, t), n && ht(e, n), e;
}
function dt(e, t) {
  return !t || "object" !== et(t) && "function" !== typeof t ? mt(e) : t;
}
function pt(e) {
  return pt = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, pt(e);
}
function mt(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function gt(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && vt(e, t);
}
function vt(e, t) {
  return vt = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, vt(e, t);
}
var yt = !("undefined" === typeof window || !window.document || !window.document.createElement),
  bt = "menuitem-overflowed",
  wt = .5;
yt && require("./444e3261.js");
var xt = function (e) {
  function t() {
    var e;
    return ut(this, t), e = dt(this, pt(t).apply(this, arguments)), e.resizeObserver = null, e.mutationObserver = null, e.originalTotalWidth = 0, e.overflowedItems = [], e.menuItemSizes = [], e.state = {
      lastVisibleIndex: void 0
    }, e.getMenuItemNodes = function () {
      var t = e.props.prefixCls,
        n = q["findDOMNode"](mt(e));
      return n ? [].slice.call(n.children).filter(function (e) {
        return e.className.split(" ").indexOf("".concat(t, "-overflowed-submenu")) < 0;
      }) : [];
    }, e.getOverflowedSubMenuItem = function (t, n, i) {
      var o = e.props,
        a = o.overflowedIndicator,
        s = o.level,
        l = o.mode,
        c = o.prefixCls,
        u = o.theme;
      if (1 !== s || "horizontal" !== l) return null;
      var h = e.props.children[0],
        f = h.props,
        d = (f.children, f.title, f.style),
        p = lt(f, ["children", "title", "style"]),
        m = at({}, d),
        g = "".concat(t, "-overflowed-indicator"),
        v = "".concat(t, "-overflowed-indicator");
      0 === n.length && !0 !== i ? m = at({}, m, {
        display: "none"
      }) : i && (m = at({}, m, {
        visibility: "hidden",
        position: "absolute"
      }), g = "".concat(g, "-placeholder"), v = "".concat(v, "-placeholder"));
      var y = u ? "".concat(c, "-").concat(u) : "",
        b = {};
      return H.forEach(function (e) {
        void 0 !== p[e] && (b[e] = p[e]);
      }), r["createElement"](Je, Object.assign({
        title: a,
        className: "".concat(c, "-overflowed-submenu"),
        popupClassName: y
      }, b, {
        key: g,
        eventKey: v,
        disabled: !1,
        style: m
      }), n);
    }, e.setChildrenWidthAndResize = function () {
      if ("horizontal" === e.props.mode) {
        var t = q["findDOMNode"](mt(e));
        if (t) {
          var n = t.children;
          if (n && 0 !== n.length) {
            var r = t.children[n.length - 1];
            z(r, "display", "inline-block");
            var i = e.getMenuItemNodes(),
              o = i.filter(function (e) {
                return e.className.split(" ").indexOf(bt) >= 0;
              });
            o.forEach(function (e) {
              z(e, "display", "inline-block");
            }), e.menuItemSizes = i.map(function (e) {
              return U(e);
            }), o.forEach(function (e) {
              z(e, "display", "none");
            }), e.overflowedIndicatorWidth = U(t.children[t.children.length - 1]), e.originalTotalWidth = e.menuItemSizes.reduce(function (e, t) {
              return e + t;
            }, 0), e.handleResize(), z(r, "display", "none");
          }
        }
      }
    }, e.handleResize = function () {
      if ("horizontal" === e.props.mode) {
        var t = q["findDOMNode"](mt(e));
        if (t) {
          var n = U(t);
          e.overflowedItems = [];
          var r,
            i = 0;
          e.originalTotalWidth > n + wt && (r = -1, e.menuItemSizes.forEach(function (t) {
            i += t, i + e.overflowedIndicatorWidth <= n && (r += 1);
          })), e.setState({
            lastVisibleIndex: r
          });
        }
      }
    }, e;
  }
  return gt(t, e), ft(t, [{
    key: "componentDidMount",
    value: function () {
      var e = this;
      if (this.setChildrenWidthAndResize(), 1 === this.props.level && "horizontal" === this.props.mode) {
        var t = q["findDOMNode"](this);
        if (!t) return;
        this.resizeObserver = new Y["default"](function (t) {
          t.forEach(e.setChildrenWidthAndResize);
        }), [].slice.call(t.children).concat(t).forEach(function (t) {
          e.resizeObserver.observe(t);
        }), "undefined" !== typeof MutationObserver && (this.mutationObserver = new MutationObserver(function () {
          e.resizeObserver.disconnect(), [].slice.call(t.children).concat(t).forEach(function (t) {
            e.resizeObserver.observe(t);
          }), e.setChildrenWidthAndResize();
        }), this.mutationObserver.observe(t, {
          attributes: !1,
          childList: !0,
          subTree: !1
        }));
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function () {
      this.resizeObserver && this.resizeObserver.disconnect(), this.mutationObserver && this.mutationObserver.disconnect();
    }
  }, {
    key: "renderChildren",
    value: function (e) {
      var t = this,
        n = this.state.lastVisibleIndex;
      return (e || []).reduce(function (i, o, a) {
        var s = o;
        if ("horizontal" === t.props.mode) {
          var l = t.getOverflowedSubMenuItem(o.props.eventKey, []);
          void 0 !== n && -1 !== t.props.className.indexOf("".concat(t.props.prefixCls, "-root")) && (a > n && (s = r["cloneElement"](o, {
            style: {
              display: "none"
            },
            eventKey: "".concat(o.props.eventKey, "-hidden"),
            className: "".concat(bt)
          })), a === n + 1 && (t.overflowedItems = e.slice(n + 1).map(function (e) {
            return r["cloneElement"](e, {
              key: e.props.eventKey,
              mode: "vertical-left"
            });
          }), l = t.getOverflowedSubMenuItem(o.props.eventKey, t.overflowedItems)));
          var c = [].concat(tt(i), [l, s]);
          return a === e.length - 1 && c.push(t.getOverflowedSubMenuItem(o.props.eventKey, [], !0)), c;
        }
        return [].concat(tt(i), [s]);
      }, []);
    }
  }, {
    key: "render",
    value: function () {
      var e = this.props,
        t = (e.visible, e.prefixCls, e.overflowedIndicator, e.mode, e.level, e.tag),
        n = e.children,
        i = (e.theme, lt(e, ["visible", "prefixCls", "overflowedIndicator", "mode", "level", "tag", "children", "theme"])),
        o = t;
      return r["createElement"](o, Object.assign({}, i), this.renderChildren(n));
    }
  }]), t;
}(r["Component"]);
xt.defaultProps = {
  tag: "div",
  className: ""
};
var _t = xt;
function Et(e) {
  return Et = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Et(e);
}
function St() {
  return St = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, St.apply(this, arguments);
}
function kt(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Ct(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function Ot(e, t, n) {
  return t && Ct(e.prototype, t), n && Ct(e, n), e;
}
function Tt(e, t) {
  return !t || "object" !== Et(t) && "function" !== typeof t ? At(e) : t;
}
function Lt(e) {
  return Lt = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, Lt(e);
}
function At(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Pt(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && jt(e, t);
}
function jt(e, t) {
  return jt = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, jt(e, t);
}
function Mt(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Rt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? Mt(Object(n), !0).forEach(function (t) {
      Nt(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Mt(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function Nt(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Dt(e) {
  return !e.length || e.every(function (e) {
    return !!e.props.disabled;
  });
}
function It(e, t, n) {
  var r = e.getState();
  e.setState({
    activeKey: Rt({}, r.activeKey, Nt({}, t, n))
  });
}
function $t(e) {
  return e.eventKey || "0-menu-";
}
function Ft(e, t) {
  var n,
    r = t,
    i = e.children,
    o = e.eventKey;
  if (r && (V(i, function (e, t) {
    e && e.props && !e.props.disabled && r === F(e, o, t) && (n = !0);
  }), n)) return r;
  return r = null, e.defaultActiveFirst ? (V(i, function (e, t) {
    r || !e || e.props.disabled || (r = F(e, o, t));
  }), r) : r;
}
function Bt(e) {
  if (e) {
    var t = this.instanceArray.indexOf(e);
    -1 !== t ? this.instanceArray[t] = e : this.instanceArray.push(e);
  }
}
var Vt = function (e) {
  function t(e) {
    var n;
    return kt(this, t), n = Tt(this, Lt(t).call(this, e)), n.onKeyDown = function (e, t) {
      var r,
        i = e.keyCode;
      if (n.getFlatInstanceArray().forEach(function (t) {
        t && t.props.active && t.onKeyDown && (r = t.onKeyDown(e));
      }), r) return 1;
      var o = null;
      return i !== a["a"].UP && i !== a["a"].DOWN || (o = n.step(i === a["a"].UP ? -1 : 1)), o ? (e.preventDefault(), It(n.props.store, $t(n.props), o.props.eventKey), "function" === typeof t && t(o), 1) : void 0;
    }, n.onItemHover = function (e) {
      var t = e.key,
        r = e.hover;
      It(n.props.store, $t(n.props), r ? t : null);
    }, n.onDeselect = function (e) {
      n.props.onDeselect(e);
    }, n.onSelect = function (e) {
      n.props.onSelect(e);
    }, n.onClick = function (e) {
      n.props.onClick(e);
    }, n.onOpenChange = function (e) {
      n.props.onOpenChange(e);
    }, n.onDestroy = function (e) {
      n.props.onDestroy(e);
    }, n.getFlatInstanceArray = function () {
      return n.instanceArray;
    }, n.step = function (e) {
      var t = n.getFlatInstanceArray(),
        r = n.props.store.getState().activeKey[$t(n.props)],
        i = t.length;
      if (!i) return null;
      e < 0 && (t = t.concat().reverse());
      var o = -1;
      if (t.every(function (e, t) {
        return !e || e.props.eventKey !== r || (o = t, !1);
      }), n.props.defaultActiveFirst || -1 === o || !Dt(t.slice(o, i - 1))) {
        var a = (o + 1) % i,
          s = a;
        do {
          var l = t[s];
          if (l && !l.props.disabled) return l;
          s = (s + 1) % i;
        } while (s !== a);
        return null;
      }
    }, n.renderCommonMenuItem = function (e, t, i) {
      var o = n.props.store.getState(),
        a = At(n),
        l = a.props,
        c = F(e, l.eventKey, t),
        u = e.props;
      if (!u || "string" === typeof e.type) return e;
      var h = c === o.activeKey,
        f = Rt({
          mode: u.mode || l.mode,
          level: l.level,
          inlineIndent: l.inlineIndent,
          renderMenuItem: n.renderMenuItem,
          rootPrefixCls: l.prefixCls,
          index: t,
          parentMenu: l.parentMenu,
          manualRef: u.disabled ? void 0 : Object(s["a"])(e.ref, Bt.bind(At(n))),
          eventKey: c,
          active: !u.disabled && h,
          multiple: l.multiple,
          onClick: function (e) {
            (u.onClick || $)(e), n.onClick(e);
          },
          onItemHover: n.onItemHover,
          motion: l.motion,
          subMenuOpenDelay: l.subMenuOpenDelay,
          subMenuCloseDelay: l.subMenuCloseDelay,
          forceSubMenuRender: l.forceSubMenuRender,
          onOpenChange: n.onOpenChange,
          onDeselect: n.onDeselect,
          onSelect: n.onSelect,
          builtinPlacements: l.builtinPlacements,
          itemIcon: u.itemIcon || n.props.itemIcon,
          expandIcon: u.expandIcon || n.props.expandIcon
        }, i);
      return ("inline" === l.mode || G()) && (f.triggerSubMenuAction = "click"), r["cloneElement"](e, f);
    }, n.renderMenuItem = function (e, t, r) {
      if (!e) return null;
      var i = n.props.store.getState(),
        o = {
          openKeys: i.openKeys,
          selectedKeys: i.selectedKeys,
          triggerSubMenuAction: n.props.triggerSubMenuAction,
          subMenuKey: r
        };
      return n.renderCommonMenuItem(e, t, o);
    }, e.store.setState({
      activeKey: Rt({}, e.store.getState().activeKey, Nt({}, e.eventKey, Ft(e, e.activeKey)))
    }), n.instanceArray = [], n;
  }
  return Pt(t, e), Ot(t, [{
    key: "componentDidMount",
    value: function () {
      this.props.manualRef && this.props.manualRef(this);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function (e) {
      return this.props.visible || e.visible || this.props.className !== e.className || !c()(this.props.style, e.style);
    }
  }, {
    key: "componentDidUpdate",
    value: function (e) {
      var t = this.props,
        n = "activeKey" in t ? t.activeKey : t.store.getState().activeKey[$t(t)],
        r = Ft(t, n);
      if (r !== n) It(t.store, $t(t), r);else if ("activeKey" in e) {
        var i = Ft(e, e.activeKey);
        r !== i && It(t.store, $t(t), r);
      }
    }
  }, {
    key: "render",
    value: function () {
      var e = this,
        t = St({}, this.props);
      this.instanceArray = [];
      var n = h()(t.prefixCls, t.className, "".concat(t.prefixCls, "-").concat(t.mode)),
        i = {
          className: n,
          role: t.role || "menu"
        };
      t.id && (i.id = t.id), t.focusable && (i.tabIndex = 0, i.onKeyDown = this.onKeyDown);
      var o = t.prefixCls,
        a = t.eventKey,
        s = t.visible,
        l = t.level,
        c = t.mode,
        u = t.overflowedIndicator,
        f = t.theme;
      return H.forEach(function (e) {
        return delete t[e];
      }), delete t.onClick, r["createElement"](_t, Object.assign({}, t, {
        prefixCls: o,
        mode: c,
        tag: "ul",
        level: l,
        theme: f,
        visible: s,
        overflowedIndicator: u
      }, i), r["Children"].map(t.children, function (t, n) {
        return e.renderMenuItem(t, n, a || "0-menu-");
      }));
    }
  }]), t;
}(r["Component"]);
Vt.defaultProps = {
  prefixCls: "rc-menu",
  className: "",
  mode: "vertical",
  level: 1,
  inlineIndent: 24,
  visible: !0,
  focusable: !0,
  style: {},
  manualRef: $
};
var Wt = Object(o["connect"])()(Vt),
  Ht = Wt,
  Ut = require("./warningOnce.js");
function zt(e) {
  return zt = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, zt(e);
}
function Gt(e) {
  var t = e.prefixCls,
    n = e.motion,
    r = e.openAnimation,
    i = e.openTransitionName;
  if (n) return n;
  if ("object" === zt(r) && r) Object(Ut["a"])(!1, "Object type of `openAnimation` is removed. Please use `motion` instead.");else if ("string" === typeof r) return {
    motionName: "".concat(t, "-open-").concat(r)
  };
  return i ? {
    motionName: i
  } : null;
}
function qt(e) {
  return qt = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, qt(e);
}
function Kt(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Yt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? Kt(Object(n), !0).forEach(function (t) {
      Xt(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Kt(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function Xt(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Qt(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Zt(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function Jt(e, t, n) {
  return t && Zt(e.prototype, t), n && Zt(e, n), e;
}
function en(e, t) {
  return !t || "object" !== qt(t) && "function" !== typeof t ? nn(e) : t;
}
function tn(e) {
  return tn = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, tn(e);
}
function nn(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function rn(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && on(e, t);
}
function on(e, t) {
  return on = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, on(e, t);
}
var an = function (e) {
  function t(e) {
    var n;
    Qt(this, t), n = en(this, tn(t).call(this, e)), n.onSelect = function (e) {
      var t = nn(n),
        r = t.props;
      if (r.selectable) {
        var i = n.store.getState(),
          o = i.selectedKeys,
          a = e.key;
        o = r.multiple ? o.concat([a]) : [a], "selectedKeys" in r || n.store.setState({
          selectedKeys: o
        }), r.onSelect(Yt({}, e, {
          selectedKeys: o
        }));
      }
    }, n.onClick = function (e) {
      n.props.onClick(e);
    }, n.onKeyDown = function (e, t) {
      n.innerMenu.getWrappedInstance().onKeyDown(e, t);
    }, n.onOpenChange = function (e) {
      var t = nn(n),
        r = t.props,
        i = n.store.getState().openKeys.concat(),
        o = !1,
        a = function (e) {
          var t = !1;
          if (e.open) t = -1 === i.indexOf(e.key), t && i.push(e.key);else {
            var n = i.indexOf(e.key);
            t = -1 !== n, t && i.splice(n, 1);
          }
          o = o || t;
        };
      Array.isArray(e) ? e.forEach(a) : a(e), o && ("openKeys" in n.props || n.store.setState({
        openKeys: i
      }), r.onOpenChange(i));
    }, n.onDeselect = function (e) {
      var t = nn(n),
        r = t.props;
      if (r.selectable) {
        var i = n.store.getState().selectedKeys.concat(),
          o = e.key,
          a = i.indexOf(o);
        -1 !== a && i.splice(a, 1), "selectedKeys" in r || n.store.setState({
          selectedKeys: i
        }), r.onDeselect(Yt({}, e, {
          selectedKeys: i
        }));
      }
    }, n.getOpenTransitionName = function () {
      var e = nn(n),
        t = e.props,
        r = t.openTransitionName,
        i = t.openAnimation;
      return r || "string" !== typeof i || (r = "".concat(t.prefixCls, "-open-").concat(i)), r;
    }, n.setInnerMenu = function (e) {
      n.innerMenu = e;
    }, n.isRootMenu = !0;
    var r = e.defaultSelectedKeys,
      i = e.defaultOpenKeys;
    return "selectedKeys" in e && (r = e.selectedKeys || []), "openKeys" in e && (i = e.openKeys || []), n.store = Object(o["create"])({
      selectedKeys: r,
      openKeys: i,
      activeKey: {
        "0-menu-": Ft(e, e.activeKey)
      }
    }), n;
  }
  return rn(t, e), Jt(t, [{
    key: "componentDidMount",
    value: function () {
      this.updateMiniStore();
    }
  }, {
    key: "componentDidUpdate",
    value: function () {
      this.updateMiniStore();
    }
  }, {
    key: "updateMiniStore",
    value: function () {
      "selectedKeys" in this.props && this.store.setState({
        selectedKeys: this.props.selectedKeys || []
      }), "openKeys" in this.props && this.store.setState({
        openKeys: this.props.openKeys || []
      });
    }
  }, {
    key: "render",
    value: function () {
      var e = Yt({}, this.props);
      return e.className += " ".concat(e.prefixCls, "-root"), e = Yt({}, e, {
        onClick: this.onClick,
        onOpenChange: this.onOpenChange,
        onDeselect: this.onDeselect,
        onSelect: this.onSelect,
        parentMenu: this,
        motion: Gt(this.props)
      }), delete e.openAnimation, delete e.openTransitionName, r["createElement"](o["Provider"], {
        store: this.store
      }, r["createElement"](Ht, Object.assign({}, e, {
        ref: this.setInnerMenu
      }), this.props.children));
    }
  }]), t;
}(r["Component"]);
an.defaultProps = {
  selectable: !0,
  onClick: $,
  onSelect: $,
  onOpenChange: $,
  onDeselect: $,
  defaultSelectedKeys: [],
  defaultOpenKeys: [],
  subMenuOpenDelay: .1,
  subMenuCloseDelay: .1,
  triggerSubMenuAction: "hover",
  prefixCls: "rc-menu",
  className: "",
  mode: "vertical",
  style: {},
  builtinPlacements: {},
  overflowedIndicator: r["createElement"]("span", null, "\xb7\xb7\xb7")
};
var sn = an,
  ln = require("./scrollIntoViewEntry.js"),
  cn = interopDefault(ln);
function un(e) {
  return un = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, un(e);
}
function hn(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function fn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? hn(Object(n), !0).forEach(function (t) {
      dn(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : hn(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function dn(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function pn(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function mn(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function gn(e, t, n) {
  return t && mn(e.prototype, t), n && mn(e, n), e;
}
function vn(e, t) {
  return !t || "object" !== un(t) && "function" !== typeof t ? bn(e) : t;
}
function yn(e) {
  return yn = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, yn(e);
}
function bn(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function wn(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && xn(e, t);
}
function xn(e, t) {
  return xn = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, xn(e, t);
}
var _n = function (e) {
  function t() {
    var e;
    return pn(this, t), e = vn(this, yn(t).apply(this, arguments)), e.onKeyDown = function (t) {
      var n = t.keyCode;
      if (n === a["a"].ENTER) return e.onClick(t), !0;
    }, e.onMouseLeave = function (t) {
      var n = e.props,
        r = n.eventKey,
        i = n.onItemHover,
        o = n.onMouseLeave;
      i({
        key: r,
        hover: !1
      }), o({
        key: r,
        domEvent: t
      });
    }, e.onMouseEnter = function (t) {
      var n = e.props,
        r = n.eventKey,
        i = n.onItemHover,
        o = n.onMouseEnter;
      i({
        key: r,
        hover: !0
      }), o({
        key: r,
        domEvent: t
      });
    }, e.onClick = function (t) {
      var n = e.props,
        r = n.eventKey,
        i = n.multiple,
        o = n.onClick,
        a = n.onSelect,
        s = n.onDeselect,
        l = n.isSelected,
        c = {
          key: r,
          keyPath: [r],
          item: bn(e),
          domEvent: t
        };
      o(c), i ? l ? s(c) : a(c) : l || a(c);
    }, e.saveNode = function (t) {
      e.node = t;
    }, e;
  }
  return wn(t, e), gn(t, [{
    key: "componentDidMount",
    value: function () {
      this.callRef();
    }
  }, {
    key: "componentDidUpdate",
    value: function (e) {
      var t = this.props,
        n = t.active,
        r = t.parentMenu,
        i = t.eventKey;
      e.active || !n || r && r["scrolled-".concat(i)] ? r && r["scrolled-".concat(i)] && delete r["scrolled-".concat(i)] : this.node && (cn()(this.node, q["findDOMNode"](r), {
        onlyScrollIfNeeded: !0
      }), r["scrolled-".concat(i)] = !0), this.callRef();
    }
  }, {
    key: "componentWillUnmount",
    value: function () {
      var e = this.props;
      e.onDestroy && e.onDestroy(e.eventKey);
    }
  }, {
    key: "getPrefixCls",
    value: function () {
      return "".concat(this.props.rootPrefixCls, "-item");
    }
  }, {
    key: "getActiveClassName",
    value: function () {
      return "".concat(this.getPrefixCls(), "-active");
    }
  }, {
    key: "getSelectedClassName",
    value: function () {
      return "".concat(this.getPrefixCls(), "-selected");
    }
  }, {
    key: "getDisabledClassName",
    value: function () {
      return "".concat(this.getPrefixCls(), "-disabled");
    }
  }, {
    key: "callRef",
    value: function () {
      this.props.manualRef && this.props.manualRef(this);
    }
  }, {
    key: "render",
    value: function () {
      var e,
        t = fn({}, this.props),
        n = h()(this.getPrefixCls(), t.className, (e = {}, dn(e, this.getActiveClassName(), !t.disabled && t.active), dn(e, this.getSelectedClassName(), t.isSelected), dn(e, this.getDisabledClassName(), t.disabled), e)),
        i = fn({}, t.attribute, {
          title: t.title,
          className: n,
          role: t.role || "menuitem",
          "aria-disabled": t.disabled
        });
      "option" === t.role ? i = fn({}, i, {
        role: "option",
        "aria-selected": t.isSelected
      }) : null !== t.role && "none" !== t.role || (i.role = "none");
      var o = {
          onClick: t.disabled ? null : this.onClick,
          onMouseLeave: t.disabled ? null : this.onMouseLeave,
          onMouseEnter: t.disabled ? null : this.onMouseEnter
        },
        a = fn({}, t.style);
      "inline" === t.mode && (a.paddingLeft = t.inlineIndent * t.level), H.forEach(function (e) {
        return delete t[e];
      });
      var s = this.props.itemIcon;
      return "function" === typeof this.props.itemIcon && (s = r["createElement"](this.props.itemIcon, this.props)), r["createElement"]("li", Object.assign({}, t, i, o, {
        style: a,
        ref: this.saveNode
      }), t.children, s);
    }
  }]), t;
}(r["Component"]);
_n.isMenuItem = !0, _n.defaultProps = {
  onSelect: $,
  onMouseEnter: $,
  onMouseLeave: $,
  manualRef: $
};
var En = Object(o["connect"])(function (e, t) {
    var n = e.activeKey,
      r = e.selectedKeys,
      i = t.eventKey,
      o = t.subMenuKey;
    return {
      active: n[o] === i,
      isSelected: -1 !== r.indexOf(i)
    };
  })(_n),
  Sn = En;
function kn(e) {
  return kn = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, kn(e);
}
function Cn() {
  return Cn = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Cn.apply(this, arguments);
}
function On(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function Tn(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function Ln(e, t, n) {
  return t && Tn(e.prototype, t), n && Tn(e, n), e;
}
function An(e, t) {
  return !t || "object" !== kn(t) && "function" !== typeof t ? Pn(e) : t;
}
function Pn(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function jn(e) {
  return jn = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, jn(e);
}
function Mn(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && Rn(e, t);
}
function Rn(e, t) {
  return Rn = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, Rn(e, t);
}
var Nn = function (e) {
  function t() {
    var e;
    return On(this, t), e = An(this, jn(t).apply(this, arguments)), e.renderInnerMenuItem = function (t) {
      var n = e.props,
        r = n.renderMenuItem,
        i = n.index;
      return r(t, i, e.props.subMenuKey);
    }, e;
  }
  return Mn(t, e), Ln(t, [{
    key: "render",
    value: function () {
      var e = Cn({}, this.props),
        t = e.className,
        n = void 0 === t ? "" : t,
        i = e.rootPrefixCls,
        o = "".concat(i, "-item-group-title"),
        a = "".concat(i, "-item-group-list"),
        s = e.title,
        l = e.children;
      return H.forEach(function (t) {
        return delete e[t];
      }), delete e.onClick, r["createElement"]("li", Object.assign({}, e, {
        className: "".concat(n, " ").concat(i, "-item-group")
      }), r["createElement"]("div", {
        className: o,
        title: "string" === typeof s ? s : void 0
      }, s), r["createElement"]("ul", {
        className: a
      }, r["Children"].map(l, this.renderInnerMenuItem)));
    }
  }]), t;
}(r["Component"]);
Nn.isMenuItemGroup = !0, Nn.defaultProps = {
  disabled: !0
};
var Dn = Nn,
  In = function (e) {
    var t = e.className,
      n = e.rootPrefixCls,
      i = e.style;
    return r["createElement"]("li", {
      className: "".concat(t, " ").concat(n, "-item-divider"),
      style: i
    });
  };
In.defaultProps = {
  disabled: !0,
  className: "",
  style: {}
};
var $n = In;
defineExport(legacyExports, "d", function () {
  return Je;
}), defineExport(legacyExports, "b", function () {
  return Sn;
}), defineExport(legacyExports, "c", function () {
  return Dn;
}), defineExport(legacyExports, "a", function () {
  return $n;
});
legacyExports["e"] = sn;
