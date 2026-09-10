let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.default = P;
var r = o(require("./71317449.js")),
  i = require("./36596b53.js");
function o(e) {
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
function s(e, t, n, r, i, o, a) {
  try {
    var s = e[o](a),
      l = s.value;
  } catch (e) {
    return void n(e);
  }
  s.done ? t(l) : Promise.resolve(l).then(r, i);
}
function l(e) {
  return function () {
    var t = this,
      n = arguments;
    return new Promise(function (r, i) {
      var o = e.apply(t, n);
      function a(e) {
        s(o, r, i, a, l, "next", e);
      }
      function l(e) {
        s(o, r, i, a, l, "throw", e);
      }
      a(void 0);
    });
  };
}
function c(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function u(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function h(e, t, n) {
  return t && u(e.prototype, t), n && u(e, n), e;
}
function f(e, t) {
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
function p(e) {
  return function () {
    var t,
      n = y(e);
    if (v()) {
      var r = y(this).constructor;
      t = Reflect.construct(n, arguments, r);
    } else t = n.apply(this, arguments);
    return m(this, t);
  };
}
function m(e, t) {
  return !t || "object" !== a(t) && "function" !== typeof t ? g(e) : t;
}
function g(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function v() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function y(e) {
  return y = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, y(e);
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
      _(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : w(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function _(e, t, n) {
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
    i = S(e, t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
  }
  return i;
}
function S(e, t) {
  if (null == e) return {};
  var n,
    r,
    i = {},
    o = Object.keys(e);
  for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || (i[n] = e[n]);
  return i;
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
  C = function (e) {
    var t = e.path,
      n = e.exact,
      o = e.strict,
      a = e.render,
      s = e.location,
      l = e.sensitive,
      c = E(e, ["path", "exact", "strict", "render", "location", "sensitive"]);
    return r.default.createElement(i.Route, {
      path: t,
      exact: n,
      strict: o,
      location: s,
      sensitive: l,
      render: function (e) {
        return a(x({}, e, {}, c));
      }
    });
  };
function O(e) {
  var t = {};
  return t;
}
function T(e) {
  if (k.has(e)) return k.get(e);
  var t = e.Routes,
    n = t.length - 1,
    i = function (e) {
      var t = e.render,
        n = E(e, ["render"]);
      return t(n);
    },
    o = function () {
      var e = t[n],
        o = i;
      i = function (t) {
        return r.default.createElement(e, t, r.default.createElement(o, t));
      }, n -= 1;
    };
  while (n >= 0) o();
  var a = function (t) {
    var n = t.render,
      o = E(t, ["render"]);
    return r.default.createElement(C, b({}, o, {
      render: function (t) {
        return r.default.createElement(i, b({}, t, {
          route: e,
          render: n
        }));
      }
    }));
  };
  return k.set(e, a), a;
}
var L = !1;
function A(e, t) {
  var n,
    i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  return n = function (n) {
    f(a, n);
    var o = p(a);
    function a(e) {
      var t;
      return c(this, a), t = o.call(this, e), t.wrappedWithInitialProps = !0, t.state = {
        extraProps: x({}, i)
      }, L || (L = !window.g_useSSR || e.history && "POP" !== e.history.action), t;
    }
    return h(a, [{
      key: "componentDidMount",
      value: function () {
        var e = l(regeneratorRuntime.mark(function e() {
          return regeneratorRuntime.wrap(function (e) {
            while (1) switch (e.prev = e.next) {
              case 0:
                L && this.getInitialProps();
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
        e.location.pathname !== t.pathname && (L = !0, this.getInitialProps());
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        L = !0;
      }
    }, {
      key: "getInitialProps",
      value: function () {
        var n = l(regeneratorRuntime.mark(function n() {
          var r, i, o, a, s;
          return regeneratorRuntime.wrap(function (n) {
            while (1) switch (n.prev = n.next) {
              case 0:
                return r = this.props, i = r.match, o = r.location, a = this.state.extraProps, this.setState({
                  extraProps: x({}, a, {
                    fetchingProps: !0
                  })
                }), n.next = 5, e.getInitialProps(x({
                  isServer: !1,
                  route: i,
                  location: o,
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
function P(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
    a = require("./50737a47.js");
  return e ? r.default.createElement(i.Switch, o, e.map(function (e, n) {
    if (e.redirect) return r.default.createElement(i.Redirect, {
      key: e.key || n,
      from: e.path,
      to: e.redirect,
      exact: e.exact,
      strict: e.strict
    });
    var o = e.Routes ? T(e) : C;
    return r.default.createElement(o, {
      key: e.key || n,
      path: e.path,
      exact: e.exact,
      strict: e.strict,
      sensitive: e.sensitive,
      render: function (n) {
        var i = n.location;
        L && (t = {});
        var o = P(e.routes, t, {
          location: i
        });
        if (e.component) {
          var s = O(x({}, n, {}, t)),
            l = a.apply("modifyRouteProps", {
              initialValue: x({}, n, {}, t, {}, s),
              args: {
                route: e
              }
            }),
            c = e.component;
          if (c.getInitialProps) {
            var u = a.apply("modifyInitialProps", {
              initialValue: {}
            });
            c.wrappedWithInitialProps || (c = A(c, u, t), e.component = c);
          }
          return r.default.createElement(c, b({
            key: e.path
          }, l, {
            route: e
          }), o);
        }
        return o;
      }
    });
  })) : null;
}
