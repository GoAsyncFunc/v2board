let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "d", function () {
  return b;
}), defineExport(legacyExports, "b", function () {
  return w;
}), defineExport(legacyExports, "a", function () {
  return x;
}), defineExport(legacyExports, "c", function () {
  return _;
});
var r = require("./classCallCheck.js"),
  i = interopDefault(r),
  o = require("./possibleConstructorReturn.js"),
  a = interopDefault(o),
  s = require("./6d526730.js"),
  l = interopDefault(s),
  c = require("./reactRuntime.js"),
  u = interopDefault(c),
  h = require("./propTypesRuntime.js"),
  f = interopDefault(h),
  d = require("./classNames.js"),
  p = interopDefault(d),
  m = require("./momentRuntime.js"),
  g = interopDefault(m),
  v = require("./47727448.js");
function y() {}
function b(e) {
  var t = void 0;
  return t = e ? Object(v["e"])(e) : g()(), t;
}
var w = {
    value: f.a.object,
    defaultValue: f.a.object,
    onKeyDown: f.a.func
  },
  x = {
    onKeyDown: y
  },
  _ = function (e) {
    var t, n;
    return n = t = function (t) {
      function n() {
        var e, r, o;
        i()(this, n);
        for (var s = arguments.length, l = Array(s), c = 0; c < s; c++) l[c] = arguments[c];
        return r = a()(this, t.call.apply(t, [this].concat(l))), e = r, r.onSelect = function (e, t) {
          e && r.setValue(e), r.setSelectedValue(e, t);
        }, r.renderRoot = function (e) {
          var t,
            n = r.props,
            i = n.prefixCls,
            o = (t = {}, t[i] = 1, t[i + "-hidden"] = !n.visible, t[n.className] = !!n.className, t[e.className] = !!e.className, t);
          return u.a.createElement("div", {
            ref: r.saveRoot,
            className: "" + p()(o),
            style: r.props.style,
            tabIndex: "0",
            onKeyDown: r.onKeyDown,
            onBlur: r.onBlur
          }, e.children);
        }, r.setSelectedValue = function (e, t) {
          "selectedValue" in r.props || r.setState({
            selectedValue: e
          }), r.props.onSelect && r.props.onSelect(e, t);
        }, r.setValue = function (e) {
          var t = r.state.value;
          "value" in r.props || r.setState({
            value: e
          }), (t && e && !t.isSame(e) || !t && e || t && !e) && r.props.onChange(e);
        }, r.isAllowedDate = function (e) {
          var t = r.props.disabledDate,
            n = r.props.disabledTime;
          return Object(v["g"])(e, t, n);
        }, o = e, a()(r, o);
      }
      return l()(n, t), n.getDerivedStateFromProps = function (t, n) {
        if (e.getDerivedStateFromProps) return e.getDerivedStateFromProps(t, n);
        var r = t.value,
          i = t.selectedValue,
          o = {};
        return "value" in t && (o.value = r || t.defaultValue || b(n.value)), "selectedValue" in t && (o.selectedValue = i), o;
      }, n;
    }(e), t.displayName = "CalendarMixinWrapper", t.defaultProps = e.defaultProps, n;
  };
