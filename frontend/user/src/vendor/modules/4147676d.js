let legacyModule = module,
  legacyExports = exports;
function r(e) {
  return Object.prototype.toString.call(e);
}
function o(e) {
  return "[object String]" === r(e);
}
var i = Object.prototype.hasOwnProperty;
function a(e, t) {
  return i.call(e, t);
}
function s(e) {
  var t = Array.prototype.slice.call(arguments, 1);
  return t.forEach(function (t) {
    if (t) {
      if ("object" !== typeof t) throw new TypeError(t + "must be object");
      Object.keys(t).forEach(function (n) {
        e[n] = t[n];
      });
    }
  }), e;
}
function c(e, t, n) {
  return [].concat(e.slice(0, t), n, e.slice(t + 1));
}
function u(e) {
  return !(e >= 55296 && e <= 57343) && !(e >= 64976 && e <= 65007) && 65535 !== (65535 & e) && 65534 !== (65535 & e) && !(e >= 0 && e <= 8) && 11 !== e && !(e >= 14 && e <= 31) && !(e >= 127 && e <= 159) && !(e > 1114111);
}
function l(e) {
  if (e > 65535) {
    e -= 65536;
    var t = 55296 + (e >> 10),
      n = 56320 + (1023 & e);
    return String.fromCharCode(t, n);
  }
  return String.fromCharCode(e);
}
var f = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g,
  p = /&([a-z#][a-z0-9]{1,31});/gi,
  d = new RegExp(f.source + "|" + p.source, "gi"),
  h = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i,
  m = require("./76576746.js");
function v(e, t) {
  var n = 0;
  return a(m, t) ? m[t] : 35 === t.charCodeAt(0) && h.test(t) && (n = "x" === t[1].toLowerCase() ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10), u(n)) ? l(n) : e;
}
function y(e) {
  return e.indexOf("\\") < 0 ? e : e.replace(f, "$1");
}
function g(e) {
  return e.indexOf("\\") < 0 && e.indexOf("&") < 0 ? e : e.replace(d, function (e, t, n) {
    return t || v(e, n);
  });
}
var b = /[&<>"]/,
  w = /[&<>"]/g,
  x = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  };
function O(e) {
  return x[e];
}
function E(e) {
  return b.test(e) ? e.replace(w, O) : e;
}
var _ = /[.?*+^$[\]\\(){}|-]/g;
function k(e) {
  return e.replace(_, "\\$&");
}
function S(e) {
  switch (e) {
    case 9:
    case 32:
      return !0;
  }
  return !1;
}
function C(e) {
  if (e >= 8192 && e <= 8202) return !0;
  switch (e) {
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 32:
    case 160:
    case 5760:
    case 8239:
    case 8287:
    case 12288:
      return !0;
  }
  return !1;
}
var j = require("./664b4366.js");
function P(e) {
  return j.test(e);
}
function T(e) {
  switch (e) {
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 45:
    case 46:
    case 47:
    case 58:
    case 59:
    case 60:
    case 61:
    case 62:
    case 63:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 124:
    case 125:
    case 126:
      return !0;
    default:
      return !1;
  }
}
function L(e) {
  return e = e.trim().replace(/\s+/g, " "), "\u1e7e" === "\u1e9e".toLowerCase() && (e = e.replace(/\u1e9e/g, "\xdf")), e.toLowerCase().toUpperCase();
}
legacyExports.lib = {}, legacyExports.lib.mdurl = require("./324b5954.js"), legacyExports.lib.ucmicro = require("./31644758.js"), legacyExports.assign = s, legacyExports.isString = o, legacyExports.has = a, legacyExports.unescapeMd = y, legacyExports.unescapeAll = g, legacyExports.isValidEntityCode = u, legacyExports.fromCodePoint = l, legacyExports.escapeHtml = E, legacyExports.arrayReplaceAt = c, legacyExports.isSpace = S, legacyExports.isWhiteSpace = C, legacyExports.isMdAsciiPunct = T, legacyExports.isPunctChar = P, legacyExports.escapeRE = k, legacyExports.normalizeReference = L;
