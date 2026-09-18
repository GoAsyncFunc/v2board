let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var r = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  },
  o = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }
    return function (t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  }();
legacyExports.default = w;
var i = require("./reactRuntime.js"),
  a = d(i),
  s = require("./47797478.js"),
  c = d(s),
  u = require("./2b4c7254.js"),
  l = d(u),
  f = require("./reactLifecyclesCompat.js"),
  p = require("./56497257.js");
function d(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function h(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function m(e, t) {
  if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !t || "object" !== typeof t && "function" !== typeof t ? e : t;
}
function v(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}
function y(e) {
  return e.displayName || e.name || "Component";
}
function g(e) {
  return !e.prototype.render;
}
var b = function () {
  return {};
};
function w(e) {
  var t = !!e,
    n = e || b;
  return function (s) {
    var u = function (i) {
      function u(e, t) {
        h(this, u);
        var r = m(this, (u.__proto__ || Object.getPrototypeOf(u)).call(this, e, t));
        return r.handleChange = function () {
          if (r.unsubscribe) {
            var e = n(r.store.getState(), r.props);
            r.setState({
              subscribed: e
            });
          }
        }, r.store = t.miniStore, r.state = {
          subscribed: n(r.store.getState(), e),
          store: r.store,
          props: e
        }, r;
      }
      return v(u, i), o(u, null, [{
        key: "getDerivedStateFromProps",
        value: function (t, r) {
          return e && 2 === e.length && t !== r.props ? {
            subscribed: n(r.store.getState(), t),
            props: t
          } : {
            props: t
          };
        }
      }]), o(u, [{
        key: "componentDidMount",
        value: function () {
          this.trySubscribe();
        }
      }, {
        key: "componentWillUnmount",
        value: function () {
          this.tryUnsubscribe();
        }
      }, {
        key: "shouldComponentUpdate",
        value: function (e, t) {
          return !(0, c.default)(this.props, e) || !(0, c.default)(this.state.subscribed, t.subscribed);
        }
      }, {
        key: "trySubscribe",
        value: function () {
          t && (this.unsubscribe = this.store.subscribe(this.handleChange), this.handleChange());
        }
      }, {
        key: "tryUnsubscribe",
        value: function () {
          this.unsubscribe && (this.unsubscribe(), this.unsubscribe = null);
        }
      }, {
        key: "getWrappedInstance",
        value: function () {
          return this.wrappedInstance;
        }
      }, {
        key: "render",
        value: function () {
          var e = this,
            t = r({}, this.props, this.state.subscribed, {
              store: this.store
            });
          return g(s) || (t = r({}, t, {
            ref: function (t) {
              return e.wrappedInstance = t;
            }
          })), a.default.createElement(s, t);
        }
      }]), u;
    }(i.Component);
    return u.displayName = "Connect(" + y(s) + ")", u.contextTypes = {
      miniStore: p.storeShape.isRequired
    }, (0, f.polyfill)(u), (0, l.default)(u, s);
  };
}
