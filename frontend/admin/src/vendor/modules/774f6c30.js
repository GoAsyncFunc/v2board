let legacyModule = module,
  legacyExports = exports;
var r = function (e) {
  "use strict";

  var t,
    n = Object.prototype,
    r = n.hasOwnProperty,
    i = "function" === typeof Symbol ? Symbol : {},
    o = i.iterator || "@@iterator",
    a = i.asyncIterator || "@@asyncIterator",
    s = i.toStringTag || "@@toStringTag";
  function l(e, t, n, r) {
    var i = t && t.prototype instanceof m ? t : m,
      o = Object.create(i.prototype),
      a = new T(r || []);
    return o._invoke = S(e, n, a), o;
  }
  function c(e, t, n) {
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
  e.wrap = l;
  var u = "suspendedStart",
    h = "suspendedYield",
    f = "executing",
    d = "completed",
    p = {};
  function m() {}
  function g() {}
  function v() {}
  var y = {};
  y[o] = function () {
    return this;
  };
  var b = Object.getPrototypeOf,
    w = b && b(b(L([])));
  w && w !== n && r.call(w, o) && (y = w);
  var x = v.prototype = m.prototype = Object.create(y);
  function _(e) {
    ["next", "throw", "return"].forEach(function (t) {
      e[t] = function (e) {
        return this._invoke(t, e);
      };
    });
  }
  function E(e) {
    function t(n, i, o, a) {
      var s = c(e[n], e, i);
      if ("throw" !== s.type) {
        var l = s.arg,
          u = l.value;
        return u && "object" === typeof u && r.call(u, "__await") ? Promise.resolve(u.__await).then(function (e) {
          t("next", e, o, a);
        }, function (e) {
          t("throw", e, o, a);
        }) : Promise.resolve(u).then(function (e) {
          l.value = e, o(l);
        }, function (e) {
          return t("throw", e, o, a);
        });
      }
      a(s.arg);
    }
    var n;
    function i(e, r) {
      function i() {
        return new Promise(function (n, i) {
          t(e, r, n, i);
        });
      }
      return n = n ? n.then(i, i) : i();
    }
    this._invoke = i;
  }
  function S(e, t, n) {
    var r = u;
    return function (i, o) {
      if (r === f) throw new Error("Generator is already running");
      if (r === d) {
        if ("throw" === i) throw o;
        return A();
      }
      n.method = i, n.arg = o;
      while (1) {
        var a = n.delegate;
        if (a) {
          var s = k(a, n);
          if (s) {
            if (s === p) continue;
            return s;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (r === u) throw r = d, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        r = f;
        var l = c(e, t, n);
        if ("normal" === l.type) {
          if (r = n.done ? d : h, l.arg === p) continue;
          return {
            value: l.arg,
            done: n.done
          };
        }
        "throw" === l.type && (r = d, n.method = "throw", n.arg = l.arg);
      }
    };
  }
  function k(e, n) {
    var r = e.iterator[n.method];
    if (r === t) {
      if (n.delegate = null, "throw" === n.method) {
        if (e.iterator["return"] && (n.method = "return", n.arg = t, k(e, n), "throw" === n.method)) return p;
        n.method = "throw", n.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return p;
    }
    var i = c(r, e.iterator, n.arg);
    if ("throw" === i.type) return n.method = "throw", n.arg = i.arg, n.delegate = null, p;
    var o = i.arg;
    return o ? o.done ? (n[e.resultName] = o.value, n.next = e.nextLoc, "return" !== n.method && (n.method = "next", n.arg = t), n.delegate = null, p) : o : (n.method = "throw", n.arg = new TypeError("iterator result is not an object"), n.delegate = null, p);
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
      var n = e[o];
      if (n) return n.call(e);
      if ("function" === typeof e.next) return e;
      if (!isNaN(e.length)) {
        var i = -1,
          a = function n() {
            while (++i < e.length) if (r.call(e, i)) return n.value = e[i], n.done = !1, n;
            return n.value = t, n.done = !0, n;
          };
        return a.next = a;
      }
    }
    return {
      next: A
    };
  }
  function A() {
    return {
      value: t,
      done: !0
    };
  }
  return g.prototype = x.constructor = v, v.constructor = g, v[s] = g.displayName = "GeneratorFunction", e.isGeneratorFunction = function (e) {
    var t = "function" === typeof e && e.constructor;
    return !!t && (t === g || "GeneratorFunction" === (t.displayName || t.name));
  }, e.mark = function (e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, v) : (e.__proto__ = v, s in e || (e[s] = "GeneratorFunction")), e.prototype = Object.create(x), e;
  }, e.awrap = function (e) {
    return {
      __await: e
    };
  }, _(E.prototype), E.prototype[a] = function () {
    return this;
  }, e.AsyncIterator = E, e.async = function (t, n, r, i) {
    var o = new E(l(t, n, r, i));
    return e.isGeneratorFunction(n) ? o : o.next().then(function (e) {
      return e.done ? e.value : o.next();
    });
  }, _(x), x[s] = "Generator", x[o] = function () {
    return this;
  }, x.toString = function () {
    return "[object Generator]";
  }, e.keys = function (e) {
    var t = [];
    for (var n in e) t.push(n);
    return t.reverse(), function n() {
      while (t.length) {
        var r = t.pop();
        if (r in e) return n.value = r, n.done = !1, n;
      }
      return n.done = !0, n;
    };
  }, e.values = L, T.prototype = {
    constructor: T,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(O), !e) for (var n in this) "t" === n.charAt(0) && r.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = t);
    },
    stop: function () {
      this.done = !0;
      var e = this.tryEntries[0],
        t = e.completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var n = this;
      function i(r, i) {
        return s.type = "throw", s.arg = e, n.next = r, i && (n.method = "next", n.arg = t), !!i;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var a = this.tryEntries[o],
          s = a.completion;
        if ("root" === a.tryLoc) return i("end");
        if (a.tryLoc <= this.prev) {
          var l = r.call(a, "catchLoc"),
            c = r.call(a, "finallyLoc");
          if (l && c) {
            if (this.prev < a.catchLoc) return i(a.catchLoc, !0);
            if (this.prev < a.finallyLoc) return i(a.finallyLoc);
          } else if (l) {
            if (this.prev < a.catchLoc) return i(a.catchLoc, !0);
          } else {
            if (!c) throw new Error("try statement without catch or finally");
            if (this.prev < a.finallyLoc) return i(a.finallyLoc);
          }
        }
      }
    },
    abrupt: function (e, t) {
      for (var n = this.tryEntries.length - 1; n >= 0; --n) {
        var i = this.tryEntries[n];
        if (i.tryLoc <= this.prev && r.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
          var o = i;
          break;
        }
      }
      o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);
      var a = o ? o.completion : {};
      return a.type = e, a.arg = t, o ? (this.method = "next", this.next = o.finallyLoc, p) : this.complete(a);
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
    delegateYield: function (e, n, r) {
      return this.delegate = {
        iterator: L(e),
        resultName: n,
        nextLoc: r
      }, "next" === this.method && (this.arg = t), p;
    }
  }, e;
}(legacyModule.exports);
try {
  regeneratorRuntime = r;
} catch (e) {
  Function("r", "regeneratorRuntime = r")(r);
}
