let legacyModule = module,
  legacyExports = exports;
function r(e) {
  return Object.prototype.toString.call(e);
}
function i(e) {
  return "[object String]" === r(e);
}
var o = Object.prototype.hasOwnProperty;
function a(e, t) {
  return o.call(e, t);
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
function l(e, t, n) {
  return [].concat(e.slice(0, t), n, e.slice(t + 1));
}
function u(e) {
  return !(e >= 55296 && e <= 57343) && !(e >= 64976 && e <= 65007) && 65535 !== (65535 & e) && 65534 !== (65535 & e) && !(e >= 0 && e <= 8) && 11 !== e && !(e >= 14 && e <= 31) && !(e >= 127 && e <= 159) && !(e > 1114111);
}
function c(e) {
  if (e > 65535) {
    e -= 65536;
    var t = 55296 + (e >> 10),
      n = 56320 + (1023 & e);
    return String.fromCharCode(t, n);
  }
  return String.fromCharCode(e);
}
var f = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g,
  d = /&([a-z#][a-z0-9]{1,31});/gi,
  h = new RegExp(f.source + "|" + d.source, "gi"),
  p = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i,
  g = require("./htmlEntitiesEntry.js");
function m(e, t) {
  var n = 0;
  return a(g, t) ? g[t] : 35 === t.charCodeAt(0) && p.test(t) && (n = "x" === t[1].toLowerCase() ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10), u(n)) ? c(n) : e;
}
function v(e) {
  return e.indexOf("\\") < 0 ? e : e.replace(f, "$1");
}
function y(e) {
  return e.indexOf("\\") < 0 && e.indexOf("&") < 0 ? e : e.replace(h, function (e, t, n) {
    return t || m(e, n);
  });
}
var b = /[&<>"]/,
  x = /[&<>"]/g,
  _ = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  };
function w(e) {
  return _[e];
}
function O(e) {
  return b.test(e) ? e.replace(x, w) : e;
}
var S = /[.?*+^$[\]\\(){}|-]/g;
function k(e) {
  return e.replace(S, "\\$&");
}
function j(e) {
  switch (e) {
    case 9:
    case 32:
      return !0;
  }
  return !1;
}
function M(e) {
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
var C = require("./punctuationRegex.js");
function T(e) {
  return C.test(e);
}
function I(e) {
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
function D(e) {
  return e = e.trim().replace(/\s+/g, " "), "\u1e7e" === "\u1e9e".toLowerCase() && (e = e.replace(/\u1e9e/g, "\xdf")), e.toLowerCase().toUpperCase();
}
legacyExports.lib = {}, legacyExports.lib.mdurl = require("./324b5954.js"), legacyExports.lib.ucmicro = require("./31644758.js"), legacyExports.assign = s, legacyExports.isString = i, legacyExports.has = a, legacyExports.unescapeMd = v, legacyExports.unescapeAll = y, legacyExports.isValidEntityCode = u, legacyExports.fromCodePoint = c, legacyExports.escapeHtml = O, legacyExports.arrayReplaceAt = l, legacyExports.isSpace = j, legacyExports.isWhiteSpace = M, legacyExports.isMdAsciiPunct = I, legacyExports.isPunctChar = T, legacyExports.escapeRE = k, legacyExports.normalizeReference = D;
