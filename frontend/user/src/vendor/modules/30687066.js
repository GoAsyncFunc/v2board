let legacyModule = module,
  legacyExports = exports;
function r(e) {
  "@babel/helpers - typeof";

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
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && c(e, t);
}
function c(e, t) {
  return c = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, c(e, t);
}
function u(e) {
  return function () {
    var t,
      n = d(e);
    if (p()) {
      var r = d(this).constructor;
      t = Reflect.construct(n, arguments, r);
    } else t = n.apply(this, arguments);
    return l(this, t);
  };
}
function l(e, t) {
  return !t || "object" !== r(t) && "function" !== typeof t ? f(e) : t;
}
function f(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function p() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function d(e) {
  return d = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, d(e);
}
var h = this && this.__importStar || function (e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t["default"] = e, t;
  },
  m = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
      default: e
    };
  };
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var v = h(require("./reactRuntime.js")),
  y = m(require("./47797478.js")),
  g = function (e) {
    s(n, e);
    var t = u(n);
    function n() {
      return o(this, n), t.apply(this, arguments);
    }
    return a(n, [{
      key: "shouldComponentUpdate",
      value: function (e) {
        return !y.default(e, this.props);
      }
    }, {
      key: "render",
      value: function () {
        var e = this.props,
          t = e.expandable,
          n = e.prefixCls,
          r = e.onExpand,
          o = e.needIndentSpaced,
          i = e.expanded,
          a = e.record;
        if (t) {
          var s = i ? "expanded" : "collapsed";
          return v.createElement("span", {
            className: "".concat(n, "-expand-icon ").concat(n, "-").concat(s),
            onClick: function (e) {
              return r(a, e);
            }
          });
        }
        return o ? v.createElement("span", {
          className: "".concat(n, "-expand-icon ").concat(n, "-spaced")
        }) : null;
      }
    }]), n;
  }(v.Component);
legacyExports.default = g;
