let legacyModule = module,
  legacyExports = exports;
var r = require("./63446635.js")["default"];
function i() {
  "use strict";

  legacyModule.exports = i = function () {
    return t;
  }, legacyModule.exports.__esModule = !0, legacyModule.exports["default"] = legacyModule.exports;
  var t = {},
    n = Object.prototype,
    o = n.hasOwnProperty,
    a = Object.defineProperty || function (e, t, n) {
      e[t] = n.value;
    },
    s = "function" == typeof Symbol ? Symbol : {},
    l = s.iterator || "@@iterator",
    c = s.asyncIterator || "@@asyncIterator",
    u = s.toStringTag || "@@toStringTag";
  function h(e, t, n) {
    return Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), e[t];
  }
  try {
    h({}, "");
  } catch (e) {
    h = function (e, t, n) {
      return e[t] = n;
    };
  }
  function f(e, t, n, r) {
    var i = t && t.prototype instanceof m ? t : m,
      o = Object.create(i.prototype),
      s = new T(r || []);
    return a(o, "_invoke", {
      value: S(e, n, s)
    }), o;
  }
  function d(e, t, n) {
    try {
      return {
        type: "normal",
        arg: e.call(t, n)
      };
    } catch (e) {
      return {
        type: "throw",
        arg: e
      };
    }
  }
  t.wrap = f;
  var p = {};
  function m() {}
  function g() {}
  function v() {}
  var y = {};
  h(y, l, function () {
    return this;
  });
  var b = Object.getPrototypeOf,
    w = b && b(b(L([])));
  w && w !== n && o.call(w, l) && (y = w);
  var x = v.prototype = m.prototype = Object.create(y);
  function _(e) {
    ["next", "throw", "return"].forEach(function (t) {
      h(e, t, function (e) {
        return this._invoke(t, e);
      });
    });
  }
  function E(e, t) {
    function n(i, a, s, l) {
      var c = d(e[i], e, a);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == r(h) && o.call(h, "__await") ? t.resolve(h.__await).then(function (e) {
          n("next", e, s, l);
        }, function (e) {
          n("throw", e, s, l);
        }) : t.resolve(h).then(function (e) {
          u.value = e, s(u);
        }, function (e) {
          return n("throw", e, s, l);
        });
      }
      l(c.arg);
    }
    var i;
    a(this, "_invoke", {
      value: function (e, r) {
        function o() {
          return new t(function (t, i) {
            n(e, r, t, i);
          });
        }
        return i = i ? i.then(o, o) : o();
      }
    });
  }
  function S(e, t, n) {
    var r = "suspendedStart";
    return function (i, o) {
      if ("executing" === r) throw new Error("Generator is already running");
      if ("completed" === r) {
        if ("throw" === i) throw o;
        return A();
      }
      for (n.method = i, n.arg = o;;) {
        var a = n.delegate;
        if (a) {
          var s = k(a, n);
          if (s) {
            if (s === p) continue;
            return s;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if ("suspendedStart" === r) throw r = "completed", n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        r = "executing";
        var l = d(e, t, n);
        if ("normal" === l.type) {
          if (r = n.done ? "completed" : "suspendedYield", l.arg === p) continue;
          return {
            value: l.arg,
            done: n.done
          };
        }
        "throw" === l.type && (r = "completed", n.method = "throw", n.arg = l.arg);
      }
    };
  }
  function k(e, t) {
    var n = t.method,
      r = e.iterator[n];
    if (void 0 === r) return t.delegate = null, "throw" === n && e.iterator["return"] && (t.method = "return", t.arg = void 0, k(e, t), "throw" === t.method) || "return" !== n && (t.method = "throw", t.arg = new TypeError("The iterator does not provide a '" + n + "' method")), p;
    var i = d(r, e.iterator, t.arg);
    if ("throw" === i.type) return t.method = "throw", t.arg = i.arg, t.delegate = null, p;
    var o = i.arg;
    return o ? o.done ? (t[e.resultName] = o.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = void 0), t.delegate = null, p) : o : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, p);
  }
  function C(e) {
    var t = {
      tryLoc: e[0]
    };
    1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t);
  }
  function O(e) {
    var t = e.completion || {};
    t.type = "normal", delete t.arg, e.completion = t;
  }
  function T(e) {
    this.tryEntries = [{
      tryLoc: "root"
    }], e.forEach(C, this), this.reset(!0);
  }
  function L(e) {
    if (e) {
      var t = e[l];
      if (t) return t.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var n = -1,
          r = function t() {
            for (; ++n < e.length;) if (o.call(e, n)) return t.value = e[n], t.done = !1, t;
            return t.value = void 0, t.done = !0, t;
          };
        return r.next = r;
      }
    }
    return {
      next: A
    };
  }
  function A() {
    return {
      value: void 0,
      done: !0
    };
  }
  return g.prototype = v, a(x, "constructor", {
    value: v,
    configurable: !0
  }), a(v, "constructor", {
    value: g,
    configurable: !0
  }), g.displayName = h(v, u, "GeneratorFunction"), t.isGeneratorFunction = function (e) {
    var t = "function" == typeof e && e.constructor;
    return !!t && (t === g || "GeneratorFunction" === (t.displayName || t.name));
  }, t.mark = function (e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, v) : (e.__proto__ = v, h(e, u, "GeneratorFunction")), e.prototype = Object.create(x), e;
  }, t.awrap = function (e) {
    return {
      __await: e
    };
  }, _(E.prototype), h(E.prototype, c, function () {
    return this;
  }), t.AsyncIterator = E, t.async = function (e, n, r, i, o) {
    void 0 === o && (o = Promise);
    var a = new E(f(e, n, r, i), o);
    return t.isGeneratorFunction(n) ? a : a.next().then(function (e) {
      return e.done ? e.value : a.next();
    });
  }, _(x), h(x, u, "Generator"), h(x, l, function () {
    return this;
  }), h(x, "toString", function () {
    return "[object Generator]";
  }), t.keys = function (e) {
    var t = Object(e),
      n = [];
    for (var r in t) n.push(r);
    return n.reverse(), function e() {
      for (; n.length;) {
        var r = n.pop();
        if (r in t) return e.value = r, e.done = !1, e;
      }
      return e.done = !0, e;
    };
  }, t.values = L, T.prototype = {
    constructor: T,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(O), !e) for (var t in this) "t" === t.charAt(0) && o.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0);
    },
    stop: function () {
      this.done = !0;
      var e = this.tryEntries[0].completion;
      if ("throw" === e.type) throw e.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var t = this;
      function n(n, r) {
        return a.type = "throw", a.arg = e, t.next = n, r && (t.method = "next", t.arg = void 0), !!r;
      }
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var i = this.tryEntries[r],
          a = i.completion;
        if ("root" === i.tryLoc) return n("end");
        if (i.tryLoc <= this.prev) {
          var s = o.call(i, "catchLoc"),
            l = o.call(i, "finallyLoc");
          if (s && l) {
            if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return n(i.finallyLoc);
          } else if (s) {
            if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
          } else {
            if (!l) throw new Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return n(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (e, t) {
      for (var n = this.tryEntries.length - 1; n >= 0; --n) {
        var r = this.tryEntries[n];
        if (r.tryLoc <= this.prev && o.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
          var i = r;
          break;
        }
      }
      i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = e, a.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, p) : this.complete(a);
    },
    complete: function (e, t) {
      if ("throw" === e.type) throw e.arg;
      return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), p;
    },
    finish: function (e) {
      for (var t = this.tryEntries.length - 1; t >= 0; --t) {
        var n = this.tryEntries[t];
        if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), O(n), p;
      }
    },
    catch: function (e) {
      for (var t = this.tryEntries.length - 1; t >= 0; --t) {
        var n = this.tryEntries[t];
        if (n.tryLoc === e) {
          var r = n.completion;
          if ("throw" === r.type) {
            var i = r.arg;
            O(n);
          }
          return i;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (e, t, n) {
      return this.delegate = {
        iterator: L(e),
        resultName: t,
        nextLoc: n
      }, "next" === this.method && (this.arg = void 0), p;
    }
  }, t;
}
legacyModule.exports = i, legacyModule.exports.__esModule = !0, legacyModule.exports["default"] = legacyModule.exports;
