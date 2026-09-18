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
  d = require("./propTypesRuntime.js"),
  p = interopDefault(d),
  m = require("./34496c57.js"),
  g = require("./reactLifecyclesCompat.js"),
  v = require("./momentRuntime.js"),
  y = interopDefault(v),
  b = require("./47727448.js"),
  w = void 0,
  x = void 0,
  _ = void 0,
  E = function (e) {
    function t(n) {
      i()(this, t);
      var r = a()(this, e.call(this, n));
      S.call(r);
      var o = n.selectedValue;
      return r.state = {
        str: Object(b["a"])(o, r.props.format),
        invalid: !1,
        hasFocus: !1
      }, r;
    }
    return l()(t, e), t.prototype.componentDidUpdate = function () {
      !_ || !this.state.hasFocus || this.state.invalid || 0 === w && 0 === x || _.setSelectionRange(w, x);
    }, t.getDerivedStateFromProps = function (e, t) {
      var n = {};
      _ && (w = _.selectionStart, x = _.selectionEnd);
      var r = e.selectedValue;
      return t.hasFocus || (n = {
        str: Object(b["a"])(r, e.format),
        invalid: !1
      }), n;
    }, t.getInstance = function () {
      return _;
    }, t.prototype.render = function () {
      var e = this.props,
        t = this.state,
        n = t.invalid,
        r = t.str,
        i = e.locale,
        o = e.prefixCls,
        a = e.placeholder,
        s = e.clearIcon,
        l = e.inputMode,
        c = n ? o + "-input-invalid" : "";
      return u.a.createElement("div", {
        className: o + "-input-wrap"
      }, u.a.createElement("div", {
        className: o + "-date-input-wrap"
      }, u.a.createElement("input", {
        ref: this.saveDateInput,
        className: o + "-input " + c,
        value: r,
        disabled: e.disabled,
        placeholder: a,
        onChange: this.onInputChange,
        onKeyDown: this.onKeyDown,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        inputMode: l
      })), e.showClear ? u.a.createElement("a", {
        role: "button",
        title: i.clear,
        onClick: this.onClear
      }, s || u.a.createElement("span", {
        className: o + "-clear-btn"
      })) : null);
    }, t;
  }(u.a.Component);
E.propTypes = {
  prefixCls: p.a.string,
  timePicker: p.a.object,
  value: p.a.object,
  disabledTime: p.a.any,
  format: p.a.oneOfType([p.a.string, p.a.arrayOf(p.a.string)]),
  locale: p.a.object,
  disabledDate: p.a.func,
  onChange: p.a.func,
  onClear: p.a.func,
  placeholder: p.a.string,
  onSelect: p.a.func,
  selectedValue: p.a.object,
  clearIcon: p.a.node,
  inputMode: p.a.string
};
var S = function () {
  var e = this;
  this.onClear = function () {
    e.setState({
      str: ""
    }), e.props.onClear(null);
  }, this.onInputChange = function (t) {
    var n = t.target.value,
      r = e.props,
      i = r.disabledDate,
      o = r.format,
      a = r.onChange,
      s = r.selectedValue;
    if (!n) return a(null), void e.setState({
      invalid: !1,
      str: n
    });
    var l = y()(n, o, !0);
    if (l.isValid()) {
      var c = e.props.value.clone();
      c.year(l.year()).month(l.month()).date(l.date()).hour(l.hour()).minute(l.minute()).second(l.second()), !c || i && i(c) ? e.setState({
        invalid: !0,
        str: n
      }) : (s !== c || s && c && !s.isSame(c)) && (e.setState({
        invalid: !1,
        str: n
      }), a(c));
    } else e.setState({
      invalid: !0,
      str: n
    });
  }, this.onFocus = function () {
    e.setState({
      hasFocus: !0
    });
  }, this.onBlur = function () {
    e.setState(function (e, t) {
      return {
        hasFocus: !1,
        str: Object(b["a"])(t.value, t.format)
      };
    });
  }, this.onKeyDown = function (t) {
    var n = t.keyCode,
      r = e.props,
      i = r.onSelect,
      o = r.value,
      a = r.disabledDate;
    if (n === m["a"].ENTER && i) {
      var s = !a || !a(o);
      s && i(o.clone()), t.preventDefault();
    }
  }, this.getRootDOMNode = function () {
    return f.a.findDOMNode(e);
  }, this.focus = function () {
    _ && _.focus();
  }, this.saveDateInput = function (e) {
    _ = e;
  };
};
Object(g["polyfill"])(E), legacyExports["a"] = E;
