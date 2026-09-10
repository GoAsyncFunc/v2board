let legacyModule = module,
  legacyExports = exports;
var r = function (e) {
  "use strict";

  var t,
    n = Object.prototype,
    r = n.hasOwnProperty,
    o = "function" === typeof Symbol ? Symbol : {},
    i = o.iterator || "@@iterator",
    a = o.asyncIterator || "@@asyncIterator",
    s = o.toStringTag || "@@toStringTag";
  function c(e, t, n, r) {
    var o = t && t.prototype instanceof m ? t : m,
      i = Object.create(o.prototype),
      a = new j(r || []);
    return i._invoke = _(e, n, a), i;
  }
  function u(e, t, n) {
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
  e.wrap = c;
  var l = "suspendedStart",
    f = "suspendedYield",
    p = "executing",
    d = "completed",
    h = {};
  function m() {}
  function v() {}
  function y() {}
  var g = {};
  g[i] = function () {
    return this;
  };
  var b = Object.getPrototypeOf,
    w = b && b(b(P([])));
  w && w !== n && r.call(w, i) && (g = w);
  var x = y.prototype = m.prototype = Object.create(g);
  function O(e) {
    ["next", "throw", "return"].forEach(function (t) {
      e[t] = function (e) {
        return this._invoke(t, e);
      };
    });
  }
  function E(e) {
    function t(n, o, i, a) {
      var s = u(e[n], e, o);
      if ("throw" !== s.type) {
        var c = s.arg,
          l = c.value;
        return l && "object" === typeof l && r.call(l, "__await") ? Promise.resolve(l.__await).then(function (e) {
          t("next", e, i, a);
        }, function (e) {
          t("throw", e, i, a);
        }) : Promise.resolve(l).then(function (e) {
          c.value = e, i(c);
        }, function (e) {
          return t("throw", e, i, a);
        });
      }
      a(s.arg);
    }
    var n;
    function o(e, r) {
      function o() {
        return new Promise(function (n, o) {
          t(e, r, n, o);
        });
      }
      return n = n ? n.then(o, o) : o();
    }
    this._invoke = o;
  }
  function _(e, t, n) {
    var r = l;
    return function (o, i) {
      if (r === p) throw new Error("Generator is already running");
      if (r === d) {
        if ("throw" === o) throw i;
        return T();
      }
      n.method = o, n.arg = i;
      while (1) {
        var a = n.delegate;
        if (a) {
          var s = k(a, n);
          if (s) {
            if (s === h) continue;
            return s;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (r === l) throw r = d, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        r = p;
        var c = u(e, t, n);
        if ("normal" === c.type) {
          if (r = n.done ? d : f, c.arg === h) continue;
          return {
            value: c.arg,
            done: n.done
          };
        }
        "throw" === c.type && (r = d, n.method = "throw", n.arg = c.arg);
      }
    };
  }
  function k(e, n) {
    var r = e.iterator[n.method];
    if (r === t) {
      if (n.delegate = null, "throw" === n.method) {
        if (e.iterator["return"] && (n.method = "return", n.arg = t, k(e, n), "throw" === n.method)) return h;
        n.method = "throw", n.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return h;
    }
    var o = u(r, e.iterator, n.arg);
    if ("throw" === o.type) return n.method = "throw", n.arg = o.arg, n.delegate = null, h;
    var i = o.arg;
    return i ? i.done ? (n[e.resultName] = i.value, n.next = e.nextLoc, "return" !== n.method && (n.method = "next", n.arg = t), n.delegate = null, h) : i : (n.method = "throw", n.arg = new TypeError("iterator result is not an object"), n.delegate = null, h);
  }
  function S(e) {
    var t = {
      tryLoc: e[0]
    };
    1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t);
  }
  function C(e) {
    var t = e.completion || {};
    t.type = "normal", delete t.arg, e.completion = t;
  }
  function j(e) {
    this.tryEntries = [{
      tryLoc: "root"
    }], e.forEach(S, this), this.reset(!0);
  }
  function P(e) {
    if (e) {
      var n = e[i];
      if (n) return n.call(e);
      if ("function" === typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          a = function n() {
            while (++o < e.length) if (r.call(e, o)) return n.value = e[o], n.done = !1, n;
            return n.value = t, n.done = !0, n;
          };
        return a.next = a;
      }
    }
    return {
      next: T
    };
  }
  function T() {
    return {
      value: t,
      done: !0
    };
  }
  return v.prototype = x.constructor = y, y.constructor = v, y[s] = v.displayName = "GeneratorFunction", e.isGeneratorFunction = function (e) {
    var t = "function" === typeof e && e.constructor;
    return !!t && (t === v || "GeneratorFunction" === (t.displayName || t.name));
  }, e.mark = function (e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, y) : (e.__proto__ = y, s in e || (e[s] = "GeneratorFunction")), e.prototype = Object.create(x), e;
  }, e.awrap = function (e) {
    return {
      __await: e
    };
  }, O(E.prototype), E.prototype[a] = function () {
    return this;
  }, e.AsyncIterator = E, e.async = function (t, n, r, o) {
    var i = new E(c(t, n, r, o));
    return e.isGeneratorFunction(n) ? i : i.next().then(function (e) {
      return e.done ? e.value : i.next();
    });
  }, O(x), x[s] = "Generator", x[i] = function () {
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
  }, e.values = P, j.prototype = {
    constructor: j,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(C), !e) for (var n in this) "t" === n.charAt(0) && r.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = t);
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
      function o(r, o) {
        return s.type = "throw", s.arg = e, n.next = r, o && (n.method = "next", n.arg = t), !!o;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var a = this.tryEntries[i],
          s = a.completion;
        if ("root" === a.tryLoc) return o("end");
        if (a.tryLoc <= this.prev) {
          var c = r.call(a, "catchLoc"),
            u = r.call(a, "finallyLoc");
          if (c && u) {
            if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
            if (this.prev < a.finallyLoc) return o(a.finallyLoc);
          } else if (c) {
            if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
          } else {
            if (!u) throw new Error("try statement without catch or finally");
            if (this.prev < a.finallyLoc) return o(a.finallyLoc);
          }
        }
      }
    },
    abrupt: function (e, t) {
      for (var n = this.tryEntries.length - 1; n >= 0; --n) {
        var o = this.tryEntries[n];
        if (o.tryLoc <= this.prev && r.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = e, a.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, h) : this.complete(a);
    },
    complete: function (e, t) {
      if ("throw" === e.type) throw e.arg;
      return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), h;
    },
    finish: function (e) {
      for (var t = this.tryEntries.length - 1; t >= 0; --t) {
        var n = this.tryEntries[t];
        if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), C(n), h;
      }
    },
    catch: function (e) {
      for (var t = this.tryEntries.length - 1; t >= 0; --t) {
        var n = this.tryEntries[t];
        if (n.tryLoc === e) {
          var r = n.completion;
          if ("throw" === r.type) {
            var o = r.arg;
            C(n);
          }
          return o;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (e, n, r) {
      return this.delegate = {
        iterator: P(e),
        resultName: n,
        nextLoc: r
      }, "next" === this.method && (this.arg = t), h;
    }
  }, e;
}(legacyModule.exports);
try {
  regeneratorRuntime = r;
} catch (e) {
  Function("r", "regeneratorRuntime = r")(r);
}
