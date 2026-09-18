let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
var r = require("./reactRuntime.js"),
  o = interopDefault(r),
  i = require("./69386934.js"),
  a = interopDefault(i),
  s = require("./propTypesRuntime.js"),
  c = interopDefault(s),
  u = require("./reactLifecyclesCompat.js"),
  l = require("./5049416d.js"),
  f = require("./51432b4d.js"),
  p = require("./71783446.js");
function d(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    n = t.element,
    r = void 0 === n ? document.body : n,
    o = {},
    i = Object.keys(e);
  return i.forEach(function (e) {
    o[e] = r.style[e];
  }), i.forEach(function (t) {
    r.style[t] = e[t];
  }), o;
}
var h = d;
function m() {
  return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth;
}
var v = {},
  y = function (e) {
    if (m() || e) {
      var t = "ant-scrolling-effect",
        n = new RegExp("".concat(t), "g"),
        r = document.body.className;
      if (e) {
        if (!n.test(r)) return;
        return h(v), v = {}, void (document.body.className = r.replace(n, "").trim());
      }
      var o = Object(p["a"])();
      if (o && (v = h({
        position: "relative",
        width: "calc(100% - ".concat(o, "px)")
      }), !n.test(r))) {
        var i = "".concat(r, " ").concat(t);
        document.body.className = i.trim();
      }
    }
  };
function g(e, t) {
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
    t % 2 ? g(Object(n), !0).forEach(function (t) {
      w(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : g(Object(n)).forEach(function (t) {
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
function O(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function E(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function _(e, t, n) {
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
  }), t && S(e, t);
}
function S(e, t) {
  return S = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, S(e, t);
}
function C(e) {
  var t = T();
  return function () {
    var n,
      r = L(e);
    if (t) {
      var o = L(this).constructor;
      n = Reflect.construct(r, arguments, o);
    } else n = r.apply(this, arguments);
    return j(this, n);
  };
}
function j(e, t) {
  return !t || "object" !== x(t) && "function" !== typeof t ? P(e) : t;
}
function P(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function T() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function L(e) {
  return L = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, L(e);
}
var N = 0,
  M = !("undefined" !== typeof window && window.document && window.document.createElement),
  A = "createPortal" in a.a,
  D = {},
  I = function (e) {
    k(n, e);
    var t = C(n);
    function n(e) {
      var r;
      O(this, n), r = t.call(this, e), r.getParent = function () {
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
        r.container = null, r._component = null, A || (e ? r.renderComponent({
          afterClose: r.removeContainer,
          onClose: function () {},
          visible: !1
        }) : r.removeContainer());
      }, r.switchScrollingEffect = function () {
        1 !== N || Object.keys(D).length ? N || (h(D), D = {}, y(!0)) : (y(), D = h({
          overflow: "hidden",
          overflowX: "hidden",
          overflowY: "hidden"
        }));
      };
      var o = e.visible;
      return N = o ? N + 1 : N, r.state = {
        _self: P(r)
      }, r;
    }
    return _(n, [{
      key: "componentDidUpdate",
      value: function () {
        this.setWrapperClassName();
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        var e = this.props.visible;
        N = e && N ? N - 1 : N, this.removeCurrentContainer(e);
      }
    }, {
      key: "render",
      value: function () {
        var e = this,
          t = this.props,
          n = t.children,
          r = t.forceRender,
          i = t.visible,
          a = null,
          s = {
            getOpenCount: function () {
              return N;
            },
            getContainer: this.getContainer,
            switchScrollingEffect: this.switchScrollingEffect
          };
        return A ? ((r || i || this._component) && (a = o.a.createElement(f["a"], {
          getContainer: this.getContainer,
          ref: this.savePortal
        }, n(s))), a) : o.a.createElement(l["a"], {
          parent: this,
          visible: i,
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
          o = e.visible,
          i = e.getContainer;
        if (n) {
          var a = n.visible,
            s = n.getContainer;
          o !== a && (N = o && !a ? N + 1 : N - 1);
          var c = "function" === typeof i && "function" === typeof s;
          (c ? i.toString() !== s.toString() : i !== s) && r.removeCurrentContainer(!1);
        }
        return {
          prevProps: e
        };
      }
    }]), n;
  }(o.a.Component);
I.propTypes = {
  wrapperClassName: c.a.string,
  forceRender: c.a.bool,
  getContainer: c.a.any,
  children: c.a.func,
  visible: c.a.bool
};
legacyExports["a"] = Object(u["polyfill"])(I);
