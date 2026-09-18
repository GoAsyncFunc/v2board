let legacyModule = module,
  legacyExports = exports;
var r = require("./markdownUtils.js").unescapeAll;
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
  if (t >= n) return c;
  if (i = e.charCodeAt(t), 34 !== i && 39 !== i && 40 !== i) return c;
  t++, 40 === i && (i = 41);
  while (t < n) {
    if (o = e.charCodeAt(t), o === i) return c.pos = t + 1, c.lines = a, c.str = r(e.slice(s + 1, t)), c.ok = !0, c;
    if (40 === o && 41 === i) return c;
    10 === o ? a++ : 92 === o && t + 1 < n && (t++, 10 === e.charCodeAt(t) && a++), t++;
  }
  return c;
};
