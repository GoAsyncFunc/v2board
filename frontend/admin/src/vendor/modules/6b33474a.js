let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./51624c5a.js"),
  i = interopDefault(r),
  o = require("./59454956.js"),
  a = interopDefault(o),
  s = require("./objectWithoutProperties.js"),
  l = interopDefault(s),
  c = require("./classCallCheck.js"),
  u = interopDefault(c),
  h = require("./56376f43.js"),
  f = interopDefault(h),
  d = require("./46597733.js"),
  p = interopDefault(d),
  m = require("./6d526730.js"),
  g = interopDefault(m),
  v = require("./reactRuntime.js"),
  y = interopDefault(v),
  b = require("./propTypesRuntime.js"),
  w = interopDefault(b),
  x = require("./classNames.js"),
  _ = interopDefault(x),
  E = require("./animationFrameRuntime.js"),
  S = interopDefault(E),
  k = require("./reactLifecyclesCompat.js"),
  C = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  },
  O = require("./68737552.js"),
  T = require("./34496c57.js"),
  L = require("./createReactContext.js"),
  A = interopDefault(L),
  P = A()({}),
  j = P.Provider,
  M = P.Consumer,
  R = {
    width: 0,
    height: 0,
    overflow: "hidden",
    position: "absolute"
  },
  N = function (e) {
    function t() {
      var e, n, r, i;
      u()(this, t);
      for (var o = arguments.length, a = Array(o), s = 0; s < o; s++) a[s] = arguments[s];
      return r = p()(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(a))), n = r, r.onKeyDown = function (e) {
        var t = e.target,
          n = e.which,
          i = e.shiftKey,
          o = r.props,
          a = o.nextElement,
          s = o.prevElement;
        n === T["a"].TAB && document.activeElement === t && (!i && a && a.focus(), i && s && s.focus());
      }, i = n, p()(r, i);
    }
    return g()(t, e), f()(t, [{
      key: "render",
      value: function () {
        var e = this.props.setRef;
        return y.a.createElement("div", {
          tabIndex: 0,
          ref: e,
          style: R,
          onKeyDown: this.onKeyDown,
          role: "presentation"
        });
      }
    }]), t;
  }(y.a.Component);
