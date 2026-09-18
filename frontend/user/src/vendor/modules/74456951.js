let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault
} = require("../../app/moduleInterop.js");
(function (e) {
  var r = require("./reactRuntime.js"),
    o = interopDefault(r),
    i = require("./64493731.js"),
    a = require("./propTypesRuntime.js"),
    s = interopDefault(a),
    c = 1073741823,
    u = "undefined" !== typeof globalThis ? globalThis : "undefined" !== typeof window ? window : "undefined" !== typeof e ? e : {};
  function l() {
    var e = "__global_unique_id__";
    return u[e] = (u[e] || 0) + 1;
  }
  function f(e, t) {
    return e === t ? 0 !== e || 1 / e === 1 / t : e !== e && t !== t;
  }
  function p(e) {
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
  function h(e, t) {
    var n,
      o,
      a = "__create-react-context-" + l() + "__",
      u = function (e) {
        function n() {
          var t;
          return t = e.apply(this, arguments) || this, t.emitter = p(t.props.value), t;
        }
        Object(i["a"])(n, e);
        var r = n.prototype;
        return r.getChildContext = function () {
          var e;
          return e = {}, e[a] = this.emitter, e;
        }, r.componentWillReceiveProps = function (e) {
          if (this.props.value !== e.value) {
            var n,
              r = this.props.value,
              o = e.value;
            f(r, o) ? n = 0 : (n = "function" === typeof t ? t(r, o) : c, n |= 0, 0 !== n && this.emitter.set(e.value, n));
          }
        }, r.render = function () {
          return this.props.children;
        }, n;
      }(r["Component"]);
    u.childContextTypes = (n = {}, n[a] = s.a.object.isRequired, n);
    var h = function (t) {
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
      Object(i["a"])(n, t);
      var r = n.prototype;
      return r.componentWillReceiveProps = function (e) {
        var t = e.observedBits;
        this.observedBits = void 0 === t || null === t ? c : t;
      }, r.componentDidMount = function () {
        this.context[a] && this.context[a].on(this.onUpdate);
        var e = this.props.observedBits;
        this.observedBits = void 0 === e || null === e ? c : e;
      }, r.componentWillUnmount = function () {
        this.context[a] && this.context[a].off(this.onUpdate);
      }, r.getValue = function () {
        return this.context[a] ? this.context[a].get() : e;
      }, r.render = function () {
        return d(this.props.children)(this.state.value);
      }, n;
    }(r["Component"]);
    return h.contextTypes = (o = {}, o[a] = s.a.object, o), {
      Provider: u,
      Consumer: h
    };
  }
  var m = o.a.createContext || h;
  legacyExports["a"] = m;
}).call(this, require("./794c706a.js"));
