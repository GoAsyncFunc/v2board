let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./51624c5a.js"),
  i = interopDefault(r),
  o = require("./59454956.js"),
  a = interopDefault(o),
  s = require("./69436335.js"),
  l = interopDefault(s),
  c = require("./56376f43.js"),
  u = interopDefault(c),
  h = require("./46597733.js"),
  f = interopDefault(h),
  d = require("./6d526730.js"),
  p = interopDefault(d),
  m = require("./71317449.js"),
  g = interopDefault(m),
  v = require("./31377839.js"),
  y = interopDefault(v),
  b = function (e) {
    var t = e.prototype;
    if (!t || !t.isReactComponent) throw new Error("Can only polyfill class components");
    return "function" !== typeof t.componentWillReceiveProps ? e : g.a.Profiler ? (t.UNSAFE_componentWillReceiveProps = t.componentWillReceiveProps, delete t.componentWillReceiveProps, e) : e;
  },
  w = b;
function x(e) {
  var t = [];
  return g.a.Children.forEach(e, function (e) {
    t.push(e);
  }), t;
}
function _(e, t) {
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
function S(e, t, n) {
  var r = e.length === t.length;
  return r && e.forEach(function (e, i) {
    var o = t[i];
    e && o && (e && !o || !e && o ? r = !1 : e.key !== o.key ? r = !1 : n && e.props[n] !== o.props[n] && (r = !1));
  }), r;
}
function k(e, t) {
  var n = [],
    r = {},
    i = [];
  return e.forEach(function (e) {
    e && _(t, e.key) ? i.length && (r[e.key] = i, i = []) : i.push(e);
  }), t.forEach(function (e) {
    e && Object.prototype.hasOwnProperty.call(r, e.key) && (n = n.concat(r[e.key])), n.push(e);
  }), n = n.concat(i), n;
}
var C = require("./69386934.js"),
  O = interopDefault(C),
  T = require("./454a6979.js"),
  L = interopDefault(T),
  A = require("./2f644463.js"),
  P = require("./5046577a.js"),
  j = interopDefault(P),
  M = 0 !== A["a"].endEvents.length,
  R = ["Webkit", "Moz", "O", "ms"],
  N = ["-webkit-", "-moz-", "-o-", "ms-", ""];
function D(e, t) {
  for (var n = window.getComputedStyle(e, null), r = "", i = 0; i < N.length; i++) if (r = n.getPropertyValue(N[i] + t), r) break;
  return r;
}
function I(e) {
  if (M) {
    var t = parseFloat(D(e, "transition-delay")) || 0,
      n = parseFloat(D(e, "transition-duration")) || 0,
      r = parseFloat(D(e, "animation-delay")) || 0,
      i = parseFloat(D(e, "animation-duration")) || 0,
      o = Math.max(n + t, i + r);
    e.rcEndAnimTimeout = setTimeout(function () {
      e.rcEndAnimTimeout = null, e.rcEndListener && e.rcEndListener();
    }, 1e3 * o + 200);
  }
}
function $(e) {
  e.rcEndAnimTimeout && (clearTimeout(e.rcEndAnimTimeout), e.rcEndAnimTimeout = null);
}
var F = function (e, t, n) {
  var r = "object" === ("undefined" === typeof t ? "undefined" : L()(t)),
    i = r ? t.name : t,
    o = r ? t.active : t + "-active",
    a = n,
    s = void 0,
    l = void 0,
    c = j()(e);
  return n && "[object Object]" === Object.prototype.toString.call(n) && (a = n.end, s = n.start, l = n.active), e.rcEndListener && e.rcEndListener(), e.rcEndListener = function (t) {
    t && t.target !== e || (e.rcAnimTimeout && (clearTimeout(e.rcAnimTimeout), e.rcAnimTimeout = null), $(e), c.remove(i), c.remove(o), A["a"].removeEndEventListener(e, e.rcEndListener), e.rcEndListener = null, a && a());
  }, A["a"].addEndEventListener(e, e.rcEndListener), s && s(), c.add(i), e.rcAnimTimeout = setTimeout(function () {
    e.rcAnimTimeout = null, c.add(o), l && setTimeout(l, 0), I(e);
  }, 30), {
    stop: function () {
      e.rcEndListener && e.rcEndListener();
    }
  };
};
F.style = function (e, t, n) {
  e.rcEndListener && e.rcEndListener(), e.rcEndListener = function (t) {
    t && t.target !== e || (e.rcAnimTimeout && (clearTimeout(e.rcAnimTimeout), e.rcAnimTimeout = null), $(e), A["a"].removeEndEventListener(e, e.rcEndListener), e.rcEndListener = null, n && n());
  }, A["a"].addEndEventListener(e, e.rcEndListener), e.rcAnimTimeout = setTimeout(function () {
    for (var n in t) t.hasOwnProperty(n) && (e.style[n] = t[n]);
    e.rcAnimTimeout = null, I(e);
  }, 0);
}, F.setTransition = function (e, t, n) {
  var r = t,
    i = n;
  void 0 === n && (i = r, r = ""), r = r || "", R.forEach(function (t) {
    e.style[t + "Transition" + r] = i;
  });
}, F.isCssAnimationSupported = M;
var B = F,
  V = {
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
  W = V,
  H = {
    enter: "transitionEnter",
    appear: "transitionAppear",
    leave: "transitionLeave"
  },
  U = function (e) {
    function t() {
      return l()(this, t), f()(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
    }
    return p()(t, e), u()(t, [{
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
          r = O.a.findDOMNode(this),
          i = this.props,
          o = i.transitionName,
          a = "object" === typeof o;
        this.stop();
        var s = function () {
          n.stopper = null, t();
        };
        if ((M || !i.animation[e]) && o && i[H[e]]) {
          var l = a ? o[e] : o + "-" + e,
            c = l + "-active";
          a && o[e + "Active"] && (c = o[e + "Active"]), this.stopper = B(r, {
            name: l,
            active: c
          }, s);
        } else this.stopper = i.animation[e](r, s);
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
  }(g.a.Component);
U.propTypes = {
  children: y.a.any,
  animation: y.a.any,
  transitionName: y.a.any
};
var z = U,
  G = "rc_animate_" + Date.now();
function q(e) {
  var t = e.children;
  return g.a.isValidElement(t) && !t.key ? g.a.cloneElement(t, {
    key: G
  }) : t;
}
function K() {}
var Y = function (e) {
  function t(e) {
    l()(this, t);
    var n = f()(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
    return X.call(n), n.currentlyAnimatingKeys = {}, n.keysToEnter = [], n.keysToLeave = [], n.state = {
      children: x(q(e))
    }, n.childrenRefs = {}, n;
  }
  return p()(t, e), u()(t, [{
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
      var n = x(q(e)),
        r = this.props;
      r.exclusive && Object.keys(this.currentlyAnimatingKeys).forEach(function (e) {
        t.stop(e);
      });
      var i = r.showProp,
        o = this.currentlyAnimatingKeys,
        s = r.exclusive ? x(q(r)) : this.state.children,
        l = [];
      i ? (s.forEach(function (e) {
        var t = e && _(n, e.key),
          r = void 0;
        r = t && t.props[i] || !e.props[i] ? t : g.a.cloneElement(t || e, a()({}, i, !0)), r && l.push(r);
      }), n.forEach(function (e) {
        e && _(s, e.key) || l.push(e);
      })) : l = k(s, n), this.setState({
        children: l
      }), n.forEach(function (e) {
        var n = e && e.key;
        if (!e || !o[n]) {
          var r = e && _(s, n);
          if (i) {
            var a = e.props[i];
            if (r) {
              var l = E(s, n, i);
              !l && a && t.keysToEnter.push(n);
            } else a && t.keysToEnter.push(n);
          } else r || t.keysToEnter.push(n);
        }
      }), s.forEach(function (e) {
        var r = e && e.key;
        if (!e || !o[r]) {
          var a = e && _(n, r);
          if (i) {
            var s = e.props[i];
            if (a) {
              var l = E(n, r, i);
              !l && s && t.keysToLeave.push(r);
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
      return n ? E(e, t, n) : _(e, t);
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
        return g.a.createElement(z, {
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
      var o = t.component;
      if (o) {
        var a = t;
        return "string" === typeof o && (a = i()({
          className: t.className,
          style: t.style
        }, t.componentProps)), g.a.createElement(o, a, r);
      }
      return r[0] || null;
    }
  }]), t;
}(g.a.Component);
Y.isAnimate = !0, Y.propTypes = {
  className: y.a.string,
  style: y.a.object,
  component: y.a.any,
  componentProps: y.a.object,
  animation: y.a.object,
  transitionName: y.a.oneOfType([y.a.string, y.a.object]),
  transitionEnter: y.a.bool,
  transitionAppear: y.a.bool,
  exclusive: y.a.bool,
  transitionLeave: y.a.bool,
  onEnd: y.a.func,
  onEnter: y.a.func,
  onLeave: y.a.func,
  onAppear: y.a.func,
  showProp: y.a.string,
  children: y.a.node
}, Y.defaultProps = {
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
var X = function () {
  var e = this;
  this.performEnter = function (t) {
    e.childrenRefs[t] && (e.currentlyAnimatingKeys[t] = !0, e.childrenRefs[t].componentWillEnter(e.handleDoneAdding.bind(e, t, "enter")));
  }, this.performAppear = function (t) {
    e.childrenRefs[t] && (e.currentlyAnimatingKeys[t] = !0, e.childrenRefs[t].componentWillAppear(e.handleDoneAdding.bind(e, t, "appear")));
  }, this.handleDoneAdding = function (t, n) {
    var r = e.props;
    if (delete e.currentlyAnimatingKeys[t], !r.exclusive || r === e.nextProps) {
      var i = x(q(r));
      e.isValidChildByKey(i, t) ? "appear" === n ? W.allowAppearCallback(r) && (r.onAppear(t), r.onEnd(t, !0)) : W.allowEnterCallback(r) && (r.onEnter(t), r.onEnd(t, !0)) : e.performLeave(t);
    }
  }, this.performLeave = function (t) {
    e.childrenRefs[t] && (e.currentlyAnimatingKeys[t] = !0, e.childrenRefs[t].componentWillLeave(e.handleDoneLeaving.bind(e, t)));
  }, this.handleDoneLeaving = function (t) {
    var n = e.props;
    if (delete e.currentlyAnimatingKeys[t], !n.exclusive || n === e.nextProps) {
      var r = x(q(n));
      if (e.isValidChildByKey(r, t)) e.performEnter(t);else {
        var i = function () {
          W.allowLeaveCallback(n) && (n.onLeave(t), n.onEnd(t, !1));
        };
        S(e.state.children, r, n.showProp) ? i() : e.setState({
          children: r
        }, i);
      }
    }
  };
};
legacyExports["a"] = w(Y);
