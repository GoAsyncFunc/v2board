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
  h = require("./reactRuntime.js"),
  f = interopDefault(h),
  d = require("./69386934.js"),
  p = interopDefault(d),
  m = require("./propTypesRuntime.js"),
  g = interopDefault(m),
  v = require("./34496c57.js"),
  y = require("./reactLifecyclesCompat.js"),
  b = require("./66446371.js"),
  w = require("./327a7053.js"),
  x = require("./4a447a4c.js"),
  _ = require("./6a425a47.js"),
  E = require("./4634567a.js"),
  S = require("./56656768.js"),
  k = require("./47727448.js"),
  C = require("./37494362.js"),
  O = require("./momentRuntime.js"),
  T = interopDefault(O);
function L() {}
var A = function (e) {
    return !(!T.a.isMoment(e) || !e.isValid()) && e;
  },
  P = function (e) {
    function t(n) {
      a()(this, t);
      var r = l()(this, e.call(this, n));
      return j.call(r), r.state = {
        mode: r.props.mode || "date",
        value: A(n.value) || A(n.defaultValue) || T()(),
        selectedValue: n.selectedValue || n.defaultSelectedValue
      }, r;
    }
    return u()(t, e), t.prototype.componentDidMount = function () {
      this.props.showDateInput && this.saveFocusElement(S["a"].getInstance());
    }, t.getDerivedStateFromProps = function (e, t) {
      var n = e.value,
        r = e.selectedValue,
        i = {};
      return "mode" in e && t.mode !== e.mode && (i = {
        mode: e.mode
      }), "value" in e && (i.value = A(n) || A(e.defaultValue) || Object(_["d"])(t.value)), "selectedValue" in e && (i.selectedValue = r), i;
    }, t.prototype.render = function () {
      var e = this.props,
        t = this.state,
        n = e.locale,
        r = e.prefixCls,
        o = e.disabledDate,
        a = e.dateInputPlaceholder,
        s = e.timePicker,
        l = e.disabledTime,
        c = e.clearIcon,
        u = e.renderFooter,
        h = e.inputMode,
        d = e.monthCellRender,
        p = e.monthCellContentRender,
        m = t.value,
        g = t.selectedValue,
        v = t.mode,
        y = "time" === v,
        _ = y && l && s ? Object(k["c"])(g, l) : null,
        E = null;
      if (s && y) {
        var C = i()({
          showHour: !0,
          showSecond: !0,
          showMinute: !0
        }, s.props, _, {
          onChange: this.onDateInputChange,
          value: g,
          disabledTime: l
        });
        void 0 !== s.props.defaultValue && (C.defaultOpenValue = s.props.defaultValue), E = f.a.cloneElement(s, C);
      }
      var O = e.showDateInput ? f.a.createElement(S["a"], {
          format: this.getFormat(),
          key: "date-input",
          value: m,
          locale: n,
          placeholder: a,
          showClear: !0,
          disabledTime: l,
          disabledDate: o,
          onClear: this.onClear,
          prefixCls: r,
          selectedValue: g,
          onChange: this.onDateInputChange,
          onSelect: this.onDateInputSelect,
          clearIcon: c,
          inputMode: h
        }) : null,
        T = [];
      return e.renderSidebar && T.push(e.renderSidebar()), T.push(f.a.createElement("div", {
        className: r + "-panel",
        key: "panel"
      }, O, f.a.createElement("div", {
        tabIndex: this.props.focusablePanel ? 0 : void 0,
        className: r + "-date-panel"
      }, f.a.createElement(w["a"], {
        locale: n,
        mode: v,
        value: m,
        onValueChange: this.setValue,
        onPanelChange: this.onPanelChange,
        renderFooter: u,
        showTimePicker: y,
        prefixCls: r,
        monthCellRender: d,
        monthCellContentRender: p
      }), s && y ? f.a.createElement("div", {
        className: r + "-time-picker"
      }, f.a.createElement("div", {
        className: r + "-time-picker-panel"
      }, E)) : null, f.a.createElement("div", {
        className: r + "-body"
      }, f.a.createElement(b["a"], {
        locale: n,
        value: m,
        selectedValue: g,
        prefixCls: r,
        dateRender: e.dateRender,
        onSelect: this.onDateTableSelect,
        disabledDate: o,
        showWeekNumber: e.showWeekNumber
      })), f.a.createElement(x["a"], {
        showOk: e.showOk,
        mode: v,
        renderFooter: e.renderFooter,
        locale: n,
        prefixCls: r,
        showToday: e.showToday,
        disabledTime: l,
        showTimePicker: y,
        showDateInput: e.showDateInput,
        timePicker: s,
        selectedValue: g,
        timePickerDisabled: !g,
        value: m,
        disabledDate: o,
        okDisabled: !1 !== e.showOk && (!g || !this.isAllowedDate(g)),
        onOk: this.onOk,
        onSelect: this.onSelect,
        onToday: this.onToday,
        onOpenTimePicker: this.openTimePicker,
        onCloseTimePicker: this.closeTimePicker
      })))), this.renderRoot({
        children: T,
        className: e.showWeekNumber ? r + "-week-number" : ""
      });
    }, t;
  }(f.a.Component);
