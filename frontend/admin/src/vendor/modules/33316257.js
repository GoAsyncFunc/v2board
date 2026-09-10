let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e, t, n) {
  var r,
    i,
    o,
    a,
    s = -1,
    l = e.posMax,
    u = e.pos;
  e.pos = t + 1, r = 1;
  while (e.pos < l) {
    if (o = e.src.charCodeAt(e.pos), 93 === o && (r--, 0 === r)) {
      i = !0;
      break;
    }
    if (a = e.pos, e.md.inline.skipToken(e), 91 === o) if (a === e.pos - 1) r++;else if (n) return e.pos = u, -1;
  }
  return i && (s = e.pos), e.pos = u, s;
};
