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
  o = interopDefault(r),
  i = require("./69386934.js"),
  a = interopDefault(i),
  s = require("./31377839.js"),
  c = interopDefault(s);
function u(e) {
  "@babel/helpers - typeof";

  return u = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, u(e);
}
function l(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function f(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function p(e, t, n) {
  return t && f(e.prototype, t), n && f(e, n), e;
}
function d(e, t) {
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
function m(e) {
  var t = g();
  return function () {
    var n,
      r = b(e);
    if (t) {
      var o = b(this).constructor;
      n = Reflect.construct(r, arguments, o);
    } else n = r.apply(this, arguments);
    return v(this, n);
  };
}
function v(e, t) {
  return !t || "object" !== u(t) && "function" !== typeof t ? y(e) : t;
}
function y(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function g() {
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
    return l(this, n), t.apply(this, arguments);
  }
  return p(n, [{
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
}(o.a.Component);
w.propTypes = {
  getContainer: c.a.func.isRequired,
  children: c.a.node.isRequired,
  didUpdate: c.a.func
};
