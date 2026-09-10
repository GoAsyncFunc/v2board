let legacyModule = module,
  legacyExports = exports;
var r = require("./5a464f70.js"),
  i = require("./4d677a57.js"),
  o = require("./386a5249.js");
function a(e) {
  switch (e.arrayFormat) {
    case "index":
      return function (t, n, r) {
        return null === n ? [l(t, e), "[", r, "]"].join("") : [l(t, e), "[", l(r, e), "]=", l(n, e)].join("");
      };
    case "bracket":
      return function (t, n) {
        return null === n ? l(t, e) : [l(t, e), "[]=", l(n, e)].join("");
      };
    default:
      return function (t, n) {
        return null === n ? l(t, e) : [l(t, e), "=", l(n, e)].join("");
      };
  }
}
function s(e) {
  var t;
  switch (e.arrayFormat) {
    case "index":
      return function (e, n, r) {
        t = /\[(\d*)\]$/.exec(e), e = e.replace(/\[\d*\]$/, ""), t ? (void 0 === r[e] && (r[e] = {}), r[e][t[1]] = n) : r[e] = n;
      };
    case "bracket":
      return function (e, n, r) {
        t = /(\[\])$/.exec(e), e = e.replace(/\[\]$/, ""), t ? void 0 !== r[e] ? r[e] = [].concat(r[e], n) : r[e] = [n] : r[e] = n;
      };
    default:
      return function (e, t, n) {
        void 0 !== n[e] ? n[e] = [].concat(n[e], t) : n[e] = t;
      };
  }
}
function l(e, t) {
  return t.encode ? t.strict ? r(e) : encodeURIComponent(e) : e;
}
function c(e) {
  return Array.isArray(e) ? e.sort() : "object" === typeof e ? c(Object.keys(e)).sort(function (e, t) {
    return Number(e) - Number(t);
  }).map(function (t) {
    return e[t];
  }) : e;
}
function u(e) {
  var t = e.indexOf("?");
  return -1 === t ? "" : e.slice(t + 1);
}
function h(e, t) {
  t = i({
    arrayFormat: "none"
  }, t);
  var n = s(t),
    r = Object.create(null);
  return "string" !== typeof e ? r : (e = e.trim().replace(/^[?#&]/, ""), e ? (e.split("&").forEach(function (e) {
    var t = e.replace(/\+/g, " ").split("="),
      i = t.shift(),
      a = t.length > 0 ? t.join("=") : void 0;
    a = void 0 === a ? null : o(a), n(o(i), a, r);
  }), Object.keys(r).sort().reduce(function (e, t) {
    var n = r[t];
    return Boolean(n) && "object" === typeof n && !Array.isArray(n) ? e[t] = c(n) : e[t] = n, e;
  }, Object.create(null))) : r);
}
legacyExports.extract = u, legacyExports.parse = h, legacyExports.stringify = function (e, t) {
  var n = {
    encode: !0,
    strict: !0,
    arrayFormat: "none"
  };
  t = i(n, t), !1 === t.sort && (t.sort = function () {});
  var r = a(t);
  return e ? Object.keys(e).sort(t.sort).map(function (n) {
    var i = e[n];
    if (void 0 === i) return "";
    if (null === i) return l(n, t);
    if (Array.isArray(i)) {
      var o = [];
      return i.slice().forEach(function (e) {
        void 0 !== e && o.push(r(n, e, o.length));
      }), o.join("&");
    }
    return l(n, t) + "=" + l(i, t);
  }).filter(function (e) {
    return e.length > 0;
  }).join("&") : "";
}, legacyExports.parseUrl = function (e, t) {
  return {
    url: e.split("?")[0] || "",
    query: h(u(e), t)
  };
};
