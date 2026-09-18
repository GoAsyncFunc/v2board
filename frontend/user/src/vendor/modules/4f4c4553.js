let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./51624c5a.js"),
  o = interopDefault(r),
  i = require("./6a6f3659.js"),
  a = interopDefault(i),
  s = require("./69436335.js"),
  c = interopDefault(s),
  u = require("./46597733.js"),
  l = interopDefault(u),
  f = require("./6d526730.js"),
  p = interopDefault(f),
  d = require("./reactRuntime.js"),
  h = interopDefault(d),
  m = require("./31377839.js"),
  v = interopDefault(m),
  y = require("./75636958.js"),
  g = require("./37697874.js"),
  b = function (e) {
    function t() {
      return c()(this, t), l()(this, e.apply(this, arguments));
    }
    return p()(t, e), t.prototype.componentDidUpdate = function () {
      var e = this.props.trigger;
      e && e.forcePopupAlign();
    }, t.prototype.render = function () {
      var e = this.props,
        t = e.overlay,
        n = e.prefixCls,
        r = e.id;
      return h.a.createElement("div", {
        className: n + "-inner",
        id: r,
        role: "tooltip"
      }, "function" === typeof t ? t() : t);
    }, t;
  }(h.a.Component);
b.propTypes = {
  prefixCls: v.a.string,
  overlay: v.a.oneOfType([v.a.node, v.a.func]).isRequired,
  id: v.a.string,
  trigger: v.a.any
};
var w = b,
  x = function (e) {
    function t() {
      var n, r, o;
      c()(this, t);
      for (var i = arguments.length, a = Array(i), s = 0; s < i; s++) a[s] = arguments[s];
      return r = l()(this, e.call.apply(e, [this].concat(a))), n = r, r.getPopupElement = function () {
        var e = r.props,
          t = e.arrowContent,
          n = e.overlay,
          o = e.prefixCls,
          i = e.id;
        return [h.a.createElement("div", {
          className: o + "-arrow",
          key: "arrow"
        }, t), h.a.createElement(w, {
          key: "content",
          trigger: r.trigger,
          prefixCls: o,
          id: i,
          overlay: n
        })];
      }, r.saveTrigger = function (e) {
        r.trigger = e;
      }, o = n, l()(r, o);
    }
    return p()(t, e), t.prototype.getPopupDomNode = function () {
      return this.trigger.getPopupDomNode();
    }, t.prototype.render = function () {
      var e = this.props,
        t = e.overlayClassName,
        n = e.trigger,
        r = e.mouseEnterDelay,
        i = e.mouseLeaveDelay,
        s = e.overlayStyle,
        c = e.prefixCls,
        u = e.children,
        l = e.onVisibleChange,
        f = e.afterVisibleChange,
        p = e.transitionName,
        d = e.animation,
        m = e.placement,
        v = e.align,
        b = e.destroyTooltipOnHide,
        w = e.defaultVisible,
        x = e.getTooltipContainer,
        O = a()(e, ["overlayClassName", "trigger", "mouseEnterDelay", "mouseLeaveDelay", "overlayStyle", "prefixCls", "children", "onVisibleChange", "afterVisibleChange", "transitionName", "animation", "placement", "align", "destroyTooltipOnHide", "defaultVisible", "getTooltipContainer"]),
        E = o()({}, O);
      return "visible" in this.props && (E.popupVisible = this.props.visible), h.a.createElement(y["a"], o()({
        popupClassName: t,
        ref: this.saveTrigger,
        prefixCls: c,
        popup: this.getPopupElement,
        action: n,
        builtinPlacements: g["a"],
        popupPlacement: m,
        popupAlign: v,
        getPopupContainer: x,
        onPopupVisibleChange: l,
        afterPopupVisibleChange: f,
        popupTransitionName: p,
        popupAnimation: d,
        defaultPopupVisible: w,
        destroyPopupOnHide: b,
        mouseLeaveDelay: i,
        popupStyle: s,
        mouseEnterDelay: r
      }, E), u);
    }, t;
  }(d["Component"]);
x.propTypes = {
  trigger: v.a.any,
  children: v.a.any,
  defaultVisible: v.a.bool,
  visible: v.a.bool,
  placement: v.a.string,
  transitionName: v.a.oneOfType([v.a.string, v.a.object]),
  animation: v.a.any,
  onVisibleChange: v.a.func,
  afterVisibleChange: v.a.func,
  overlay: v.a.oneOfType([v.a.node, v.a.func]).isRequired,
  overlayStyle: v.a.object,
  overlayClassName: v.a.string,
  prefixCls: v.a.string,
  mouseEnterDelay: v.a.number,
  mouseLeaveDelay: v.a.number,
  getTooltipContainer: v.a.func,
  destroyTooltipOnHide: v.a.bool,
  align: v.a.object,
  arrowContent: v.a.any,
  id: v.a.string
}, x.defaultProps = {
  prefixCls: "rc-tooltip",
  mouseEnterDelay: 0,
  destroyTooltipOnHide: !1,
  mouseLeaveDelay: .1,
  align: {},
  placement: "right",
  trigger: ["hover"],
  arrowContent: null
};
var O = x;
legacyExports["a"] = O;
