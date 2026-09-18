let legacyModule = module,
  legacyExports = exports;
(function (e) {
  var r = Object.getOwnPropertyDescriptors || function (e) {
      for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) n[t[r]] = Object.getOwnPropertyDescriptor(e, t[r]);
      return n;
    },
    i = /%[sdj%]/g;
  legacyExports.format = function (e) {
    if (!_(e)) {
      for (var t = [], n = 0; n < arguments.length; n++) t.push(s(arguments[n]));
      return t.join(" ");
    }
    n = 1;
    for (var r = arguments, o = r.length, a = String(e).replace(i, function (e) {
        if ("%%" === e) return "%";
        if (n >= o) return e;
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
      }), l = r[n]; n < o; l = r[++n]) b(l) || !C(l) ? a += " " + l : a += " " + s(l);
    return a;
  }, legacyExports.deprecate = function (n, r) {
    if ("undefined" !== typeof e && !0 === e.noDeprecation) return n;
    if ("undefined" === typeof e) return function () {
      return legacyExports.deprecate(n, r).apply(this, arguments);
    };
    var i = !1;
    function o() {
      if (!i) {
        if (e.throwDeprecation) throw new Error(r);
        e.traceDeprecation ? console.trace(r) : console.error(r), i = !0;
      }
      return n.apply(this, arguments);
    }
    return o;
  };
  var o,
    a = {};
  function s(e, n) {
    var r = {
      seen: [],
      stylize: c
    };
    return arguments.length >= 3 && (r.depth = arguments[2]), arguments.length >= 4 && (r.colors = arguments[3]), y(n) ? r.showHidden = n : n && legacyExports._extend(r, n), S(r.showHidden) && (r.showHidden = !1), S(r.depth) && (r.depth = 2), S(r.colors) && (r.colors = !1), S(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = l), h(r, e, r.depth);
  }
  function l(e, t) {
    var n = s.styles[t];
    return n ? "\x1b[" + s.colors[n][0] + "m" + e + "\x1b[" + s.colors[n][1] + "m" : e;
  }
  function c(e, t) {
    return e;
  }
  function u(e) {
    var t = {};
    return e.forEach(function (e, n) {
      t[e] = !0;
    }), t;
  }
  function h(e, n, r) {
    if (e.customInspect && n && L(n.inspect) && n.inspect !== legacyExports.inspect && (!n.constructor || n.constructor.prototype !== n)) {
      var i = n.inspect(r, e);
      return _(i) || (i = h(e, i, r)), i;
    }
    var o = f(e, n);
    if (o) return o;
    var a = Object.keys(n),
      s = u(a);
    if (e.showHidden && (a = Object.getOwnPropertyNames(n)), T(n) && (a.indexOf("message") >= 0 || a.indexOf("description") >= 0)) return d(n);
    if (0 === a.length) {
      if (L(n)) {
        var l = n.name ? ": " + n.name : "";
        return e.stylize("[Function" + l + "]", "special");
      }
      if (k(n)) return e.stylize(RegExp.prototype.toString.call(n), "regexp");
      if (O(n)) return e.stylize(Date.prototype.toString.call(n), "date");
      if (T(n)) return d(n);
    }
    var c,
      y = "",
      b = !1,
      w = ["{", "}"];
    if (v(n) && (b = !0, w = ["[", "]"]), L(n)) {
      var x = n.name ? ": " + n.name : "";
      y = " [Function" + x + "]";
    }
    return k(n) && (y = " " + RegExp.prototype.toString.call(n)), O(n) && (y = " " + Date.prototype.toUTCString.call(n)), T(n) && (y = " " + d(n)), 0 !== a.length || b && 0 != n.length ? r < 0 ? k(n) ? e.stylize(RegExp.prototype.toString.call(n), "regexp") : e.stylize("[Object]", "special") : (e.seen.push(n), c = b ? p(e, n, r, s, a) : a.map(function (t) {
      return m(e, n, r, s, t, b);
    }), e.seen.pop(), g(c, y, w)) : w[0] + y + w[1];
  }
  function f(e, t) {
    if (S(t)) return e.stylize("undefined", "undefined");
    if (_(t)) {
      var n = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return e.stylize(n, "string");
    }
    return x(t) ? e.stylize("" + t, "number") : y(t) ? e.stylize("" + t, "boolean") : b(t) ? e.stylize("null", "null") : void 0;
  }
  function d(e) {
    return "[" + Error.prototype.toString.call(e) + "]";
  }
  function p(e, t, n, r, i) {
    for (var o = [], a = 0, s = t.length; a < s; ++a) N(t, String(a)) ? o.push(m(e, t, n, r, String(a), !0)) : o.push("");
    return i.forEach(function (i) {
      i.match(/^\d+$/) || o.push(m(e, t, n, r, i, !0));
    }), o;
  }
  function m(e, t, n, r, i, o) {
    var a, s, l;
    if (l = Object.getOwnPropertyDescriptor(t, i) || {
      value: t[i]
    }, l.get ? s = l.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : l.set && (s = e.stylize("[Setter]", "special")), N(r, i) || (a = "[" + i + "]"), s || (e.seen.indexOf(l.value) < 0 ? (s = b(n) ? h(e, l.value, null) : h(e, l.value, n - 1), s.indexOf("\n") > -1 && (s = o ? s.split("\n").map(function (e) {
      return "  " + e;
    }).join("\n").substr(2) : "\n" + s.split("\n").map(function (e) {
      return "   " + e;
    }).join("\n"))) : s = e.stylize("[Circular]", "special")), S(a)) {
      if (o && i.match(/^\d+$/)) return s;
      a = JSON.stringify("" + i), a.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (a = a.substr(1, a.length - 2), a = e.stylize(a, "name")) : (a = a.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), a = e.stylize(a, "string"));
    }
    return a + ": " + s;
  }
  function g(e, t, n) {
    var r = e.reduce(function (e, t) {
      return 0, t.indexOf("\n") >= 0 && 0, e + t.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0);
    return r > 60 ? n[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + n[1] : n[0] + t + " " + e.join(", ") + " " + n[1];
  }
  function v(e) {
    return Array.isArray(e);
  }
  function y(e) {
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
  function _(e) {
    return "string" === typeof e;
  }
  function E(e) {
    return "symbol" === typeof e;
  }
  function S(e) {
    return void 0 === e;
  }
  function k(e) {
    return C(e) && "[object RegExp]" === P(e);
  }
  function C(e) {
    return "object" === typeof e && null !== e;
  }
  function O(e) {
    return C(e) && "[object Date]" === P(e);
  }
  function T(e) {
    return C(e) && ("[object Error]" === P(e) || e instanceof Error);
  }
  function L(e) {
    return "function" === typeof e;
  }
  function A(e) {
    return null === e || "boolean" === typeof e || "number" === typeof e || "string" === typeof e || "symbol" === typeof e || "undefined" === typeof e;
  }
  function P(e) {
    return Object.prototype.toString.call(e);
  }
  function j(e) {
    return e < 10 ? "0" + e.toString(10) : e.toString(10);
  }
  legacyExports.debuglog = function (n) {
    if (S(o) && (o = Object({
      NODE_ENV: "production"
    }).NODE_DEBUG || ""), n = n.toUpperCase(), !a[n]) if (new RegExp("\\b" + n + "\\b", "i").test(o)) {
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
  }, legacyExports.isArray = v, legacyExports.isBoolean = y, legacyExports.isNull = b, legacyExports.isNullOrUndefined = w, legacyExports.isNumber = x, legacyExports.isString = _, legacyExports.isSymbol = E, legacyExports.isUndefined = S, legacyExports.isRegExp = k, legacyExports.isObject = C, legacyExports.isDate = O, legacyExports.isError = T, legacyExports.isFunction = L, legacyExports.isPrimitive = A, legacyExports.isBuffer = require("./6a2f315a.js");
  var M = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function R() {
    var e = new Date(),
      t = [j(e.getHours()), j(e.getMinutes()), j(e.getSeconds())].join(":");
    return [e.getDate(), M[e.getMonth()], t].join(" ");
  }
  function N(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
  legacyExports.log = function () {
    console.log("%s - %s", R(), legacyExports.format.apply(legacyExports, arguments));
  }, legacyExports.inherits = require("./nodeInherits.js"), legacyExports._extend = function (e, t) {
    if (!t || !C(t)) return e;
    var n = Object.keys(t),
      r = n.length;
    while (r--) e[n[r]] = t[n[r]];
    return e;
  };
  var D = "undefined" !== typeof Symbol ? Symbol("util.promisify.custom") : void 0;
  function I(e, t) {
    if (!e) {
      var n = new Error("Promise was rejected with a falsy value");
      n.reason = e, e = n;
    }
    return t(e);
  }
  function $(t) {
    if ("function" !== typeof t) throw new TypeError('The "original" argument must be of type Function');
    function n() {
      for (var n = [], r = 0; r < arguments.length; r++) n.push(arguments[r]);
      var i = n.pop();
      if ("function" !== typeof i) throw new TypeError("The last argument must be of type Function");
      var o = this,
        a = function () {
          return i.apply(o, arguments);
        };
      t.apply(this, n).then(function (t) {
        e.nextTick(a, null, t);
      }, function (t) {
        e.nextTick(I, t, a);
      });
    }
    return Object.setPrototypeOf(n, Object.getPrototypeOf(t)), Object.defineProperties(n, r(t)), n;
  }
  legacyExports.promisify = function (e) {
    if ("function" !== typeof e) throw new TypeError('The "original" argument must be of type Function');
    if (D && e[D]) {
      var t = e[D];
      if ("function" !== typeof t) throw new TypeError('The "util.promisify.custom" argument must be of type Function');
      return Object.defineProperty(t, D, {
        value: t,
        enumerable: !1,
        writable: !1,
        configurable: !0
      }), t;
    }
    function t() {
      for (var t, n, r = new Promise(function (e, r) {
          t = e, n = r;
        }), i = [], o = 0; o < arguments.length; o++) i.push(arguments[o]);
      i.push(function (e, r) {
        e ? n(e) : t(r);
      });
      try {
        e.apply(this, i);
      } catch (e) {
        n(e);
      }
      return r;
    }
    return Object.setPrototypeOf(t, Object.getPrototypeOf(e)), D && Object.defineProperty(t, D, {
      value: t,
      enumerable: !1,
      writable: !1,
      configurable: !0
    }), Object.defineProperties(t, r(e));
  }, legacyExports.promisify.custom = D, legacyExports.callbackify = $;
}).call(this, require("./51324967.js"));
