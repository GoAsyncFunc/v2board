let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./6a6f3659.js"),
  i = interopDefault(r),
  o = require("./51624c5a.js"),
  a = interopDefault(o),
  s = require("./69436335.js"),
  l = interopDefault(s),
  c = require("./46597733.js"),
  u = interopDefault(c),
  h = require("./6d526730.js"),
  f = interopDefault(h),
  d = require("./71317449.js"),
  p = interopDefault(d),
  m = require("./31377839.js"),
  g = interopDefault(m),
  v = require("./54535951.js"),
  y = interopDefault(v),
  b = require("./56434c38.js"),
  w = function (e) {
    function t(n) {
      l()(this, t);
      var r = u()(this, e.call(this, n));
      r.handleChange = function (e) {
        var t = r.props,
          n = t.disabled,
          i = t.onChange;
        n || ("checked" in r.props || r.setState({
          checked: e.target.checked
        }), i && i({
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
      var i = "checked" in n ? n.checked : n.defaultChecked;
      return r.state = {
        checked: i
      }, r;
    }
    return f()(t, e), t.getDerivedStateFromProps = function (e, t) {
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
        o = t.style,
        s = t.name,
        l = t.id,
        c = t.type,
        u = t.disabled,
        h = t.readOnly,
        f = t.tabIndex,
        d = t.onClick,
        m = t.onFocus,
        g = t.onBlur,
        v = t.autoFocus,
        b = t.value,
        w = i()(t, ["prefixCls", "className", "style", "name", "id", "type", "disabled", "readOnly", "tabIndex", "onClick", "onFocus", "onBlur", "autoFocus", "value"]),
        x = Object.keys(w).reduce(function (e, t) {
          return "aria-" !== t.substr(0, 5) && "data-" !== t.substr(0, 5) && "role" !== t || (e[t] = w[t]), e;
        }, {}),
        _ = this.state.checked,
        E = y()(n, r, (e = {}, e[n + "-checked"] = _, e[n + "-disabled"] = u, e));
      return p.a.createElement("span", {
        className: E,
        style: o
      }, p.a.createElement("input", a()({
        name: s,
        id: l,
        type: c,
        readOnly: h,
        disabled: u,
        tabIndex: f,
        className: n + "-input",
        checked: !!_,
        onClick: d,
        onFocus: m,
        onBlur: g,
        onChange: this.handleChange,
        autoFocus: v,
        ref: this.saveInput,
        value: b
      }, x)), p.a.createElement("span", {
        className: n + "-inner"
      }));
    }, t;
  }(d["Component"]);
w.propTypes = {
  prefixCls: g.a.string,
  className: g.a.string,
  style: g.a.object,
  name: g.a.string,
  id: g.a.string,
  type: g.a.string,
  defaultChecked: g.a.oneOfType([g.a.number, g.a.bool]),
  checked: g.a.oneOfType([g.a.number, g.a.bool]),
  disabled: g.a.bool,
  onFocus: g.a.func,
  onBlur: g.a.func,
  onChange: g.a.func,
  onClick: g.a.func,
  tabIndex: g.a.oneOfType([g.a.string, g.a.number]),
  readOnly: g.a.bool,
  autoFocus: g.a.bool,
  value: g.a.any
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
