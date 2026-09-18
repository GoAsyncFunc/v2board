let legacyModule = module,
  legacyExports = exports;
var r = require("./markdownUtils.js").isSpace;
legacyModule.exports = function (e, t) {
  var n,
    o,
    i,
    a = e.pos;
  if (10 !== e.src.charCodeAt(a)) return !1;
  if (n = e.pending.length - 1, o = e.posMax, !t) if (n >= 0 && 32 === e.pending.charCodeAt(n)) {
    if (n >= 1 && 32 === e.pending.charCodeAt(n - 1)) {
      i = n - 1;
      while (i >= 1 && 32 === e.pending.charCodeAt(i - 1)) i--;
      e.pending = e.pending.slice(0, i), e.push("hardbreak", "br", 0);
    } else e.pending = e.pending.slice(0, -1), e.push("softbreak", "br", 0);
  } else e.push("softbreak", "br", 0);
  a++;
  while (a < o && r(e.src.charCodeAt(a))) a++;
  return e.pos = a, !0;
};
