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
  d = require("./reactDomRuntime.js"),
  p = interopDefault(d),
  m = require("./propTypesRuntime.js"),
  g = interopDefault(m),
  v = require("./75625a64.js"),
  y = require("./classNames.js"),
  b = interopDefault(y),
  w = require("./4a557875.js"),
  x = require("./59565971.js"),
  _ = require("./6d776b4d.js"),
  E = function (e) {
    function t() {
      return a()(this, t), l()(this, e.apply(this, arguments));
    }
    return u()(t, e), t.prototype.onSelect = function (e) {
      this.props.onSelect(e);
    }, t.prototype.getRootDOMNode = function () {
      return p.a.findDOMNode(this);
    }, t.prototype.render = function () {
      var e = this.props,
        t = e.value,
        n = e.prefixCls,
        r = e.showOk,
        o = e.timePicker,
        a = e.renderFooter,
        s = e.mode,
        l = null,
        c = a && a(s);
      if (e.showToday || o || c) {
        var u,
          h = void 0;
        e.showToday && (h = f.a.createElement(w["a"], i()({}, e, {
          value: t
        })));
        var d = void 0;
        (!0 === r || !1 !== r && e.timePicker) && (d = f.a.createElement(x["a"], e));
        var p = void 0;
        e.timePicker && (p = f.a.createElement(_["a"], e));
        var m = void 0;
        (h || p || d || c) && (m = f.a.createElement("span", {
          className: n + "-footer-btn"
        }, c, Object(v["a"])([h, p, d])));
        var g = b()(n + "-footer", (u = {}, u[n + "-footer-show-ok"] = d, u));
        l = f.a.createElement("div", {
          className: g
        }, m);
      }
      return l;
    }, t;
  }(f.a.Component);
E.propTypes = {
  prefixCls: g.a.string,
  showDateInput: g.a.bool,
  disabledTime: g.a.any,
  timePicker: g.a.element,
  selectedValue: g.a.any,
  showOk: g.a.bool,
  onSelect: g.a.func,
  value: g.a.object,
  renderFooter: g.a.func,
  defaultValue: g.a.object,
  mode: g.a.string
}, legacyExports["a"] = E;
