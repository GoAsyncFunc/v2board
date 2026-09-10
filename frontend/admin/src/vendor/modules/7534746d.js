let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports);
var r = require("./71317449.js"),
  i = interopDefault(r),
  o = require("./31377839.js"),
  a = interopDefault(o),
  s = require("../reactRedux.js"),
  l = require("./43785865.js"),
  c = require("./41552f77.js");
function u(e) {
  return u = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, u(e);
}
var h = function (e) {
    var t = e.getIn,
      n = e.toJS,
      r = function (e) {
        return null != e && "object" === u(e) && t(e, ["location"]) && t(e, ["action"]);
      },
      i = function (e) {
        var i = n(t(e, ["router"]));
        if (!r(i)) throw 'Could not find router reducer in state tree, it must be mounted under "router"';
        return i;
      },
      o = function (e) {
        return n(t(i(e), ["location"]));
      },
      a = function (e) {
        return n(t(i(e), ["action"]));
      },
      s = function (e) {
        return n(t(i(e), ["location", "search"]));
      },
      c = function (e) {
        return n(t(i(e), ["location", "hash"]));
      },
      h = function (e) {
        var t = null,
          n = null;
        return function (r) {
          var i = o(r) || {},
            a = i.pathname;
          if (a === t) return n;
          t = a;
          var s = Object(l["j"])(a, e);
          return s && n && s.url === n.url || (n = s), n;
        };
      };
    return {
      getLocation: o,
      getAction: a,
      getRouter: i,
      getSearch: s,
      getHash: c,
      createMatchSelector: h
    };
  },
  f = h;
function d(e) {
  return d = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, d(e);
}
function p() {
  return p = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, p.apply(this, arguments);
}
function m(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function g(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function v(e, t, n) {
  return t && g(e.prototype, t), n && g(e, n), e;
}
function y(e, t) {
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
  }), t && _(e, t);
}
function _(e, t) {
  return _ = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, _(e, t);
}
var E = function (e) {
    var t = f(e),
      n = t.getLocation,
      o = function (e) {
        function t(e) {
          var r;
          m(this, t), r = y(this, w(t).call(this, e));
          var i = e.store,
            o = e.history,
            a = e.onLocationChanged;
          r.inTimeTravelling = !1, r.unsubscribe = i.subscribe(function () {
            var e = n(i.getState()),
              t = e.pathname,
              a = e.search,
              s = e.hash,
              l = o.location,
              c = l.pathname,
              u = l.search,
              h = l.hash;
            c === t && u === a && h === s || (r.inTimeTravelling = !0, o.push({
              pathname: t,
              search: a,
              hash: s
            }));
          });
          var s = function (e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            r.inTimeTravelling ? r.inTimeTravelling = !1 : a(e, t, n);
          };
          return r.unlisten = o.listen(s), s(o.location, o.action, !0), r;
        }
        return x(t, e), v(t, [{
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
            return i.a.createElement(l["e"], {
              history: t
            }, n);
          }
        }]), t;
      }(r["PureComponent"]);
    o.propTypes = {
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
    var u = function (e) {
        return {
          onLocationChanged: function (t, n, r) {
            return e(Object(c["f"])(t, n, r));
          }
        };
      },
      h = function (e) {
        var t = e.context || s["b"];
        if (null == t) throw "Please upgrade to react-redux v6";
        return i.a.createElement(t.Consumer, null, function (t) {
          var n = t.store;
          return i.a.createElement(o, p({
            store: n
          }, e));
        });
      };
    return h.propTypes = {
      context: a.a.object
    }, Object(s["c"])(null, u)(h);
  },
  S = E,
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
            i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            o = i.type,
            a = i.payload;
          if (o === c["b"]) {
            var s = a.location,
              l = a.action,
              u = a.isFirstRendering;
            return u ? e : n(e, {
              location: t(s),
              action: l
            });
          }
          return e;
        };
      };
    return r;
  },
  C = k,
  O = function (e, t) {
    if (!e) return e;
    var n = t.length;
    if (n) {
      for (var r = e, i = 0; i < n && r; ++i) r = r[t[i]];
      return r;
    }
  },
  T = O;
function L(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {},
      r = Object.keys(n);
    "function" === typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
      return Object.getOwnPropertyDescriptor(n, e).enumerable;
    }))), r.forEach(function (t) {
      A(e, t, n[t]);
    });
  }
  return e;
}
function A(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
var P = {
    fromJS: function (e) {
      return e;
    },
    getIn: T,
    merge: function (e, t) {
      return L({}, e, t);
    },
    toJS: function (e) {
      return e;
    }
  },
  j = P,
  M = require("./74526762.js");
defineExport(legacyExports, "ConnectedRouter", function () {
  return R;
}), defineExport(legacyExports, "connectRouter", function () {
  return N;
}), defineExport(legacyExports, "getLocation", function () {
  return I;
}), defineExport(legacyExports, "getAction", function () {
  return $;
}), defineExport(legacyExports, "getHash", function () {
  return F;
}), defineExport(legacyExports, "getSearch", function () {
  return B;
}), defineExport(legacyExports, "createMatchSelector", function () {
  return V;
}), defineExport(legacyExports, "LOCATION_CHANGE", function () {
  return c["b"];
}), defineExport(legacyExports, "CALL_HISTORY_METHOD", function () {
  return c["a"];
}), defineExport(legacyExports, "onLocationChanged", function () {
  return c["f"];
}), defineExport(legacyExports, "push", function () {
  return c["g"];
}), defineExport(legacyExports, "replace", function () {
  return c["h"];
}), defineExport(legacyExports, "go", function () {
  return c["c"];
}), defineExport(legacyExports, "goBack", function () {
  return c["d"];
}), defineExport(legacyExports, "goForward", function () {
  return c["e"];
}), defineExport(legacyExports, "routerActions", function () {
  return c["i"];
}), defineExport(legacyExports, "routerMiddleware", function () {
  return M["a"];
});
var R = S(j),
  N = C(j),
  D = f(j),
  I = D.getLocation,
  $ = D.getAction,
  F = D.getHash,
  B = D.getSearch,
  V = D.createMatchSelector;
