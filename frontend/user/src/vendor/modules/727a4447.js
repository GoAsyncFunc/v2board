let legacyModule = module,
  legacyExports = exports;
var r = require("./markdownUtils.js").isWhiteSpace,
  o = require("./markdownUtils.js").isPunctChar,
  i = require("./markdownUtils.js").isMdAsciiPunct,
  a = /['"]/,
  s = /['"]/g,
  c = "\u2019";
function u(e, t, n) {
  return e.substr(0, t) + n + e.substr(t + 1);
}
function l(e, t) {
  var n, a, l, f, p, d, h, m, v, y, g, b, w, x, O, E, _, k, S, C, j;
  for (S = [], n = 0; n < e.length; n++) {
    for (a = e[n], h = e[n].level, _ = S.length - 1; _ >= 0; _--) if (S[_].level <= h) break;
    if (S.length = _ + 1, "text" === a.type) {
      l = a.content, p = 0, d = l.length;
      e: while (p < d) {
        if (s.lastIndex = p, f = s.exec(l), !f) break;
        if (O = E = !0, p = f.index + 1, k = "'" === f[0], v = 32, f.index - 1 >= 0) v = l.charCodeAt(f.index - 1);else for (_ = n - 1; _ >= 0; _--) {
          if ("softbreak" === e[_].type || "hardbreak" === e[_].type) break;
          if (e[_].content) {
            v = e[_].content.charCodeAt(e[_].content.length - 1);
            break;
          }
        }
        if (y = 32, p < d) y = l.charCodeAt(p);else for (_ = n + 1; _ < e.length; _++) {
          if ("softbreak" === e[_].type || "hardbreak" === e[_].type) break;
          if (e[_].content) {
            y = e[_].content.charCodeAt(0);
            break;
          }
        }
        if (g = i(v) || o(String.fromCharCode(v)), b = i(y) || o(String.fromCharCode(y)), w = r(v), x = r(y), x ? O = !1 : b && (w || g || (O = !1)), w ? E = !1 : g && (x || b || (E = !1)), 34 === y && '"' === f[0] && v >= 48 && v <= 57 && (E = O = !1), O && E && (O = g, E = b), O || E) {
          if (E) for (_ = S.length - 1; _ >= 0; _--) {
            if (m = S[_], S[_].level < h) break;
            if (m.single === k && S[_].level === h) {
              m = S[_], k ? (C = t.md.options.quotes[2], j = t.md.options.quotes[3]) : (C = t.md.options.quotes[0], j = t.md.options.quotes[1]), a.content = u(a.content, f.index, j), e[m.token].content = u(e[m.token].content, m.pos, C), p += j.length - 1, m.token === n && (p += C.length - 1), l = a.content, d = l.length, S.length = _;
              continue e;
            }
          }
          O ? S.push({
            token: n,
            pos: f.index,
            single: k,
            level: h
          }) : E && k && (a.content = u(a.content, f.index, c));
        } else k && (a.content = u(a.content, f.index, c));
      }
    }
  }
}
legacyModule.exports = function (e) {
  var t;
  if (e.md.options.typographer) for (t = e.tokens.length - 1; t >= 0; t--) "inline" === e.tokens[t].type && a.test(e.tokens[t].content) && l(e.tokens[t].children, e);
};
