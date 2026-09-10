let legacyModule = module,
  legacyExports = exports;
var r = require("./4147676d.js").unescapeAll;
legacyModule.exports = function (e, t, n) {
  var o,
    i,
    a = 0,
    s = t,
    c = {
      ok: !1,
      pos: 0,
      lines: 0,
      str: ""
    };
  if (60 === e.charCodeAt(t)) {
    t++;
    while (t < n) {
      if (o = e.charCodeAt(t), 10 === o) return c;
      if (60 === o) return c;
      if (62 === o) return c.pos = t + 1, c.str = r(e.slice(s + 1, t)), c.ok = !0, c;
      92 === o && t + 1 < n ? t += 2 : t++;
    }
    return c;
  }
  i = 0;
  while (t < n) {
    if (o = e.charCodeAt(t), 32 === o) break;
    if (o < 32 || 127 === o) break;
    if (92 === o && t + 1 < n) {
      if (32 === e.charCodeAt(t + 1)) break;
      t += 2;
    } else {
      if (40 === o && (i++, i > 32)) return c;
      if (41 === o) {
        if (0 === i) break;
        i--;
      }
      t++;
    }
  }
  return s === t ? c : 0 !== i ? c : (c.str = r(e.slice(s, t)), c.lines = a, c.pos = t, c.ok = !0, c);
};
