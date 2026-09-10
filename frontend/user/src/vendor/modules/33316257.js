let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e, t, n) {
  var r,
    o,
    i,
    a,
    s = -1,
    c = e.posMax,
    u = e.pos;
  e.pos = t + 1, r = 1;
  while (e.pos < c) {
    if (i = e.src.charCodeAt(e.pos), 93 === i && (r--, 0 === r)) {
      o = !0;
      break;
    }
    if (a = e.pos, e.md.inline.skipToken(e), 91 === i) if (a === e.pos - 1) r++;else if (n) return e.pos = u, -1;
  }
  return o && (s = e.pos), e.pos = u, s;
};
