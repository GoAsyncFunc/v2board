let legacyModule = module,
  legacyExports = exports;
var r = require("./56776166.js").HTML_TAG_RE;
function i(e) {
  var t = 32 | e;
  return t >= 97 && t <= 122;
}
legacyModule.exports = function (e, t) {
  var n,
    o,
    a,
    s,
    l = e.pos;
  return !!e.md.options.html && (a = e.posMax, !(60 !== e.src.charCodeAt(l) || l + 2 >= a) && (n = e.src.charCodeAt(l + 1), !(33 !== n && 63 !== n && 47 !== n && !i(n)) && (o = e.src.slice(l).match(r), !!o && (t || (s = e.push("html_inline", "", 0), s.content = e.src.slice(l, l + o[0].length)), e.pos += o[0].length, !0))));
};
