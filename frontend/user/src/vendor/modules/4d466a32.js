let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./51624c5a.js"),
  o = interopDefault(r),
  i = require("./59454956.js"),
  a = interopDefault(i),
  s = require("./classCallCheck.js"),
  c = interopDefault(s),
  u = require("./56376f43.js"),
  l = interopDefault(u),
  f = require("./possibleConstructorReturn.js"),
  p = interopDefault(f),
  d = require("./6d526730.js"),
  h = interopDefault(d),
  m = require("./reactRuntime.js"),
  v = interopDefault(m),
  y = require("./propTypesRuntime.js"),
  g = interopDefault(y),
  b = function (e) {
    var t = e.prototype;
    if (!t || !t.isReactComponent) throw new Error("Can only polyfill class components");
    return "function" !== typeof t.componentWillReceiveProps ? e : v.a.Profiler ? (t.UNSAFE_componentWillReceiveProps = t.componentWillReceiveProps, delete t.componentWillReceiveProps, e) : e;
  },
  w = b;
function x(e) {
  var t = [];
  return v.a.Children.forEach(e, function (e) {
    t.push(e);
  }), t;
}
function O(e, t) {
  var n = null;
  return e && e.forEach(function (e) {
    n || e && e.key === t && (n = e);
  }), n;
}
function E(e, t, n) {
  var r = null;
  return e && e.forEach(function (e) {
    if (e && e.key === t && e.props[n]) {
      if (r) throw new Error("two child with same key for <rc-animate> children");
      r = e;
    }
  }), r;
}
function _(e, t, n) {
  var r = e.length === t.length;
  return r && e.forEach(function (e, o) {
    var i = t[o];
    e && i && (e && !i || !e && i ? r = !1 : e.key !== i.key ? r = !1 : n && e.props[n] !== i.props[n] && (r = !1));
  }), r;
}
function k(e, t) {
  var n = [],
    r = {},
    o = [];
  return e.forEach(function (e) {
    e && O(t, e.key) ? o.length && (r[e.key] = o, o = []) : o.push(e);
  }), t.forEach(function (e) {
    e && Object.prototype.hasOwnProperty.call(r, e.key) && (n = n.concat(r[e.key])), n.push(e);
  }), n = n.concat(o), n;
}
var S = require("./reactDomRuntime.js"),
  C = interopDefault(S),
  j = require("./454a6979.js"),
  P = interopDefault(j),
  T = require("./cssAnimationEvents.js"),
  L = require("./5046577a.js"),
  N = interopDefault(L),
  M = 0 !== T.endEvents.length,
  A = ["Webkit", "Moz", "O", "ms"],
  D = ["-webkit-", "-moz-", "-o-", "ms-", ""];
