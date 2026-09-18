let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return y;
}), defineExport(legacyExports, "b", function () {
  return _;
}), defineExport(legacyExports, "c", function () {
  return E;
}), defineExport(legacyExports, "d", function () {
  return N;
}), defineExport(legacyExports, "e", function () {
  return g;
}), defineExport(legacyExports, "f", function () {
  return F;
}), defineExport(legacyExports, "g", function () {
  return z;
}), defineExport(legacyExports, "h", function () {
  return v;
}), defineExport(legacyExports, "i", function () {
  return T;
}), defineExport(legacyExports, "j", function () {
  return P;
}), defineExport(legacyExports, "k", function () {
  return W;
}), defineExport(legacyExports, "l", function () {
  return H;
}), defineExport(legacyExports, "m", function () {
  return B;
}), defineExport(legacyExports, "n", function () {
  return q;
}), defineExport(legacyExports, "o", function () {
  return I;
});
var r = require("./6f685056.js"),
  i = require("./reactRuntime.js"),
  a = interopDefault(i),
  o = require("./historyRuntime.js"),
  u = require("./74456951.js"),
  l = require("./39523934.js"),
  s = require("./45567149.js"),
  c = require("./62414c77.js"),
  f = interopDefault(c),
  d = (require("./reactIsLegacyEntry.js"), require("./objectWithoutPropertiesExport.js")),
  h = require("./326d716c.js"),
  p = interopDefault(h),
  m = function (e) {
    var t = Object(u["a"])();
    return t.displayName = e, t;
  },
  v = m("Router"),
  g = function (e) {
    function t(t) {
      var n;
      return n = e.call(this, t) || this, n.state = {
        location: t.history.location
      }, n._isMounted = !1, n._pendingLocation = null, t.staticContext || (n.unlisten = t.history.listen(function (e) {
        n._isMounted ? n.setState({
          location: e
        }) : n._pendingLocation = e;
      })), n;
    }
    Object(r["a"])(t, e), t.computeRootMatch = function (e) {
      return {
        path: "/",
        url: "/",
        params: {},
        isExact: "/" === e
      };
    };
    var n = t.prototype;
    return n.componentDidMount = function () {
      this._isMounted = !0, this._pendingLocation && this.setState({
        location: this._pendingLocation
      });
    }, n.componentWillUnmount = function () {
      this.unlisten && this.unlisten();
    }, n.render = function () {
      return a.a.createElement(v.Provider, {
        children: this.props.children || null,
        value: {
          history: this.props.history,
          location: this.state.location,
          match: t.computeRootMatch(this.state.location.pathname),
          staticContext: this.props.staticContext
        }
      });
    }, t;
  }(a.a.Component);
var y = function (e) {
  function t() {
    for (var t, n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
    return t = e.call.apply(e, [this].concat(r)) || this, t.history = Object(o["d"])(t.props), t;
  }
  Object(r["a"])(t, e);
  var n = t.prototype;
  return n.render = function () {
    return a.a.createElement(g, {
      history: this.history,
      children: this.props.children
    });
  }, t;
}(a.a.Component);
var b = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  Object(r["a"])(t, e);
  var n = t.prototype;
  return n.componentDidMount = function () {
    this.props.onMount && this.props.onMount.call(this, this);
  }, n.componentDidUpdate = function (e) {
    this.props.onUpdate && this.props.onUpdate.call(this, this, e);
  }, n.componentWillUnmount = function () {
    this.props.onUnmount && this.props.onUnmount.call(this, this);
  }, n.render = function () {
    return null;
  }, t;
}(a.a.Component);
function _(e) {
  var t = e.message,
    n = e.when,
    r = void 0 === n || n;
  return a.a.createElement(v.Consumer, null, function (e) {
    if (e || Object(l["a"])(!1), !r || e.staticContext) return null;
    var n = e.history.block;
    return a.a.createElement(b, {
      onMount: function (e) {
        e.release = n(t);
      },
      onUpdate: function (e, r) {
        r.message !== t && (e.release(), e.release = n(t));
      },
      onUnmount: function (e) {
        e.release();
      },
      message: t
    });
  });
}
var w = {},
  k = 1e4,
  S = 0;
function x(e) {
  if (w[e]) return w[e];
  var t = f.a.compile(e);
  return S < k && (w[e] = t, S++), t;
}
function T(e, t) {
  return void 0 === e && (e = "/"), void 0 === t && (t = {}), "/" === e ? e : x(e)(t, {
    pretty: !0
  });
}
function E(e) {
  var t = e.computedMatch,
    n = e.to,
    r = e.push,
    i = void 0 !== r && r;
  return a.a.createElement(v.Consumer, null, function (e) {
    e || Object(l["a"])(!1);
    var r = e.history,
      u = e.staticContext,
      c = i ? r.push : r.replace,
      f = Object(o["c"])(t ? "string" === typeof n ? T(n, t.params) : Object(s["a"])({}, n, {
        pathname: T(n.pathname, t.params)
      }) : n);
    return u ? (c(f), null) : a.a.createElement(b, {
      onMount: function () {
        c(f);
      },
      onUpdate: function (e, t) {
        var n = Object(o["c"])(t.to);
        Object(o["f"])(n, Object(s["a"])({}, f, {
          key: n.key
        })) || c(f);
      },
      to: n
    });
  });
}
var M = {},
  C = 1e4,
  O = 0;
