let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./51624c5a.js"),
  i = interopDefault(r),
  o = require("./69436335.js"),
  a = interopDefault(o),
  s = require("./46597733.js"),
  l = interopDefault(s),
  c = require("./6d526730.js"),
  u = interopDefault(c),
  h = require("./71317449.js"),
  f = interopDefault(h),
  d = require("./31377839.js"),
  p = interopDefault(d),
  m = require("./77642f52.js"),
  g = interopDefault(m),
  v = require("./54535951.js"),
  y = interopDefault(v),
  b = require("./56434c38.js"),
  w = require("./34496c57.js"),
  x = require("./327a7053.js"),
  _ = require("./66446371.js"),
  E = require("./56656768.js"),
  S = require("./47727448.js"),
  k = function (e) {
    function t() {
      return a()(this, t), l()(this, e.apply(this, arguments));
    }
    return u()(t, e), t.prototype.render = function () {
      var e = this.props,
        t = e.prefixCls,
        n = e.value,
        r = e.hoverValue,
        o = e.selectedValue,
        a = e.mode,
        s = e.direction,
        l = e.locale,
        c = e.format,
        u = e.placeholder,
        h = e.disabledDate,
        d = e.timePicker,
        p = e.disabledTime,
        m = e.timePickerDisabledTime,
        g = e.showTimePicker,
        v = e.onInputChange,
        y = e.onInputSelect,
        b = e.enablePrev,
        w = e.enableNext,
        k = e.clearIcon,
        C = e.showClear,
        O = e.inputMode,
        T = g && d,
        L = T && p ? Object(S["c"])(o, p) : null,
        A = t + "-range",
        P = {
          locale: l,
          value: n,
          prefixCls: t,
          showTimePicker: g
        },
        j = "left" === s ? 0 : 1,
        M = T && f.a.cloneElement(d, i()({
          showHour: !0,
          showMinute: !0,
          showSecond: !0
        }, d.props, L, m, {
          onChange: v,
          defaultOpenValue: n,
          value: o[j]
        })),
        R = e.showDateInput && f.a.createElement(E["a"], {
          format: c,
          locale: l,
          prefixCls: t,
          timePicker: d,
          disabledDate: h,
          placeholder: u,
          disabledTime: p,
          value: n,
          showClear: C || !1,
          selectedValue: o[j],
          onChange: v,
          onSelect: y,
          clearIcon: k,
          inputMode: O
        });
      return f.a.createElement("div", {
        className: A + "-part " + A + "-" + s
      }, R, f.a.createElement("div", {
        style: {
          outline: "none"
        }
      }, f.a.createElement(x["a"], i()({}, P, {
        mode: a,
        enableNext: w,
        enablePrev: b,
        onValueChange: e.onValueChange,
        onPanelChange: e.onPanelChange,
        disabledMonth: e.disabledMonth
      })), g ? f.a.createElement("div", {
        className: t + "-time-picker"
      }, f.a.createElement("div", {
        className: t + "-time-picker-panel"
      }, M)) : null, f.a.createElement("div", {
        className: t + "-body"
      }, f.a.createElement(_["a"], i()({}, P, {
        hoverValue: r,
        selectedValue: o,
        dateRender: e.dateRender,
        onSelect: e.onSelect,
        onDayHover: e.onDayHover,
        disabledDate: h,
        showWeekNumber: e.showWeekNumber
      })))));
    }, t;
  }(f.a.Component);
k.propTypes = {
  prefixCls: p.a.string,
  value: p.a.any,
  hoverValue: p.a.any,
  selectedValue: p.a.any,
  direction: p.a.any,
  locale: p.a.any,
  showDateInput: p.a.bool,
  showTimePicker: p.a.bool,
  format: p.a.any,
  placeholder: p.a.any,
  disabledDate: p.a.any,
  timePicker: p.a.any,
  disabledTime: p.a.any,
  onInputChange: p.a.func,
  onInputSelect: p.a.func,
  timePickerDisabledTime: p.a.object,
  enableNext: p.a.any,
  enablePrev: p.a.any,
  clearIcon: p.a.node,
  dateRender: p.a.func,
  inputMode: p.a.string
};
var C = k,
  O = require("./4a557875.js"),
  T = require("./59565971.js"),
  L = require("./6d776b4d.js"),
  A = require("./4634567a.js"),
  P = require("./37494362.js");