function I(e, t) {
  for (var n = window.getComputedStyle(e, null), r = "", o = 0; o < D.length; o++) if (r = n.getPropertyValue(D[o] + t), r) break;
  return r;
}
function R(e) {
  if (M) {
    var t = parseFloat(I(e, "transition-delay")) || 0,
      n = parseFloat(I(e, "transition-duration")) || 0,
      r = parseFloat(I(e, "animation-delay")) || 0,
      o = parseFloat(I(e, "animation-duration")) || 0,
      i = Math.max(n + t, o + r);
    e.rcEndAnimTimeout = setTimeout(function () {
      e.rcEndAnimTimeout = null, e.rcEndListener && e.rcEndListener();
    }, 1e3 * i + 200);
  }
}
function F(e) {
  e.rcEndAnimTimeout && (clearTimeout(e.rcEndAnimTimeout), e.rcEndAnimTimeout = null);
}
var V = function (e, t, n) {
  var r = "object" === ("undefined" === typeof t ? "undefined" : P()(t)),
    o = r ? t.name : t,
    i = r ? t.active : t + "-active",
    a = n,
    s = void 0,
    c = void 0,
    u = N()(e);
  return n && "[object Object]" === Object.prototype.toString.call(n) && (a = n.end, s = n.start, c = n.active), e.rcEndListener && e.rcEndListener(), e.rcEndListener = function (t) {
    t && t.target !== e || (e.rcAnimTimeout && (clearTimeout(e.rcAnimTimeout), e.rcAnimTimeout = null), F(e), u.remove(o), u.remove(i), T.removeEndEventListener(e, e.rcEndListener), e.rcEndListener = null, a && a());
  }, T.addEndEventListener(e, e.rcEndListener), s && s(), u.add(o), e.rcAnimTimeout = setTimeout(function () {
    e.rcAnimTimeout = null, u.add(i), c && setTimeout(c, 0), R(e);
  }, 30), {
    stop: function () {
      e.rcEndListener && e.rcEndListener();
    }
  };
};
V.style = function (e, t, n) {
  e.rcEndListener && e.rcEndListener(), e.rcEndListener = function (t) {
    t && t.target !== e || (e.rcAnimTimeout && (clearTimeout(e.rcAnimTimeout), e.rcAnimTimeout = null), F(e), T.removeEndEventListener(e, e.rcEndListener), e.rcEndListener = null, n && n());
  }, T.addEndEventListener(e, e.rcEndListener), e.rcAnimTimeout = setTimeout(function () {
    for (var n in t) t.hasOwnProperty(n) && (e.style[n] = t[n]);
    e.rcAnimTimeout = null, R(e);
  }, 0);
}, V.setTransition = function (e, t, n) {
  var r = t,
    o = n;
  void 0 === n && (o = r, r = ""), r = r || "", A.forEach(function (t) {
    e.style[t + "Transition" + r] = o;
  });
}, V.isCssAnimationSupported = M;
var z = V,
  B = {
    isAppearSupported: function (e) {
      return e.transitionName && e.transitionAppear || e.animation.appear;
    },
    isEnterSupported: function (e) {
      return e.transitionName && e.transitionEnter || e.animation.enter;
    },
    isLeaveSupported: function (e) {
      return e.transitionName && e.transitionLeave || e.animation.leave;
    },
    allowAppearCallback: function (e) {
      return e.transitionAppear || e.animation.appear;
    },
    allowEnterCallback: function (e) {
      return e.transitionEnter || e.animation.enter;
    },
    allowLeaveCallback: function (e) {
      return e.transitionLeave || e.animation.leave;
    }
  },
  W = B,
  U = {
    enter: "transitionEnter",
    appear: "transitionAppear",
    leave: "transitionLeave"
  },
  q = function (e) {
    function t() {
      return c()(this, t), p()(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
    }
    return h()(t, e), l()(t, [{
      key: "componentWillUnmount",
      value: function () {
        this.stop();
      }
    }, {
      key: "componentWillEnter",
      value: function (e) {
        W.isEnterSupported(this.props) ? this.transition("enter", e) : e();
      }
    }, {
      key: "componentWillAppear",
      value: function (e) {
        W.isAppearSupported(this.props) ? this.transition("appear", e) : e();
      }
    }, {
      key: "componentWillLeave",
      value: function (e) {
        W.isLeaveSupported(this.props) ? this.transition("leave", e) : e();
      }
    }, {
      key: "transition",
      value: function (e, t) {
        var n = this,
          r = C.a.findDOMNode(this),
          o = this.props,
          i = o.transitionName,
          a = "object" === typeof i;
        this.stop();
        var s = function () {
          n.stopper = null, t();
        };
        if ((M || !o.animation[e]) && i && o[U[e]]) {
          var c = a ? i[e] : i + "-" + e,
            u = c + "-active";
          a && i[e + "Active"] && (u = i[e + "Active"]), this.stopper = z(r, {
            name: c,
            active: u
          }, s);
        } else this.stopper = o.animation[e](r, s);
      }
    }, {
      key: "stop",
      value: function () {
        var e = this.stopper;
        e && (this.stopper = null, e.stop());
      }
    }, {
      key: "render",
      value: function () {
        return this.props.children;
      }
    }]), t;
  }(v.a.Component);
q.propTypes = {
  children: g.a.any,
  animation: g.a.any,
  transitionName: g.a.any
};
var H = q,
  Y = "rc_animate_" + Date.now();
function G(e) {
  var t = e.children;
  return v.a.isValidElement(t) && !t.key ? v.a.cloneElement(t, {
    key: Y
  }) : t;
}
function K() {}
var Z = function (e) {
  function t(e) {
    c()(this, t);
    var n = p()(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
    return Q.call(n), n.currentlyAnimatingKeys = {}, n.keysToEnter = [], n.keysToLeave = [], n.state = {
      children: x(G(e))
    }, n.childrenRefs = {}, n;
  }
  return h()(t, e), l()(t, [{
    key: "componentDidMount",
    value: function () {
      var e = this,
        t = this.props.showProp,
        n = this.state.children;
      t && (n = n.filter(function (e) {
        return !!e.props[t];
      })), n.forEach(function (t) {
        t && e.performAppear(t.key);
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function (e) {
      var t = this;
      this.nextProps = e;
      var n = x(G(e)),
        r = this.props;
      r.exclusive && Object.keys(this.currentlyAnimatingKeys).forEach(function (e) {
        t.stop(e);
      });
      var o = r.showProp,
        i = this.currentlyAnimatingKeys,
        s = r.exclusive ? x(G(r)) : this.state.children,
        c = [];
      o ? (s.forEach(function (e) {
        var t = e && O(n, e.key),
          r = void 0;
        r = t && t.props[o] || !e.props[o] ? t : v.a.cloneElement(t || e, a()({}, o, !0)), r && c.push(r);
      }), n.forEach(function (e) {
        e && O(s, e.key) || c.push(e);
      })) : c = k(s, n), this.setState({
        children: c
      }), n.forEach(function (e) {
        var n = e && e.key;
        if (!e || !i[n]) {
          var r = e && O(s, n);
          if (o) {
            var a = e.props[o];
            if (r) {
              var c = E(s, n, o);
              !c && a && t.keysToEnter.push(n);
            } else a && t.keysToEnter.push(n);
          } else r || t.keysToEnter.push(n);
        }
      }), s.forEach(function (e) {
        var r = e && e.key;
        if (!e || !i[r]) {
          var a = e && O(n, r);
          if (o) {
            var s = e.props[o];
            if (a) {
              var c = E(n, r, o);
              !c && s && t.keysToLeave.push(r);
            } else s && t.keysToLeave.push(r);
          } else a || t.keysToLeave.push(r);
        }
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function () {
      var e = this.keysToEnter;
      this.keysToEnter = [], e.forEach(this.performEnter);
      var t = this.keysToLeave;
      this.keysToLeave = [], t.forEach(this.performLeave);
    }
  }, {
    key: "isValidChildByKey",
    value: function (e, t) {
      var n = this.props.showProp;
      return n ? E(e, t, n) : O(e, t);
    }
  }, {
    key: "stop",
    value: function (e) {
      delete this.currentlyAnimatingKeys[e];
      var t = this.childrenRefs[e];
      t && t.stop();
    }
  }, {
    key: "render",
    value: function () {
      var e = this,
        t = this.props;
      this.nextProps = t;
      var n = this.state.children,
        r = null;
      n && (r = n.map(function (n) {
        if (null === n || void 0 === n) return n;
        if (!n.key) throw new Error("must set key for <rc-animate> children");
        return v.a.createElement(H, {
          key: n.key,
          ref: function (t) {
            e.childrenRefs[n.key] = t;
          },
          animation: t.animation,
          transitionName: t.transitionName,
          transitionEnter: t.transitionEnter,
          transitionAppear: t.transitionAppear,
          transitionLeave: t.transitionLeave
        }, n);
      }));
      var i = t.component;
      if (i) {
        var a = t;
        return "string" === typeof i && (a = o()({
          className: t.className,
          style: t.style
        }, t.componentProps)), v.a.createElement(i, a, r);
      }
      return r[0] || null;
    }
  }]), t;
}(v.a.Component);
Z.isAnimate = !0, Z.propTypes = {
  className: g.a.string,
  style: g.a.object,
  component: g.a.any,
  componentProps: g.a.object,
  animation: g.a.object,
  transitionName: g.a.oneOfType([g.a.string, g.a.object]),
  transitionEnter: g.a.bool,
  transitionAppear: g.a.bool,
  exclusive: g.a.bool,
  transitionLeave: g.a.bool,
  onEnd: g.a.func,
  onEnter: g.a.func,
  onLeave: g.a.func,
  onAppear: g.a.func,
  showProp: g.a.string,
  children: g.a.node
}, Z.defaultProps = {
  animation: {},
  component: "span",
  componentProps: {},
  transitionEnter: !0,
  transitionLeave: !0,
  transitionAppear: !1,
  onEnd: K,
  onEnter: K,
  onLeave: K,
  onAppear: K
};
var Q = function () {
  var e = this;
  this.performEnter = function (t) {
    e.childrenRefs[t] && (e.currentlyAnimatingKeys[t] = !0, e.childrenRefs[t].componentWillEnter(e.handleDoneAdding.bind(e, t, "enter")));
  }, this.performAppear = function (t) {
    e.childrenRefs[t] && (e.currentlyAnimatingKeys[t] = !0, e.childrenRefs[t].componentWillAppear(e.handleDoneAdding.bind(e, t, "appear")));
  }, this.handleDoneAdding = function (t, n) {
    var r = e.props;
    if (delete e.currentlyAnimatingKeys[t], !r.exclusive || r === e.nextProps) {
      var o = x(G(r));
      e.isValidChildByKey(o, t) ? "appear" === n ? W.allowAppearCallback(r) && (r.onAppear(t), r.onEnd(t, !0)) : W.allowEnterCallback(r) && (r.onEnter(t), r.onEnd(t, !0)) : e.performLeave(t);
    }
  }, this.performLeave = function (t) {
    e.childrenRefs[t] && (e.currentlyAnimatingKeys[t] = !0, e.childrenRefs[t].componentWillLeave(e.handleDoneLeaving.bind(e, t)));
  }, this.handleDoneLeaving = function (t) {
    var n = e.props;
    if (delete e.currentlyAnimatingKeys[t], !n.exclusive || n === e.nextProps) {
      var r = x(G(n));
      if (e.isValidChildByKey(r, t)) e.performEnter(t);else {
        var o = function () {
          W.allowLeaveCallback(n) && (n.onLeave(t), n.onEnd(t, !1));
        };
        _(e.state.children, r, n.showProp) ? o() : e.setState({
          children: r
        }, o);
      }
    }
  };
};
legacyExports["a"] = w(Z);
