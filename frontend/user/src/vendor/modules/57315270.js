let legacyModule = module,
  legacyExports = exports;
var r = require("./76576746.js"),
  o = require("./markdownUtils.js").has,
  i = require("./markdownUtils.js").isValidEntityCode,
  a = require("./markdownUtils.js").fromCodePoint,
  s = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,
  c = /^&([a-z][a-z0-9]{1,31});/i;
legacyModule.exports = function (e, t) {
  var n,
    u,
    l,
    f = e.pos,
    p = e.posMax;
  if (38 !== e.src.charCodeAt(f)) return !1;
  if (f + 1 < p) if (n = e.src.charCodeAt(f + 1), 35 === n) {
    if (l = e.src.slice(f).match(s), l) return t || (u = "x" === l[1][0].toLowerCase() ? parseInt(l[1].slice(1), 16) : parseInt(l[1], 10), e.pending += i(u) ? a(u) : a(65533)), e.pos += l[0].length, !0;
  } else if (l = e.src.slice(f).match(c), l && o(r, l[1])) return t || (e.pending += r[l[1]]), e.pos += l[0].length, !0;
  return t || (e.pending += "&"), e.pos++, !0;
};
