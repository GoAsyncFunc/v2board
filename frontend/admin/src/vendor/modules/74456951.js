let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
(function (e) {
  var r = require("./reactRuntime.js"),
    i = interopDefault(r),
    o = require("./64493731.js"),
    a = require("./propTypesRuntime.js"),
    s = interopDefault(a),
    l = 1073741823,
    c = "undefined" !== typeof globalThis ? globalThis : "undefined" !== typeof window ? window : "undefined" !== typeof e ? e : {};
  function u() {
    var e = "__global_unique_id__";
    return c[e] = (c[e] || 0) + 1;
  }
  function h(e, t) {
    return e === t ? 0 !== e || 1 / e === 1 / t : e !== e && t !== t;
  }
  function f(e) {
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
      set: function (n, r) {
        e = n, t.forEach(function (t) {
          return t(e, r);
        });
      }
    };
  }
  function d(e) {
    return Array.isArray(e) ? e[0] : e;
  }
  function p(e, t) {
    var n,
      i,
      a = "__create-react-context-" + u() + "__",
      c = function (e) {
        function n() {
          var t;
          return t = e.apply(this, arguments) || this, t.emitter = f(t.props.value), t;
        }
        Object(o["a"])(n, e);
        var r = n.prototype;
        return r.getChildContext = function () {
          var e;
          return e = {}, e[a] = this.emitter, e;
        }, r.componentWillReceiveProps = function (e) {
          if (this.props.value !== e.value) {
            var n,
              r = this.props.value,
              i = e.value;
            h(r, i) ? n = 0 : (n = "function" === typeof t ? t(r, i) : l, n |= 0, 0 !== n && this.emitter.set(e.value, n));
          }
        }, r.render = function () {
          return this.props.children;
        }, n;
      }(r["Component"]);
    c.childContextTypes = (n = {}, n[a] = s.a.object.isRequired, n);
    var p = function (t) {
      function n() {
        var e;
        return e = t.apply(this, arguments) || this, e.state = {
          value: e.getValue()
        }, e.onUpdate = function (t, n) {
          var r = 0 | e.observedBits;
          0 !== (r & n) && e.setState({
            value: e.getValue()
          });
        }, e;
      }
      Object(o["a"])(n, t);
      var r = n.prototype;
      return r.componentWillReceiveProps = function (e) {
        var t = e.observedBits;
        this.observedBits = void 0 === t || null === t ? l : t;
      }, r.componentDidMount = function () {
        this.context[a] && this.context[a].on(this.onUpdate);
        var e = this.props.observedBits;
        this.observedBits = void 0 === e || null === e ? l : e;
      }, r.componentWillUnmount = function () {
        this.context[a] && this.context[a].off(this.onUpdate);
      }, r.getValue = function () {
        return this.context[a] ? this.context[a].get() : e;
      }, r.render = function () {
        return d(this.props.children)(this.state.value);
      }, n;
    }(r["Component"]);
    return p.contextTypes = (i = {}, i[a] = s.a.object, i), {
      Provider: c,
      Consumer: p
    };
  }
  var m = i.a.createContext || p;
  legacyExports["a"] = m;
}).call(this, require("./globalObjectLegacy.js"));
