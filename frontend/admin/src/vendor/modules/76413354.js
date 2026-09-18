let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./51624c5a.js"),
  i = interopDefault(r),
  o = require("./objectWithoutProperties.js"),
  a = interopDefault(o),
  s = require("./classCallCheck.js"),
  l = interopDefault(s),
  c = require("./56376f43.js"),
  u = interopDefault(c),
  h = require("./46597733.js"),
  f = interopDefault(h),
  d = require("./6d526730.js"),
  p = interopDefault(d),
  m = require("./reactRuntime.js"),
  g = interopDefault(m),
  v = require("./propTypesRuntime.js"),
  y = interopDefault(v),
  b = require("./59454956.js"),
  w = interopDefault(b),
  x = require("./classNames.js"),
  _ = interopDefault(x),
  E = require("./68737552.js");
function S(e, t) {
  var n = e.props,
    r = n.styles,
    i = n.panels,
    o = n.activeKey,
    a = n.direction,
    s = e.props.getRef("root"),
    l = e.props.getRef("nav") || s,
    c = e.props.getRef("inkBar"),
    u = e.props.getRef("activeTab"),
    h = c.style,
    f = e.props.tabBarPosition,
    d = Object(E["a"])(i, o);
  if (t && (h.display = "none"), u) {
    var p = u,
      m = Object(E["i"])(h);
    if (Object(E["k"])(h, ""), h.width = "", h.height = "", h.left = "", h.top = "", h.bottom = "", h.right = "", "top" === f || "bottom" === f) {
      var g = Object(E["c"])(p, l),
        v = p.offsetWidth;
      v === s.offsetWidth ? v = 0 : r.inkBar && void 0 !== r.inkBar.width && (v = parseFloat(r.inkBar.width, 10), v && (g += (p.offsetWidth - v) / 2)), "rtl" === a && (g = Object(E["e"])(p, "margin-left") - g), m ? Object(E["k"])(h, "translate3d(" + g + "px,0,0)") : h.left = g + "px", h.width = v + "px";
    } else {
      var y = Object(E["f"])(p, l, !0),
        b = p.offsetHeight;
      r.inkBar && void 0 !== r.inkBar.height && (b = parseFloat(r.inkBar.height, 10), b && (y += (p.offsetHeight - b) / 2)), m ? (Object(E["k"])(h, "translate3d(0," + y + "px,0)"), h.top = "0") : h.top = y + "px", h.height = b + "px";
    }
  }
  h.display = -1 !== d ? "block" : "none";
}
var k = function (e) {
    function t() {
      return l()(this, t), f()(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
    }
    return p()(t, e), u()(t, [{
      key: "componentDidMount",
      value: function () {
        var e = this;
        this.timeout = setTimeout(function () {
          S(e, !0);
        }, 0);
      }
    }, {
      key: "componentDidUpdate",
      value: function () {
        S(this);
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        clearTimeout(this.timeout);
      }
    }, {
      key: "render",
      value: function () {
        var e,
          t = this.props,
          n = t.prefixCls,
          r = t.styles,
          i = t.inkBarAnimated,
          o = n + "-ink-bar",
          a = _()((e = {}, w()(e, o, !0), w()(e, i ? o + "-animated" : o + "-no-animated", !0), e));
        return g.a.createElement("div", {
          style: r.inkBar,
          className: a,
          key: "inkBar",
          ref: this.props.saveRef("inkBar")
        });
      }
    }]), t;
  }(g.a.Component),
  C = k;
k.propTypes = {
  prefixCls: y.a.string,
  styles: y.a.object,
  inkBarAnimated: y.a.bool,
  saveRef: y.a.func,
  direction: y.a.string
}, k.defaultProps = {
  prefixCls: "",
  inkBarAnimated: !0,
  styles: {},
  saveRef: function () {}
};
var O = require("./3257367a.js"),
  T = interopDefault(O),
  L = function (e) {
    function t() {
      return l()(this, t), f()(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
    }
    return p()(t, e), u()(t, [{
      key: "render",
      value: function () {
        var e = this,
          t = this.props,
          n = t.panels,
          r = t.activeKey,
          o = t.prefixCls,
          a = t.tabBarGutter,
          s = t.saveRef,
          l = t.tabBarPosition,
          c = t.renderTabBarNode,
          u = t.direction,
          h = [];
        return g.a.Children.forEach(n, function (t, f) {
          if (t) {
            var d = t.key,
              p = r === d ? o + "-tab-active" : "";
            p += " " + o + "-tab";
            var m = {};
            t.props.disabled ? p += " " + o + "-tab-disabled" : m = {
              onClick: e.props.onTabClick.bind(e, d)
            };
            var v = {};
            r === d && (v.ref = s("activeTab"));
            var y = a && f === n.length - 1 ? 0 : a,
              b = "rtl" === u ? "marginLeft" : "marginRight",
              x = w()({}, Object(E["j"])(l) ? "marginBottom" : b, y);
            T()("tab" in t.props, "There must be `tab` property on children of Tabs.");
            var _ = g.a.createElement("div", i()({
              role: "tab",
              "aria-disabled": t.props.disabled ? "true" : "false",
              "aria-selected": r === d ? "true" : "false"
            }, m, {
              className: p,
              key: d,
              style: x
            }, v), t.props.tab);
            c && (_ = c(_)), h.push(_);
          }
        }), g.a.createElement("div", {
          ref: s("navTabsContainer")
        }, h);
      }
    }]), t;
  }(g.a.Component),
  A = L;
L.propTypes = {
  activeKey: y.a.string,
  panels: y.a.node,
  prefixCls: y.a.string,
  tabBarGutter: y.a.number,
  onTabClick: y.a.func,
  saveRef: y.a.func,
  renderTabBarNode: y.a.func,
  tabBarPosition: y.a.string,
  direction: y.a.string
}, L.defaultProps = {
  panels: [],
  prefixCls: [],
  tabBarGutter: null,
  onTabClick: function () {},
  saveRef: function () {}
};
var P = function (e) {
    function t() {
      return l()(this, t), f()(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
    }
    return p()(t, e), u()(t, [{
      key: "render",
      value: function () {
        var e = this.props,
          t = e.prefixCls,
          n = e.onKeyDown,
          r = e.className,
          o = e.extraContent,
          s = e.style,
          l = e.tabBarPosition,
          c = e.children,
          u = a()(e, ["prefixCls", "onKeyDown", "className", "extraContent", "style", "tabBarPosition", "children"]),
          h = _()(t + "-bar", w()({}, r, !!r)),
          f = "top" === l || "bottom" === l,
          d = f ? {
            float: "right"
          } : {},
          p = o && o.props ? o.props.style : {},
          v = c;
        return o && (v = [Object(m["cloneElement"])(o, {
          key: "extra",
          style: i()({}, d, p)
        }), Object(m["cloneElement"])(c, {
          key: "content"
        })], v = f ? v : v.reverse()), g.a.createElement("div", i()({
          role: "tablist",
          className: h,
          tabIndex: "0",
          ref: this.props.saveRef("root"),
          onKeyDown: n,
          style: s
        }, Object(E["b"])(u)), v);
      }
    }]), t;
  }(g.a.Component),
  j = P;
P.propTypes = {
  prefixCls: y.a.string,
  className: y.a.string,
  style: y.a.object,
  tabBarPosition: y.a.oneOf(["left", "right", "top", "bottom"]),
  children: y.a.node,
  extraContent: y.a.node,
  onKeyDown: y.a.func,
  saveRef: y.a.func
}, P.defaultProps = {
  prefixCls: "",
  className: "",
  style: {},
  tabBarPosition: "top",
  extraContent: null,
  children: null,
  onKeyDown: function () {},
  saveRef: function () {}
};
var M = require("./73456643.js"),
  R = interopDefault(M),
  N = require("./6264674b.js"),
  D = function (e) {
    function t(e) {
      l()(this, t);
      var n = f()(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
      return n.prevTransitionEnd = function (e) {
        if ("opacity" === e.propertyName) {
          var t = n.props.getRef("container");
          n.scrollToActiveTab({
            target: t,
            currentTarget: t
          });
        }
      }, n.scrollToActiveTab = function (e) {
        var t = n.props.getRef("activeTab"),
          r = n.props.getRef("navWrap");
        if ((!e || e.target === e.currentTarget) && t) {
          var i = n.isNextPrevShown() && n.lastNextPrevShown;
          if (n.lastNextPrevShown = n.isNextPrevShown(), i) {
            var o = n.getScrollWH(t),
              a = n.getOffsetWH(r),
              s = n.offset,
              l = n.getOffsetLT(r),
              c = n.getOffsetLT(t);
            l > c ? (s += l - c, n.setOffset(s)) : l + a < c + o && (s -= c + o - (l + a), n.setOffset(s));
          }
        }
      }, n.prev = function (e) {
        n.props.onPrevClick(e);
        var t = n.props.getRef("navWrap"),
          r = n.getOffsetWH(t),
          i = n.offset;
        n.setOffset(i + r);
      }, n.next = function (e) {
        n.props.onNextClick(e);
        var t = n.props.getRef("navWrap"),
          r = n.getOffsetWH(t),
          i = n.offset;
        n.setOffset(i - r);
      }, n.offset = 0, n.state = {
        next: !1,
        prev: !1
      }, n;
    }
    return p()(t, e), u()(t, [{
      key: "componentDidMount",
      value: function () {
        var e = this;
        this.componentDidUpdate(), this.debouncedResize = R()(function () {
          e.setNextPrev(), e.scrollToActiveTab();
        }, 200), this.resizeObserver = new N["default"](this.debouncedResize), this.resizeObserver.observe(this.props.getRef("container"));
      }
    }, {
      key: "componentDidUpdate",
      value: function (e) {
        var t = this.props;
        if (e && e.tabBarPosition !== t.tabBarPosition) this.setOffset(0);else {
          var n = this.setNextPrev();
          this.isNextPrevShown(this.state) !== this.isNextPrevShown(n) ? this.setState({}, this.scrollToActiveTab) : e && t.activeKey === e.activeKey || this.scrollToActiveTab();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        this.resizeObserver && this.resizeObserver.disconnect(), this.debouncedResize && this.debouncedResize.cancel && this.debouncedResize.cancel();
      }
    }, {
      key: "setNextPrev",
      value: function () {
        var e = this.props.getRef("nav"),
          t = this.props.getRef("navTabsContainer"),
          n = this.getScrollWH(t || e),
          r = this.getOffsetWH(this.props.getRef("container")) + 1,
          i = this.getOffsetWH(this.props.getRef("navWrap")),
          o = this.offset,
          a = r - n,
          s = this.state,
          l = s.next,
          c = s.prev;
        if (a >= 0) l = !1, this.setOffset(0, !1), o = 0;else if (a < o) l = !0;else {
          l = !1;
          var u = i - n;
          this.setOffset(u, !1), o = u;
        }
        return c = o < 0, this.setNext(l), this.setPrev(c), {
          next: l,
          prev: c
        };
      }
    }, {
      key: "getOffsetWH",
      value: function (e) {
        var t = this.props.tabBarPosition,
          n = "offsetWidth";
        return "left" !== t && "right" !== t || (n = "offsetHeight"), e[n];
      }
    }, {
      key: "getScrollWH",
      value: function (e) {
        var t = this.props.tabBarPosition,
          n = "scrollWidth";
        return "left" !== t && "right" !== t || (n = "scrollHeight"), e[n];
      }
    }, {
      key: "getOffsetLT",
      value: function (e) {
        var t = this.props.tabBarPosition,
          n = "left";
        return "left" !== t && "right" !== t || (n = "top"), e.getBoundingClientRect()[n];
      }
    }, {
      key: "setOffset",
      value: function (e) {
        var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
          n = Math.min(0, e);
        if (this.offset !== n) {
          this.offset = n;
          var r = {},
            i = this.props.tabBarPosition,
            o = this.props.getRef("nav").style,
            a = Object(E["i"])(o);
          "left" === i || "right" === i ? r = a ? {
            value: "translate3d(0," + n + "px,0)"
          } : {
            name: "top",
            value: n + "px"
          } : a ? ("rtl" === this.props.direction && (n = -n), r = {
            value: "translate3d(" + n + "px,0,0)"
          }) : r = {
            name: "left",
            value: n + "px"
          }, a ? Object(E["k"])(o, r.value) : o[r.name] = r.value, t && this.setNextPrev();
        }
      }
    }, {
      key: "setPrev",
      value: function (e) {
        this.state.prev !== e && this.setState({
          prev: e
        });
      }
    }, {
      key: "setNext",
      value: function (e) {
        this.state.next !== e && this.setState({
          next: e
        });
      }
    }, {
      key: "isNextPrevShown",
      value: function (e) {
        return e ? e.next || e.prev : this.state.next || this.state.prev;
      }
    }, {
      key: "render",
      value: function () {
        var e,
          t,
          n,
          r,
          i = this.state,
          o = i.next,
          a = i.prev,
          s = this.props,
          l = s.prefixCls,
          c = s.scrollAnimated,
          u = s.navWrapper,
          h = s.prevIcon,
          f = s.nextIcon,
          d = a || o,
          p = g.a.createElement("span", {
            onClick: a ? this.prev : null,
            unselectable: "unselectable",
            className: _()((e = {}, w()(e, l + "-tab-prev", 1), w()(e, l + "-tab-btn-disabled", !a), w()(e, l + "-tab-arrow-show", d), e)),
            onTransitionEnd: this.prevTransitionEnd
          }, h || g.a.createElement("span", {
            className: l + "-tab-prev-icon"
          })),
          m = g.a.createElement("span", {
            onClick: o ? this.next : null,
            unselectable: "unselectable",
            className: _()((t = {}, w()(t, l + "-tab-next", 1), w()(t, l + "-tab-btn-disabled", !o), w()(t, l + "-tab-arrow-show", d), t))
          }, f || g.a.createElement("span", {
            className: l + "-tab-next-icon"
          })),
          v = l + "-nav",
          y = _()((n = {}, w()(n, v, !0), w()(n, c ? v + "-animated" : v + "-no-animated", !0), n));
        return g.a.createElement("div", {
          className: _()((r = {}, w()(r, l + "-nav-container", 1), w()(r, l + "-nav-container-scrolling", d), r)),
          key: "container",
          ref: this.props.saveRef("container")
        }, p, m, g.a.createElement("div", {
          className: l + "-nav-wrap",
          ref: this.props.saveRef("navWrap")
        }, g.a.createElement("div", {
          className: l + "-nav-scroll"
        }, g.a.createElement("div", {
          className: y,
          ref: this.props.saveRef("nav")
        }, u(this.props.children)))));
      }
    }]), t;
  }(g.a.Component),
  I = D;
D.propTypes = {
  activeKey: y.a.string,
  getRef: y.a.func.isRequired,
  saveRef: y.a.func.isRequired,
  tabBarPosition: y.a.oneOf(["left", "right", "top", "bottom"]),
  prefixCls: y.a.string,
  scrollAnimated: y.a.bool,
  onPrevClick: y.a.func,
  onNextClick: y.a.func,
  navWrapper: y.a.func,
  children: y.a.node,
  prevIcon: y.a.node,
  nextIcon: y.a.node,
  direction: y.a.node
}, D.defaultProps = {
  tabBarPosition: "left",
  prefixCls: "",
  scrollAnimated: !0,
  onPrevClick: function () {},
  onNextClick: function () {},
  navWrapper: function (e) {
    return e;
  }
};
var $ = function (e) {
    function t() {
      var e, n, r, i;
      l()(this, t);
      for (var o = arguments.length, a = Array(o), s = 0; s < o; s++) a[s] = arguments[s];
      return r = f()(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(a))), n = r, r.getRef = function (e) {
        return r[e];
      }, r.saveRef = function (e) {
        return function (t) {
          t && (r[e] = t);
        };
      }, i = n, f()(r, i);
    }
    return p()(t, e), u()(t, [{
      key: "render",
      value: function () {
        return this.props.children(this.saveRef, this.getRef);
      }
    }]), t;
  }(g.a.Component),
  F = $;
$.propTypes = {
  children: y.a.func
}, $.defaultProps = {
  children: function () {
    return null;
  }
};
var B = function (e) {
  function t() {
    return l()(this, t), f()(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
  }
  return p()(t, e), u()(t, [{
    key: "render",
    value: function () {
      var e = this.props,
        t = e.children,
        n = a()(e, ["children"]);
      return g.a.createElement(F, null, function (e, r) {
        return g.a.createElement(j, i()({
          saveRef: e
        }, n), g.a.createElement(I, i()({
          saveRef: e,
          getRef: r
        }, n), g.a.createElement(A, i()({
          saveRef: e,
          renderTabBarNode: t
        }, n)), g.a.createElement(C, i()({
          saveRef: e,
          getRef: r
        }, n))));
      });
    }
  }]), t;
}(g.a.Component);
legacyExports["a"] = B;
B.propTypes = {
  children: y.a.func
};
