let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.default = l;
var r = i(require("./reactRuntime.js")),
  o = i(require("./436e424d.js"));
function i(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
function a(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function s(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? a(Object(n), !0).forEach(function (t) {
      c(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : a(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function c(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function u(e) {
  "@babel/helpers - typeof";

  return u = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, u(e);
}
function l(e, t) {
  var n = o.default,
    i = {
      loading: function (e) {
        e.error, e.isLoading;
        return r.default.createElement("p", null, "loading...");
      }
    };
  if ("function" === typeof e.then ? i.loader = function () {
    return e;
  } : "object" === u(e) && (i = s({}, i, {}, e)), i = s({}, i, {}, t), e.render && (i.render = function (t, n) {
    return e.render(n, t);
  }), e.modules) {
    n = o.default.Map;
    var a = {},
      c = e.modules();
    Object.keys(c).forEach(function (e) {
      var t = c[e];
      "function" !== typeof t.then ? a[e] = t : a[e] = function () {
        return t.then(function (e) {
          return e.default || e;
        });
      };
    }), i.loader = a;
  }
  return n(i);
}
