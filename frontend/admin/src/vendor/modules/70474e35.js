let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.init = x, legacyExports.use = _, legacyExports.getItem = E, legacyExports.compose = k, legacyExports.apply = C, legacyExports.applyForEach = O, legacyExports.mergeConfig = T, legacyExports.mergeConfigAsync = L;
var r = a(require("./396c5457.js")),
  i = a(require("./6a594e59.js")),
  o = require("./6a636532.js");
function a(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function s(e) {
  if ("undefined" === typeof Symbol || null == e[Symbol.iterator]) {
    if (Array.isArray(e) || (e = m(e))) {
      var t = 0,
        n = function () {};
      return {
        s: n,
        n: function () {
          return t >= e.length ? {
            done: !0
          } : {
            done: !1,
            value: e[t++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: n
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var r,
    i,
    o = !0,
    a = !1;
  return {
    s: function () {
      r = e[Symbol.iterator]();
    },
    n: function () {
      var e = r.next();
      return o = e.done, e;
    },
    e: function (e) {
      a = !0, i = e;
    },
    f: function () {
      try {
        o || null == r.return || r.return();
      } finally {
        if (a) throw i;
      }
    }
  };
}
function l(e, t, n, r, i, o, a) {
  try {
    var s = e[o](a),
      l = s.value;
  } catch (e) {
    return void n(e);
  }
  s.done ? t(l) : Promise.resolve(l).then(r, i);
}
function c(e) {
  return function () {
    var t = this,
      n = arguments;
    return new Promise(function (r, i) {
      var o = e.apply(t, n);
      function a(e) {
        l(o, r, i, a, s, "next", e);
      }
      function s(e) {
        l(o, r, i, a, s, "throw", e);
      }
      a(void 0);
    });
  };
}
function u(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function h(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? u(Object(n), !0).forEach(function (t) {
      f(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : u(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function f(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function d(e) {
  return v(e) || g(e) || m(e) || p();
}
function p() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function m(e, t) {
  if (e) {
    if ("string" === typeof e) return y(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(n) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? y(e, t) : void 0;
  }
}
function g(e) {
  if ("undefined" !== typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
}
function v(e) {
  if (Array.isArray(e)) return y(e);
}
function y(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
var b = null,
  w = [];
function x() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
  b = [], w = e.validKeys || [];
}
function _(e) {
  Object.keys(e).forEach(function (e) {
    (0, r.default)(w.concat("default").indexOf(e) > -1, "Invalid key ".concat(e, " from plugin"));
  }), b.push(e);
}
function E(e) {
  return (0, r.default)(w.indexOf(e) > -1, "Invalid key ".concat(e)), b.filter(function (t) {
    return e in t;
  }).map(function (t) {
    return t[e];
  });
}
function S() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  if (1 === t.length) return t[0];
  var r = t.pop();
  return t.reduce(function (e, t) {
    return function () {
      return t(e);
    };
  }, r);
}
function k(e, t) {
  var n = t.initialValue;
  return "string" === typeof e && (e = E(e)), function () {
    return S.apply(void 0, d(e).concat([n]))();
  };
}
function C(e, t) {
  var n = t.initialValue,
    i = t.args;
  return "string" === typeof e && (e = E(e)), (0, r.default)(Array.isArray(e), "item must be Array"), e.reduce(function (e, t) {
    return (0, r.default)("function" === typeof t, "applied item must be function"), t(e, i);
  }, n);
}
function O(e, t) {
  var n = t.initialValue;
  "string" === typeof e && (e = E(e)), (0, r.default)(Array.isArray(e), "item must be Array"), e.forEach(function (e) {
    (0, r.default)("function" === typeof e, "applied item must be function"), e(n);
  });
}
function T(e) {
  return "string" === typeof e && (e = E(e)), (0, r.default)(Array.isArray(e), "item must be Array"), e.reduce(function (e, t) {
    return (0, r.default)((0, i.default)(t), "Config is not plain object"), h({}, e, {}, t);
  }, {});
}
function L(e) {
  return A.apply(this, arguments);
}
function A() {
  return A = c(regeneratorRuntime.mark(function e(t) {
    var n, a, l, c;
    return regeneratorRuntime.wrap(function (e) {
      while (1) switch (e.prev = e.next) {
        case 0:
          "string" === typeof t && (t = E(t)), (0, r.default)(Array.isArray(t), "item must be Array"), n = {}, a = s(t), e.prev = 4, a.s();
        case 6:
          if ((l = a.n()).done) {
            e.next = 16;
            break;
          }
          if (c = l.value, !(0, o.isPromiseLike)(c)) {
            e.next = 12;
            break;
          }
          return e.next = 11, c;
        case 11:
          c = e.sent;
        case 12:
          (0, r.default)((0, i.default)(c), "Config is not plain object"), n = h({}, n, {}, c);
        case 14:
          e.next = 6;
          break;
        case 16:
          e.next = 21;
          break;
        case 18:
          e.prev = 18, e.t0 = e["catch"](4), a.e(e.t0);
        case 21:
          return e.prev = 21, a.f(), e.finish(21);
        case 24:
          return e.abrupt("return", n);
        case 25:
        case "end":
          return e.stop();
      }
    }, e, null, [[4, 18, 21, 24]]);
  })), A.apply(this, arguments);
}
