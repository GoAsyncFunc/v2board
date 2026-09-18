let legacyModule = module,
  legacyExports = exports;
(function (t) {
  function r(e, t) {
    if (e === t) return 0;
    for (var n = e.length, r = t.length, i = 0, o = Math.min(n, r); i < o; ++i) if (e[i] !== t[i]) {
      n = e[i], r = t[i];
      break;
    }
    return n < r ? -1 : r < n ? 1 : 0;
  }
  function i(e) {
    return t.Buffer && "function" === typeof t.Buffer.isBuffer ? t.Buffer.isBuffer(e) : !(null == e || !e._isBuffer);
  }
  var o = require("./37746c63.js"),
    a = Object.prototype.hasOwnProperty,
    s = Array.prototype.slice,
    l = function () {
      return "foo" === function () {}.name;
    }();
  function c(e) {
    return Object.prototype.toString.call(e);
  }
  function u(e) {
    return !i(e) && "function" === typeof t.ArrayBuffer && ("function" === typeof ArrayBuffer.isView ? ArrayBuffer.isView(e) : !!e && (e instanceof DataView || !!(e.buffer && e.buffer instanceof ArrayBuffer)));
  }
  var h = legacyModule.exports = y,
    f = /\s*function\s+([^\(\s]*)\s*/;
  function d(e) {
    if (o.isFunction(e)) {
      if (l) return e.name;
      var t = e.toString(),
        n = t.match(f);
      return n && n[1];
    }
  }
  function p(e, t) {
    return "string" === typeof e ? e.length < t ? e : e.slice(0, t) : e;
  }
  function m(e) {
    if (l || !o.isFunction(e)) return o.inspect(e);
    var t = d(e),
      n = t ? ": " + t : "";
    return "[Function" + n + "]";
  }
  function g(e) {
    return p(m(e.actual), 128) + " " + e.operator + " " + p(m(e.expected), 128);
  }
  function v(e, t, n, r, i) {
    throw new h.AssertionError({
      message: n,
      actual: e,
      expected: t,
      operator: r,
      stackStartFunction: i
    });
  }
  function y(e, t) {
    e || v(e, !0, t, "==", h.ok);
  }
  function b(e, t, n, a) {
    if (e === t) return !0;
    if (i(e) && i(t)) return 0 === r(e, t);
    if (o.isDate(e) && o.isDate(t)) return e.getTime() === t.getTime();
    if (o.isRegExp(e) && o.isRegExp(t)) return e.source === t.source && e.global === t.global && e.multiline === t.multiline && e.lastIndex === t.lastIndex && e.ignoreCase === t.ignoreCase;
    if (null !== e && "object" === typeof e || null !== t && "object" === typeof t) {
      if (u(e) && u(t) && c(e) === c(t) && !(e instanceof Float32Array || e instanceof Float64Array)) return 0 === r(new Uint8Array(e.buffer), new Uint8Array(t.buffer));
      if (i(e) !== i(t)) return !1;
      a = a || {
        actual: [],
        expected: []
      };
      var s = a.actual.indexOf(e);
      return -1 !== s && s === a.expected.indexOf(t) || (a.actual.push(e), a.expected.push(t), x(e, t, n, a));
    }
    return n ? e === t : e == t;
  }
  function w(e) {
    return "[object Arguments]" == Object.prototype.toString.call(e);
  }
  function x(e, t, n, r) {
    if (null === e || void 0 === e || null === t || void 0 === t) return !1;
    if (o.isPrimitive(e) || o.isPrimitive(t)) return e === t;
    if (n && Object.getPrototypeOf(e) !== Object.getPrototypeOf(t)) return !1;
    var i = w(e),
      a = w(t);
    if (i && !a || !i && a) return !1;
    if (i) return e = s.call(e), t = s.call(t), b(e, t, n);
    var l,
      c,
      u = C(e),
      h = C(t);
    if (u.length !== h.length) return !1;
    for (u.sort(), h.sort(), c = u.length - 1; c >= 0; c--) if (u[c] !== h[c]) return !1;
    for (c = u.length - 1; c >= 0; c--) if (l = u[c], !b(e[l], t[l], n, r)) return !1;
    return !0;
  }
  function _(e, t, n) {
    b(e, t, !0) && v(e, t, n, "notDeepStrictEqual", _);
  }
  function E(e, t) {
    if (!e || !t) return !1;
    if ("[object RegExp]" == Object.prototype.toString.call(t)) return t.test(e);
    try {
      if (e instanceof t) return !0;
    } catch (e) {}
    return !Error.isPrototypeOf(t) && !0 === t.call({}, e);
  }
  function S(e) {
    var t;
    try {
      e();
    } catch (e) {
      t = e;
    }
    return t;
  }
  function k(e, t, n, r) {
    var i;
    if ("function" !== typeof t) throw new TypeError('"block" argument must be a function');
    "string" === typeof n && (r = n, n = null), i = S(t), r = (n && n.name ? " (" + n.name + ")." : ".") + (r ? " " + r : "."), e && !i && v(i, n, "Missing expected exception" + r);
    var a = "string" === typeof r,
      s = !e && o.isError(i),
      l = !e && i && !n;
    if ((s && a && E(i, n) || l) && v(i, n, "Got unwanted exception" + r), e && i && n && !E(i, n) || !e && i) throw i;
  }
  h.AssertionError = function (e) {
    this.name = "AssertionError", this.actual = e.actual, this.expected = e.expected, this.operator = e.operator, e.message ? (this.message = e.message, this.generatedMessage = !1) : (this.message = g(this), this.generatedMessage = !0);
    var t = e.stackStartFunction || v;
    if (Error.captureStackTrace) Error.captureStackTrace(this, t);else {
      var n = new Error();
      if (n.stack) {
        var r = n.stack,
          i = d(t),
          o = r.indexOf("\n" + i);
        if (o >= 0) {
          var a = r.indexOf("\n", o + 1);
          r = r.substring(a + 1);
        }
        this.stack = r;
      }
    }
  }, o.inherits(h.AssertionError, Error), h.fail = v, h.ok = y, h.equal = function (e, t, n) {
    e != t && v(e, t, n, "==", h.equal);
  }, h.notEqual = function (e, t, n) {
    e == t && v(e, t, n, "!=", h.notEqual);
  }, h.deepEqual = function (e, t, n) {
    b(e, t, !1) || v(e, t, n, "deepEqual", h.deepEqual);
  }, h.deepStrictEqual = function (e, t, n) {
    b(e, t, !0) || v(e, t, n, "deepStrictEqual", h.deepStrictEqual);
  }, h.notDeepEqual = function (e, t, n) {
    b(e, t, !1) && v(e, t, n, "notDeepEqual", h.notDeepEqual);
  }, h.notDeepStrictEqual = _, h.strictEqual = function (e, t, n) {
    e !== t && v(e, t, n, "===", h.strictEqual);
  }, h.notStrictEqual = function (e, t, n) {
    e === t && v(e, t, n, "!==", h.notStrictEqual);
  }, h.throws = function (e, t, n) {
    k(!0, e, t, n);
  }, h.doesNotThrow = function (e, t, n) {
    k(!1, e, t, n);
  }, h.ifError = function (e) {
    if (e) throw e;
  };
  var C = Object.keys || function (e) {
    var t = [];
    for (var n in e) a.call(e, n) && t.push(n);
    return t;
  };
}).call(this, require("./globalObjectLegacy.js"));
