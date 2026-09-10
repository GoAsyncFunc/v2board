let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.default = u;
var r = o(require("./71317449.js")),
  i = o(require("./436e424d.js"));
function o(e) {
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
      l(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : a(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function l(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function c(e) {
  "@babel/helpers - typeof";

  return c = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, c(e);
}
function u(e, t) {
  var n = i.default,
    o = {
      loading: function (e) {
        e.error, e.isLoading;
        return r.default.createElement("p", null, "loading...");
      }
    };
  if ("function" === typeof e.then ? o.loader = function () {
    return e;
  } : "object" === c(e) && (o = s({}, o, {}, e)), o = s({}, o, {}, t), e.render && (o.render = function (t, n) {
    return e.render(n, t);
  }), e.modules) {
    n = i.default.Map;
    var a = {},
      l = e.modules();
    Object.keys(l).forEach(function (e) {
      var t = l[e];
      "function" !== typeof t.then ? a[e] = t : a[e] = function () {
        return t.then(function (e) {
          return e.default || e;
        });
      };
    }), o.loader = a;
  }
  return n(o);
}