function j() {}
function M(e) {
  return Array.isArray(e) && (0 === e.length || e.every(function (e) {
    return !e;
  }));
}
function R(e, t) {
  if (e === t) return !0;
  if (null === e || "undefined" === typeof e || null === t || "undefined" === typeof t) return !1;
  if (e.length !== t.length) return !1;
  for (var n = 0; n < e.length; ++n) if (e[n] !== t[n]) return !1;
  return !0;
}
function N(e) {
  var t = e[0],
    n = e[1];
  return !n || void 0 !== t && null !== t || (t = n.clone().subtract(1, "month")), !t || void 0 !== n && null !== n || (n = t.clone().add(1, "month")), [t, n];
}
function D(e, t) {
  var n = e.selectedValue || t && e.defaultSelectedValue,
    r = e.value || t && e.defaultValue,
    i = N(r || n);
  return M(i) ? t && [g()(), g()().add(1, "months")] : i;
}
function I(e, t) {
  for (var n = t ? t().concat() : [], r = 0; r < e; r++) -1 === n.indexOf(r) && n.push(r);
  return n;
}
function $(e, t, n) {
  if (t) {
    var r = this.state.selectedValue,
      i = r.concat(),
      o = "left" === e ? 0 : 1;
    i[o] = t, i[0] && this.compare(i[0], i[1]) > 0 && (i[1 - o] = this.state.showTimePicker ? i[o] : void 0), this.props.onInputSelect(i), this.fireSelectValueChange(i, null, n || {
      source: "dateInput"
    });
  }
}
var F = function (e) {
  function t(n) {
    a()(this, t);
    var r = l()(this, e.call(this, n));
    B.call(r);
    var i = n.selectedValue || n.defaultSelectedValue,
      o = D(n, 1);
    return r.state = {
      selectedValue: i,
      prevSelectedValue: i,
      firstSelectedValue: null,
      hoverValue: n.hoverValue || [],
      value: o,
      showTimePicker: !1,
      mode: n.mode || ["date", "date"],
      panelTriggerSource: ""
    }, r;
  }
  return u()(t, e), t.getDerivedStateFromProps = function (e, t) {
    var n = {};
    return "value" in e && (n.value = D(e, 0)), "hoverValue" in e && !R(t.hoverValue, e.hoverValue) && (n.hoverValue = e.hoverValue), "selectedValue" in e && (n.selectedValue = e.selectedValue, n.prevSelectedValue = e.selectedValue), "mode" in e && !R(t.mode, e.mode) && (n.mode = e.mode), n;
  }, t.prototype.render = function () {
    var e,
      t,
      n = this.props,
      r = this.state,
      o = n.prefixCls,
      a = n.dateInputPlaceholder,
      s = n.seperator,
      l = n.timePicker,
      c = n.showOk,
      u = n.locale,
      h = n.showClear,
      d = n.showToday,
      p = n.type,
      m = n.clearIcon,
      g = r.hoverValue,
      v = r.selectedValue,
      b = r.mode,
      w = r.showTimePicker,
      x = (e = {}, e[n.className] = !!n.className, e[o] = 1, e[o + "-hidden"] = !n.visible, e[o + "-range"] = 1, e[o + "-show-time-picker"] = w, e[o + "-week-number"] = n.showWeekNumber, e),
      _ = y()(x),
      E = {
        selectedValue: r.selectedValue,
        onSelect: this.onSelect,
        onDayHover: "start" === p && v[1] || "end" === p && v[0] || g.length ? this.onDayHover : void 0
      },
      k = void 0,
      A = void 0;
    a && (Array.isArray(a) ? (k = a[0], A = a[1]) : k = A = a);
    var P = !0 === c || !1 !== c && !!l,
      j = y()((t = {}, t[o + "-footer"] = !0, t[o + "-range-bottom"] = !0, t[o + "-footer-show-ok"] = P, t)),
      M = this.getStartValue(),
      R = this.getEndValue(),
      N = Object(S["e"])(M),
      D = N.month(),
      I = N.year(),
      $ = M.year() === I && M.month() === D || R.year() === I && R.month() === D,
      F = M.clone().add(1, "months"),
      B = F.year() === R.year() && F.month() === R.month(),
      V = n.renderFooter();
    return f.a.createElement("div", {
      ref: this.saveRoot,
      className: _,
      style: n.style,
      tabIndex: "0",
      onKeyDown: this.onKeyDown
    }, n.renderSidebar(), f.a.createElement("div", {
      className: o + "-panel"
    }, h && v[0] && v[1] ? f.a.createElement("a", {
      role: "button",
      title: u.clear,
      onClick: this.clear
    }, m || f.a.createElement("span", {
      className: o + "-clear-btn"
    })) : null, f.a.createElement("div", {
      className: o + "-date-panel",
      onMouseLeave: "both" !== p ? this.onDatePanelLeave : void 0,
      onMouseEnter: "both" !== p ? this.onDatePanelEnter : void 0
    }, f.a.createElement(C, i()({}, n, E, {
      hoverValue: g,
      direction: "left",
      disabledTime: this.disabledStartTime,
      disabledMonth: this.disabledStartMonth,
      format: this.getFormat(),
      value: M,
      mode: b[0],
      placeholder: k,
      onInputChange: this.onStartInputChange,
      onInputSelect: this.onStartInputSelect,
      onValueChange: this.onStartValueChange,
      onPanelChange: this.onStartPanelChange,
      showDateInput: this.props.showDateInput,
      timePicker: l,
      showTimePicker: w || "time" === b[0],
      enablePrev: !0,
      enableNext: !B || this.isMonthYearPanelShow(b[1]),
      clearIcon: m
    })), f.a.createElement("span", {
      className: o + "-range-middle"
    }, s), f.a.createElement(C, i()({}, n, E, {
      hoverValue: g,
      direction: "right",
      format: this.getFormat(),
      timePickerDisabledTime: this.getEndDisableTime(),
      placeholder: A,
      value: R,
      mode: b[1],
      onInputChange: this.onEndInputChange,
      onInputSelect: this.onEndInputSelect,
      onValueChange: this.onEndValueChange,
      onPanelChange: this.onEndPanelChange,
      showDateInput: this.props.showDateInput,
      timePicker: l,
      showTimePicker: w || "time" === b[1],
      disabledTime: this.disabledEndTime,
      disabledMonth: this.disabledEndMonth,
      enablePrev: !B || this.isMonthYearPanelShow(b[0]),
      enableNext: !0,
      clearIcon: m
    }))), f.a.createElement("div", {
      className: j
    }, d || n.timePicker || P || V ? f.a.createElement("div", {
      className: o + "-footer-btn"
    }, V, d ? f.a.createElement(O["a"], i()({}, n, {
      disabled: $,
      value: r.value[0],
      onToday: this.onToday,
      text: u.backToToday
    })) : null, n.timePicker ? f.a.createElement(L["a"], i()({}, n, {
      showTimePicker: w || "time" === b[0] && "time" === b[1],
      onOpenTimePicker: this.onOpenTimePicker,
      onCloseTimePicker: this.onCloseTimePicker,
      timePickerDisabled: !this.hasSelectedValue() || g.length
    })) : null, P ? f.a.createElement(T["a"], i()({}, n, {
      onOk: this.onOk,
      okDisabled: !this.isAllowedDateAndTime(v) || !this.hasSelectedValue() || g.length
    })) : null) : null)));
  }, t;
}(f.a.Component);
F.propTypes = i()({}, A["c"], {
  prefixCls: p.a.string,
  dateInputPlaceholder: p.a.any,
  seperator: p.a.string,
  defaultValue: p.a.any,
  value: p.a.any,
  hoverValue: p.a.any,
  mode: p.a.arrayOf(p.a.oneOf(["time", "date", "month", "year", "decade"])),
  showDateInput: p.a.bool,
  timePicker: p.a.any,
  showOk: p.a.bool,
  showToday: p.a.bool,
  defaultSelectedValue: p.a.array,
  selectedValue: p.a.array,
  onOk: p.a.func,
  showClear: p.a.bool,
  locale: p.a.object,
  onChange: p.a.func,
  onSelect: p.a.func,
  onValueChange: p.a.func,
  onHoverChange: p.a.func,
  onPanelChange: p.a.func,
  format: p.a.oneOfType([p.a.string, p.a.arrayOf(p.a.string)]),
  onClear: p.a.func,
  type: p.a.any,
  disabledDate: p.a.func,
  disabledTime: p.a.func,
  clearIcon: p.a.node,
  onKeyDown: p.a.func
}), F.defaultProps = i()({}, A["b"], {
  type: "both",
  seperator: "~",
  defaultSelectedValue: [],
  onValueChange: j,
  onHoverChange: j,
  onPanelChange: j,
  disabledTime: j,
  onInputSelect: j,
  showToday: !0,
  showDateInput: !0
});
var B = function () {
  var e = this;
  this.onDatePanelEnter = function () {
    e.hasSelectedValue() && e.fireHoverValueChange(e.state.selectedValue.concat());
  }, this.onDatePanelLeave = function () {
    e.hasSelectedValue() && e.fireHoverValueChange([]);
  }, this.onSelect = function (t) {
    var n = e.props.type,
      r = e.state,
      i = r.selectedValue,
      o = r.prevSelectedValue,
      a = r.firstSelectedValue,
      s = void 0;
    if ("both" === n) a ? e.compare(a, t) < 0 ? (Object(S["h"])(o[1], t), s = [a, t]) : (Object(S["h"])(o[0], t), Object(S["h"])(o[1], a), s = [t, a]) : (Object(S["h"])(o[0], t), s = [t]);else if ("start" === n) {
      Object(S["h"])(o[0], t);
      var l = i[1];
      s = l && e.compare(l, t) > 0 ? [t, l] : [t];
    } else {
      var c = i[0];
      c && e.compare(c, t) <= 0 ? (Object(S["h"])(o[1], t), s = [c, t]) : (Object(S["h"])(o[0], t), s = [t]);
    }
    e.fireSelectValueChange(s);
  }, this.onKeyDown = function (t) {
    if ("input" !== t.target.nodeName.toLowerCase()) {
      var n = t.keyCode,
        r = t.ctrlKey || t.metaKey,
        i = e.state,
        o = i.selectedValue,
        a = i.hoverValue,
        s = i.firstSelectedValue,
        l = i.value,
        c = e.props,
        u = c.onKeyDown,
        h = c.disabledDate,
        f = function (n) {
          var r = void 0,
            i = void 0,
            c = void 0;
          if (s ? 1 === a.length ? (r = a[0].clone(), i = n(r), c = e.onDayHover(i)) : (r = a[0].isSame(s, "day") ? a[1] : a[0], i = n(r), c = e.onDayHover(i)) : (r = a[0] || o[0] || l[0] || g()(), i = n(r), c = [i], e.fireHoverValueChange(c)), c.length >= 2) {
            var u = c.some(function (e) {
              return !Object(P["d"])(l, e, "month");
            });
            if (u) {
              var h = c.slice().sort(function (e, t) {
                return e.valueOf() - t.valueOf();
              });
              h[0].isSame(h[1], "month") && (h[1] = h[0].clone().add(1, "month")), e.fireValueChange(h);
            }
          } else if (1 === c.length) {
            var f = l.findIndex(function (e) {
              return e.isSame(r, "month");
            });
            if (-1 === f && (f = 0), l.every(function (e) {
              return !e.isSame(i, "month");
            })) {
              var d = l.slice();
              d[f] = i.clone(), e.fireValueChange(d);
            }
          }
          return t.preventDefault(), i;
        };
      switch (n) {
        case w["a"].DOWN:
          return void f(function (e) {
            return Object(P["c"])(e, 1, "weeks");
          });
        case w["a"].UP:
          return void f(function (e) {
            return Object(P["c"])(e, -1, "weeks");
          });
        case w["a"].LEFT:
          return void f(r ? function (e) {
            return Object(P["c"])(e, -1, "years");
          } : function (e) {
            return Object(P["c"])(e, -1, "days");
          });
        case w["a"].RIGHT:
          return void f(r ? function (e) {
            return Object(P["c"])(e, 1, "years");
          } : function (e) {
            return Object(P["c"])(e, 1, "days");
          });
        case w["a"].HOME:
          return void f(function (e) {
            return Object(P["b"])(e);
          });
        case w["a"].END:
          return void f(function (e) {
            return Object(P["a"])(e);
          });
        case w["a"].PAGE_DOWN:
          return void f(function (e) {
            return Object(P["c"])(e, 1, "month");
          });
        case w["a"].PAGE_UP:
          return void f(function (e) {
            return Object(P["c"])(e, -1, "month");
          });
        case w["a"].ENTER:
          var d = void 0;
          return d = 0 === a.length ? f(function (e) {
            return e;
          }) : 1 === a.length ? a[0] : a[0].isSame(s, "day") ? a[1] : a[0], !d || h && h(d) || e.onSelect(d), void t.preventDefault();
        default:
          u && u(t);
      }
    }
  }, this.onDayHover = function (t) {
    var n = [],
      r = e.state,
      i = r.selectedValue,
      o = r.firstSelectedValue,
      a = e.props.type;
    if ("start" === a && i[1]) n = e.compare(t, i[1]) < 0 ? [t, i[1]] : [t];else if ("end" === a && i[0]) n = e.compare(t, i[0]) > 0 ? [i[0], t] : [];else {
      if (!o) return e.state.hoverValue.length && e.setState({
        hoverValue: []
      }), n;
      n = e.compare(t, o) < 0 ? [t, o] : [o, t];
    }
    return e.fireHoverValueChange(n), n;
  }, this.onToday = function () {
    var t = Object(S["e"])(e.state.value[0]),
      n = t.clone().add(1, "months");
    e.setState({
      value: [t, n]
    });
  }, this.onOpenTimePicker = function () {
    e.setState({
      showTimePicker: !0
    });
  }, this.onCloseTimePicker = function () {
    e.setState({
      showTimePicker: !1
    });
  }, this.onOk = function () {
    var t = e.state.selectedValue;
    e.isAllowedDateAndTime(t) && e.props.onOk(e.state.selectedValue);
  }, this.onStartInputChange = function () {
    for (var t = arguments.length, n = Array(t), r = 0; r < t; r++) n[r] = arguments[r];
    var i = ["left"].concat(n);
    return $.apply(e, i);
  }, this.onEndInputChange = function () {
    for (var t = arguments.length, n = Array(t), r = 0; r < t; r++) n[r] = arguments[r];
    var i = ["right"].concat(n);
    return $.apply(e, i);
  }, this.onStartInputSelect = function (t) {
    var n = ["left", t, {
      source: "dateInputSelect"
    }];
    return $.apply(e, n);
  }, this.onEndInputSelect = function (t) {
    var n = ["right", t, {
      source: "dateInputSelect"
    }];
    return $.apply(e, n);
  }, this.onStartValueChange = function (t) {
    var n = [].concat(e.state.value);
    return n[0] = t, e.fireValueChange(n);
  }, this.onEndValueChange = function (t) {
    var n = [].concat(e.state.value);
    return n[1] = t, e.fireValueChange(n);
  }, this.onStartPanelChange = function (t, n) {
    var r = e.props,
      i = e.state,
      o = [n, i.mode[1]],
      a = {
        panelTriggerSource: "start"
      };
    "mode" in r || (a.mode = o), e.setState(a);
    var s = [t || i.value[0], i.value[1]];
    r.onPanelChange(s, o);
  }, this.onEndPanelChange = function (t, n) {
    var r = e.props,
      i = e.state,
      o = [i.mode[0], n],
      a = {
        panelTriggerSource: "end"
      };
    "mode" in r || (a.mode = o), e.setState(a);
    var s = [i.value[0], t || i.value[1]];
    r.onPanelChange(s, o);
  }, this.getStartValue = function () {
    var t = e.state,
      n = t.selectedValue,
      r = t.showTimePicker,
      i = t.value,
      o = t.mode,
      a = t.panelTriggerSource,
      s = i[0];
    return n[0] && e.props.timePicker && (s = s.clone(), Object(S["h"])(n[0], s)), r && n[0] && (s = n[0]), "end" === a && "date" === o[0] && "date" === o[1] && s.isSame(i[1], "month") && (s = s.clone().subtract(1, "month")), s;
  }, this.getEndValue = function () {
    var t = e.state,
      n = t.value,
      r = t.selectedValue,
      i = t.showTimePicker,
      o = t.mode,
      a = t.panelTriggerSource,
      s = n[1] ? n[1].clone() : n[0].clone().add(1, "month");
    return r[1] && e.props.timePicker && Object(S["h"])(r[1], s), i && (s = r[1] ? r[1] : e.getStartValue()), !i && "end" !== a && "date" === o[0] && "date" === o[1] && s.isSame(n[0], "month") && (s = s.clone().add(1, "month")), s;
  }, this.getEndDisableTime = function () {
    var t = e.state,
      n = t.selectedValue,
      r = t.value,
      i = e.props.disabledTime,
      o = i(n, "end") || {},
      a = n && n[0] || r[0].clone();
    if (!n[1] || a.isSame(n[1], "day")) {
      var s = a.hour(),
        l = a.minute(),
        c = a.second(),
        u = o.disabledHours,
        h = o.disabledMinutes,
        f = o.disabledSeconds,
        d = h ? h() : [],
        p = f ? f() : [];
      return u = I(s, u), h = I(l, h), f = I(c, f), {
        disabledHours: function () {
          return u;
        },
        disabledMinutes: function (e) {
          return e === s ? h : d;
        },
        disabledSeconds: function (e, t) {
          return e === s && t === l ? f : p;
        }
      };
    }
    return o;
  }, this.isAllowedDateAndTime = function (t) {
    return Object(S["g"])(t[0], e.props.disabledDate, e.disabledStartTime) && Object(S["g"])(t[1], e.props.disabledDate, e.disabledEndTime);
  }, this.isMonthYearPanelShow = function (e) {
    return ["month", "year", "decade"].indexOf(e) > -1;
  }, this.hasSelectedValue = function () {
    var t = e.state.selectedValue;
    return !!t[1] && !!t[0];
  }, this.compare = function (t, n) {
    return e.props.timePicker ? t.diff(n) : t.diff(n, "days");
  }, this.fireSelectValueChange = function (t, n, r) {
    var i = e.props.timePicker,
      o = e.state.prevSelectedValue;
    if (i && i.props.defaultValue) {
      var a = i.props.defaultValue;
      !o[0] && t[0] && Object(S["h"])(a[0], t[0]), !o[1] && t[1] && Object(S["h"])(a[1], t[1]);
    }
    if ("selectedValue" in e.props || e.setState({
      selectedValue: t
    }), !e.state.selectedValue[0] || !e.state.selectedValue[1]) {
      var s = t[0] || g()(),
        l = t[1] || s.clone().add(1, "months");
      e.setState({
        selectedValue: t,
        value: N([s, l])
      });
    }
    t[0] && !t[1] && (e.setState({
      firstSelectedValue: t[0]
    }), e.fireHoverValueChange(t.concat())), e.props.onChange(t), (n || t[0] && t[1]) && (e.setState({
      prevSelectedValue: t,
      firstSelectedValue: null
    }), e.fireHoverValueChange([]), e.props.onSelect(t, r));
  }, this.fireValueChange = function (t) {
    var n = e.props;
    "value" in n || e.setState({
      value: t
    }), n.onValueChange(t);
  }, this.fireHoverValueChange = function (t) {
    var n = e.props;
    "hoverValue" in n || e.setState({
      hoverValue: t
    }), n.onHoverChange(t);
  }, this.clear = function () {
    e.fireSelectValueChange([], !0), e.props.onClear();
  }, this.disabledStartTime = function (t) {
    return e.props.disabledTime(t, "start");
  }, this.disabledEndTime = function (t) {
    return e.props.disabledTime(t, "end");
  }, this.disabledStartMonth = function (t) {
    var n = e.state.value;
    return t.isAfter(n[1], "month");
  }, this.disabledEndMonth = function (t) {
    var n = e.state.value;
    return t.isBefore(n[0], "month");
  };
};
Object(b["polyfill"])(F);
legacyExports["a"] = Object(A["a"])(F);
