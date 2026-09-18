let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./51624c5a.js"),
  i = interopDefault(r),
  o = require("./59454956.js"),
  a = interopDefault(o),
  s = require("./classCallCheck.js"),
  l = interopDefault(s),
  c = require("./56376f43.js"),
  u = interopDefault(c),
  h = require("./possibleConstructorReturn.js"),
  f = interopDefault(h),
  d = require("./6d526730.js"),
  p = interopDefault(d),
  m = require("./reactRuntime.js"),
  g = interopDefault(m),
  v = require("./propTypesRuntime.js"),
  y = interopDefault(v),
  b = require("./classNames.js"),
  w = interopDefault(b),
  x = require("./68737552.js"),
  _ = function (e) {
    function t() {
      return l()(this, t), f()(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
    }
    return p()(t, e), u()(t, [{
      key: "getTabPanes",
      value: function () {
        var e = this.props,
          t = e.activeKey,
          n = e.children,
          r = [];
        return g.a.Children.forEach(n, function (n) {
          if (n) {
            var i = n.key,
              o = t === i;
            r.push(g.a.cloneElement(n, {
              active: o,
              destroyInactiveTabPane: e.destroyInactiveTabPane,
              rootPrefixCls: e.prefixCls
            }));
          }
        }), r;
      }
    }, {
      key: "render",
      value: function () {
        var e,
          t = this.props,
          n = t.prefixCls,
          r = t.children,
          o = t.activeKey,
          s = t.className,
          l = t.tabBarPosition,
          c = t.animated,
          u = t.animatedWithMargin,
          h = t.direction,
          f = t.style,
          d = w()((e = {}, a()(e, n + "-content", !0), a()(e, c ? n + "-content-animated" : n + "-content-no-animated", !0), e), s);
        if (c) {
          var p = Object(x["a"])(r, o);
          if (-1 !== p) {
            var m = u ? Object(x["d"])(p, l) : Object(x["h"])(Object(x["g"])(p, l, h));
            f = i()({}, f, m);
          } else f = i()({}, f, {
            display: "none"
          });
        }
        return g.a.createElement("div", {
          className: d,
          style: f
        }, this.getTabPanes());
      }
    }]), t;
  }(g.a.Component);
legacyExports["a"] = _, _.propTypes = {
  animated: y.a.bool,
  animatedWithMargin: y.a.bool,
  prefixCls: y.a.string,
  children: y.a.node,
  activeKey: y.a.string,
  style: y.a.any,
  tabBarPosition: y.a.string,
  className: y.a.string,
  destroyInactiveTabPane: y.a.bool,
  direction: y.a.string
}, _.defaultProps = {
  animated: !0
};
