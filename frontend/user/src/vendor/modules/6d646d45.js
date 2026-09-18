let legacyModule = module,
  legacyExports = exports;
legacyExports.__esModule = !0;
var n = require("./reactRuntime.js"),
  r = (u(n), require("./propTypesRuntime.js")),
  o = u(r),
  l = require("./665a7476.js"),
  a = u(l),
  i = require("./3257367a.js");
u(i);
function u(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function s(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function h(e, t) {
  if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !t || "object" !== typeof t && "function" !== typeof t ? e : t;
}
function f(e, t) {
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
var v = 1073741823;
function p(e, t) {
  return e === t ? 0 !== e || 1 / e === 1 / t : e !== e && t !== t;
}
function m(e) {
  var t = [];
  return {
    on: function (e) {
      t.push(e);
    },
    off: function (e) {
      t = t.filter(function (t) {
        return t !== e;
      });
    },
    get: function () {
      return e;
    },
    set: function (c, n) {
      e = c, t.forEach(function (t) {
        return t(e, n);
      });
    }
  };
}
function d(e) {
  return Array.isArray(e) ? e[0] : e;
}
function z(e, t) {
  var c,
    r,
    l = "__create-react-context-" + (0, a.default)() + "__",
    i = function (e) {
      function c() {
        var t, n, r;
        s(this, c);
        for (var o = arguments.length, l = Array(o), a = 0; a < o; a++) l[a] = arguments[a];
        return n = h(this, e.call.apply(e, [this].concat(l))), t = n, n.emitter = m(n.props.value), r = t, h(n, r);
      }
      return f(c, e), c.prototype.getChildContext = function () {
        var e;
        return e = {}, e[l] = this.emitter, e;
      }, c.prototype.componentWillReceiveProps = function (e) {
        if (this.props.value !== e.value) {
          var c = this.props.value,
            n = e.value,
            r = void 0;
          p(c, n) ? r = 0 : (r = "function" === typeof t ? t(c, n) : v, r |= 0, 0 !== r && this.emitter.set(e.value, r));
        }
      }, c.prototype.render = function () {
        return this.props.children;
      }, c;
    }(n.Component);
  i.childContextTypes = (c = {}, c[l] = o.default.object.isRequired, c);
  var u = function (t) {
    function c() {
      var e, n, r;
      s(this, c);
      for (var o = arguments.length, l = Array(o), a = 0; a < o; a++) l[a] = arguments[a];
      return n = h(this, t.call.apply(t, [this].concat(l))), e = n, n.state = {
        value: n.getValue()
      }, n.onUpdate = function (e, t) {
        var c = 0 | n.observedBits;
        0 !== (c & t) && n.setState({
          value: n.getValue()
        });
      }, r = e, h(n, r);
    }
    return f(c, t), c.prototype.componentWillReceiveProps = function (e) {
      var t = e.observedBits;
      this.observedBits = void 0 === t || null === t ? v : t;
    }, c.prototype.componentDidMount = function () {
      this.context[l] && this.context[l].on(this.onUpdate);
      var e = this.props.observedBits;
      this.observedBits = void 0 === e || null === e ? v : e;
    }, c.prototype.componentWillUnmount = function () {
      this.context[l] && this.context[l].off(this.onUpdate);
    }, c.prototype.getValue = function () {
      return this.context[l] ? this.context[l].get() : e;
    }, c.prototype.render = function () {
      return d(this.props.children)(this.state.value);
    }, c;
  }(n.Component);
  return u.contextTypes = (r = {}, r[l] = o.default.object, r), {
    Provider: i,
    Consumer: u
  };
}
legacyExports.default = z, legacyModule.exports = legacyExports["default"];
