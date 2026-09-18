let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./71317449.js"),
  i = interopDefault(r),
  o = require("./31377839.js"),
  a = interopDefault(o),
  s = require("./momentRuntime.js"),
  l = interopDefault(s),
  c = require("./54535951.js"),
  u = interopDefault(c),
  h = require("./56434c38.js");
function f(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function d(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function p(e, t, n) {
  return t && d(e.prototype, t), n && d(e, n), e;
}
function m(e, t) {
  return !t || "object" !== typeof t && "function" !== typeof t ? v(e) : t;
}
function g(e) {
  return g = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, g(e);
}
function v(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function y(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && b(e, t);
}
function b(e, t) {
  return b = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, b(e, t);
}
function w(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var x = function (e) {
  function t(e) {
    var n;
    f(this, t), n = m(this, g(t).call(this, e)), w(v(n), "onInputChange", function (e) {
      var t = e.target.value;
      n.setState({
        str: t
      });
      var r = n.props,
        i = r.format,
        o = r.hourOptions,
        a = r.minuteOptions,
        s = r.secondOptions,
        c = r.disabledHours,
        u = r.disabledMinutes,
        h = r.disabledSeconds,
        f = r.onChange;
      if (t) {
        var d = n.props.value,
          p = n.getProtoValue().clone(),
          m = l()(t, i, !0);
        if (!m.isValid()) return void n.setState({
          invalid: !0
        });
        if (p.hour(m.hour()).minute(m.minute()).second(m.second()), o.indexOf(p.hour()) < 0 || a.indexOf(p.minute()) < 0 || s.indexOf(p.second()) < 0) return void n.setState({
          invalid: !0
        });
        var g = c(),
          v = u(p.hour()),
          y = h(p.hour(), p.minute());
        if (g && g.indexOf(p.hour()) >= 0 || v && v.indexOf(p.minute()) >= 0 || y && y.indexOf(p.second()) >= 0) return void n.setState({
          invalid: !0
        });
        if (d) {
          if (d.hour() !== p.hour() || d.minute() !== p.minute() || d.second() !== p.second()) {
            var b = d.clone();
            b.hour(p.hour()), b.minute(p.minute()), b.second(p.second()), f(b);
          }
        } else d !== p && f(p);
      } else f(null);
      n.setState({
        invalid: !1
      });
    }), w(v(n), "onKeyDown", function (e) {
      var t = n.props,
        r = t.onEsc,
        i = t.onKeyDown;
      27 === e.keyCode && r(), i(e);
    });
    var r = e.value,
      i = e.format;
    return n.state = {
      str: r && r.format(i) || "",
      invalid: !1
    }, n;
  }
  return y(t, e), p(t, [{
    key: "componentDidMount",
    value: function () {
      var e = this,
        t = this.props.focusOnOpen;
      if (t) {
        var n = window.requestAnimationFrame || window.setTimeout;
        n(function () {
          e.refInput.focus(), e.refInput.select();
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function (e) {
      var t = this.props,
        n = t.value,
        r = t.format;
      n !== e.value && this.setState({
        str: n && n.format(r) || "",
        invalid: !1
      });
    }
  }, {
    key: "getProtoValue",
    value: function () {
      var e = this.props,
        t = e.value,
        n = e.defaultOpenValue;
      return t || n;
    }
  }, {
    key: "getInput",
    value: function () {
      var e = this,
        t = this.props,
        n = t.prefixCls,
        r = t.placeholder,
        o = t.inputReadOnly,
        a = this.state,
        s = a.invalid,
        l = a.str,
        c = s ? "".concat(n, "-input-invalid") : "";
      return i.a.createElement("input", {
        className: u()("".concat(n, "-input"), c),
        ref: function (t) {
          e.refInput = t;
        },
        onKeyDown: this.onKeyDown,
        value: l,
        placeholder: r,
        onChange: this.onInputChange,
        readOnly: !!o
      });
    }
  }, {
    key: "render",
    value: function () {
      var e = this.props.prefixCls;
      return i.a.createElement("div", {
        className: "".concat(e, "-input-wrap")
      }, this.getInput());
    }
  }]), t;
}(r["Component"]);
w(x, "propTypes", {
  format: a.a.string,
  prefixCls: a.a.string,
  disabledDate: a.a.func,
  placeholder: a.a.string,
  clearText: a.a.string,
  value: a.a.object,
  inputReadOnly: a.a.bool,
  hourOptions: a.a.array,
  minuteOptions: a.a.array,
  secondOptions: a.a.array,
  disabledHours: a.a.func,
  disabledMinutes: a.a.func,
  disabledSeconds: a.a.func,
  onChange: a.a.func,
  onEsc: a.a.func,
  defaultOpenValue: a.a.object,
  currentSelectPanel: a.a.string,
  focusOnOpen: a.a.bool,
  onKeyDown: a.a.func,
  clearIcon: a.a.node
}), w(x, "defaultProps", {
  inputReadOnly: !1
});
var _ = x,
  E = require("./69386934.js"),
  S = interopDefault(E),
  k = require("./78456b55.js"),
  C = interopDefault(k);
function O(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function T(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function L(e, t, n) {
  return t && T(e.prototype, t), n && T(e, n), e;
}
function A(e, t) {
  return !t || "object" !== typeof t && "function" !== typeof t ? j(e) : t;
}
function P(e) {
  return P = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, P(e);
}
function j(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function M(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && R(e, t);
}
function R(e, t) {
  return R = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, R(e, t);
}
function N(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var D = function e(t, n, r) {
    if (r <= 0) C()(function () {
      t.scrollTop = n;
    });else {
      var i = n - t.scrollTop,
        o = i / r * 10;
      C()(function () {
        t.scrollTop += o, t.scrollTop !== n && e(t, n, r - 10);
      });
    }
  },
  I = function (e) {
    function t() {
      var e, n;
      O(this, t);
      for (var r = arguments.length, i = new Array(r), o = 0; o < r; o++) i[o] = arguments[o];
      return n = A(this, (e = P(t)).call.apply(e, [this].concat(i))), N(j(n), "state", {
        active: !1
      }), N(j(n), "onSelect", function (e) {
        var t = n.props,
          r = t.onSelect,
          i = t.type;
        r(i, e);
      }), N(j(n), "handleMouseEnter", function (e) {
        var t = n.props.onMouseEnter;
        n.setState({
          active: !0
        }), t(e);
      }), N(j(n), "handleMouseLeave", function () {
        n.setState({
          active: !1
        });
      }), N(j(n), "saveList", function (e) {
        n.list = e;
      }), n;
    }
    return M(t, e), L(t, [{
      key: "componentDidMount",
      value: function () {
        this.scrollToSelected(0);
      }
    }, {
      key: "componentDidUpdate",
      value: function (e) {
        var t = this.props.selectedIndex;
        e.selectedIndex !== t && this.scrollToSelected(120);
      }
    }, {
      key: "getOptions",
      value: function () {
        var e = this,
          t = this.props,
          n = t.options,
          r = t.selectedIndex,
          o = t.prefixCls,
          a = t.onEsc;
        return n.map(function (t, n) {
          var s,
            l = u()((s = {}, N(s, "".concat(o, "-select-option-selected"), r === n), N(s, "".concat(o, "-select-option-disabled"), t.disabled), s)),
            c = t.disabled ? void 0 : function () {
              e.onSelect(t.value);
            },
            h = function (e) {
              13 === e.keyCode ? c() : 27 === e.keyCode && a();
            };
          return i.a.createElement("li", {
            role: "button",
            onClick: c,
            className: l,
            key: n,
            disabled: t.disabled,
            tabIndex: "0",
            onKeyDown: h
          }, t.value);
        });
      }
    }, {
      key: "scrollToSelected",
      value: function (e) {
        var t = this.props.selectedIndex,
          n = S.a.findDOMNode(this),
          r = S.a.findDOMNode(this.list);
        if (r) {
          var i = t;
          i < 0 && (i = 0);
          var o = r.children[i],
            a = o.offsetTop;
          D(n, a, e);
        }
      }
    }, {
      key: "render",
      value: function () {
        var e = this.props,
          t = e.prefixCls,
          n = e.options,
          r = this.state.active;
        if (0 === n.length) return null;
        var o = u()("".concat(t, "-select"), N({}, "".concat(t, "-select-active"), r));
        return i.a.createElement("div", {
          className: o,
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave
        }, i.a.createElement("ul", {
          ref: this.saveList
        }, this.getOptions()));
      }
    }]), t;
  }(r["Component"]);
N(I, "propTypes", {
  prefixCls: a.a.string,
  options: a.a.array,
  selectedIndex: a.a.number,
  type: a.a.string,
  onSelect: a.a.func,
  onMouseEnter: a.a.func,
  onEsc: a.a.func
});
var $ = I;
function F(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function B(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function V(e, t, n) {
  return t && B(e.prototype, t), n && B(e, n), e;
}
function W(e, t) {
  return !t || "object" !== typeof t && "function" !== typeof t ? U(e) : t;
}
function H(e) {
  return H = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, H(e);
}
function U(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function z(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && G(e, t);
}
function G(e, t) {
  return G = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, G(e, t);
}
function q(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var K = function (e, t) {
    var n = "".concat(e);
    e < 10 && (n = "0".concat(e));
    var r = !1;
    return t && t.indexOf(e) >= 0 && (r = !0), {
      value: n,
      disabled: r
    };
  },
  Y = function (e) {
    function t() {
      var e, n;
      F(this, t);
      for (var r = arguments.length, i = new Array(r), o = 0; o < r; o++) i[o] = arguments[o];
      return n = W(this, (e = H(t)).call.apply(e, [this].concat(i))), q(U(n), "onItemChange", function (e, t) {
        var r = n.props,
          i = r.onChange,
          o = r.defaultOpenValue,
          a = r.use12Hours,
          s = r.value,
          l = r.isAM,
          c = r.onAmPmChange,
          u = (s || o).clone();
        if ("hour" === e) a ? l ? u.hour(+t % 12) : u.hour(+t % 12 + 12) : u.hour(+t);else if ("minute" === e) u.minute(+t);else if ("ampm" === e) {
          var h = t.toUpperCase();
          a && ("PM" === h && u.hour() < 12 && u.hour(u.hour() % 12 + 12), "AM" === h && u.hour() >= 12 && u.hour(u.hour() - 12)), c(h);
        } else u.second(+t);
        i(u);
      }), q(U(n), "onEnterSelectPanel", function (e) {
        var t = n.props.onCurrentSelectPanelChange;
        t(e);
      }), n;
    }
    return z(t, e), V(t, [{
      key: "getHourSelect",
      value: function (e) {
        var t = this,
          n = this.props,
          r = n.prefixCls,
          o = n.hourOptions,
          a = n.disabledHours,
          s = n.showHour,
          l = n.use12Hours,
          c = n.onEsc;
        if (!s) return null;
        var u,
          h,
          f = a();
        return l ? (u = [12].concat(o.filter(function (e) {
          return e < 12 && e > 0;
        })), h = e % 12 || 12) : (u = o, h = e), i.a.createElement($, {
          prefixCls: r,
          options: u.map(function (e) {
            return K(e, f);
          }),
          selectedIndex: u.indexOf(h),
          type: "hour",
          onSelect: this.onItemChange,
          onMouseEnter: function () {
            return t.onEnterSelectPanel("hour");
          },
          onEsc: c
        });
      }
    }, {
      key: "getMinuteSelect",
      value: function (e) {
        var t = this,
          n = this.props,
          r = n.prefixCls,
          o = n.minuteOptions,
          a = n.disabledMinutes,
          s = n.defaultOpenValue,
          l = n.showMinute,
          c = n.value,
          u = n.onEsc;
        if (!l) return null;
        var h = c || s,
          f = a(h.hour());
        return i.a.createElement($, {
          prefixCls: r,
          options: o.map(function (e) {
            return K(e, f);
          }),
          selectedIndex: o.indexOf(e),
          type: "minute",
          onSelect: this.onItemChange,
          onMouseEnter: function () {
            return t.onEnterSelectPanel("minute");
          },
          onEsc: u
        });
      }
    }, {
      key: "getSecondSelect",
      value: function (e) {
        var t = this,
          n = this.props,
          r = n.prefixCls,
          o = n.secondOptions,
          a = n.disabledSeconds,
          s = n.showSecond,
          l = n.defaultOpenValue,
          c = n.value,
          u = n.onEsc;
        if (!s) return null;
        var h = c || l,
          f = a(h.hour(), h.minute());
        return i.a.createElement($, {
          prefixCls: r,
          options: o.map(function (e) {
            return K(e, f);
          }),
          selectedIndex: o.indexOf(e),
          type: "second",
          onSelect: this.onItemChange,
          onMouseEnter: function () {
            return t.onEnterSelectPanel("second");
          },
          onEsc: u
        });
      }
    }, {
      key: "getAMPMSelect",
      value: function () {
        var e = this,
          t = this.props,
          n = t.prefixCls,
          r = t.use12Hours,
          o = t.format,
          a = t.isAM,
          s = t.onEsc;
        if (!r) return null;
        var l = ["am", "pm"].map(function (e) {
            return o.match(/\sA/) ? e.toUpperCase() : e;
          }).map(function (e) {
            return {
              value: e
            };
          }),
          c = a ? 0 : 1;
        return i.a.createElement($, {
          prefixCls: n,
          options: l,
          selectedIndex: c,
          type: "ampm",
          onSelect: this.onItemChange,
          onMouseEnter: function () {
            return e.onEnterSelectPanel("ampm");
          },
          onEsc: s
        });
      }
    }, {
      key: "render",
      value: function () {
        var e = this.props,
          t = e.prefixCls,
          n = e.defaultOpenValue,
          r = e.value,
          o = r || n;
        return i.a.createElement("div", {
          className: "".concat(t, "-combobox")
        }, this.getHourSelect(o.hour()), this.getMinuteSelect(o.minute()), this.getSecondSelect(o.second()), this.getAMPMSelect(o.hour()));
      }
    }]), t;
  }(r["Component"]);
q(Y, "propTypes", {
  format: a.a.string,
  defaultOpenValue: a.a.object,
  prefixCls: a.a.string,
  value: a.a.object,
  onChange: a.a.func,
  onAmPmChange: a.a.func,
  showHour: a.a.bool,
  showMinute: a.a.bool,
  showSecond: a.a.bool,
  hourOptions: a.a.array,
  minuteOptions: a.a.array,
  secondOptions: a.a.array,
  disabledHours: a.a.func,
  disabledMinutes: a.a.func,
  disabledSeconds: a.a.func,
  onCurrentSelectPanelChange: a.a.func,
  use12Hours: a.a.bool,
  onEsc: a.a.func,
  isAM: a.a.bool
});
var X = Y;
function Q(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Z(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? Q(Object(n), !0).forEach(function (t) {
      se(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Q(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function J(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function ee(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function te(e, t, n) {
  return t && ee(e.prototype, t), n && ee(e, n), e;
}
function ne(e, t) {
  return !t || "object" !== typeof t && "function" !== typeof t ? ie(e) : t;
}
function re(e) {
  return re = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, re(e);
}
function ie(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function oe(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && ae(e, t);
}
function ae(e, t) {
  return ae = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, ae(e, t);
}
function se(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function le() {}
function ce(e, t, n) {
  for (var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1, i = [], o = 0; o < e; o += r) (!t || t.indexOf(o) < 0 || !n) && i.push(o);
  return i;
}
function ue(e, t, n, r) {
  var i = t.slice().sort(function (t, n) {
      return Math.abs(e.hour() - t) - Math.abs(e.hour() - n);
    })[0],
    o = n.slice().sort(function (t, n) {
      return Math.abs(e.minute() - t) - Math.abs(e.minute() - n);
    })[0],
    a = r.slice().sort(function (t, n) {
      return Math.abs(e.second() - t) - Math.abs(e.second() - n);
    })[0];
  return l()("".concat(i, ":").concat(o, ":").concat(a), "HH:mm:ss");
}
var he = function (e) {
  function t() {
    var e, n;
    J(this, t);
    for (var r = arguments.length, i = new Array(r), o = 0; o < r; o++) i[o] = arguments[o];
    return n = ne(this, (e = re(t)).call.apply(e, [this].concat(i))), se(ie(n), "state", {}), se(ie(n), "onChange", function (e) {
      var t = n.props.onChange;
      n.setState({
        value: e
      }), t(e);
    }), se(ie(n), "onAmPmChange", function (e) {
      var t = n.props.onAmPmChange;
      t(e);
    }), se(ie(n), "onCurrentSelectPanelChange", function (e) {
      n.setState({
        currentSelectPanel: e
      });
    }), se(ie(n), "disabledHours", function () {
      var e = n.props,
        t = e.use12Hours,
        r = e.disabledHours,
        i = r();
      return t && Array.isArray(i) && (i = n.isAM() ? i.filter(function (e) {
        return e < 12;
      }).map(function (e) {
        return 0 === e ? 12 : e;
      }) : i.map(function (e) {
        return 12 === e ? 12 : e - 12;
      })), i;
    }), n;
  }
  return oe(t, e), te(t, [{
    key: "close",
    value: function () {
      var e = this.props.onEsc;
      e();
    }
  }, {
    key: "isAM",
    value: function () {
      var e = this.props.defaultOpenValue,
        t = this.state.value,
        n = t || e;
      return n.hour() >= 0 && n.hour() < 12;
    }
  }, {
    key: "render",
    value: function () {
      var e = this.props,
        t = e.prefixCls,
        n = e.className,
        r = e.placeholder,
        o = e.disabledMinutes,
        a = e.disabledSeconds,
        s = e.hideDisabledOptions,
        l = e.showHour,
        c = e.showMinute,
        h = e.showSecond,
        f = e.format,
        d = e.defaultOpenValue,
        p = e.clearText,
        m = e.onEsc,
        g = e.addon,
        v = e.use12Hours,
        y = e.focusOnOpen,
        b = e.onKeyDown,
        w = e.hourStep,
        x = e.minuteStep,
        E = e.secondStep,
        S = e.inputReadOnly,
        k = e.clearIcon,
        C = this.state,
        O = C.value,
        T = C.currentSelectPanel,
        L = this.disabledHours(),
        A = o(O ? O.hour() : null),
        P = a(O ? O.hour() : null, O ? O.minute() : null),
        j = ce(24, L, s, w),
        M = ce(60, A, s, x),
        R = ce(60, P, s, E),
        N = ue(d, j, M, R);
      return i.a.createElement("div", {
        className: u()(n, "".concat(t, "-inner"))
      }, i.a.createElement(_, {
        clearText: p,
        prefixCls: t,
        defaultOpenValue: N,
        value: O,
        currentSelectPanel: T,
        onEsc: m,
        format: f,
        placeholder: r,
        hourOptions: j,
        minuteOptions: M,
        secondOptions: R,
        disabledHours: this.disabledHours,
        disabledMinutes: o,
        disabledSeconds: a,
        onChange: this.onChange,
        focusOnOpen: y,
        onKeyDown: b,
        inputReadOnly: S,
        clearIcon: k
      }), i.a.createElement(X, {
        prefixCls: t,
        value: O,
        defaultOpenValue: N,
        format: f,
        onChange: this.onChange,
        onAmPmChange: this.onAmPmChange,
        showHour: l,
        showMinute: c,
        showSecond: h,
        hourOptions: j,
        minuteOptions: M,
        secondOptions: R,
        disabledHours: this.disabledHours,
        disabledMinutes: o,
        disabledSeconds: a,
        onCurrentSelectPanelChange: this.onCurrentSelectPanelChange,
        use12Hours: v,
        onEsc: m,
        isAM: this.isAM()
      }), g(this));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function (e, t) {
      return "value" in e ? Z({}, t, {
        value: e.value
      }) : null;
    }
  }]), t;
}(r["Component"]);
se(he, "propTypes", {
  clearText: a.a.string,
  prefixCls: a.a.string,
  className: a.a.string,
  defaultOpenValue: a.a.object,
  value: a.a.object,
  placeholder: a.a.string,
  format: a.a.string,
  inputReadOnly: a.a.bool,
  disabledHours: a.a.func,
  disabledMinutes: a.a.func,
  disabledSeconds: a.a.func,
  hideDisabledOptions: a.a.bool,
  onChange: a.a.func,
  onAmPmChange: a.a.func,
  onEsc: a.a.func,
  showHour: a.a.bool,
  showMinute: a.a.bool,
  showSecond: a.a.bool,
  use12Hours: a.a.bool,
  hourStep: a.a.number,
  minuteStep: a.a.number,
  secondStep: a.a.number,
  addon: a.a.func,
  focusOnOpen: a.a.bool,
  onKeyDown: a.a.func,
  clearIcon: a.a.node
}), se(he, "defaultProps", {
  prefixCls: "rc-time-picker-panel",
  onChange: le,
  disabledHours: le,
  disabledMinutes: le,
  disabledSeconds: le,
  defaultOpenValue: l()(),
  use12Hours: !1,
  addon: le,
  onKeyDown: le,
  onAmPmChange: le,
  inputReadOnly: !1
}), Object(h["polyfill"])(he);
legacyExports["a"] = he;
