let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./reactRuntime.js"),
  o = interopDefault(r),
  i = require("./propTypesRuntime.js"),
  a = interopDefault(i),
  s = require("./69386934.js"),
  c = interopDefault(s),
  u = require("./75636958.js"),
  l = require("./classNames.js"),
  f = interopDefault(l),
  p = {
    adjustX: 1,
    adjustY: 1
  },
  d = [0, 0],
  h = {
    topLeft: {
      points: ["bl", "tl"],
      overflow: p,
      offset: [0, -4],
      targetOffset: d
    },
    topCenter: {
      points: ["bc", "tc"],
      overflow: p,
      offset: [0, -4],
      targetOffset: d
    },
    topRight: {
      points: ["br", "tr"],
      overflow: p,
      offset: [0, -4],
      targetOffset: d
    },
    bottomLeft: {
      points: ["tl", "bl"],
      overflow: p,
      offset: [0, 4],
      targetOffset: d
    },
    bottomCenter: {
      points: ["tc", "bc"],
      overflow: p,
      offset: [0, 4],
      targetOffset: d
    },
    bottomRight: {
      points: ["tr", "br"],
      overflow: p,
      offset: [0, 4],
      targetOffset: d
    }
  },
  m = h,
  v = require("./reactLifecyclesCompat.js"),
  y = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  };
function g(e, t) {
  var n = {};
  for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
  return n;
}
function b(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function w(e, t) {
  if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !t || "object" !== typeof t && "function" !== typeof t ? e : t;
}
function x(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}
var O = function (e) {
  function t(n) {
    b(this, t);
    var r = w(this, e.call(this, n));
    return E.call(r), r.state = "visible" in n ? {
      visible: n.visible
    } : {
      visible: n.defaultVisible
    }, r;
  }
  return x(t, e), t.getDerivedStateFromProps = function (e) {
    return "visible" in e ? {
      visible: e.visible
    } : null;
  }, t.prototype.getOverlayElement = function () {
    var e = this.props.overlay,
      t = void 0;
    return t = "function" === typeof e ? e() : e, t;
  }, t.prototype.getMenuElementOrLambda = function () {
    var e = this.props.overlay;
    return "function" === typeof e ? this.getMenuElement : this.getMenuElement();
  }, t.prototype.getPopupDomNode = function () {
    return this.trigger.getPopupDomNode();
  }, t.prototype.getOpenClassName = function () {
    var e = this.props,
      t = e.openClassName,
      n = e.prefixCls;
    return void 0 !== t ? t : n + "-open";
  }, t.prototype.renderChildren = function () {
    var e = this.props.children,
      t = this.state.visible,
      n = e.props ? e.props : {},
      o = f()(n.className, this.getOpenClassName());
    return t && e ? Object(r["cloneElement"])(e, {
      className: o
    }) : e;
  }, t.prototype.render = function () {
    var e = this.props,
      t = e.prefixCls,
      n = e.transitionName,
      r = e.animation,
      i = e.align,
      a = e.placement,
      s = e.getPopupContainer,
      c = e.showAction,
      l = e.hideAction,
      f = e.overlayClassName,
      p = e.overlayStyle,
      d = e.trigger,
      h = g(e, ["prefixCls", "transitionName", "animation", "align", "placement", "getPopupContainer", "showAction", "hideAction", "overlayClassName", "overlayStyle", "trigger"]),
      v = l;
    return v || -1 === d.indexOf("contextMenu") || (v = ["click"]), o.a.createElement(u["a"], y({}, h, {
      prefixCls: t,
      ref: this.saveTrigger,
      popupClassName: f,
      popupStyle: p,
      builtinPlacements: m,
      action: d,
      showAction: c,
      hideAction: v || [],
      popupPlacement: a,
      popupAlign: i,
      popupTransitionName: n,
      popupAnimation: r,
      popupVisible: this.state.visible,
      afterPopupVisibleChange: this.afterVisibleChange,
      popup: this.getMenuElementOrLambda(),
      onPopupVisibleChange: this.onVisibleChange,
      getPopupContainer: s
    }), this.renderChildren());
  }, t;
}(r["Component"]);
O.propTypes = {
  minOverlayWidthMatchTrigger: a.a.bool,
  onVisibleChange: a.a.func,
  onOverlayClick: a.a.func,
  prefixCls: a.a.string,
  children: a.a.any,
  transitionName: a.a.string,
  overlayClassName: a.a.string,
  openClassName: a.a.string,
  animation: a.a.any,
  align: a.a.object,
  overlayStyle: a.a.object,
  placement: a.a.string,
  overlay: a.a.oneOfType([a.a.node, a.a.func]),
  trigger: a.a.array,
  alignPoint: a.a.bool,
  showAction: a.a.array,
  hideAction: a.a.array,
  getPopupContainer: a.a.func,
  visible: a.a.bool,
  defaultVisible: a.a.bool
}, O.defaultProps = {
  prefixCls: "rc-dropdown",
  trigger: ["hover"],
  showAction: [],
  overlayClassName: "",
  overlayStyle: {},
  defaultVisible: !1,
  onVisibleChange: function () {},
  placement: "bottomLeft"
};
var E = function () {
  var e = this;
  this.onClick = function (t) {
    var n = e.props,
      r = e.getOverlayElement().props;
    "visible" in n || e.setState({
      visible: !1
    }), n.onOverlayClick && n.onOverlayClick(t), r.onClick && r.onClick(t);
  }, this.onVisibleChange = function (t) {
    var n = e.props;
    "visible" in n || e.setState({
      visible: t
    }), n.onVisibleChange(t);
  }, this.getMinOverlayWidthMatchTrigger = function () {
    var t = e.props,
      n = t.minOverlayWidthMatchTrigger,
      r = t.alignPoint;
    return "minOverlayWidthMatchTrigger" in e.props ? n : !r;
  }, this.getMenuElement = function () {
    var t = e.props.prefixCls,
      n = e.getOverlayElement(),
      r = {
        prefixCls: t + "-menu",
        onClick: e.onClick
      };
    return "string" === typeof n.type && delete r.prefixCls, o.a.cloneElement(n, r);
  }, this.afterVisibleChange = function (t) {
    if (t && e.getMinOverlayWidthMatchTrigger()) {
      var n = e.getPopupDomNode(),
        r = c.a.findDOMNode(e);
      r && n && r.offsetWidth > n.offsetWidth && (n.style.minWidth = r.offsetWidth + "px", e.trigger && e.trigger._component && e.trigger._component.alignInstance && e.trigger._component.alignInstance.forceAlign());
    }
  }, this.saveTrigger = function (t) {
    e.trigger = t;
  };
};
Object(v["polyfill"])(O);
var _ = O;
legacyExports["a"] = _;
