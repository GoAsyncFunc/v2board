let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./51624c5a.js"),
  i = interopDefault(r),
  o = require("./classCallCheck.js"),
  a = interopDefault(o),
  s = require("./possibleConstructorReturn.js"),
  l = interopDefault(s),
  c = require("./6d526730.js"),
  u = interopDefault(c),
  h = require("./reactRuntime.js"),
  f = interopDefault(h),
  d = require("./propTypesRuntime.js"),
  p = interopDefault(d),
  m = require("./34496c57.js"),
  g = require("./reactLifecyclesCompat.js"),
  v = require("./327a7053.js"),
  y = require("./4a447a4c.js"),
  b = require("./6a425a47.js"),
  w = require("./4634567a.js"),
  x = require("./momentRuntime.js"),
  _ = interopDefault(x),
  E = function (e) {
    function t(n) {
      a()(this, t);
      var r = l()(this, e.call(this, n));
      return r.onKeyDown = function (e) {
        var t = e.keyCode,
          n = e.ctrlKey || e.metaKey,
          i = r.state.value,
          o = r.props.disabledDate,
          a = i;
        switch (t) {
          case m["a"].DOWN:
            a = i.clone(), a.add(3, "months");
            break;
          case m["a"].UP:
            a = i.clone(), a.add(-3, "months");
            break;
          case m["a"].LEFT:
            a = i.clone(), n ? a.add(-1, "years") : a.add(-1, "months");
            break;
          case m["a"].RIGHT:
            a = i.clone(), n ? a.add(1, "years") : a.add(1, "months");
            break;
          case m["a"].ENTER:
            return o && o(i) || r.onSelect(i), e.preventDefault(), 1;
          default:
            return;
        }
        if (a !== i) return r.setValue(a), e.preventDefault(), 1;
      }, r.handlePanelChange = function (e, t) {
        "date" !== t && r.setState({
          mode: t
        });
      }, r.state = {
        mode: "month",
        value: n.value || n.defaultValue || _()(),
        selectedValue: n.selectedValue || n.defaultSelectedValue
      }, r;
    }
    return u()(t, e), t.prototype.render = function () {
      var e = this.props,
        t = this.state,
        n = t.mode,
        r = t.value,
        i = f.a.createElement("div", {
          className: e.prefixCls + "-month-calendar-content"
        }, f.a.createElement("div", {
          className: e.prefixCls + "-month-header-wrap"
        }, f.a.createElement(v["a"], {
          prefixCls: e.prefixCls,
          mode: n,
          value: r,
          locale: e.locale,
          disabledMonth: e.disabledDate,
          monthCellRender: e.monthCellRender,
          monthCellContentRender: e.monthCellContentRender,
          onMonthSelect: this.onSelect,
          onValueChange: this.setValue,
          onPanelChange: this.handlePanelChange
        })), f.a.createElement(y["a"], {
          prefixCls: e.prefixCls,
          renderFooter: e.renderFooter
        }));
      return this.renderRoot({
        className: e.prefixCls + "-month-calendar",
        children: i
      });
    }, t;
  }(f.a.Component);
E.propTypes = i()({}, b["b"], w["c"], {
  monthCellRender: p.a.func,
  value: p.a.object,
  defaultValue: p.a.object,
  selectedValue: p.a.object,
  defaultSelectedValue: p.a.object,
  disabledDate: p.a.func
}), E.defaultProps = i()({}, w["b"], b["a"]), legacyExports["a"] = Object(g["polyfill"])(Object(b["c"])(Object(w["a"])(E)));
