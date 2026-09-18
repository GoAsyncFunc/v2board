let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports);
var r = require("./reactRuntime.js"),
  o = interopDefault(r),
  i = require("./65577779.js"),
  a = "https://js.stripe.com/v3",
  s = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,
  c = "loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",
  u = function () {
    for (var e = document.querySelectorAll('script[src^="'.concat(a, '"]')), t = 0; t < e.length; t++) {
      var n = e[t];
      if (s.test(n.src)) return n;
    }
    return null;
  },
  l = function (e) {
    var t = e && !e.advancedFraudSignals ? "?advancedFraudSignals=false" : "",
      n = document.createElement("script");
    n.src = "".concat(a).concat(t);
    var r = document.head || document.body;
    if (!r) throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");
    return r.appendChild(n), n;
  },
  f = function (e, t) {
    e && e._registerWrapper && e._registerWrapper({
      name: "stripe-js",
      version: "1.38.1",
      startTime: t
    });
  },
  p = null,
  d = function (e) {
    return null !== p ? p : (p = new Promise(function (t, n) {
      if ("undefined" !== typeof window) {
        if (window.Stripe && e && console.warn(c), window.Stripe) t(window.Stripe);else try {
          var r = u();
          r && e ? console.warn(c) : r || (r = l(e)), r.addEventListener("load", function () {
            window.Stripe ? t(window.Stripe) : n(new Error("Stripe.js not available"));
          }), r.addEventListener("error", function () {
            n(new Error("Failed to load Stripe.js"));
          });
        } catch (e) {
          return void n(e);
        }
      } else t(null);
    }), p);
  },
  h = function (e, t, n) {
    if (null === e) return null;
    var r = e.apply(void 0, t);
    return f(r, n), r;
  },
  m = Promise.resolve().then(function () {
    return d(null);
  }),
  v = !1;
m["catch"](function (e) {
  v || console.warn(e);
});
var y = function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    v = !0;
    var r = Date.now();
    return m.then(function (e) {
      return h(e, t, r);
    });
  },
  g = require("./316c2f56.js"),
  b = interopDefault(g),
  w = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };
