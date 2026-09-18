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
  o = require("./reactRuntime.js"),
  i = (a(o), require("./storeShape.js"));
function a(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function s(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function c(e, t) {
  if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !t || "object" !== typeof t && "function" !== typeof t ? e : t;
}
function u(e, t) {
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
var l = function (e) {
  function t() {
    return s(this, t), c(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
  }
  return u(t, e), r(t, [{
    key: "getChildContext",
    value: function () {
      return {
        miniStore: this.props.store
      };
    }
  }, {
    key: "render",
    value: function () {
      return o.Children.only(this.props.children);
    }
  }]), t;
}(o.Component);
l.propTypes = {
  store: i.storeShape.isRequired
}, l.childContextTypes = {
  miniStore: i.storeShape.isRequired
}, legacyExports.default = l;
