let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./objectWithoutProperties.js"),
  o = interopDefault(r),
  i = require("./objectAssignHelper.js"),
  a = interopDefault(i),
  s = require("./classCallCheck.js"),
  c = interopDefault(s),
  u = require("./possibleConstructorReturn.js"),
  l = interopDefault(u),
  f = require("./inheritsHelper.js"),
  p = interopDefault(f),
  d = require("./reactRuntime.js"),
  h = interopDefault(d),
  m = require("./propTypesRuntime.js"),
  v = interopDefault(m),
  y = require("./classNames.js"),
  g = interopDefault(y),
  b = require("./reactLifecyclesCompat.js"),
  w = function (e) {
    function t(n) {
      c()(this, t);
      var r = l()(this, e.call(this, n));
      r.handleChange = function (e) {
        var t = r.props,
          n = t.disabled,
          o = t.onChange;
        n || ("checked" in r.props || r.setState({
          checked: e.target.checked
        }), o && o({
          target: a()({}, r.props, {
            checked: e.target.checked
          }),
          stopPropagation: function () {
            e.stopPropagation();
          },
          preventDefault: function () {
            e.preventDefault();
          },
          nativeEvent: e.nativeEvent
        }));
      }, r.saveInput = function (e) {
        r.input = e;
      };
      var o = "checked" in n ? n.checked : n.defaultChecked;
      return r.state = {
        checked: o
      }, r;
    }
    return p()(t, e), t.getDerivedStateFromProps = function (e, t) {
      return "checked" in e ? a()({}, t, {
        checked: e.checked
      }) : null;
    }, t.prototype.focus = function () {
      this.input.focus();
    }, t.prototype.blur = function () {
      this.input.blur();
    }, t.prototype.render = function () {
      var e,
        t = this.props,
        n = t.prefixCls,
        r = t.className,
        i = t.style,
        s = t.name,
        c = t.id,
        u = t.type,
        l = t.disabled,
        f = t.readOnly,
        p = t.tabIndex,
        d = t.onClick,
        m = t.onFocus,
        v = t.onBlur,
        y = t.autoFocus,
        b = t.value,
        w = o()(t, ["prefixCls", "className", "style", "name", "id", "type", "disabled", "readOnly", "tabIndex", "onClick", "onFocus", "onBlur", "autoFocus", "value"]),
        x = Object.keys(w).reduce(function (e, t) {
          return "aria-" !== t.substr(0, 5) && "data-" !== t.substr(0, 5) && "role" !== t || (e[t] = w[t]), e;
        }, {}),
        O = this.state.checked,
        E = g()(n, r, (e = {}, e[n + "-checked"] = O, e[n + "-disabled"] = l, e));
      return h.a.createElement("span", {
        className: E,
        style: i
      }, h.a.createElement("input", a()({
        name: s,
        id: c,
        type: u,
        readOnly: f,
        disabled: l,
        tabIndex: p,
        className: n + "-input",
        checked: !!O,
        onClick: d,
        onFocus: m,
        onBlur: v,
        onChange: this.handleChange,
        autoFocus: y,
        ref: this.saveInput,
        value: b
      }, x)), h.a.createElement("span", {
        className: n + "-inner"
      }));
    }, t;
  }(d["Component"]);
w.propTypes = {
  prefixCls: v.a.string,
  className: v.a.string,
  style: v.a.object,
  name: v.a.string,
  id: v.a.string,
  type: v.a.string,
  defaultChecked: v.a.oneOfType([v.a.number, v.a.bool]),
  checked: v.a.oneOfType([v.a.number, v.a.bool]),
  disabled: v.a.bool,
  onFocus: v.a.func,
  onBlur: v.a.func,
  onChange: v.a.func,
  onClick: v.a.func,
  tabIndex: v.a.oneOfType([v.a.string, v.a.number]),
  readOnly: v.a.bool,
  autoFocus: v.a.bool,
  value: v.a.any
}, w.defaultProps = {
  prefixCls: "rc-checkbox",
  className: "",
  style: {},
  type: "checkbox",
  defaultChecked: !1,
  onFocus: function () {},
  onBlur: function () {},
  onChange: function () {}
}, Object(b["polyfill"])(w);
var x = w;
legacyExports["a"] = x;
