let legacyModule = module,
  legacyExports = exports;
for (var r = require("./markdownUtils.js").isSpace, o = [], i = 0; i < 256; i++) o.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function (e) {
  o[e.charCodeAt(0)] = 1;
}), legacyModule.exports = function (e, t) {
  var n,
    i = e.pos,
    a = e.posMax;
  if (92 !== e.src.charCodeAt(i)) return !1;
  if (i++, i < a) {
    if (n = e.src.charCodeAt(i), n < 256 && 0 !== o[n]) return t || (e.pending += e.src[i]), e.pos += 2, !0;
    if (10 === n) {
      t || e.push("hardbreak", "br", 0), i++;
      while (i < a) {
        if (n = e.src.charCodeAt(i), !r(n)) break;
        i++;
      }
      return e.pos = i, !0;
    }
  }
  return t || (e.pending += "\\"), e.pos++, !0;
};
