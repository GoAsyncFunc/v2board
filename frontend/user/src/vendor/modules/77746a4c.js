let legacyModule = module,
  legacyExports = exports;
var r = require("./56776166.js").HTML_TAG_RE;
function o(e) {
  var t = 32 | e;
  return t >= 97 && t <= 122;
}
legacyModule.exports = function (e, t) {
  var n,
    i,
    a,
    s,
    c = e.pos;
  return !!e.md.options.html && (a = e.posMax, !(60 !== e.src.charCodeAt(c) || c + 2 >= a) && (n = e.src.charCodeAt(c + 1), !(33 !== n && 63 !== n && 47 !== n && !o(n)) && (i = e.src.slice(c).match(r), !!i && (t || (s = e.push("html_inline", "", 0), s.content = e.src.slice(c, c + i[0].length)), e.pos += i[0].length, !0))));
};
