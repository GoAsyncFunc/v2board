let legacyModule = module,
  legacyExports = exports;
var r = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
  return typeof e;
} : function (e) {
  return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};
function o(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function i(e, t) {
  if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !t || "object" !== typeof t && "function" !== typeof t ? e : t;
}
function a(e, t) {
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
var s = require("./reactRuntime.js"),
  c = require("./31377839.js"),
  u = [],
  l = [];
function f(e) {
  return "object" === r({}) && e().every(function (e) {
    return "undefined" !== typeof e && "undefined" !== typeof {}[e];
  });
}
function p(e) {
  var t = e(),
    n = {
      loading: !0,
      loaded: null,
      error: null
    };
  return n.promise = t.then(function (e) {
    return n.loading = !1, n.loaded = e, e;
  }).catch(function (e) {
    throw n.loading = !1, n.error = e, e;
  }), n;
}
function d(e) {
  var t = {
      loading: !1,
      loaded: {},
      error: null
    },
    n = [];
  try {
    Object.keys(e).forEach(function (r) {
      var o = p(e[r]);
      o.loading ? t.loading = !0 : (t.loaded[r] = o.loaded, t.error = o.error), n.push(o.promise), o.promise.then(function (e) {
        t.loaded[r] = e;
      }).catch(function (e) {
        t.error = e;
      });
    });
  } catch (e) {
    t.error = e;
  }
  return t.promise = Promise.all(n).then(function (e) {
    return t.loading = !1, e;
  }).catch(function (e) {
    throw t.loading = !1, e;
  }), t;
}
function h(e) {
  return e && e.__esModule ? e.default : e;
}
function m(e, t) {
  return s.createElement(h(e), t);
}
function v(e, t) {
  var n, r;
  if (!t.loading) throw new Error("react-loadable requires a `loading` component");
  var p = Object.assign({
      loader: null,
      loading: null,
      delay: 200,
      timeout: null,
      render: m,
      webpack: null,
      modules: null
    }, t),
    d = null;
  function h() {
    return d || (d = e(p.loader)), d.promise;
  }
  return u.push(h), "function" === typeof p.webpack && l.push(function () {
    if (f(p.webpack)) return h();
  }), r = n = function (t) {
    function n(r) {
      o(this, n);
      var a = i(this, t.call(this, r));
      return a.retry = function () {
        a.setState({
          error: null,
          loading: !0,
          timedOut: !1
        }), d = e(p.loader), a._loadModule();
      }, h(), a.state = {
        error: d.error,
        pastDelay: !1,
        timedOut: !1,
        loading: d.loading,
        loaded: d.loaded
      }, a;
    }
    return a(n, t), n.preload = function () {
      return h();
    }, n.prototype.componentWillMount = function () {
      this._mounted = !0, this._loadModule();
    }, n.prototype._loadModule = function () {
      var e = this;
      if (this.context.loadable && Array.isArray(p.modules) && p.modules.forEach(function (t) {
        e.context.loadable.report(t);
      }), d.loading) {
        "number" === typeof p.delay && (0 === p.delay ? this.setState({
          pastDelay: !0
        }) : this._delay = setTimeout(function () {
          e.setState({
            pastDelay: !0
          });
        }, p.delay)), "number" === typeof p.timeout && (this._timeout = setTimeout(function () {
          e.setState({
            timedOut: !0
          });
        }, p.timeout));
        var t = function () {
          e._mounted && (e.setState({
            error: d.error,
            loaded: d.loaded,
            loading: d.loading
          }), e._clearTimeouts());
        };
        d.promise.then(function () {
          t();
        }).catch(function (e) {
          t();
        });
      }
    }, n.prototype.componentWillUnmount = function () {
      this._mounted = !1, this._clearTimeouts();
    }, n.prototype._clearTimeouts = function () {
      clearTimeout(this._delay), clearTimeout(this._timeout);
    }, n.prototype.render = function () {
      return this.state.loading || this.state.error ? s.createElement(p.loading, {
        isLoading: this.state.loading,
        pastDelay: this.state.pastDelay,
        timedOut: this.state.timedOut,
        error: this.state.error,
        retry: this.retry
      }) : this.state.loaded ? p.render(this.state.loaded, this.props) : null;
    }, n;
  }(s.Component), n.contextTypes = {
    loadable: c.shape({
      report: c.func.isRequired
    })
  }, r;
}
function y(e) {
  return v(p, e);
}
function g(e) {
  if ("function" !== typeof e.render) throw new Error("LoadableMap requires a `render(loaded, props)` function");
  return v(d, e);
}
y.Map = g;
var b = function (e) {
  function t() {
    return o(this, t), i(this, e.apply(this, arguments));
  }
  return a(t, e), t.prototype.getChildContext = function () {
    return {
      loadable: {
        report: this.props.report
      }
    };
  }, t.prototype.render = function () {
    return s.Children.only(this.props.children);
  }, t;
}(s.Component);
function w(e) {
  var t = [];
  while (e.length) {
    var n = e.pop();
    t.push(n());
  }
  return Promise.all(t).then(function () {
    if (e.length) return w(e);
  });
}
b.propTypes = {
  report: c.func.isRequired
}, b.childContextTypes = {
  loadable: c.shape({
    report: c.func.isRequired
  }).isRequired
}, y.Capture = b, y.preloadAll = function () {
  return new Promise(function (e, t) {
    w(u).then(e, t);
  });
}, y.preloadReady = function () {
  return new Promise(function (e, t) {
    w(l).then(e, e);
  });
}, legacyModule.exports = y;
