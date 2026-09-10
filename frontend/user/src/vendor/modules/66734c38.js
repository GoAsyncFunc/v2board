let legacyModule = module,
  legacyExports = exports;
var r = require("./63446635.js")["default"];
function o() {
  "use strict";

  legacyModule.exports = o = function () {
    return t;
  }, legacyModule.exports.__esModule = !0, legacyModule.exports["default"] = legacyModule.exports;
  var t = {},
    n = Object.prototype,
    i = n.hasOwnProperty,
    a = "function" == typeof Symbol ? Symbol : {},
    s = a.iterator || "@@iterator",
    c = a.asyncIterator || "@@asyncIterator",
    u = a.toStringTag || "@@toStringTag";
  function l(e, t, n) {
    return Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), e[t];
  }
  try {
    l({}, "");
  } catch (e) {
    l = function (e, t, n) {
      return e[t] = n;
    };
  }
  function f(e, t, n, r) {
    var o = t && t.prototype instanceof h ? t : h,
      i = Object.create(o.prototype),
      a = new S(r || []);
    return i._invoke = function (e, t, n) {
      var r = "suspendedStart";
      return function (o, i) {
        if ("executing" === r) throw new Error("Generator is already running");
        if ("completed" === r) {
          if ("throw" === o) throw i;
          return j();
        }
        for (n.method = o, n.arg = i;;) {
          var a = n.delegate;
          if (a) {
            var s = E(a, n);
            if (s) {
              if (s === d) continue;
              return s;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if ("suspendedStart" === r) throw r = "completed", n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          r = "executing";
          var c = p(e, t, n);
          if ("normal" === c.type) {
            if (r = n.done ? "completed" : "suspendedYield", c.arg === d) continue;
            return {
              value: c.arg,
              done: n.done
            };
          }
          "throw" === c.type && (r = "completed", n.method = "throw", n.arg = c.arg);
        }
      };
    }(e, n, a), i;
  }
  function p(e, t, n) {
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
  var d = {};
  function h() {}
  function m() {}
  function v() {}
  var y = {};
  l(y, s, function () {
    return this;
  });
  var g = Object.getPrototypeOf,
    b = g && g(g(C([])));
  b && b !== n && i.call(b, s) && (y = b);
  var w = v.prototype = h.prototype = Object.create(y);
  function x(e) {
    ["next", "throw", "return"].forEach(function (t) {
      l(e, t, function (e) {
        return this._invoke(t, e);
      });
    });
  }
  function O(e, t) {
    function n(o, a, s, c) {
      var u = p(e[o], e, a);
      if ("throw" !== u.type) {
        var l = u.arg,
          f = l.value;
        return f && "object" == r(f) && i.call(f, "__await") ? t.resolve(f.__await).then(function (e) {
          n("next", e, s, c);
        }, function (e) {
          n("throw", e, s, c);
        }) : t.resolve(f).then(function (e) {
          l.value = e, s(l);
        }, function (e) {
          return n("throw", e, s, c);
        });
      }
      c(u.arg);
    }
    var o;
    this._invoke = function (e, r) {
      function i() {
        return new t(function (t, o) {
          n(e, r, t, o);
        });
      }
      return o = o ? o.then(i, i) : i();
    };
  }
  function E(e, t) {
    var n = e.iterator[t.method];
    if (void 0 === n) {
      if (t.delegate = null, "throw" === t.method) {
        if (e.iterator["return"] && (t.method = "return", t.arg = void 0, E(e, t), "throw" === t.method)) return d;
        t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return d;
    }
    var r = p(n, e.iterator, t.arg);
    if ("throw" === r.type) return t.method = "throw", t.arg = r.arg, t.delegate = null, d;
    var o = r.arg;
    return o ? o.done ? (t[e.resultName] = o.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = void 0), t.delegate = null, d) : o : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, d);
  }
  function _(e) {
    var t = {
      tryLoc: e[0]
    };
    1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t);
  }
  function k(e) {
    var t = e.completion || {};
    t.type = "normal", delete t.arg, e.completion = t;
  }
  function S(e) {
    this.tryEntries = [{
      tryLoc: "root"
    }], e.forEach(_, this), this.reset(!0);
  }
  function C(e) {
    if (e) {
      var t = e[s];
      if (t) return t.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var n = -1,
          r = function t() {
            for (; ++n < e.length;) if (i.call(e, n)) return t.value = e[n], t.done = !1, t;
            return t.value = void 0, t.done = !0, t;
          };
        return r.next = r;
      }
    }
    return {
      next: j
    };
  }
  function j() {
    return {
      value: void 0,
      done: !0
    };
  }
  return m.prototype = v, l(w, "constructor", v), l(v, "constructor", m), m.displayName = l(v, u, "GeneratorFunction"), t.isGeneratorFunction = function (e) {
    var t = "function" == typeof e && e.constructor;
    return !!t && (t === m || "GeneratorFunction" === (t.displayName || t.name));
  }, t.mark = function (e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, v) : (e.__proto__ = v, l(e, u, "GeneratorFunction")), e.prototype = Object.create(w), e;
  }, t.awrap = function (e) {
    return {
      __await: e
    };
  }, x(O.prototype), l(O.prototype, c, function () {
    return this;
  }), t.AsyncIterator = O, t.async = function (e, n, r, o, i) {
    void 0 === i && (i = Promise);
    var a = new O(f(e, n, r, o), i);
    return t.isGeneratorFunction(n) ? a : a.next().then(function (e) {
      return e.done ? e.value : a.next();
    });
  }, x(w), l(w, u, "Generator"), l(w, s, function () {
    return this;
  }), l(w, "toString", function () {
    return "[object Generator]";
  }), t.keys = function (e) {
    var t = [];
    for (var n in e) t.push(n);
    return t.reverse(), function n() {
      for (; t.length;) {
        var r = t.pop();
        if (r in e) return n.value = r, n.done = !1, n;
      }
      return n.done = !0, n;
    };
  }, t.values = C, S.prototype = {
    constructor: S,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(k), !e) for (var t in this) "t" === t.charAt(0) && i.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0);
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
        var o = this.tryEntries[r],
          a = o.completion;
        if ("root" === o.tryLoc) return n("end");
        if (o.tryLoc <= this.prev) {
          var s = i.call(o, "catchLoc"),
            c = i.call(o, "finallyLoc");
          if (s && c) {
            if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
            if (this.prev < o.finallyLoc) return n(o.finallyLoc);
          } else if (s) {
            if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
          } else {
            if (!c) throw new Error("try statement without catch or finally");
            if (this.prev < o.finallyLoc) return n(o.finallyLoc);
          }
        }
      }
    },
    abrupt: function (e, t) {
      for (var n = this.tryEntries.length - 1; n >= 0; --n) {
        var r = this.tryEntries[n];
        if (r.tryLoc <= this.prev && i.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
          var o = r;
          break;
        }
      }
      o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);
      var a = o ? o.completion : {};
      return a.type = e, a.arg = t, o ? (this.method = "next", this.next = o.finallyLoc, d) : this.complete(a);
    },
    complete: function (e, t) {
      if ("throw" === e.type) throw e.arg;
      return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), d;
    },
    finish: function (e) {
      for (var t = this.tryEntries.length - 1; t >= 0; --t) {
        var n = this.tryEntries[t];
        if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), k(n), d;
      }
    },
    catch: function (e) {
      for (var t = this.tryEntries.length - 1; t >= 0; --t) {
        var n = this.tryEntries[t];
        if (n.tryLoc === e) {
          var r = n.completion;
          if ("throw" === r.type) {
            var o = r.arg;
            k(n);
          }
          return o;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (e, t, n) {
      return this.delegate = {
        iterator: C(e),
        resultName: t,
        nextLoc: n
      }, "next" === this.method && (this.arg = void 0), d;
    }
  }, t;
}
legacyModule.exports = o, legacyModule.exports.__esModule = !0, legacyModule.exports["default"] = legacyModule.exports;
