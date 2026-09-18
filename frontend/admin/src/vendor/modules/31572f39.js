let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./reactRuntime.js"),
  i = interopDefault(r),
  o = require("./reactDomRuntime.js"),
  a = interopDefault(o),
  s = require("./propTypesRuntime.js"),
  l = interopDefault(s),
  c = require("./reactLifecyclesCompat.js"),
  u = require("./5049416d.js"),
  h = require("./51432b4d.js"),
  f = require("./71783446.js");
function d(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    n = t.element,
    r = void 0 === n ? document.body : n,
    i = {},
    o = Object.keys(e);
  return o.forEach(function (e) {
    i[e] = r.style[e];
  }), o.forEach(function (t) {
    r.style[t] = e[t];
  }), i;
}
var p = d;
function m() {
  return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth;
}
var g = {},
  v = function (e) {
    if (m() || e) {
      var t = "ant-scrolling-effect",
        n = new RegExp("".concat(t), "g"),
        r = document.body.className;
      if (e) {
        if (!n.test(r)) return;
        return p(g), g = {}, void (document.body.className = r.replace(n, "").trim());
      }
      var i = Object(f["a"])();
      if (i && (g = p({
        position: "relative",
        width: "calc(100% - ".concat(i, "px)")
      }), !n.test(r))) {
        var o = "".concat(r, " ").concat(t);
        document.body.className = o.trim();
      }
    }
  };
function y(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function b(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? y(Object(n), !0).forEach(function (t) {
      w(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : y(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function w(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function x(e) {
  "@babel/helpers - typeof";

  return x = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, x(e);
}
function _(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function E(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function S(e, t, n) {
  return t && E(e.prototype, t), n && E(e, n), e;
}
function k(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && C(e, t);
}
function C(e, t) {
  return C = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, C(e, t);
}
function O(e) {
  var t = A();
  return function () {
    var n,
      r = P(e);
    if (t) {
      var i = P(this).constructor;
      n = Reflect.construct(r, arguments, i);
    } else n = r.apply(this, arguments);
    return T(this, n);
  };
}
function T(e, t) {
  return !t || "object" !== x(t) && "function" !== typeof t ? L(e) : t;
}
function L(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function A() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function P(e) {
  return P = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, P(e);
}
var j = 0,
  M = !("undefined" !== typeof window && window.document && window.document.createElement),
  R = "createPortal" in a.a,
  N = {},
  D = function (e) {
    k(n, e);
    var t = O(n);
    function n(e) {
      var r;
      _(this, n), r = t.call(this, e), r.getParent = function () {
        var e = r.props.getContainer;
        if (e) {
          if ("string" === typeof e) return document.querySelectorAll(e)[0];
          if ("function" === typeof e) return e();
          if ("object" === x(e) && e instanceof window.HTMLElement) return e;
        }
        return document.body;
      }, r.getContainer = function () {
        if (M) return null;
        if (!r.container) {
          r.container = document.createElement("div");
          var e = r.getParent();
          e && e.appendChild(r.container);
        }
        return r.setWrapperClassName(), r.container;
      }, r.setWrapperClassName = function () {
        var e = r.props.wrapperClassName;
        r.container && e && e !== r.container.className && (r.container.className = e);
      }, r.savePortal = function (e) {
        r._component = e;
      }, r.removeCurrentContainer = function (e) {
        r.container = null, r._component = null, R || (e ? r.renderComponent({
          afterClose: r.removeContainer,
          onClose: function () {},
          visible: !1
        }) : r.removeContainer());
      }, r.switchScrollingEffect = function () {
        1 !== j || Object.keys(N).length ? j || (p(N), N = {}, v(!0)) : (v(), N = p({
          overflow: "hidden",
          overflowX: "hidden",
          overflowY: "hidden"
        }));
      };
      var i = e.visible;
      return j = i ? j + 1 : j, r.state = {
        _self: L(r)
      }, r;
    }
    return S(n, [{
      key: "componentDidUpdate",
      value: function () {
        this.setWrapperClassName();
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        var e = this.props.visible;
        j = e && j ? j - 1 : j, this.removeCurrentContainer(e);
      }
    }, {
      key: "render",
      value: function () {
        var e = this,
          t = this.props,
          n = t.children,
          r = t.forceRender,
          o = t.visible,
          a = null,
          s = {
            getOpenCount: function () {
              return j;
            },
            getContainer: this.getContainer,
            switchScrollingEffect: this.switchScrollingEffect
          };
        return R ? ((r || o || this._component) && (a = i.a.createElement(h["a"], {
          getContainer: this.getContainer,
          ref: this.savePortal
        }, n(s))), a) : i.a.createElement(u["a"], {
          parent: this,
          visible: o,
          autoDestroy: !1,
          getComponent: function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return n(b(b(b({}, t), s), {}, {
              ref: e.savePortal
            }));
          },
          getContainer: this.getContainer,
          forceRender: r
        }, function (t) {
          var n = t.renderComponent,
            r = t.removeContainer;
          return e.renderComponent = n, e.removeContainer = r, null;
        });
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function (e, t) {
        var n = t.prevProps,
          r = t._self,
          i = e.visible,
          o = e.getContainer;
        if (n) {
          var a = n.visible,
            s = n.getContainer;
          i !== a && (j = i && !a ? j + 1 : j - 1);
          var l = "function" === typeof o && "function" === typeof s;
          (l ? o.toString() !== s.toString() : o !== s) && r.removeCurrentContainer(!1);
        }
        return {
          prevProps: e
        };
      }
    }]), n;
  }(i.a.Component);
D.propTypes = {
  wrapperClassName: l.a.string,
  forceRender: l.a.bool,
  getContainer: l.a.any,
  children: l.a.func,
  visible: l.a.bool
};
legacyExports["a"] = Object(c["polyfill"])(D);
