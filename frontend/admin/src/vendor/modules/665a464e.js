let legacyModule = module,
  legacyExports = exports;
var r = require("./markdownUtils.js").unescapeAll;
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
  if (t >= n) return l;
  if (o = e.charCodeAt(t), 34 !== o && 39 !== o && 40 !== o) return l;
  t++, 40 === o && (o = 41);
  while (t < n) {
    if (i = e.charCodeAt(t), i === o) return l.pos = t + 1, l.lines = a, l.str = r(e.slice(s + 1, t)), l.ok = !0, l;
    if (40 === i && 41 === o) return l;
    10 === i ? a++ : 92 === i && t + 1 < n && (t++, 10 === e.charCodeAt(t) && a++), t++;
  }
  return l;
};
