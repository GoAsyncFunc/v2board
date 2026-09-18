let legacyModule = module,
  legacyExports = exports;
function r(e) {
  return r = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, r(e);
}
function i(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function o(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function a(e, t, n) {
  return t && o(e.prototype, t), n && o(e, n), e;
}
function s(e, t) {
  return !t || "object" !== r(t) && "function" !== typeof t ? l(e) : t;
}
function l(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function c(e) {
  return c = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, c(e);
}
function u(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && h(e, t);
}
function h(e, t) {
  return h = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, h(e, t);
}
var f = this && this.__importStar || function (e) {
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
var p = f(require("./reactRuntime.js")),
  m = d(require("./64706c46.js")),
  g = d(require("./30723068.js")),
  v = d(require("./634f6b43.js")),
  y = require("./73614a2b.js"),
  b = d(require("./6264674b.js")),
  w = require("./585a3734.js"),
  x = "rc-observer-key",
  _ = function (e) {
    function t() {
      var e;
      return i(this, t), e = s(this, c(t).apply(this, arguments)), e.resizeObserver = null, e.childNode = null, e.currentElement = null, e.state = {
        width: 0,
        height: 0
      }, e.onResize = function (t) {
        var n = e.props.onResize,
          r = t[0].target,
          i = r.getBoundingClientRect(),
          o = i.width,
          a = i.height,
          s = Math.floor(o),
          l = Math.floor(a);
        if (e.state.width !== s || e.state.height !== l) {
          var c = {
            width: s,
            height: l
          };
          e.setState(c), n && n(c);
        }
      }, e.setChildNode = function (t) {
        e.childNode = t;
      }, e;
    }
    return u(t, e), a(t, [{
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
          t = g.default(e);
        if (t.length > 1) v.default(!1, "Find more than one child node with `children` in ResizeObserver. Will only observe first one.");else if (0 === t.length) return v.default(!1, "`children` of ResizeObserver is empty. Nothing is in observe."), null;
        var n = t[0];
        if (p.isValidElement(n) && w.supportRef(n)) {
          var r = n.ref;
          t[0] = p.cloneElement(n, {
            ref: y.composeRef(r, this.setChildNode)
          });
        }
        return 1 === t.length ? t[0] : t.map(function (e, t) {
          return !p.isValidElement(e) || "key" in e && null !== e.key ? e : p.cloneElement(e, {
            key: "".concat(x, "-").concat(t)
          });
        });
      }
    }]), t;
  }(p.Component);
_.displayName = "ResizeObserver", legacyExports.default = _;