function D(e, t) {
  var n = "" + t.end + t.strict + t.sensitive,
    r = M[n] || (M[n] = {});
  if (r[e]) return r[e];
  var i = [],
    a = f()(e, i, t),
    o = {
      regexp: a,
      keys: i
    };
  return O < C && (r[e] = o, O++), o;
}
function P(e, t) {
  void 0 === t && (t = {}), ("string" === typeof t || Array.isArray(t)) && (t = {
    path: t
  });
  var n = t,
    r = n.path,
    i = n.exact,
    a = void 0 !== i && i,
    o = n.strict,
    u = void 0 !== o && o,
    l = n.sensitive,
    s = void 0 !== l && l,
    c = [].concat(r);
  return c.reduce(function (t, n) {
    if (!n && "" !== n) return null;
    if (t) return t;
    var r = D(n, {
        end: a,
        strict: u,
        sensitive: s
      }),
      i = r.regexp,
      o = r.keys,
      l = i.exec(e);
    if (!l) return null;
    var c = l[0],
      f = l.slice(1),
      d = e === c;
    return a && !d ? null : {
      path: n,
      url: "/" === n && "" === c ? "/" : c,
      isExact: d,
      params: o.reduce(function (e, t, n) {
        return e[t.name] = f[n], e;
      }, {})
    };
  }, null);
}
var N = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  Object(r["a"])(t, e);
  var n = t.prototype;
  return n.render = function () {
    var e = this;
    return a.a.createElement(v.Consumer, null, function (t) {
      t || Object(l["a"])(!1);
      var n = e.props.location || t.location,
        r = e.props.computedMatch ? e.props.computedMatch : e.props.path ? P(n.pathname, e.props) : t.match,
        i = Object(s["a"])({}, t, {
          location: n,
          match: r
        }),
        o = e.props,
        u = o.children,
        c = o.component,
        f = o.render;
      return Array.isArray(u) && 0 === u.length && (u = null), a.a.createElement(v.Provider, {
        value: i
      }, i.match ? u ? "function" === typeof u ? u(i) : u : c ? a.a.createElement(c, i) : f ? f(i) : null : "function" === typeof u ? u(i) : null);
    });
  }, t;
}(a.a.Component);
function L(e) {
  return "/" === e.charAt(0) ? e : "/" + e;
}
function Y(e, t) {
  return e ? Object(s["a"])({}, t, {
    pathname: L(e) + t.pathname
  }) : t;
}
function R(e, t) {
  if (!e) return t;
  var n = L(e);
  return 0 !== t.pathname.indexOf(n) ? t : Object(s["a"])({}, t, {
    pathname: t.pathname.substr(n.length)
  });
}
function j(e) {
  return "string" === typeof e ? e : Object(o["e"])(e);
}
function A(e) {
  return function () {
    Object(l["a"])(!1);
  };
}
function V() {}
var F = function (e) {
  function t() {
    for (var t, n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
    return t = e.call.apply(e, [this].concat(r)) || this, t.handlePush = function (e) {
      return t.navigateTo(e, "PUSH");
    }, t.handleReplace = function (e) {
      return t.navigateTo(e, "REPLACE");
    }, t.handleListen = function () {
      return V;
    }, t.handleBlock = function () {
      return V;
    }, t;
  }
  Object(r["a"])(t, e);
  var n = t.prototype;
  return n.navigateTo = function (e, t) {
    var n = this.props,
      r = n.basename,
      i = void 0 === r ? "" : r,
      a = n.context,
      u = void 0 === a ? {} : a;
    u.action = t, u.location = Y(i, Object(o["c"])(e)), u.url = j(u.location);
  }, n.render = function () {
    var e = this.props,
      t = e.basename,
      n = void 0 === t ? "" : t,
      r = e.context,
      i = void 0 === r ? {} : r,
      u = e.location,
      l = void 0 === u ? "/" : u,
      c = Object(d["a"])(e, ["basename", "context", "location"]),
      f = {
        createHref: function (e) {
          return L(n + j(e));
        },
        action: "POP",
        location: R(n, Object(o["c"])(l)),
        push: this.handlePush,
        replace: this.handleReplace,
        go: A("go"),
        goBack: A("goBack"),
        goForward: A("goForward"),
        listen: this.handleListen,
        block: this.handleBlock
      };
    return a.a.createElement(g, Object(s["a"])({}, c, {
      history: f,
      staticContext: i
    }));
  }, t;
}(a.a.Component);
var z = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  Object(r["a"])(t, e);
  var n = t.prototype;
  return n.render = function () {
    var e = this;
    return a.a.createElement(v.Consumer, null, function (t) {
      t || Object(l["a"])(!1);
      var n,
        r,
        i = e.props.location || t.location;
      return a.a.Children.forEach(e.props.children, function (e) {
        if (null == r && a.a.isValidElement(e)) {
          n = e;
          var o = e.props.path || e.props.from;
          r = o ? P(i.pathname, Object(s["a"])({}, e.props, {
            path: o
          })) : t.match;
        }
      }), r ? a.a.cloneElement(n, {
        location: i,
        computedMatch: r
      }) : null;
    });
  }, t;
}(a.a.Component);
function I(e) {
  var t = "withRouter(" + (e.displayName || e.name) + ")",
    n = function (t) {
      var n = t.wrappedComponentRef,
        r = Object(d["a"])(t, ["wrappedComponentRef"]);
      return a.a.createElement(v.Consumer, null, function (t) {
        return t || Object(l["a"])(!1), a.a.createElement(e, Object(s["a"])({}, r, t, {
          ref: n
        }));
      });
    };
  return n.displayName = t, n.WrappedComponent = e, p()(n, e);
}
var U = a.a.useContext;
function W() {
  return U(v).history;
}
function H() {
  return U(v).location;
}
function B() {
  var e = U(v).match;
  return e ? e.params : {};
}
function q(e) {
  return e ? P(H().pathname, e) : U(v).match;
}
