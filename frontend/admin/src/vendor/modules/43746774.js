let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports);
var r = require("./reactRuntime.js"),
  i = interopDefault(r),
  o = require("./31377839.js"),
  a = interopDefault(o),
  s = require("./reactLifecyclesCompat.js");
function l() {
  return l = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, l.apply(this, arguments);
}
function c(e, t) {
  if (null == e) return {};
  var n,
    r,
    i = u(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
  }
  return i;
}
function u(e, t) {
  if (null == e) return {};
  var n,
    r,
    i = {},
    o = Object.keys(e);
  for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || (i[n] = e[n]);
  return i;
}
function h(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function f(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function d(e, t, n) {
  return t && f(e.prototype, t), n && f(e, n), e;
}
function p(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && m(e, t);
}
function m(e, t) {
  return m = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, m(e, t);
}
function g(e) {
  var t = b();
  return function () {
    var n,
      r = w(e);
    if (t) {
      var i = w(this).constructor;
      n = Reflect.construct(r, arguments, i);
    } else n = r.apply(this, arguments);
    return v(this, n);
  };
}
function v(e, t) {
  return !t || "object" !== typeof t && "function" !== typeof t ? y(e) : t;
}
function y(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function b() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function w(e) {
  return w = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, w(e);
}
function x(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var _ = require("./classNames.js"),
  E = function (e) {
    p(n, e);
    var t = g(n);
    function n(e) {
      var r;
      h(this, n), r = t.call(this, e), x(y(r), "handleClick", function (e) {
        var t = r.state.checked,
          n = r.props.onClick,
          i = !t;
        r.setChecked(i, e), n && n(i, e);
      }), x(y(r), "handleKeyDown", function (e) {
        37 === e.keyCode ? r.setChecked(!1, e) : 39 === e.keyCode && r.setChecked(!0, e);
      }), x(y(r), "handleMouseUp", function (e) {
        var t = r.props.onMouseUp;
        r.node && r.node.blur(), t && t(e);
      }), x(y(r), "saveNode", function (e) {
        r.node = e;
      });
      var i = !1;
      return i = "checked" in e ? !!e.checked : !!e.defaultChecked, r.state = {
        checked: i
      }, r;
    }
    return d(n, [{
      key: "componentDidMount",
      value: function () {
        var e = this.props,
          t = e.autoFocus,
          n = e.disabled;
        t && !n && this.focus();
      }
    }, {
      key: "setChecked",
      value: function (e, t) {
        var n = this.props,
          r = n.disabled,
          i = n.onChange;
        r || ("checked" in this.props || this.setState({
          checked: e
        }), i && i(e, t));
      }
    }, {
      key: "focus",
      value: function () {
        this.node.focus();
      }
    }, {
      key: "blur",
      value: function () {
        this.node.blur();
      }
    }, {
      key: "render",
      value: function () {
        var e,
          t = this.props,
          n = t.className,
          r = t.prefixCls,
          o = t.disabled,
          a = t.loadingIcon,
          s = t.checkedChildren,
          u = t.unCheckedChildren,
          h = c(t, ["className", "prefixCls", "disabled", "loadingIcon", "checkedChildren", "unCheckedChildren"]),
          f = this.state.checked,
          d = _((e = {}, x(e, n, !!n), x(e, r, !0), x(e, "".concat(r, "-checked"), f), x(e, "".concat(r, "-disabled"), o), e));
        return i.a.createElement("button", l({}, h, {
          type: "button",
          role: "switch",
          "aria-checked": f,
          disabled: o,
          className: d,
          ref: this.saveNode,
          onKeyDown: this.handleKeyDown,
          onClick: this.handleClick,
          onMouseUp: this.handleMouseUp
        }), a, i.a.createElement("span", {
          className: "".concat(r, "-inner")
        }, f ? s : u));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function (e) {
        var t = {},
          n = e.checked;
        return "checked" in e && (t.checked = !!n), t;
      }
    }]), n;
  }(r["Component"]);
E.propTypes = {
  className: a.a.string,
  prefixCls: a.a.string,
  disabled: a.a.bool,
  checkedChildren: a.a.any,
  unCheckedChildren: a.a.any,
  onChange: a.a.func,
  onMouseUp: a.a.func,
  onClick: a.a.func,
  tabIndex: a.a.number,
  checked: a.a.bool,
  defaultChecked: a.a.bool,
  autoFocus: a.a.bool,
  loadingIcon: a.a.node
}, E.defaultProps = {
  prefixCls: "rc-switch",
  checkedChildren: null,
  unCheckedChildren: null,
  className: "",
  defaultChecked: !1
}, Object(s["polyfill"])(E), legacyExports["default"] = E;
