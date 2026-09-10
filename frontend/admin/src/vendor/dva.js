let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault,
  defineExport
} = require("../app/moduleInterop.js");
var r = require("./modules/76705134.js"),
  i = require("./modules/55387055.js"),
  o = require("./modules/4b516d34.js"),
  a = require("./modules/71317449.js"),
  s = interopDefault(a),
  l = require("./modules/514c6150.js"),
  u = interopDefault(l),
  c = require("./modules/67304d50.js"),
  f = require("./modules/377a526a.js"),
  d = interopDefault(f),
  h = require("./reactRedux.js"),
  p = require("./modules/346e6d52.js"),
  g = require("./modules/43785865.js"),
  m = require("./modules/7534746d.js"),
  v = require("./modules/74526762.js");
defineExport(legacyExports, "c", function () {
  return m;
});
var y = require("./modules/4c705343.js"),
  b = interopDefault(y);
defineExport(legacyExports, "b", function () {
  return b.a;
});
var x = require("./modules/314f7942.js"),
  _ = require("./modules/76754955.js"),
  w = require("./modules/6d643747.js"),
  O = require("./modules/666f5376.js"),
  S = require("./modules/4a693755.js"),
  k = {};
function j(e, t) {
  t = t.default || t, k[t.namespace] || (e.model(t), k[t.namespace] = 1);
}
var M = function () {
  return null;
};
function C(e) {
  var t = e.resolve;
  return function (n) {
    function r() {
      var t, n;
      Object(x["a"])(this, r);
      for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++) o[a] = arguments[a];
      return n = Object(w["a"])(this, (t = Object(O["a"])(r)).call.apply(t, [this].concat(o))), n.LoadingComponent = e.LoadingComponent || M, n.state = {
        AsyncComponent: null
      }, n.load(), n;
    }
    return Object(S["a"])(r, n), Object(_["a"])(r, [{
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
        return e ? s.a.createElement(e, this.props) : s.a.createElement(t, this.props);
      }
    }]), r;
  }(a["Component"]);
}
function T(e) {
  var t = e.app,
    n = e.models,
    i = e.component;
  return C(Object(r["a"])({
    resolve: e.resolve || function () {
      var e = "function" === typeof n ? n() : [],
        r = i();
      return new Promise(function (n) {
        Promise.all([].concat(Object(o["a"])(e), [r])).then(function (r) {
          if (!e || !e.length) return n(r[0]);
          var i = e.length;
          r.slice(0, i).forEach(function (e) {
            e = e.default || e, Array.isArray(e) || (e = [e]), e.map(function (e) {
              return j(t, e);
            });
          }), n(r[i]);
        });
      });
    }
  }, e));
}
T.setDefaultLoadingComponent = function (e) {
  M = e;
};
var I = m["connectRouter"],
  D = v["a"],
  A = p["b"].isFunction;
g["k"], g["l"], g["m"], g["n"];
function E() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    t = e.history || Object(c["b"])(),
    n = {
      initialReducer: {
        router: I(t)
      },
      setupMiddlewares: function (e) {
        return [D(t)].concat(Object(o["a"])(e));
      },
      setupApp: function (e) {
        e._history = z(t);
      }
    },
    r = Object(p["a"])(e, n),
    a = r.start;
  return r.router = s, r.start = l, r;
  function s(e) {
    u()(A(e), "[app.router] router should be function, but got ".concat(Object(i["a"])(e))), r._router = e;
  }
  function l(e) {
    L(e) && (e = d.a.querySelector(e), u()(e, "[app.start] container ".concat(e, " not found"))), u()(!e || P(e), "[app.start] container should be HTMLElement"), u()(r._router, "[app.start] router must be registered before app.start()"), r._store || a.call(r);
    var t = r._store;
    if (r._getProvider = N.bind(null, t, r), !e) return N(t, this, this._router);
    R(e, t, r, r._router), r._plugin.apply("onHmr")(R.bind(null, e, t, r));
  }
}
function P(e) {
  return "object" === Object(i["a"])(e) && null !== e && e.nodeType && e.nodeName;
}
function L(e) {
  return "string" === typeof e;
}
function N(e, t, n) {
  var i = function (i) {
    return s.a.createElement(h["a"], {
      store: e
    }, n(Object(r["a"])({
      app: t,
      history: t._history
    }, i)));
  };
  return i;
}
function R(e, t, r, i) {
  var o = require("./modules/69386934.js");
  o.render(s.a.createElement(N(t, r, i)), e);
}
function z(e) {
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
legacyExports["a"] = E;
