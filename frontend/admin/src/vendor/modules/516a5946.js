let legacyModule = module,
  legacyExports = exports;
var r = require("./markdownUtils.js").isSpace;
legacyModule.exports = function (e, t) {
  var n,
    i,
    o,
    a = e.pos;
  if (10 !== e.src.charCodeAt(a)) return !1;
  if (n = e.pending.length - 1, i = e.posMax, !t) if (n >= 0 && 32 === e.pending.charCodeAt(n)) {
    if (n >= 1 && 32 === e.pending.charCodeAt(n - 1)) {
      o = n - 1;
      while (o >= 1 && 32 === e.pending.charCodeAt(o - 1)) o--;
      e.pending = e.pending.slice(0, o), e.push("hardbreak", "br", 0);
    } else e.pending = e.pending.slice(0, -1), e.push("softbreak", "br", 0);
  } else e.push("softbreak", "br", 0);
  a++;
  while (a < i && r(e.src.charCodeAt(a))) a++;
  return e.pos = a, !0;
};
