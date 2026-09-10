let legacyModule = module,
  legacyExports = exports;
(function (t) {
  function r(e, t) {
    if (e === t) return 0;
    for (var n = e.length, r = t.length, o = 0, i = Math.min(n, r); o < i; ++o) if (e[o] !== t[o]) {
      n = e[o], r = t[o];
      break;
    }
    return n < r ? -1 : r < n ? 1 : 0;
  }
  function o(e) {
    return t.Buffer && "function" === typeof t.Buffer.isBuffer ? t.Buffer.isBuffer(e) : !(null == e || !e._isBuffer);
  }
  var i = require("./37746c63.js"),
    a = Object.prototype.hasOwnProperty,
    s = Array.prototype.slice,
    c = function () {
      return "foo" === function () {}.name;
    }();
  function u(e) {
    return Object.prototype.toString.call(e);
  }
  function l(e) {
    return !o(e) && "function" === typeof t.ArrayBuffer && ("function" === typeof ArrayBuffer.isView ? ArrayBuffer.isView(e) : !!e && (e instanceof DataView || !!(e.buffer && e.buffer instanceof ArrayBuffer)));
  }
  var f = legacyModule.exports = g,
    p = /\s*function\s+([^\(\s]*)\s*/;
  function d(e) {
    if (i.isFunction(e)) {
      if (c) return e.name;
      var t = e.toString(),
        n = t.match(p);
      return n && n[1];
    }
  }
  function h(e, t) {
    return "string" === typeof e ? e.length < t ? e : e.slice(0, t) : e;
  }
  function m(e) {
    if (c || !i.isFunction(e)) return i.inspect(e);
    var t = d(e),
      n = t ? ": " + t : "";
    return "[Function" + n + "]";
  }
  function v(e) {
    return h(m(e.actual), 128) + " " + e.operator + " " + h(m(e.expected), 128);
  }
  function y(e, t, n, r, o) {
    throw new f.AssertionError({
      message: n,
      actual: e,
      expected: t,
      operator: r,
      stackStartFunction: o
    });
  }
  function g(e, t) {
    e || y(e, !0, t, "==", f.ok);
  }
  function b(e, t, n, a) {
    if (e === t) return !0;
    if (o(e) && o(t)) return 0 === r(e, t);
    if (i.isDate(e) && i.isDate(t)) return e.getTime() === t.getTime();
    if (i.isRegExp(e) && i.isRegExp(t)) return e.source === t.source && e.global === t.global && e.multiline === t.multiline && e.lastIndex === t.lastIndex && e.ignoreCase === t.ignoreCase;
    if (null !== e && "object" === typeof e || null !== t && "object" === typeof t) {
      if (l(e) && l(t) && u(e) === u(t) && !(e instanceof Float32Array || e instanceof Float64Array)) return 0 === r(new Uint8Array(e.buffer), new Uint8Array(t.buffer));
      if (o(e) !== o(t)) return !1;
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
    if (i.isPrimitive(e) || i.isPrimitive(t)) return e === t;
    if (n && Object.getPrototypeOf(e) !== Object.getPrototypeOf(t)) return !1;
    var o = w(e),
      a = w(t);
    if (o && !a || !o && a) return !1;
    if (o) return e = s.call(e), t = s.call(t), b(e, t, n);
    var c,
      u,
      l = S(e),
      f = S(t);
    if (l.length !== f.length) return !1;
    for (l.sort(), f.sort(), u = l.length - 1; u >= 0; u--) if (l[u] !== f[u]) return !1;
    for (u = l.length - 1; u >= 0; u--) if (c = l[u], !b(e[c], t[c], n, r)) return !1;
    return !0;
  }
  function O(e, t, n) {
    b(e, t, !0) && y(e, t, n, "notDeepStrictEqual", O);
  }
  function E(e, t) {
    if (!e || !t) return !1;
    if ("[object RegExp]" == Object.prototype.toString.call(t)) return t.test(e);
    try {
      if (e instanceof t) return !0;
    } catch (e) {}
    return !Error.isPrototypeOf(t) && !0 === t.call({}, e);
  }
  function _(e) {
    var t;
    try {
      e();
    } catch (e) {
      t = e;
    }
    return t;
  }
  function k(e, t, n, r) {
    var o;
    if ("function" !== typeof t) throw new TypeError('"block" argument must be a function');
    "string" === typeof n && (r = n, n = null), o = _(t), r = (n && n.name ? " (" + n.name + ")." : ".") + (r ? " " + r : "."), e && !o && y(o, n, "Missing expected exception" + r);
    var a = "string" === typeof r,
      s = !e && i.isError(o),
      c = !e && o && !n;
    if ((s && a && E(o, n) || c) && y(o, n, "Got unwanted exception" + r), e && o && n && !E(o, n) || !e && o) throw o;
  }
  f.AssertionError = function (e) {
    this.name = "AssertionError", this.actual = e.actual, this.expected = e.expected, this.operator = e.operator, e.message ? (this.message = e.message, this.generatedMessage = !1) : (this.message = v(this), this.generatedMessage = !0);
    var t = e.stackStartFunction || y;
    if (Error.captureStackTrace) Error.captureStackTrace(this, t);else {
      var n = new Error();
      if (n.stack) {
        var r = n.stack,
          o = d(t),
          i = r.indexOf("\n" + o);
        if (i >= 0) {
          var a = r.indexOf("\n", i + 1);
          r = r.substring(a + 1);
        }
        this.stack = r;
      }
    }
  }, i.inherits(f.AssertionError, Error), f.fail = y, f.ok = g, f.equal = function (e, t, n) {
    e != t && y(e, t, n, "==", f.equal);
  }, f.notEqual = function (e, t, n) {
    e == t && y(e, t, n, "!=", f.notEqual);
  }, f.deepEqual = function (e, t, n) {
    b(e, t, !1) || y(e, t, n, "deepEqual", f.deepEqual);
  }, f.deepStrictEqual = function (e, t, n) {
    b(e, t, !0) || y(e, t, n, "deepStrictEqual", f.deepStrictEqual);
  }, f.notDeepEqual = function (e, t, n) {
    b(e, t, !1) && y(e, t, n, "notDeepEqual", f.notDeepEqual);
  }, f.notDeepStrictEqual = O, f.strictEqual = function (e, t, n) {
    e !== t && y(e, t, n, "===", f.strictEqual);
  }, f.notStrictEqual = function (e, t, n) {
    e === t && y(e, t, n, "!==", f.notStrictEqual);
  }, f.throws = function (e, t, n) {
    k(!0, e, t, n);
  }, f.doesNotThrow = function (e, t, n) {
    k(!1, e, t, n);
  }, f.ifError = function (e) {
    if (e) throw e;
  };
  var S = Object.keys || function (e) {
    var t = [];
    for (var n in e) a.call(e, n) && t.push(n);
    return t;
  };
}).call(this, require("./794c706a.js"));
