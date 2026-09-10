let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault,
  defineExport
} = require("../app/moduleInterop.js");
var r = require("./modules/76705134.js"),
  i = require("./modules/55387055.js"),
  a = require("./modules/4b516d34.js"),
  o = require("./modules/71317449.js"),
  u = interopDefault(o),
  l = require("./modules/514c6150.js"),
  s = interopDefault(l),
  c = require("./modules/67304d50.js"),
  f = require("./modules/377a526a.js"),
  d = interopDefault(f),
  h = require("./reactRedux.js"),
  p = require("./modules/346e6d52.js"),
  m = require("./modules/43785865.js"),
  v = require("./modules/7534746d.js"),
  g = require("./modules/74526762.js");
defineExport(legacyExports, "c", function () {
  return v;
});
var y = require("./modules/4c705343.js"),
  b = interopDefault(y);
defineExport(legacyExports, "b", function () {
  return b.a;
});
var _ = require("./modules/314f7942.js"),
  w = require("./modules/76754955.js"),
  k = require("./modules/6d643747.js"),
  S = require("./modules/666f5376.js"),
  x = require("./modules/4a693755.js"),
  T = {};
function E(e, t) {
  t = t.default || t, T[t.namespace] || (e.model(t), T[t.namespace] = 1);
}
var M = function () {
  return null;
};
function C(e) {
  var t = e.resolve;
  return function (n) {
    function r() {
      var t, n;
      Object(_["a"])(this, r);
      for (var i = arguments.length, a = new Array(i), o = 0; o < i; o++) a[o] = arguments[o];
      return n = Object(k["a"])(this, (t = Object(S["a"])(r)).call.apply(t, [this].concat(a))), n.LoadingComponent = e.LoadingComponent || M, n.state = {
        AsyncComponent: null
      }, n.load(), n;
    }
    return Object(x["a"])(r, n), Object(w["a"])(r, [{
      key: "componentDidMount",
      value: function () {
        this.mounted = !0;
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        this.mounted = !1;
      }
    }, {
      key: "load",
      value: function () {
        var e = this;
        t().then(function (t) {
          var n = t.default || t;
          e.mounted ? e.setState({
            AsyncComponent: n
          }) : e.state.AsyncComponent = n;
        });
      }
    }, {
      key: "render",
      value: function () {
        var e = this.state.AsyncComponent,
          t = this.LoadingComponent;
        return e ? u.a.createElement(e, this.props) : u.a.createElement(t, this.props);
      }
    }]), r;
  }(o["Component"]);
}
function O(e) {
  var t = e.app,
    n = e.models,
    i = e.component;
  return C(Object(r["a"])({
    resolve: e.resolve || function () {
      var e = "function" === typeof n ? n() : [],
        r = i();
      return new Promise(function (n) {
        Promise.all([].concat(Object(a["a"])(e), [r])).then(function (r) {
          if (!e || !e.length) return n(r[0]);
          var i = e.length;
          r.slice(0, i).forEach(function (e) {
            e = e.default || e, Array.isArray(e) || (e = [e]), e.map(function (e) {
              return E(t, e);
            });
          }), n(r[i]);
        });
      });
    }
  }, e));
}
O.setDefaultLoadingComponent = function (e) {
  M = e;
};
var D = v["connectRouter"],
  P = g["a"],
  N = p["b"].isFunction;
m["k"], m["l"], m["m"], m["n"];
function L() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    t = e.history || Object(c["b"])(),
    n = {
      initialReducer: {
        router: D(t)
      },
      setupMiddlewares: function (e) {
        return [P(t)].concat(Object(a["a"])(e));
      },
      setupApp: function (e) {
        e._history = V(t);
      }
    },
    r = Object(p["a"])(e, n),
    o = r.start;
  return r.router = u, r.start = l, r;
  function u(e) {
    s()(N(e), "[app.router] router should be function, but got ".concat(Object(i["a"])(e))), r._router = e;
  }
  function l(e) {
    R(e) && (e = d.a.querySelector(e), s()(e, "[app.start] container ".concat(e, " not found"))), s()(!e || Y(e), "[app.start] container should be HTMLElement"), s()(r._router, "[app.start] router must be registered before app.start()"), r._store || o.call(r);
    var t = r._store;
    if (r._getProvider = j.bind(null, t, r), !e) return j(t, this, this._router);
    A(e, t, r, r._router), r._plugin.apply("onHmr")(A.bind(null, e, t, r));
  }
}
function Y(e) {
  return "object" === Object(i["a"])(e) && null !== e && e.nodeType && e.nodeName;
}
function R(e) {
  return "string" === typeof e;
}
function j(e, t, n) {
  var i = function (i) {
    return u.a.createElement(h["a"], {
      store: e
    }, n(Object(r["a"])({
      app: t,
      history: t._history
    }, i)));
  };
  return i;
}
function A(e, t, r, i) {
  var a = require("./modules/69386934.js");
  a.render(u.a.createElement(j(t, r, i)), e);
}
function V(e) {
  var t = e.listen;
  return e.listen = function (n) {
    var r = n.toString(),
      i = "handleLocationChange" === n.name && r.indexOf("onLocationChanged") > -1 || r.indexOf(".inTimeTravelling") > -1 && r.indexOf(".inTimeTravelling") > -1 && r.indexOf("arguments[2]") > -1;
    return n(e.location, e.action), t.call(e, function () {
      for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
      i ? n.apply(void 0, t) : setTimeout(function () {
        n.apply(void 0, t);
      });
    });
  }, e;
}
legacyExports["a"] = L;