function x(e) {
  var t = e.onChange;
  return o.a.createElement(i["CardElement"], {
    onChange: e => t(e),
    options: w
  });
}
var O = x;
function E() {
  E = function () {
    return e;
  };
  var e = {},
    t = Object.prototype,
    n = t.hasOwnProperty,
    r = "function" == typeof Symbol ? Symbol : {},
    o = r.iterator || "@@iterator",
    i = r.asyncIterator || "@@asyncIterator",
    a = r.toStringTag || "@@toStringTag";
  function s(e, t, n) {
    return Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), e[t];
  }
  try {
    s({}, "");
  } catch (e) {
    s = function (e, t, n) {
      return e[t] = n;
    };
  }
  function c(e, t, n, r) {
    var o = t && t.prototype instanceof f ? t : f,
      i = Object.create(o.prototype),
      a = new _(r || []);
    return i._invoke = function (e, t, n) {
      var r = "suspendedStart";
      return function (o, i) {
        if ("executing" === r) throw new Error("Generator is already running");
        if ("completed" === r) {
          if ("throw" === o) throw i;
          return S();
        }
        for (n.method = o, n.arg = i;;) {
          var a = n.delegate;
          if (a) {
            var s = w(a, n);
            if (s) {
              if (s === l) continue;
              return s;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if ("suspendedStart" === r) throw r = "completed", n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          r = "executing";
          var c = u(e, t, n);
          if ("normal" === c.type) {
            if (r = n.done ? "completed" : "suspendedYield", c.arg === l) continue;
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
  var l = {};
  function f() {}
  function p() {}
  function d() {}
  var h = {};
  s(h, o, function () {
    return this;
  });
  var m = Object.getPrototypeOf,
    v = m && m(m(k([])));
  v && v !== t && n.call(v, o) && (h = v);
  var y = d.prototype = f.prototype = Object.create(h);
  function g(e) {
    ["next", "throw", "return"].forEach(function (t) {
      s(e, t, function (e) {
        return this._invoke(t, e);
      });
    });
  }
  function b(e, t) {
    function r(o, i, a, s) {
      var c = u(e[o], e, i);
      if ("throw" !== c.type) {
        var l = c.arg,
          f = l.value;
        return f && "object" == typeof f && n.call(f, "__await") ? t.resolve(f.__await).then(function (e) {
          r("next", e, a, s);
        }, function (e) {
          r("throw", e, a, s);
        }) : t.resolve(f).then(function (e) {
          l.value = e, a(l);
        }, function (e) {
          return r("throw", e, a, s);
        });
      }
      s(c.arg);
    }
    var o;
    this._invoke = function (e, n) {
      function i() {
        return new t(function (t, o) {
          r(e, n, t, o);
        });
      }
      return o = o ? o.then(i, i) : i();
    };
  }
  function w(e, t) {
    var n = e.iterator[t.method];
    if (void 0 === n) {
      if (t.delegate = null, "throw" === t.method) {
        if (e.iterator.return && (t.method = "return", t.arg = void 0, w(e, t), "throw" === t.method)) return l;
        t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return l;
    }
    var r = u(n, e.iterator, t.arg);
    if ("throw" === r.type) return t.method = "throw", t.arg = r.arg, t.delegate = null, l;
    var o = r.arg;
    return o ? o.done ? (t[e.resultName] = o.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = void 0), t.delegate = null, l) : o : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, l);
  }
  function x(e) {
    var t = {
      tryLoc: e[0]
    };
    1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t);
  }
  function O(e) {
    var t = e.completion || {};
    t.type = "normal", delete t.arg, e.completion = t;
  }
  function _(e) {
    this.tryEntries = [{
      tryLoc: "root"
    }], e.forEach(x, this), this.reset(!0);
  }
  function k(e) {
    if (e) {
      var t = e[o];
      if (t) return t.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var r = -1,
          i = function t() {
            for (; ++r < e.length;) if (n.call(e, r)) return t.value = e[r], t.done = !1, t;
            return t.value = void 0, t.done = !0, t;
          };
        return i.next = i;
      }
    }
    return {
      next: S
    };
  }
  function S() {
    return {
      value: void 0,
      done: !0
    };
  }
  return p.prototype = d, s(y, "constructor", d), s(d, "constructor", p), p.displayName = s(d, a, "GeneratorFunction"), e.isGeneratorFunction = function (e) {
    var t = "function" == typeof e && e.constructor;
    return !!t && (t === p || "GeneratorFunction" === (t.displayName || t.name));
  }, e.mark = function (e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, d) : (e.__proto__ = d, s(e, a, "GeneratorFunction")), e.prototype = Object.create(y), e;
  }, e.awrap = function (e) {
    return {
      __await: e
    };
  }, g(b.prototype), s(b.prototype, i, function () {
    return this;
  }), e.AsyncIterator = b, e.async = function (t, n, r, o, i) {
    void 0 === i && (i = Promise);
    var a = new b(c(t, n, r, o), i);
    return e.isGeneratorFunction(n) ? a : a.next().then(function (e) {
      return e.done ? e.value : a.next();
    });
  }, g(y), s(y, a, "Generator"), s(y, o, function () {
    return this;
  }), s(y, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (e) {
    var t = [];
    for (var n in e) t.push(n);
    return t.reverse(), function n() {
      for (; t.length;) {
        var r = t.pop();
        if (r in e) return n.value = r, n.done = !1, n;
      }
      return n.done = !0, n;
    };
  }, e.values = k, _.prototype = {
    constructor: _,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(O), !e) for (var t in this) "t" === t.charAt(0) && n.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0);
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
      function r(n, r) {
        return a.type = "throw", a.arg = e, t.next = n, r && (t.method = "next", t.arg = void 0), !!r;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return r("end");
        if (i.tryLoc <= this.prev) {
          var s = n.call(i, "catchLoc"),
            c = n.call(i, "finallyLoc");
          if (s && c) {
            if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return r(i.finallyLoc);
          } else if (s) {
            if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
          } else {
            if (!c) throw new Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return r(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (e, t) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = e, a.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, l) : this.complete(a);
    },
    complete: function (e, t) {
      if ("throw" === e.type) throw e.arg;
      return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), l;
    },
    finish: function (e) {
      for (var t = this.tryEntries.length - 1; t >= 0; --t) {
        var n = this.tryEntries[t];
        if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), O(n), l;
      }
    },
    catch: function (e) {
      for (var t = this.tryEntries.length - 1; t >= 0; --t) {
        var n = this.tryEntries[t];
        if (n.tryLoc === e) {
          var r = n.completion;
          if ("throw" === r.type) {
            var o = r.arg;
            O(n);
          }
          return o;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (e, t, n) {
      return this.delegate = {
        iterator: k(e),
        resultName: t,
        nextLoc: n
      }, "next" === this.method && (this.arg = void 0), l;
    }
  }, e;
}
function _(e) {
  e.children;
  var t = e.callback,
    n = Object(i["useStripe"])(),
    r = Object(i["useElements"])(),
    a = function () {
      var e = b()(E().mark(function e(o) {
        var a, s;
        return E().wrap(function (e) {
          while (1) switch (e.prev = e.next) {
            case 0:
              if (n && r) {
                e.next = 2;
                break;
              }
              return e.abrupt("return");
            case 2:
              return a = r.getElement(i["CardElement"]), e.next = 5, n.createToken(a);
            case 5:
              s = e.sent, s.error ? "function" === typeof t && t(s.error.message) : "function" === typeof t && t(null, s.token);
            case 7:
            case "end":
              return e.stop();
          }
        }, e);
      }));
      return function (t) {
        return e.apply(this, arguments);
      };
    }();
  return o.a.createElement(o.a.Fragment, null, o.a.createElement(O, {
    onChange: a
  }));
}
defineExport(legacyExports, "default", function () {
  return k;
});
class k extends o.a.Component {
  render() {
    var e = y(this.props.pk);
    return o.a.createElement(i["Elements"], {
      stripe: e
    }, o.a.createElement(_, {
      callback: (e, t) => "function" === typeof this.props.callback && this.props.callback(e, t)
    }, this.props.children));
  }
}
