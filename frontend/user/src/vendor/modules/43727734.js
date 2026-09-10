let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.default = L;
var r = i(require("./71317449.js")),
  o = require("./36596b53.js");
function i(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function a(e) {
  "@babel/helpers - typeof";

  return a = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, a(e);
}
function s(e, t, n, r, o, i, a) {
  try {
    var s = e[i](a),
      c = s.value;
  } catch (e) {
    return void n(e);
  }
  s.done ? t(c) : Promise.resolve(c).then(r, o);
}
function c(e) {
  return function () {
    var t = this,
      n = arguments;
    return new Promise(function (r, o) {
      var i = e.apply(t, n);
      function a(e) {
        s(i, r, o, a, c, "next", e);
      }
      function c(e) {
        s(i, r, o, a, c, "throw", e);
      }
      a(void 0);
    });
  };
}
function u(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function l(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function f(e, t, n) {
  return t && l(e.prototype, t), n && l(e, n), e;
}
function p(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && d(e, t);
}
function d(e, t) {
  return d = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, d(e, t);
}
function h(e) {
  return function () {
    var t,
      n = g(e);
    if (y()) {
      var r = g(this).constructor;
      t = Reflect.construct(n, arguments, r);
    } else t = n.apply(this, arguments);
    return m(this, t);
  };
}
function m(e, t) {
  return !t || "object" !== a(t) && "function" !== typeof t ? v(e) : t;
}
function v(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function y() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function g(e) {
  return g = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, g(e);
}
function b() {
  return b = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, b.apply(this, arguments);
}
function w(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function x(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? w(Object(n), !0).forEach(function (t) {
      O(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : w(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function O(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function E(e, t) {
  if (null == e) return {};
  var n,
    r,
    o = _(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
  }
  return o;
}
function _(e, t) {
  if (null == e) return {};
  var n,
    r,
    o = {},
    i = Object.keys(e);
  for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
  return o;
}
var k = {
    get: function (e) {
      return e._routeInternalComponent;
    },
    has: function (e) {
      return void 0 !== e._routeInternalComponent;
    },
    set: function (e, t) {
      e._routeInternalComponent = t;
    }
  },
  S = function (e) {
    var t = e.path,
      n = e.exact,
      i = e.strict,
      a = e.render,
      s = e.location,
      c = e.sensitive,
      u = E(e, ["path", "exact", "strict", "render", "location", "sensitive"]);
    return r.default.createElement(o.Route, {
      path: t,
      exact: n,
      strict: i,
      location: s,
      sensitive: c,
      render: function (e) {
        return a(x({}, e, {}, u));
      }
    });
  };
function C(e) {
  var t = {};
  return t;
}
function j(e) {
  if (k.has(e)) return k.get(e);
  var t = e.Routes,
    n = t.length - 1,
    o = function (e) {
      var t = e.render,
        n = E(e, ["render"]);
      return t(n);
    },
    i = function () {
      var e = t[n],
        i = o;
      o = function (t) {
        return r.default.createElement(e, t, r.default.createElement(i, t));
      }, n -= 1;
    };
  while (n >= 0) i();
  var a = function (t) {
    var n = t.render,
      i = E(t, ["render"]);
    return r.default.createElement(S, b({}, i, {
      render: function (t) {
        return r.default.createElement(o, b({}, t, {
          route: e,
          render: n
        }));
      }
    }));
  };
  return k.set(e, a), a;
}
var P = !1;
function T(e, t) {
  var n,
    o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  return n = function (n) {
    p(a, n);
    var i = h(a);
    function a(e) {
      var t;
      return u(this, a), t = i.call(this, e), t.wrappedWithInitialProps = !0, t.state = {
        extraProps: x({}, o)
      }, P || (P = !window.g_useSSR || e.history && "POP" !== e.history.action), t;
    }
    return f(a, [{
      key: "componentDidMount",
      value: function () {
        var e = c(regeneratorRuntime.mark(function e() {
          return regeneratorRuntime.wrap(function (e) {
            while (1) switch (e.prev = e.next) {
              case 0:
                P && this.getInitialProps();
              case 1:
              case "end":
                return e.stop();
            }
          }, e, this);
        }));
        function t() {
          return e.apply(this, arguments);
        }
        return t;
      }()
    }, {
      key: "componentDidUpdate",
      value: function (e) {
        var t = this.props.location;
        e.location.pathname !== t.pathname && (P = !0, this.getInitialProps());
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        P = !0;
      }
    }, {
      key: "getInitialProps",
      value: function () {
        var n = c(regeneratorRuntime.mark(function n() {
          var r, o, i, a, s;
          return regeneratorRuntime.wrap(function (n) {
            while (1) switch (n.prev = n.next) {
              case 0:
                return r = this.props, o = r.match, i = r.location, a = this.state.extraProps, this.setState({
                  extraProps: x({}, a, {
                    fetchingProps: !0
                  })
                }), n.next = 5, e.getInitialProps(x({
                  isServer: !1,
                  route: o,
                  location: i,
                  prevInitialProps: a
                }, t));
              case 5:
                if (n.t0 = n.sent, n.t0) {
                  n.next = 8;
                  break;
                }
                n.t0 = {};
              case 8:
                s = n.t0, s.fetchingProps = !1, this.setState({
                  extraProps: s
                });
              case 11:
              case "end":
                return n.stop();
            }
          }, n, this);
        }));
        function r() {
          return n.apply(this, arguments);
        }
        return r;
      }()
    }, {
      key: "render",
      value: function () {
        return r.default.createElement(e, x({}, this.props, {}, this.state.extraProps));
      }
    }]), a;
  }(r.default.Component), n;
}
function L(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
    a = require("./50737a47.js");
  return e ? r.default.createElement(o.Switch, i, e.map(function (e, n) {
    if (e.redirect) return r.default.createElement(o.Redirect, {
      key: e.key || n,
      from: e.path,
      to: e.redirect,
      exact: e.exact,
      strict: e.strict
    });
    var i = e.Routes ? j(e) : S;
    return r.default.createElement(i, {
      key: e.key || n,
      path: e.path,
      exact: e.exact,
      strict: e.strict,
      sensitive: e.sensitive,
      render: function (n) {
        var o = n.location;
        P && (t = {});
        var i = L(e.routes, t, {
          location: o
        });
        if (e.component) {
          var s = C(x({}, n, {}, t)),
            c = a.apply("modifyRouteProps", {
              initialValue: x({}, n, {}, t, {}, s),
              args: {
                route: e
              }
            }),
            u = e.component;
          if (u.getInitialProps) {
            var l = a.apply("modifyInitialProps", {
              initialValue: {}
            });
            u.wrappedWithInitialProps || (u = T(u, l, t), e.component = u);
          }
          return r.default.createElement(u, b({
            key: e.path
          }, c, {
            route: e
          }), i);
        }
        return i;
      }
    });
  })) : null;
}
