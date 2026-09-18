let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "c", function () {
  return d;
}), defineExport(legacyExports, "b", function () {
  return p;
}), defineExport(legacyExports, "a", function () {
  return m;
});
var r = require("./classCallCheck.js"),
  i = interopDefault(r),
  o = require("./46597733.js"),
  a = interopDefault(o),
  s = require("./6d526730.js"),
  l = interopDefault(s),
  c = require("./propTypesRuntime.js"),
  u = interopDefault(c),
  h = require("./antdDateLocaleEn.js");
function f() {}
var d = {
    className: u.a.string,
    locale: u.a.object,
    style: u.a.object,
    visible: u.a.bool,
    onSelect: u.a.func,
    prefixCls: u.a.string,
    onChange: u.a.func,
    onOk: u.a.func
  },
  p = {
    locale: h["a"],
    style: {},
    visible: !0,
    prefixCls: "rc-calendar",
    className: "",
    onSelect: f,
    onChange: f,
    onClear: f,
    renderFooter: function () {
      return null;
    },
    renderSidebar: function () {
      return null;
    }
  },
  m = function (e) {
    var t, n;
    return n = t = function (e) {
      function t() {
        var n, r, o;
        i()(this, t);
        for (var s = arguments.length, l = Array(s), c = 0; c < s; c++) l[c] = arguments[c];
        return r = a()(this, e.call.apply(e, [this].concat(l))), n = r, r.getFormat = function () {
          var e = r.props.format,
            t = r.props,
            n = t.locale,
            i = t.timePicker;
          return e || (e = i ? n.dateTimeFormat : n.dateFormat), e;
        }, r.focus = function () {
          r.focusElement ? r.focusElement.focus() : r.rootInstance && r.rootInstance.focus();
        }, r.saveFocusElement = function (e) {
          r.focusElement = e;
        }, r.saveRoot = function (e) {
          r.rootInstance = e;
        }, o = n, a()(r, o);
      }
      return l()(t, e), t.prototype.shouldComponentUpdate = function (e) {
        return this.props.visible || e.visible;
      }, t;
    }(e), t.displayName = "CommonMixinWrapper", t.defaultProps = e.defaultProps, t.getDerivedStateFromProps = e.getDerivedStateFromProps, n;
  };
