let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./71317449.js"),
  i = interopDefault(r),
  o = require("./31377839.js"),
  a = interopDefault(o),
  s = require("./75636958.js"),
  l = require("./77642f52.js"),
  c = interopDefault(l),
  u = require("./56434c38.js"),
  h = require("./54535951.js"),
  f = interopDefault(h),
  d = require("./7767702b.js"),
  p = {
    adjustX: 1,
    adjustY: 1
  },
  m = [0, 0],
  g = {
    bottomLeft: {
      points: ["tl", "tl"],
      overflow: p,
      offset: [0, -3],
      targetOffset: m
    },
    bottomRight: {
      points: ["tr", "tr"],
      overflow: p,
      offset: [0, -3],
      targetOffset: m
    },
    topRight: {
      points: ["br", "br"],
      overflow: p,
      offset: [0, 3],
      targetOffset: m
    },
    topLeft: {
      points: ["bl", "bl"],
      overflow: p,
      offset: [0, 3],
      targetOffset: m
    }
  },
  v = g;
function y(e, t) {
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
    t % 2 ? y(Object(n), !0).forEach(function (t) {
      T(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : y(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function w(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function x(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function _(e, t, n) {
  return t && x(e.prototype, t), n && x(e, n), e;
}
function E(e, t) {
  return !t || "object" !== typeof t && "function" !== typeof t ? k(e) : t;
}
function S(e) {
  return S = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, S(e);
}
function k(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function C(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && O(e, t);
}
function O(e, t) {
  return O = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, O(e, t);
}
function T(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function L() {}
function A(e, t) {
  this[e] = t;
}
var P = function (e) {
  function t(e) {
    var n;
    w(this, t), n = E(this, S(t).call(this, e)), T(k(n), "onPanelChange", function (e) {
      n.setValue(e);
    }), T(k(n), "onAmPmChange", function (e) {
      var t = n.props.onAmPmChange;
      t(e);
    }), T(k(n), "onClear", function (e) {
      e.stopPropagation(), n.setValue(null), n.setOpen(!1);
    }), T(k(n), "onVisibleChange", function (e) {
      n.setOpen(e);
    }), T(k(n), "onEsc", function () {
      n.setOpen(!1), n.focus();
    }), T(k(n), "onKeyDown", function (e) {
      40 === e.keyCode && n.setOpen(!0);
    }), n.saveInputRef = A.bind(k(n), "picker"), n.savePanelRef = A.bind(k(n), "panelInstance");
    var r = e.defaultOpen,
      i = e.defaultValue,
      o = e.open,
      a = void 0 === o ? r : o,
      s = e.value,
      l = void 0 === s ? i : s;
    return n.state = {
      open: a,
      value: l
    }, n;
  }
  return C(t, e), _(t, [{
    key: "setValue",
    value: function (e) {
      var t = this.props.onChange;
      "value" in this.props || this.setState({
        value: e
      }), t(e);
    }
  }, {
    key: "getFormat",
    value: function () {
      var e = this.props,
        t = e.format,
        n = e.showHour,
        r = e.showMinute,
        i = e.showSecond,
        o = e.use12Hours;
      if (t) return t;
      if (o) {
        var a = [n ? "h" : "", r ? "mm" : "", i ? "ss" : ""].filter(function (e) {
          return !!e;
        }).join(":");
        return a.concat(" a");
      }
      return [n ? "HH" : "", r ? "mm" : "", i ? "ss" : ""].filter(function (e) {
        return !!e;
      }).join(":");
    }
  }, {
    key: "getPanelElement",
    value: function () {
      var e = this.props,
        t = e.prefixCls,
        n = e.placeholder,
        r = e.disabledHours,
        o = e.disabledMinutes,
        a = e.disabledSeconds,
        s = e.hideDisabledOptions,
        l = e.inputReadOnly,
        c = e.showHour,
        u = e.showMinute,
        h = e.showSecond,
        f = e.defaultOpenValue,
        p = e.clearText,
        m = e.addon,
        g = e.use12Hours,
        v = e.focusOnOpen,
        y = e.onKeyDown,
        b = e.hourStep,
        w = e.minuteStep,
        x = e.secondStep,
        _ = e.clearIcon,
        E = this.state.value;
      return i.a.createElement(d["a"], {
        clearText: p,
        prefixCls: "".concat(t, "-panel"),
        ref: this.savePanelRef,
        value: E,
        inputReadOnly: l,
        onChange: this.onPanelChange,
        onAmPmChange: this.onAmPmChange,
        defaultOpenValue: f,
        showHour: c,
        showMinute: u,
        showSecond: h,
        onEsc: this.onEsc,
        format: this.getFormat(),
        placeholder: n,
        disabledHours: r,
        disabledMinutes: o,
        disabledSeconds: a,
        hideDisabledOptions: s,
        use12Hours: g,
        hourStep: b,
        minuteStep: w,
        secondStep: x,
        addon: m,
        focusOnOpen: v,
        onKeyDown: y,
        clearIcon: _
      });
    }
  }, {
    key: "getPopupClassName",
    value: function () {
      var e = this.props,
        t = e.showHour,
        n = e.showMinute,
        r = e.showSecond,
        i = e.use12Hours,
        o = e.prefixCls,
        a = e.popupClassName,
        s = 0;
      return t && (s += 1), n && (s += 1), r && (s += 1), i && (s += 1), f()(a, T({}, "".concat(o, "-panel-narrow"), (!t || !n || !r) && !i), "".concat(o, "-panel-column-").concat(s));
    }
  }, {
    key: "setOpen",
    value: function (e) {
      var t = this.props,
        n = t.onOpen,
        r = t.onClose,
        i = this.state.open;
      i !== e && ("open" in this.props || this.setState({
        open: e
      }), e ? n({
        open: e
      }) : r({
        open: e
      }));
    }
  }, {
    key: "focus",
    value: function () {
      this.picker.focus();
    }
  }, {
    key: "blur",
    value: function () {
      this.picker.blur();
    }
  }, {
    key: "renderClearButton",
    value: function () {
      var e = this,
        t = this.state.value,
        n = this.props,
        r = n.prefixCls,
        o = n.allowEmpty,
        a = n.clearIcon,
        s = n.clearText,
        l = n.disabled;
      if (!o || !t || l) return null;
      if (i.a.isValidElement(a)) {
        var c = a.props || {},
          u = c.onClick;
        return i.a.cloneElement(a, {
          onClick: function () {
            u && u.apply(void 0, arguments), e.onClear.apply(e, arguments);
          }
        });
      }
      return i.a.createElement("a", {
        role: "button",
        className: "".concat(r, "-clear"),
        title: s,
        onClick: this.onClear,
        tabIndex: 0
      }, a || i.a.createElement("i", {
        className: "".concat(r, "-clear-icon")
      }));
    }
  }, {
    key: "render",
    value: function () {
      var e = this.props,
        t = e.prefixCls,
        n = e.placeholder,
        r = e.placement,
        o = e.align,
        a = e.id,
        l = e.disabled,
        c = e.transitionName,
        u = e.style,
        h = e.className,
        d = e.getPopupContainer,
        p = e.name,
        m = e.autoComplete,
        g = e.onFocus,
        y = e.onBlur,
        b = e.autoFocus,
        w = e.inputReadOnly,
        x = e.inputIcon,
        _ = e.popupStyle,
        E = this.state,
        S = E.open,
        k = E.value,
        C = this.getPopupClassName();
      return i.a.createElement(s["a"], {
        prefixCls: "".concat(t, "-panel"),
        popupClassName: C,
        popupStyle: _,
        popup: this.getPanelElement(),
        popupAlign: o,
        builtinPlacements: v,
        popupPlacement: r,
        action: l ? [] : ["click"],
        destroyPopupOnHide: !0,
        getPopupContainer: d,
        popupTransitionName: c,
        popupVisible: S,
        onPopupVisibleChange: this.onVisibleChange
      }, i.a.createElement("span", {
        className: f()(t, h),
        style: u
      }, i.a.createElement("input", {
        className: "".concat(t, "-input"),
        ref: this.saveInputRef,
        type: "text",
        placeholder: n,
        name: p,
        onKeyDown: this.onKeyDown,
        disabled: l,
        value: k && k.format(this.getFormat()) || "",
        autoComplete: m,
        onFocus: g,
        onBlur: y,
        autoFocus: b,
        onChange: L,
        readOnly: !!w,
        id: a
      }), x || i.a.createElement("span", {
        className: "".concat(t, "-icon")
      }), this.renderClearButton()));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function (e, t) {
      var n = {};
      return "value" in e && (n.value = e.value), void 0 !== e.open && (n.open = e.open), Object.keys(n).length > 0 ? b({}, t, {}, n) : null;
    }
  }]), t;
}(r["Component"]);
T(P, "propTypes", {
  prefixCls: a.a.string,
  clearText: a.a.string,
  value: a.a.object,
  defaultOpenValue: a.a.object,
  inputReadOnly: a.a.bool,
  disabled: a.a.bool,
  allowEmpty: a.a.bool,
  defaultValue: a.a.object,
  open: a.a.bool,
  defaultOpen: a.a.bool,
  align: a.a.object,
  placement: a.a.any,
  transitionName: a.a.string,
  getPopupContainer: a.a.func,
  placeholder: a.a.string,
  format: a.a.string,
  showHour: a.a.bool,
  showMinute: a.a.bool,
  showSecond: a.a.bool,
  style: a.a.object,
  className: a.a.string,
  popupClassName: a.a.string,
  popupStyle: a.a.object,
  disabledHours: a.a.func,
  disabledMinutes: a.a.func,
  disabledSeconds: a.a.func,
  hideDisabledOptions: a.a.bool,
  onChange: a.a.func,
  onAmPmChange: a.a.func,
  onOpen: a.a.func,
  onClose: a.a.func,
  onFocus: a.a.func,
  onBlur: a.a.func,
  addon: a.a.func,
  name: a.a.string,
  autoComplete: a.a.string,
  use12Hours: a.a.bool,
  hourStep: a.a.number,
  minuteStep: a.a.number,
  secondStep: a.a.number,
  focusOnOpen: a.a.bool,
  onKeyDown: a.a.func,
  autoFocus: a.a.bool,
  id: a.a.string,
  inputIcon: a.a.node,
  clearIcon: a.a.node
}), T(P, "defaultProps", {
  clearText: "clear",
  prefixCls: "rc-time-picker",
  defaultOpen: !1,
  inputReadOnly: !1,
  style: {},
  className: "",
  popupClassName: "",
  popupStyle: {},
  align: {},
  defaultOpenValue: c()(),
  allowEmpty: !0,
  showHour: !0,
  showMinute: !0,
  showSecond: !0,
  disabledHours: L,
  disabledMinutes: L,
  disabledSeconds: L,
  hideDisabledOptions: !1,
  placement: "bottomLeft",
  onChange: L,
  onAmPmChange: L,
  onOpen: L,
  onClose: L,
  onFocus: L,
  onBlur: L,
  addon: L,
  use12Hours: !1,
  focusOnOpen: !1,
  onKeyDown: L
}), Object(u["polyfill"])(P);
legacyExports["a"] = P;
