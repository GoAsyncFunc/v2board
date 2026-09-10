let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.init = x, legacyExports.use = O, legacyExports.getItem = E, legacyExports.compose = k, legacyExports.apply = S, legacyExports.applyForEach = C, legacyExports.mergeConfig = j, legacyExports.mergeConfigAsync = P;
var r = a(require("./396c5457.js")),
  o = a(require("./6a594e59.js")),
  i = require("./6a636532.js");
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
    o,
    i = !0,
    a = !1;
  return {
    s: function () {
      r = e[Symbol.iterator]();
    },
    n: function () {
      var e = r.next();
      return i = e.done, e;
    },
    e: function (e) {
      a = !0, o = e;
    },
    f: function () {
      try {
        i || null == r.return || r.return();
      } finally {
        if (a) throw o;
      }
    }
  };
}
function c(e, t, n, r, o, i, a) {
  try {
    var s = e[i](a),
      c = s.value;
  } catch (e) {
    return void n(e);
  }
  s.done ? t(c) : Promise.resolve(c).then(r, o);
}
function u(e) {
  return function () {
    var t = this,
      n = arguments;
    return new Promise(function (r, o) {
      var i = e.apply(t, n);
      function a(e) {
        c(i, r, o, a, s, "next", e);
      }
      function s(e) {
        c(i, r, o, a, s, "throw", e);
      }
      a(void 0);
    });
  };
}
function l(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function f(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? l(Object(n), !0).forEach(function (t) {
      p(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : l(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function p(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function d(e) {
  return y(e) || v(e) || m(e) || h();
}
function h() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function m(e, t) {
  if (e) {
    if ("string" === typeof e) return g(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(n) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? g(e, t) : void 0;
  }
}
function v(e) {
  if ("undefined" !== typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
}
function y(e) {
  if (Array.isArray(e)) return g(e);
}
function g(e, t) {
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
function O(e) {
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
function _() {
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
    return _.apply(void 0, d(e).concat([n]))();
  };
}
function S(e, t) {
  var n = t.initialValue,
    o = t.args;
  return "string" === typeof e && (e = E(e)), (0, r.default)(Array.isArray(e), "item must be Array"), e.reduce(function (e, t) {
    return (0, r.default)("function" === typeof t, "applied item must be function"), t(e, o);
  }, n);
}
function C(e, t) {
  var n = t.initialValue;
  "string" === typeof e && (e = E(e)), (0, r.default)(Array.isArray(e), "item must be Array"), e.forEach(function (e) {
    (0, r.default)("function" === typeof e, "applied item must be function"), e(n);
  });
}
function j(e) {
  return "string" === typeof e && (e = E(e)), (0, r.default)(Array.isArray(e), "item must be Array"), e.reduce(function (e, t) {
    return (0, r.default)((0, o.default)(t), "Config is not plain object"), f({}, e, {}, t);
  }, {});
}
function P(e) {
  return T.apply(this, arguments);
}
function T() {
  return T = u(regeneratorRuntime.mark(function e(t) {
    var n, a, c, u;
    return regeneratorRuntime.wrap(function (e) {
      while (1) switch (e.prev = e.next) {
        case 0:
          "string" === typeof t && (t = E(t)), (0, r.default)(Array.isArray(t), "item must be Array"), n = {}, a = s(t), e.prev = 4, a.s();
        case 6:
          if ((c = a.n()).done) {
            e.next = 16;
            break;
          }
          if (u = c.value, !(0, i.isPromiseLike)(u)) {
            e.next = 12;
            break;
          }
          return e.next = 11, u;
        case 11:
          u = e.sent;
        case 12:
          (0, r.default)((0, o.default)(u), "Config is not plain object"), n = f({}, n, {}, u);
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
  })), T.apply(this, arguments);
}
