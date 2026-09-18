let legacyModule = module,
  legacyExports = exports;
(function (e) {
  var r = Object.getOwnPropertyDescriptors || function (e) {
      for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) n[t[r]] = Object.getOwnPropertyDescriptor(e, t[r]);
      return n;
    },
    o = /%[sdj%]/g;
  legacyExports.format = function (e) {
    if (!O(e)) {
      for (var t = [], n = 0; n < arguments.length; n++) t.push(s(arguments[n]));
      return t.join(" ");
    }
    n = 1;
    for (var r = arguments, i = r.length, a = String(e).replace(o, function (e) {
        if ("%%" === e) return "%";
        if (n >= i) return e;
        switch (e) {
          case "%s":
            return String(r[n++]);
          case "%d":
            return Number(r[n++]);
          case "%j":
            try {
              return JSON.stringify(r[n++]);
            } catch (e) {
              return "[Circular]";
            }
          default:
            return e;
        }
      }), c = r[n]; n < i; c = r[++n]) b(c) || !S(c) ? a += " " + c : a += " " + s(c);
    return a;
  }, legacyExports.deprecate = function (n, r) {
    if ("undefined" !== typeof e && !0 === e.noDeprecation) return n;
    if ("undefined" === typeof e) return function () {
      return legacyExports.deprecate(n, r).apply(this, arguments);
    };
    var o = !1;
    function i() {
      if (!o) {
        if (e.throwDeprecation) throw new Error(r);
        e.traceDeprecation ? console.trace(r) : console.error(r), o = !0;
      }
      return n.apply(this, arguments);
    }
    return i;
  };
  var i,
    a = {};
  function s(e, n) {
    var r = {
      seen: [],
      stylize: u
    };
    return arguments.length >= 3 && (r.depth = arguments[2]), arguments.length >= 4 && (r.colors = arguments[3]), g(n) ? r.showHidden = n : n && legacyExports._extend(r, n), _(r.showHidden) && (r.showHidden = !1), _(r.depth) && (r.depth = 2), _(r.colors) && (r.colors = !1), _(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = c), f(r, e, r.depth);
  }
  function c(e, t) {
    var n = s.styles[t];
    return n ? "\x1b[" + s.colors[n][0] + "m" + e + "\x1b[" + s.colors[n][1] + "m" : e;
  }
  function u(e, t) {
    return e;
  }
  function l(e) {
    var t = {};
    return e.forEach(function (e, n) {
      t[e] = !0;
    }), t;
  }
  function f(e, n, r) {
    if (e.customInspect && n && P(n.inspect) && n.inspect !== legacyExports.inspect && (!n.constructor || n.constructor.prototype !== n)) {
      var o = n.inspect(r, e);
      return O(o) || (o = f(e, o, r)), o;
    }
    var i = p(e, n);
    if (i) return i;
    var a = Object.keys(n),
      s = l(a);
    if (e.showHidden && (a = Object.getOwnPropertyNames(n)), j(n) && (a.indexOf("message") >= 0 || a.indexOf("description") >= 0)) return d(n);
    if (0 === a.length) {
      if (P(n)) {
        var c = n.name ? ": " + n.name : "";
        return e.stylize("[Function" + c + "]", "special");
      }
      if (k(n)) return e.stylize(RegExp.prototype.toString.call(n), "regexp");
      if (C(n)) return e.stylize(Date.prototype.toString.call(n), "date");
      if (j(n)) return d(n);
    }
    var u,
      g = "",
      b = !1,
      w = ["{", "}"];
    if (y(n) && (b = !0, w = ["[", "]"]), P(n)) {
      var x = n.name ? ": " + n.name : "";
      g = " [Function" + x + "]";
    }
    return k(n) && (g = " " + RegExp.prototype.toString.call(n)), C(n) && (g = " " + Date.prototype.toUTCString.call(n)), j(n) && (g = " " + d(n)), 0 !== a.length || b && 0 != n.length ? r < 0 ? k(n) ? e.stylize(RegExp.prototype.toString.call(n), "regexp") : e.stylize("[Object]", "special") : (e.seen.push(n), u = b ? h(e, n, r, s, a) : a.map(function (t) {
      return m(e, n, r, s, t, b);
    }), e.seen.pop(), v(u, g, w)) : w[0] + g + w[1];
  }
  function p(e, t) {
    if (_(t)) return e.stylize("undefined", "undefined");
    if (O(t)) {
      var n = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return e.stylize(n, "string");
    }
    return x(t) ? e.stylize("" + t, "number") : g(t) ? e.stylize("" + t, "boolean") : b(t) ? e.stylize("null", "null") : void 0;
  }
  function d(e) {
    return "[" + Error.prototype.toString.call(e) + "]";
  }
  function h(e, t, n, r, o) {
    for (var i = [], a = 0, s = t.length; a < s; ++a) D(t, String(a)) ? i.push(m(e, t, n, r, String(a), !0)) : i.push("");
    return o.forEach(function (o) {
      o.match(/^\d+$/) || i.push(m(e, t, n, r, o, !0));
    }), i;
  }
  function m(e, t, n, r, o, i) {
    var a, s, c;
    if (c = Object.getOwnPropertyDescriptor(t, o) || {
      value: t[o]
    }, c.get ? s = c.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : c.set && (s = e.stylize("[Setter]", "special")), D(r, o) || (a = "[" + o + "]"), s || (e.seen.indexOf(c.value) < 0 ? (s = b(n) ? f(e, c.value, null) : f(e, c.value, n - 1), s.indexOf("\n") > -1 && (s = i ? s.split("\n").map(function (e) {
      return "  " + e;
    }).join("\n").substr(2) : "\n" + s.split("\n").map(function (e) {
      return "   " + e;
    }).join("\n"))) : s = e.stylize("[Circular]", "special")), _(a)) {
      if (i && o.match(/^\d+$/)) return s;
      a = JSON.stringify("" + o), a.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (a = a.substr(1, a.length - 2), a = e.stylize(a, "name")) : (a = a.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), a = e.stylize(a, "string"));
    }
    return a + ": " + s;
  }
  function v(e, t, n) {
    var r = e.reduce(function (e, t) {
      return 0, t.indexOf("\n") >= 0 && 0, e + t.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0);
    return r > 60 ? n[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + n[1] : n[0] + t + " " + e.join(", ") + " " + n[1];
  }
  function y(e) {
    return Array.isArray(e);
  }
  function g(e) {
    return "boolean" === typeof e;
  }
  function b(e) {
    return null === e;
  }
  function w(e) {
    return null == e;
  }
  function x(e) {
    return "number" === typeof e;
  }
  function O(e) {
    return "string" === typeof e;
  }
  function E(e) {
    return "symbol" === typeof e;
  }
  function _(e) {
    return void 0 === e;
  }
  function k(e) {
    return S(e) && "[object RegExp]" === L(e);
  }
  function S(e) {
    return "object" === typeof e && null !== e;
  }
  function C(e) {
    return S(e) && "[object Date]" === L(e);
  }
  function j(e) {
    return S(e) && ("[object Error]" === L(e) || e instanceof Error);
  }
  function P(e) {
    return "function" === typeof e;
  }
  function T(e) {
    return null === e || "boolean" === typeof e || "number" === typeof e || "string" === typeof e || "symbol" === typeof e || "undefined" === typeof e;
  }
  function L(e) {
    return Object.prototype.toString.call(e);
  }
  function N(e) {
    return e < 10 ? "0" + e.toString(10) : e.toString(10);
  }
  legacyExports.debuglog = function (n) {
    if (_(i) && (i = Object({
      NODE_ENV: "production"
    }).NODE_DEBUG || ""), n = n.toUpperCase(), !a[n]) if (new RegExp("\\b" + n + "\\b", "i").test(i)) {
      var r = e.pid;
      a[n] = function () {
        var e = legacyExports.format.apply(legacyExports, arguments);
        console.error("%s %d: %s", n, r, e);
      };
    } else a[n] = function () {};
    return a[n];
  }, legacyExports.inspect = s, s.colors = {
    bold: [1, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    white: [37, 39],
    grey: [90, 39],
    black: [30, 39],
    blue: [34, 39],
    cyan: [36, 39],
    green: [32, 39],
    magenta: [35, 39],
    red: [31, 39],
    yellow: [33, 39]
  }, s.styles = {
    special: "cyan",
    number: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    date: "magenta",
    regexp: "red"
  }, legacyExports.isArray = y, legacyExports.isBoolean = g, legacyExports.isNull = b, legacyExports.isNullOrUndefined = w, legacyExports.isNumber = x, legacyExports.isString = O, legacyExports.isSymbol = E, legacyExports.isUndefined = _, legacyExports.isRegExp = k, legacyExports.isObject = S, legacyExports.isDate = C, legacyExports.isError = j, legacyExports.isFunction = P, legacyExports.isPrimitive = T, legacyExports.isBuffer = require("./isBuffer.js");
  var M = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function A() {
    var e = new Date(),
      t = [N(e.getHours()), N(e.getMinutes()), N(e.getSeconds())].join(":");
    return [e.getDate(), M[e.getMonth()], t].join(" ");
  }
  function D(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
  legacyExports.log = function () {
    console.log("%s - %s", A(), legacyExports.format.apply(legacyExports, arguments));
  }, legacyExports.inherits = require("./nodeInherits.js"), legacyExports._extend = function (e, t) {
    if (!t || !S(t)) return e;
    var n = Object.keys(t),
      r = n.length;
    while (r--) e[n[r]] = t[n[r]];
    return e;
  };
  var I = "undefined" !== typeof Symbol ? Symbol("util.promisify.custom") : void 0;
  function R(e, t) {
    if (!e) {
      var n = new Error("Promise was rejected with a falsy value");
      n.reason = e, e = n;
    }
    return t(e);
  }
  function F(t) {
    if ("function" !== typeof t) throw new TypeError('The "original" argument must be of type Function');
    function n() {
      for (var n = [], r = 0; r < arguments.length; r++) n.push(arguments[r]);
      var o = n.pop();
      if ("function" !== typeof o) throw new TypeError("The last argument must be of type Function");
      var i = this,
        a = function () {
          return o.apply(i, arguments);
        };
      t.apply(this, n).then(function (t) {
        e.nextTick(a, null, t);
      }, function (t) {
        e.nextTick(R, t, a);
      });
    }
    return Object.setPrototypeOf(n, Object.getPrototypeOf(t)), Object.defineProperties(n, r(t)), n;
  }
  legacyExports.promisify = function (e) {
    if ("function" !== typeof e) throw new TypeError('The "original" argument must be of type Function');
    if (I && e[I]) {
      var t = e[I];
      if ("function" !== typeof t) throw new TypeError('The "util.promisify.custom" argument must be of type Function');
      return Object.defineProperty(t, I, {
        value: t,
        enumerable: !1,
        writable: !1,
        configurable: !0
      }), t;
    }
    function t() {
      for (var t, n, r = new Promise(function (e, r) {
          t = e, n = r;
        }), o = [], i = 0; i < arguments.length; i++) o.push(arguments[i]);
      o.push(function (e, r) {
        e ? n(e) : t(r);
      });
      try {
        e.apply(this, o);
      } catch (e) {
        n(e);
      }
      return r;
    }
    return Object.setPrototypeOf(t, Object.getPrototypeOf(e)), I && Object.defineProperty(t, I, {
      value: t,
      enumerable: !1,
      writable: !1,
      configurable: !0
    }), Object.defineProperties(t, r(e));
  }, legacyExports.promisify.custom = I, legacyExports.callbackify = F;
}).call(this, require("./processRuntime.js"));
