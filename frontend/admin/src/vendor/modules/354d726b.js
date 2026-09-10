let legacyModule = module,
  legacyExports = exports;
var r = require("./4147676d.js").unescapeAll;
legacyModule.exports = function (e, t, n) {
  var i,
    o,
    a = 0,
    s = t,
    l = {
      ok: !1,
      pos: 0,
      lines: 0,
      str: ""
    };
  if (60 === e.charCodeAt(t)) {
    t++;
    while (t < n) {
      if (i = e.charCodeAt(t), 10 === i) return l;
      if (60 === i) return l;
      if (62 === i) return l.pos = t + 1, l.str = r(e.slice(s + 1, t)), l.ok = !0, l;
      92 === i && t + 1 < n ? t += 2 : t++;
    }
    return l;
  }
  o = 0;
  while (t < n) {
    if (i = e.charCodeAt(t), 32 === i) break;
    if (i < 32 || 127 === i) break;
    if (92 === i && t + 1 < n) {
      if (32 === e.charCodeAt(t + 1)) break;
      t += 2;
    } else {
      if (40 === i && (o++, o > 32)) return l;
      if (41 === i) {
        if (0 === o) break;
        o--;
      }
      t++;
    }
  }
  return s === t ? l : 0 !== o ? l : (l.str = r(e.slice(s, t)), l.lines = a, l.pos = t, l.ok = !0, l);
};
