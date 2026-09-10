let legacyModule = module,
  legacyExports = exports;
for (var r = require("./4147676d.js").isSpace, i = [], o = 0; o < 256; o++) i.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function (e) {
  i[e.charCodeAt(0)] = 1;
}), legacyModule.exports = function (e, t) {
  var n,
    o = e.pos,
    a = e.posMax;
  if (92 !== e.src.charCodeAt(o)) return !1;
  if (o++, o < a) {
    if (n = e.src.charCodeAt(o), n < 256 && 0 !== i[n]) return t || (e.pending += e.src[o]), e.pos += 2, !0;
    if (10 === n) {
      t || e.push("hardbreak", "br", 0), o++;
      while (o < a) {
        if (n = e.src.charCodeAt(o), !r(n)) break;
        o++;
      }
      return e.pos = o, !0;
    }
  }
  return t || (e.pending += "\\"), e.pos++, !0;
};
