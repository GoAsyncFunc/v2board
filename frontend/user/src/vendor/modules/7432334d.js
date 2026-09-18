let legacyModule = module,
  legacyExports = exports;
function r(e) {
  return r = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, r(e);
}
function o(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function i(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function a(e, t, n) {
  return t && i(e.prototype, t), n && i(e, n), e;
}
function s(e, t) {
  return !t || "object" !== r(t) && "function" !== typeof t ? c(e) : t;
}
function c(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function u(e) {
  return u = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, u(e);
}
function l(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && f(e, t);
}
function f(e, t) {
  return f = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, f(e, t);
}
var p = this && this.__importStar || function (e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t["default"] = e, t;
  },
  d = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
      default: e
    };
  };
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var h = p(require("./reactRuntime.js")),
  m = d(require("./findDOMNodeCompat.js")),
  v = d(require("./reactChildrenToArray.js")),
  y = d(require("./warningRuntime.js")),
  g = require("./73614a2b.js"),
  b = d(require("./6264674b.js")),
  w = require("./supportRef.js"),
  x = "rc-observer-key",
  O = function (e) {
    function t() {
      var e;
      return o(this, t), e = s(this, u(t).apply(this, arguments)), e.resizeObserver = null, e.childNode = null, e.currentElement = null, e.state = {
        width: 0,
        height: 0
      }, e.onResize = function (t) {
        var n = e.props.onResize,
          r = t[0].target,
          o = r.getBoundingClientRect(),
          i = o.width,
          a = o.height,
          s = Math.floor(i),
          c = Math.floor(a);
        if (e.state.width !== s || e.state.height !== c) {
          var u = {
            width: s,
            height: c
          };
          e.setState(u), n && n(u);
        }
      }, e.setChildNode = function (t) {
        e.childNode = t;
      }, e;
    }
    return l(t, e), a(t, [{
      key: "componentDidMount",
      value: function () {
        this.onComponentUpdated();
      }
    }, {
      key: "componentDidUpdate",
      value: function () {
        this.onComponentUpdated();
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        this.destroyObserver();
      }
    }, {
      key: "onComponentUpdated",
      value: function () {
        var e = this.props.disabled;
        if (e) this.destroyObserver();else {
          var t = m.default(this.childNode || this),
            n = t !== this.currentElement;
          n && (this.destroyObserver(), this.currentElement = t), !this.resizeObserver && t && (this.resizeObserver = new b.default(this.onResize), this.resizeObserver.observe(t));
        }
      }
    }, {
      key: "destroyObserver",
      value: function () {
        this.resizeObserver && (this.resizeObserver.disconnect(), this.resizeObserver = null);
      }
    }, {
      key: "render",
      value: function () {
        var e = this.props.children,
          t = v.default(e);
        if (t.length > 1) y.default(!1, "Find more than one child node with `children` in ResizeObserver. Will only observe first one.");else if (0 === t.length) return y.default(!1, "`children` of ResizeObserver is empty. Nothing is in observe."), null;
        var n = t[0];
        if (h.isValidElement(n) && w.supportRef(n)) {
          var r = n.ref;
          t[0] = h.cloneElement(n, {
            ref: g.composeRef(r, this.setChildNode)
          });
        }
        return 1 === t.length ? t[0] : t.map(function (e, t) {
          return !h.isValidElement(e) || "key" in e && null !== e.key ? e : h.cloneElement(e, {
            key: "".concat(x, "-").concat(t)
          });
        });
      }
    }]), t;
  }(h.Component);
O.displayName = "ResizeObserver", legacyExports.default = O;
