let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./69436335.js"),
  i = interopDefault(r),
  o = require("./46597733.js"),
  a = interopDefault(o),
  s = require("./6d526730.js"),
  l = interopDefault(s),
  c = require("./reactRuntime.js"),
  u = interopDefault(c),
  h = require("./69386934.js"),
  f = interopDefault(h),
  d = require("./31377839.js"),
  p = interopDefault(d),
  m = require("./reactLifecyclesCompat.js"),
  g = require("./32475336.js"),
  v = require("./34496c57.js"),
  y = {
    adjustX: 1,
    adjustY: 1
  },
  b = [0, 0],
  w = {
    bottomLeft: {
      points: ["tl", "tl"],
      overflow: y,
      offset: [0, -3],
      targetOffset: b
    },
    bottomRight: {
      points: ["tr", "tr"],
      overflow: y,
      offset: [0, -3],
      targetOffset: b
    },
    topRight: {
      points: ["br", "br"],
      overflow: y,
      offset: [0, 3],
      targetOffset: b
    },
    topLeft: {
      points: ["bl", "bl"],
      overflow: y,
      offset: [0, 3],
      targetOffset: b
    }
  },
  x = w,
  _ = require("./75636958.js");
function E() {}
function S(e, t) {
  this[e] = t;
}
var k = function (e) {
  function t(n) {
    i()(this, t);
    var r = a()(this, e.call(this, n));
    C.call(r);
    var o = void 0;
    o = "open" in n ? n.open : n.defaultOpen;
    var s = n.value || n.defaultValue;
    return r.saveCalendarRef = S.bind(r, "calendarInstance"), r.state = {
      open: o,
      value: s
    }, r;
  }
  return l()(t, e), t.prototype.componentDidUpdate = function (e, t) {
    !t.open && this.state.open && (this.focusTimeout = setTimeout(this.focusCalendar, 0, this));
  }, t.prototype.componentWillUnmount = function () {
    clearTimeout(this.focusTimeout);
  }, t.getDerivedStateFromProps = function (e) {
    var t = {},
      n = e.value,
      r = e.open;
    return "value" in e && (t.value = n), void 0 !== r && (t.open = r), t;
  }, t.prototype.render = function () {
    var e = this.props,
      t = e.prefixCls,
      n = e.placement,
      r = e.style,
      i = e.getCalendarContainer,
      o = e.align,
      a = e.animation,
      s = e.disabled,
      l = e.dropdownClassName,
      c = e.transitionName,
      h = e.children,
      f = this.state;
    return u.a.createElement(_["a"], {
      popup: this.getCalendarElement(),
      popupAlign: o,
      builtinPlacements: x,
      popupPlacement: n,
      action: s && !f.open ? [] : ["click"],
      destroyPopupOnHide: !0,
      getPopupContainer: i,
      popupStyle: r,
      popupAnimation: a,
      popupTransitionName: c,
      popupVisible: f.open,
      onPopupVisibleChange: this.onVisibleChange,
      prefixCls: t,
      popupClassName: l
    }, u.a.cloneElement(h(f, e), {
      onKeyDown: this.onKeyDown
    }));
  }, t;
}(u.a.Component);
k.propTypes = {
  animation: p.a.oneOfType([p.a.func, p.a.string]),
  disabled: p.a.bool,
  transitionName: p.a.string,
  onChange: p.a.func,
  onOpenChange: p.a.func,
  children: p.a.func,
  getCalendarContainer: p.a.func,
  calendar: p.a.element,
  style: p.a.object,
  open: p.a.bool,
  defaultOpen: p.a.bool,
  prefixCls: p.a.string,
  placement: p.a.any,
  value: p.a.oneOfType([p.a.object, p.a.array]),
  defaultValue: p.a.oneOfType([p.a.object, p.a.array]),
  align: p.a.object,
  dateRender: p.a.func,
  onBlur: p.a.func
}, k.defaultProps = {
  prefixCls: "rc-calendar-picker",
  style: {},
  align: {},
  placement: "bottomLeft",
  defaultOpen: !1,
  onChange: E,
  onOpenChange: E,
  onBlur: E
};
var C = function () {
  var e = this;
  this.onCalendarKeyDown = function (t) {
    t.keyCode === v["a"].ESC && (t.stopPropagation(), e.close(e.focus));
  }, this.onCalendarSelect = function (t) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      r = e.props;
    "value" in r || e.setState({
      value: t
    }), ("keyboard" === n.source || "dateInputSelect" === n.source || !r.calendar.props.timePicker && "dateInput" !== n.source || "todayButton" === n.source) && e.close(e.focus), r.onChange(t);
  }, this.onKeyDown = function (t) {
    e.state.open || t.keyCode !== v["a"].DOWN && t.keyCode !== v["a"].ENTER || (e.open(), t.preventDefault());
  }, this.onCalendarOk = function () {
    e.close(e.focus);
  }, this.onCalendarClear = function () {
    e.close(e.focus);
  }, this.onCalendarBlur = function () {
    e.setOpen(!1);
  }, this.onVisibleChange = function (t) {
    e.setOpen(t);
  }, this.getCalendarElement = function () {
    var t = e.props,
      n = e.state,
      r = t.calendar.props,
      i = n.value,
      o = i,
      a = {
        ref: e.saveCalendarRef,
        defaultValue: o || r.defaultValue,
        selectedValue: i,
        onKeyDown: e.onCalendarKeyDown,
        onOk: Object(g["a"])(r.onOk, e.onCalendarOk),
        onSelect: Object(g["a"])(r.onSelect, e.onCalendarSelect),
        onClear: Object(g["a"])(r.onClear, e.onCalendarClear),
        onBlur: Object(g["a"])(r.onBlur, e.onCalendarBlur)
      };
    return u.a.cloneElement(t.calendar, a);
  }, this.setOpen = function (t, n) {
    var r = e.props.onOpenChange;
    e.state.open !== t && ("open" in e.props || e.setState({
      open: t
    }, n), r(t));
  }, this.open = function (t) {
    e.setOpen(!0, t);
  }, this.close = function (t) {
    e.setOpen(!1, t);
  }, this.focus = function () {
    e.state.open || f.a.findDOMNode(e).focus();
  }, this.focusCalendar = function () {
    e.state.open && e.calendarInstance && e.calendarInstance.focus();
  };
};
Object(m["polyfill"])(k);
legacyExports["a"] = k;
