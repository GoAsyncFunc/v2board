let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports);
var r = require("./reactRuntime.js"),
  o = interopDefault(r),
  i = require("./propTypesRuntime.js"),
  a = interopDefault(i),
  s = require("../reactRedux.js"),
  c = require("./43785865.js"),
  u = require("./41552f77.js");
function l(e) {
  return l = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, l(e);
}
var f = function (e) {
    var t = e.getIn,
      n = e.toJS,
      r = function (e) {
        return null != e && "object" === l(e) && t(e, ["location"]) && t(e, ["action"]);
      },
      o = function (e) {
        var o = n(t(e, ["router"]));
        if (!r(o)) throw 'Could not find router reducer in state tree, it must be mounted under "router"';
        return o;
      },
      i = function (e) {
        return n(t(o(e), ["location"]));
      },
      a = function (e) {
        return n(t(o(e), ["action"]));
      },
      s = function (e) {
        return n(t(o(e), ["location", "search"]));
      },
      u = function (e) {
        return n(t(o(e), ["location", "hash"]));
      },
      f = function (e) {
        var t = null,
          n = null;
        return function (r) {
          var o = i(r) || {},
            a = o.pathname;
          if (a === t) return n;
          t = a;
          var s = Object(c["j"])(a, e);
          return s && n && s.url === n.url || (n = s), n;
        };
      };
    return {
      getLocation: i,
      getAction: a,
      getRouter: o,
      getSearch: s,
      getHash: u,
      createMatchSelector: f
    };
  },
  p = f;
function d(e) {
  return d = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, d(e);
}
function h() {
  return h = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, h.apply(this, arguments);
}
function m(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function v(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function y(e, t, n) {
  return t && v(e.prototype, t), n && v(e, n), e;
}
function g(e, t) {
  return !t || "object" !== d(t) && "function" !== typeof t ? b(e) : t;
}
function b(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function w(e) {
  return w = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, w(e);
}
function x(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && O(e, t);
}
function O(e, t) {
  return O = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, O(e, t);
}
var E = function (e) {
    var t = p(e),
      n = t.getLocation,
      i = function (e) {
        function t(e) {
          var r;
          m(this, t), r = g(this, w(t).call(this, e));
          var o = e.store,
            i = e.history,
            a = e.onLocationChanged;
          r.inTimeTravelling = !1, r.unsubscribe = o.subscribe(function () {
            var e = n(o.getState()),
              t = e.pathname,
              a = e.search,
              s = e.hash,
              c = i.location,
              u = c.pathname,
              l = c.search,
              f = c.hash;
            u === t && l === a && f === s || (r.inTimeTravelling = !0, i.push({
              pathname: t,
              search: a,
              hash: s
            }));
          });
          var s = function (e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            r.inTimeTravelling ? r.inTimeTravelling = !1 : a(e, t, n);
          };
          return r.unlisten = i.listen(s), s(i.location, i.action, !0), r;
        }
        return x(t, e), y(t, [{
          key: "componentWillUnmount",
          value: function () {
            this.unlisten(), this.unsubscribe();
          }
        }, {
          key: "render",
          value: function () {
            var e = this.props,
              t = e.history,
              n = e.children;
            return o.a.createElement(c["e"], {
              history: t
            }, n);
          }
        }]), t;
      }(r["PureComponent"]);
    i.propTypes = {
      store: a.a.shape({
        getState: a.a.func.isRequired,
        subscribe: a.a.func.isRequired
      }).isRequired,
      history: a.a.shape({
        action: a.a.string.isRequired,
        listen: a.a.func.isRequired,
        location: a.a.object.isRequired,
        push: a.a.func.isRequired
      }).isRequired,
      basename: a.a.string,
      children: a.a.oneOfType([a.a.func, a.a.node]),
      onLocationChanged: a.a.func.isRequired
    };
    var l = function (e) {
        return {
          onLocationChanged: function (t, n, r) {
            return e(Object(u["f"])(t, n, r));
          }
        };
      },
      f = function (e) {
        var t = e.context || s["b"];
        if (null == t) throw "Please upgrade to react-redux v6";
        return o.a.createElement(t.Consumer, null, function (t) {
          var n = t.store;
          return o.a.createElement(i, h({
            store: n
          }, e));
        });
      };
    return f.propTypes = {
      context: a.a.object
    }, Object(s["c"])(null, l)(f);
  },
  _ = E,
  k = function (e) {
    var t = e.fromJS,
      n = e.merge,
      r = function (e) {
        var r = t({
          location: e.location,
          action: e.action
        });
        return function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r,
            o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            i = o.type,
            a = o.payload;
          if (i === u["b"]) {
            var s = a.location,
              c = a.action,
              l = a.isFirstRendering;
            return l ? e : n(e, {
              location: t(s),
              action: c
            });
          }
          return e;
        };
      };
    return r;
  },
  S = k,
  C = function (e, t) {
    if (!e) return e;
    var n = t.length;
    if (n) {
      for (var r = e, o = 0; o < n && r; ++o) r = r[t[o]];
      return r;
    }
  },
  j = C;
function P(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {},
      r = Object.keys(n);
    "function" === typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
      return Object.getOwnPropertyDescriptor(n, e).enumerable;
    }))), r.forEach(function (t) {
      T(e, t, n[t]);
    });
  }
  return e;
}
function T(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var L = {
    fromJS: function (e) {
      return e;
    },
    getIn: j,
    merge: function (e, t) {
      return P({}, e, t);
    },
    toJS: function (e) {
      return e;
    }
  },
  N = L,
  M = require("./74526762.js");
defineExport(legacyExports, "ConnectedRouter", function () {
  return A;
}), defineExport(legacyExports, "connectRouter", function () {
  return D;
}), defineExport(legacyExports, "getLocation", function () {
  return R;
}), defineExport(legacyExports, "getAction", function () {
  return F;
}), defineExport(legacyExports, "getHash", function () {
  return V;
}), defineExport(legacyExports, "getSearch", function () {
  return z;
}), defineExport(legacyExports, "createMatchSelector", function () {
  return B;
}), defineExport(legacyExports, "LOCATION_CHANGE", function () {
  return u["b"];
}), defineExport(legacyExports, "CALL_HISTORY_METHOD", function () {
  return u["a"];
}), defineExport(legacyExports, "onLocationChanged", function () {
  return u["f"];
}), defineExport(legacyExports, "push", function () {
  return u["g"];
}), defineExport(legacyExports, "replace", function () {
  return u["h"];
}), defineExport(legacyExports, "go", function () {
  return u["c"];
}), defineExport(legacyExports, "goBack", function () {
  return u["d"];
}), defineExport(legacyExports, "goForward", function () {
  return u["e"];
}), defineExport(legacyExports, "routerActions", function () {
  return u["i"];
}), defineExport(legacyExports, "routerMiddleware", function () {
  return M["a"];
});
var A = _(N),
  D = S(N),
  I = p(N),
  R = I.getLocation,
  F = I.getAction,
  V = I.getHash,
  z = I.getSearch,
  B = I.createMatchSelector;
