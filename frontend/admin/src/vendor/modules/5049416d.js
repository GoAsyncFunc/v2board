let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return w;
});
var r = require("./reactRuntime.js"),
  i = interopDefault(r),
  o = require("./69386934.js"),
  a = interopDefault(o),
  s = require("./31377839.js"),
  l = interopDefault(s);
function c(e) {
  "@babel/helpers - typeof";

  return c = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, c(e);
}
function u(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function h(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function f(e, t, n) {
  return t && h(e.prototype, t), n && h(e, n), e;
}
function d(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && p(e, t);
}
function p(e, t) {
  return p = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, p(e, t);
}
function m(e) {
  var t = y();
  return function () {
    var n,
      r = b(e);
    if (t) {
      var i = b(this).constructor;
      n = Reflect.construct(r, arguments, i);
    } else n = r.apply(this, arguments);
    return g(this, n);
  };
}
function g(e, t) {
  return !t || "object" !== c(t) && "function" !== typeof t ? v(e) : t;
}
function v(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function y() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function b(e) {
  return b = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, b(e);
}
var w = function (e) {
  d(n, e);
  var t = m(n);
  function n() {
    var e;
    u(this, n);
    for (var r = arguments.length, i = new Array(r), o = 0; o < r; o++) i[o] = arguments[o];
    return e = t.call.apply(t, [this].concat(i)), e.removeContainer = function () {
      e.container && (a.a.unmountComponentAtNode(e.container), e.container.parentNode.removeChild(e.container), e.container = null);
    }, e.renderComponent = function (t, n) {
      var r = e.props,
        i = r.visible,
        o = r.getComponent,
        s = r.forceRender,
        l = r.getContainer,
        c = r.parent;
      (i || c._component || s) && (e.container || (e.container = l()), a.a.unstable_renderSubtreeIntoContainer(c, o(t), e.container, function () {
        n && n.call(this);
      }));
    }, e;
  }
  return f(n, [{
    key: "componentDidMount",
    value: function () {
      this.props.autoMount && this.renderComponent();
    }
  }, {
    key: "componentDidUpdate",
    value: function () {
      this.props.autoMount && this.renderComponent();
    }
  }, {
    key: "componentWillUnmount",
    value: function () {
      this.props.autoDestroy && this.removeContainer();
    }
  }, {
    key: "render",
    value: function () {
      return this.props.children({
        renderComponent: this.renderComponent,
        removeContainer: this.removeContainer
      });
    }
  }]), n;
}(i.a.Component);
w.propTypes = {
  autoMount: l.a.bool,
  autoDestroy: l.a.bool,
  visible: l.a.bool,
  forceRender: l.a.bool,
  parent: l.a.any,
  getComponent: l.a.func.isRequired,
  getContainer: l.a.func.isRequired,
  children: l.a.func.isRequired
}, w.defaultProps = {
  autoMount: !0,
  autoDestroy: !0,
  forceRender: !1
};
