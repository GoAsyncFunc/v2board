let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return w;
});
var r = require("./71317449.js"),
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
    return u(this, n), t.apply(this, arguments);
  }
  return f(n, [{
    key: "componentDidMount",
    value: function () {
      this.createContainer();
    }
  }, {
    key: "componentDidUpdate",
    value: function (e) {
      var t = this.props.didUpdate;
      t && t(e);
    }
  }, {
    key: "componentWillUnmount",
    value: function () {
      this.removeContainer();
    }
  }, {
    key: "createContainer",
    value: function () {
      this._container = this.props.getContainer(), this.forceUpdate();
    }
  }, {
    key: "removeContainer",
    value: function () {
      this._container && this._container.parentNode.removeChild(this._container);
    }
  }, {
    key: "render",
    value: function () {
      return this._container ? a.a.createPortal(this.props.children, this._container) : null;
    }
  }]), n;
}(i.a.Component);
w.propTypes = {
  getContainer: l.a.func.isRequired,
  children: l.a.node.isRequired,
  didUpdate: l.a.func
};