N.propTypes = {
  setRef: w.a.func,
  prevElement: w.a.object,
  nextElement: w.a.object
};
var D = N,
  I = function (e) {
    function t() {
      return u()(this, t), p()(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
    }
    return g()(t, e), f()(t, [{
      key: "render",
      value: function () {
        var e,
          t = this.props,
          n = t.id,
          r = t.className,
          o = t.destroyInactiveTabPane,
          s = t.active,
          c = t.forceRender,
          u = t.rootPrefixCls,
          h = t.style,
          f = t.children,
          d = t.placeholder,
          p = l()(t, ["id", "className", "destroyInactiveTabPane", "active", "forceRender", "rootPrefixCls", "style", "children", "placeholder"]);
        this._isActived = this._isActived || s;
        var m = u + "-tabpane",
          g = _()((e = {}, a()(e, m, 1), a()(e, m + "-inactive", !s), a()(e, m + "-active", s), a()(e, r, r), e)),
          v = o ? s : this._isActived,
          b = v || c;
        return y.a.createElement(M, null, function (e) {
          var t = e.sentinelStart,
            r = e.sentinelEnd,
            o = e.setPanelSentinelStart,
            a = e.setPanelSentinelEnd,
            l = void 0,
            c = void 0;
          return s && b && (l = y.a.createElement(D, {
            setRef: o,
            prevElement: t
          }), c = y.a.createElement(D, {
            setRef: a,
            nextElement: r
          })), y.a.createElement("div", i()({
            style: h,
            role: "tabpanel",
            "aria-hidden": s ? "false" : "true",
            className: g,
            id: n
          }, Object(O["b"])(p)), l, b ? f : d, c);
        });
      }
    }]), t;
  }(y.a.Component),
  $ = I;
function F() {}
function B(e) {
  var t = void 0;
  return y.a.Children.forEach(e.children, function (e) {
    !e || t || e.props.disabled || (t = e.key);
  }), t;
}
function V(e, t) {
  var n = y.a.Children.map(e.children, function (e) {
    return e && e.key;
  });
  return n.indexOf(t) >= 0;
}
I.propTypes = {
  className: w.a.string,
  active: w.a.bool,
  style: w.a.any,
  destroyInactiveTabPane: w.a.bool,
  forceRender: w.a.bool,
  placeholder: w.a.node,
  rootPrefixCls: w.a.string,
  children: w.a.node,
  id: w.a.string
}, I.defaultProps = {
  placeholder: null
};
var W = function (e) {
    function t(e) {
      u()(this, t);
      var n = p()(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
      H.call(n);
      var r = void 0;
      return r = "activeKey" in e ? e.activeKey : "defaultActiveKey" in e ? e.defaultActiveKey : B(e), n.state = {
        activeKey: r
      }, n;
    }
    return g()(t, e), f()(t, [{
      key: "componentWillUnmount",
      value: function () {
        this.destroy = !0, S.a.cancel(this.sentinelId);
      }
    }, {
      key: "updateSentinelContext",
      value: function () {
        var e = this;
        this.destroy || (S.a.cancel(this.sentinelId), this.sentinelId = S()(function () {
          e.destroy || e.forceUpdate();
        }));
      }
    }, {
      key: "render",
      value: function () {
        var e,
          t = this.props,
          n = t.prefixCls,
          r = t.navWrapper,
          o = t.tabBarPosition,
          s = t.className,
          c = t.renderTabContent,
          u = t.renderTabBar,
          h = t.destroyInactiveTabPane,
          f = t.direction,
          d = l()(t, ["prefixCls", "navWrapper", "tabBarPosition", "className", "renderTabContent", "renderTabBar", "destroyInactiveTabPane", "direction"]),
          p = _()((e = {}, a()(e, n, 1), a()(e, n + "-" + o, 1), a()(e, s, !!s), a()(e, n + "-rtl", "rtl" === f), e));
        this.tabBar = u();
        var m = y.a.cloneElement(this.tabBar, {
            prefixCls: n,
            navWrapper: r,
            key: "tabBar",
            onKeyDown: this.onNavKeyDown,
            tabBarPosition: o,
            onTabClick: this.onTabClick,
            panels: t.children,
            activeKey: this.state.activeKey,
            direction: this.props.direction
          }),
          g = y.a.cloneElement(c(), {
            prefixCls: n,
            tabBarPosition: o,
            activeKey: this.state.activeKey,
            destroyInactiveTabPane: h,
            children: t.children,
            onChange: this.setActiveKey,
            key: "tabContent",
            direction: this.props.direction
          }),
          v = y.a.createElement(D, {
            key: "sentinelStart",
            setRef: this.setSentinelStart,
            nextElement: this.panelSentinelStart
          }),
          b = y.a.createElement(D, {
            key: "sentinelEnd",
            setRef: this.setSentinelEnd,
            prevElement: this.panelSentinelEnd
          }),
          w = [];
        return "bottom" === o ? w.push(v, g, b, m) : w.push(m, v, g, b), y.a.createElement(j, {
          value: {
            sentinelStart: this.sentinelStart,
            sentinelEnd: this.sentinelEnd,
            setPanelSentinelStart: this.setPanelSentinelStart,
            setPanelSentinelEnd: this.setPanelSentinelEnd
          }
        }, y.a.createElement("div", i()({
          className: p,
          style: t.style
        }, Object(O["b"])(d), {
          onScroll: this.onScroll
        }), w));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function (e, t) {
        var n = {};
        return "activeKey" in e ? n.activeKey = e.activeKey : V(e, t.activeKey) || (n.activeKey = B(e)), Object.keys(n).length > 0 ? n : null;
      }
    }]), t;
  }(y.a.Component),
  H = function () {
    var e = this;
    this.onTabClick = function (t, n) {
      e.tabBar.props.onTabClick && e.tabBar.props.onTabClick(t, n), e.setActiveKey(t);
    }, this.onNavKeyDown = function (t) {
      var n = t.keyCode;
      if (n === C.RIGHT || n === C.DOWN) {
        t.preventDefault();
        var r = e.getNextActiveKey(!0);
        e.onTabClick(r);
      } else if (n === C.LEFT || n === C.UP) {
        t.preventDefault();
        var i = e.getNextActiveKey(!1);
        e.onTabClick(i);
      }
    }, this.onScroll = function (e) {
      var t = e.target,
        n = e.currentTarget;
      t === n && t.scrollLeft > 0 && (t.scrollLeft = 0);
    }, this.setSentinelStart = function (t) {
      e.sentinelStart = t;
    }, this.setSentinelEnd = function (t) {
      e.sentinelEnd = t;
    }, this.setPanelSentinelStart = function (t) {
      t !== e.panelSentinelStart && e.updateSentinelContext(), e.panelSentinelStart = t;
    }, this.setPanelSentinelEnd = function (t) {
      t !== e.panelSentinelEnd && e.updateSentinelContext(), e.panelSentinelEnd = t;
    }, this.setActiveKey = function (t) {
      e.state.activeKey !== t && ("activeKey" in e.props || e.setState({
        activeKey: t
      }), e.props.onChange(t));
    }, this.getNextActiveKey = function (t) {
      var n = e.state.activeKey,
        r = [];
      y.a.Children.forEach(e.props.children, function (e) {
        e && !e.props.disabled && (t ? r.push(e) : r.unshift(e));
      });
      var i = r.length,
        o = i && r[0].key;
      return r.forEach(function (e, t) {
        e.key === n && (o = t === i - 1 ? r[0].key : r[t + 1].key);
      }), o;
    };
  };
W.propTypes = {
  destroyInactiveTabPane: w.a.bool,
  renderTabBar: w.a.func.isRequired,
  renderTabContent: w.a.func.isRequired,
  navWrapper: w.a.func,
  onChange: w.a.func,
  children: w.a.node,
  prefixCls: w.a.string,
  className: w.a.string,
  tabBarPosition: w.a.string,
  style: w.a.object,
  activeKey: w.a.string,
  defaultActiveKey: w.a.string,
  direction: w.a.string
}, W.defaultProps = {
  prefixCls: "rc-tabs",
  destroyInactiveTabPane: !1,
  onChange: F,
  navWrapper: function (e) {
    return e;
  },
  tabBarPosition: "top",
  children: null,
  style: {},
  direction: "ltr"
}, W.TabPane = $, Object(k["polyfill"])(W);
var U = W;
require("./62546968.js");
defineExport(legacyExports, "a", function () {
  return $;
});
legacyExports["b"] = U;
