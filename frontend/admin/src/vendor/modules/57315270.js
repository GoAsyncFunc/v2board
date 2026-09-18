let legacyModule = module,
  legacyExports = exports;
var r = require("./76576746.js"),
  i = require("./markdownUtils.js").has,
  o = require("./markdownUtils.js").isValidEntityCode,
  a = require("./markdownUtils.js").fromCodePoint,
  s = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,
  l = /^&([a-z][a-z0-9]{1,31});/i;
legacyModule.exports = function (e, t) {
  var n,
    u,
    c,
    f = e.pos,
    d = e.posMax;
  if (38 !== e.src.charCodeAt(f)) return !1;
  if (f + 1 < d) if (n = e.src.charCodeAt(f + 1), 35 === n) {
    if (c = e.src.slice(f).match(s), c) return t || (u = "x" === c[1][0].toLowerCase() ? parseInt(c[1].slice(1), 16) : parseInt(c[1], 10), e.pending += o(u) ? a(u) : a(65533)), e.pos += c[0].length, !0;
  } else if (c = e.src.slice(f).match(l), c && i(r, c[1])) return t || (e.pending += r[c[1]]), e.pos += c[0].length, !0;
  return t || (e.pending += "&"), e.pos++, !0;
};
