let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./51624c5a.js"),
  i = interopDefault(r),
  o = require("./6a6f3659.js"),
  a = interopDefault(o),
  s = require("./69436335.js"),
  l = interopDefault(s),
  c = require("./46597733.js"),
  u = interopDefault(c),
  h = require("./6d526730.js"),
  f = interopDefault(h),
  d = require("./reactRuntime.js"),
  p = interopDefault(d),
  m = require("./31377839.js"),
  g = interopDefault(m),
  v = require("./75636958.js"),
  y = require("./37697874.js"),
  b = function (e) {
    function t() {
      return l()(this, t), u()(this, e.apply(this, arguments));
    }
    return f()(t, e), t.prototype.componentDidUpdate = function () {
      var e = this.props.trigger;
      e && e.forcePopupAlign();
    }, t.prototype.render = function () {
      var e = this.props,
        t = e.overlay,
        n = e.prefixCls,
        r = e.id;
      return p.a.createElement("div", {
        className: n + "-inner",
        id: r,
        role: "tooltip"
      }, "function" === typeof t ? t() : t);
    }, t;
  }(p.a.Component);
b.propTypes = {
  prefixCls: g.a.string,
  overlay: g.a.oneOfType([g.a.node, g.a.func]).isRequired,
  id: g.a.string,
  trigger: g.a.any
};
var w = b,
  x = function (e) {
    function t() {
      var n, r, i;
      l()(this, t);
      for (var o = arguments.length, a = Array(o), s = 0; s < o; s++) a[s] = arguments[s];
      return r = u()(this, e.call.apply(e, [this].concat(a))), n = r, r.getPopupElement = function () {
        var e = r.props,
          t = e.arrowContent,
          n = e.overlay,
          i = e.prefixCls,
          o = e.id;
        return [p.a.createElement("div", {
          className: i + "-arrow",
          key: "arrow"
        }, t), p.a.createElement(w, {
          key: "content",
          trigger: r.trigger,
          prefixCls: i,
          id: o,
          overlay: n
        })];
      }, r.saveTrigger = function (e) {
        r.trigger = e;
      }, i = n, u()(r, i);
    }
    return f()(t, e), t.prototype.getPopupDomNode = function () {
      return this.trigger.getPopupDomNode();
    }, t.prototype.render = function () {
      var e = this.props,
        t = e.overlayClassName,
        n = e.trigger,
        r = e.mouseEnterDelay,
        o = e.mouseLeaveDelay,
        s = e.overlayStyle,
        l = e.prefixCls,
        c = e.children,
        u = e.onVisibleChange,
        h = e.afterVisibleChange,
        f = e.transitionName,
        d = e.animation,
        m = e.placement,
        g = e.align,
        b = e.destroyTooltipOnHide,
        w = e.defaultVisible,
        x = e.getTooltipContainer,
        _ = a()(e, ["overlayClassName", "trigger", "mouseEnterDelay", "mouseLeaveDelay", "overlayStyle", "prefixCls", "children", "onVisibleChange", "afterVisibleChange", "transitionName", "animation", "placement", "align", "destroyTooltipOnHide", "defaultVisible", "getTooltipContainer"]),
        E = i()({}, _);
      return "visible" in this.props && (E.popupVisible = this.props.visible), p.a.createElement(v["a"], i()({
        popupClassName: t,
        ref: this.saveTrigger,
        prefixCls: l,
        popup: this.getPopupElement,
        action: n,
        builtinPlacements: y["a"],
        popupPlacement: m,
        popupAlign: g,
        getPopupContainer: x,
        onPopupVisibleChange: u,
        afterPopupVisibleChange: h,
        popupTransitionName: f,
        popupAnimation: d,
        defaultPopupVisible: w,
        destroyPopupOnHide: b,
        mouseLeaveDelay: o,
        popupStyle: s,
        mouseEnterDelay: r
      }, E), c);
    }, t;
  }(d["Component"]);
x.propTypes = {
  trigger: g.a.any,
  children: g.a.any,
  defaultVisible: g.a.bool,
  visible: g.a.bool,
  placement: g.a.string,
  transitionName: g.a.oneOfType([g.a.string, g.a.object]),
  animation: g.a.any,
  onVisibleChange: g.a.func,
  afterVisibleChange: g.a.func,
  overlay: g.a.oneOfType([g.a.node, g.a.func]).isRequired,
  overlayStyle: g.a.object,
  overlayClassName: g.a.string,
  prefixCls: g.a.string,
  mouseEnterDelay: g.a.number,
  mouseLeaveDelay: g.a.number,
  getTooltipContainer: g.a.func,
  destroyTooltipOnHide: g.a.bool,
  align: g.a.object,
  arrowContent: g.a.any,
  id: g.a.string
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
var _ = x;
legacyExports["a"] = _;