P.propTypes = i()({}, _["b"], E["c"], {
  prefixCls: g.a.string,
  className: g.a.string,
  style: g.a.object,
  defaultValue: g.a.object,
  value: g.a.object,
  selectedValue: g.a.object,
  defaultSelectedValue: g.a.object,
  mode: g.a.oneOf(["time", "date", "month", "year", "decade"]),
  locale: g.a.object,
  showDateInput: g.a.bool,
  showWeekNumber: g.a.bool,
  showToday: g.a.bool,
  showOk: g.a.bool,
  onSelect: g.a.func,
  onOk: g.a.func,
  onKeyDown: g.a.func,
  timePicker: g.a.element,
  dateInputPlaceholder: g.a.any,
  onClear: g.a.func,
  onChange: g.a.func,
  onPanelChange: g.a.func,
  disabledDate: g.a.func,
  disabledTime: g.a.any,
  dateRender: g.a.func,
  renderFooter: g.a.func,
  renderSidebar: g.a.func,
  clearIcon: g.a.node,
  focusablePanel: g.a.bool,
  inputMode: g.a.string,
  onBlur: g.a.func
}), P.defaultProps = i()({}, _["a"], E["b"], {
  showToday: !0,
  showDateInput: !0,
  timePicker: null,
  onOk: L,
  onPanelChange: L,
  focusablePanel: !0
});
var j = function () {
  var e = this;
  this.onPanelChange = function (t, n) {
    var r = e.props,
      i = e.state;
    "mode" in r || e.setState({
      mode: n
    }), r.onPanelChange(t || i.value, n);
  }, this.onKeyDown = function (t) {
    if ("input" !== t.target.nodeName.toLowerCase()) {
      var n = t.keyCode,
        r = t.ctrlKey || t.metaKey,
        i = e.props.disabledDate,
        o = e.state.value;
      switch (n) {
        case v["a"].DOWN:
          return e.goTime(1, "weeks"), t.preventDefault(), 1;
        case v["a"].UP:
          return e.goTime(-1, "weeks"), t.preventDefault(), 1;
        case v["a"].LEFT:
          return r ? e.goTime(-1, "years") : e.goTime(-1, "days"), t.preventDefault(), 1;
        case v["a"].RIGHT:
          return r ? e.goTime(1, "years") : e.goTime(1, "days"), t.preventDefault(), 1;
        case v["a"].HOME:
          return e.setValue(Object(C["b"])(e.state.value)), t.preventDefault(), 1;
        case v["a"].END:
          return e.setValue(Object(C["a"])(e.state.value)), t.preventDefault(), 1;
        case v["a"].PAGE_DOWN:
          return e.goTime(1, "month"), t.preventDefault(), 1;
        case v["a"].PAGE_UP:
          return e.goTime(-1, "month"), t.preventDefault(), 1;
        case v["a"].ENTER:
          return i && i(o) || e.onSelect(o, {
            source: "keyboard"
          }), t.preventDefault(), 1;
        default:
          return e.props.onKeyDown(t), 1;
      }
    }
  }, this.onClear = function () {
    e.onSelect(null), e.props.onClear();
  }, this.onOk = function () {
    var t = e.state.selectedValue;
    e.isAllowedDate(t) && e.props.onOk(t);
  }, this.onDateInputChange = function (t) {
    e.onSelect(t, {
      source: "dateInput"
    });
  }, this.onDateInputSelect = function (t) {
    e.onSelect(t, {
      source: "dateInputSelect"
    });
  }, this.onDateTableSelect = function (t) {
    var n = e.props.timePicker,
      r = e.state.selectedValue;
    if (!r && n) {
      var i = n.props.defaultValue;
      i && Object(k["h"])(i, t);
    }
    e.onSelect(t);
  }, this.onToday = function () {
    var t = e.state.value,
      n = Object(k["e"])(t);
    e.onSelect(n, {
      source: "todayButton"
    });
  }, this.onBlur = function (t) {
    setTimeout(function () {
      var n = S["a"].getInstance(),
        r = e.rootInstance;
      !r || r.contains(document.activeElement) || n && n.contains(document.activeElement) || e.props.onBlur && e.props.onBlur(t);
    }, 0);
  }, this.getRootDOMNode = function () {
    return p.a.findDOMNode(e);
  }, this.openTimePicker = function () {
    e.onPanelChange(null, "time");
  }, this.closeTimePicker = function () {
    e.onPanelChange(null, "date");
  }, this.goTime = function (t, n) {
    e.setValue(Object(C["c"])(e.state.value, t, n));
  };
};
Object(y["polyfill"])(P);
var M = Object(_["c"])(Object(E["a"])(P));
legacyExports["a"] = M;
