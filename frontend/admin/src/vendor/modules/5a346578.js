let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var r = function () {
    function e(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }
    return function (t, n, r) {
      return n && e(t.prototype, n), r && e(t, r), t;
    };
  }(),
  i = require("./reactRuntime.js"),
  o = (a(i), require("./56497257.js"));
function a(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function s(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function l(e, t) {
  if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !t || "object" !== typeof t && "function" !== typeof t ? e : t;
}
function c(e, t) {
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
var u = function (e) {
  function t() {
    return s(this, t), l(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
  }
  return c(t, e), r(t, [{
    key: "getChildContext",
    value: function () {
      return {
        miniStore: this.props.store
      };
    }
  }, {
    key: "render",
    value: function () {
      return i.Children.only(this.props.children);
    }
  }]), t;
}(i.Component);
u.propTypes = {
  store: o.storeShape.isRequired
}, u.childContextTypes = {
  miniStore: o.storeShape.isRequired
}, legacyExports.default = u;
