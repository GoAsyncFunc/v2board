let legacyModule = module,
  legacyExports = exports;
var r = require("./4147676d.js").isWhiteSpace,
  i = require("./4147676d.js").isPunctChar,
  o = require("./4147676d.js").isMdAsciiPunct,
  a = /['"]/,
  s = /['"]/g,
  l = "\u2019";
function u(e, t, n) {
  return e.substr(0, t) + n + e.substr(t + 1);
}
function c(e, t) {
  var n, a, c, f, d, h, p, g, m, v, y, b, x, _, w, O, S, k, j, M, C;
  for (j = [], n = 0; n < e.length; n++) {
    for (a = e[n], p = e[n].level, S = j.length - 1; S >= 0; S--) if (j[S].level <= p) break;
    if (j.length = S + 1, "text" === a.type) {
      c = a.content, d = 0, h = c.length;
      e: while (d < h) {
        if (s.lastIndex = d, f = s.exec(c), !f) break;
        if (w = O = !0, d = f.index + 1, k = "'" === f[0], m = 32, f.index - 1 >= 0) m = c.charCodeAt(f.index - 1);else for (S = n - 1; S >= 0; S--) {
          if ("softbreak" === e[S].type || "hardbreak" === e[S].type) break;
          if (e[S].content) {
            m = e[S].content.charCodeAt(e[S].content.length - 1);
            break;
          }
        }
        if (v = 32, d < h) v = c.charCodeAt(d);else for (S = n + 1; S < e.length; S++) {
          if ("softbreak" === e[S].type || "hardbreak" === e[S].type) break;
          if (e[S].content) {
            v = e[S].content.charCodeAt(0);
            break;
          }
        }
        if (y = o(m) || i(String.fromCharCode(m)), b = o(v) || i(String.fromCharCode(v)), x = r(m), _ = r(v), _ ? w = !1 : b && (x || y || (w = !1)), x ? O = !1 : y && (_ || b || (O = !1)), 34 === v && '"' === f[0] && m >= 48 && m <= 57 && (O = w = !1), w && O && (w = y, O = b), w || O) {
          if (O) for (S = j.length - 1; S >= 0; S--) {
            if (g = j[S], j[S].level < p) break;
            if (g.single === k && j[S].level === p) {
              g = j[S], k ? (M = t.md.options.quotes[2], C = t.md.options.quotes[3]) : (M = t.md.options.quotes[0], C = t.md.options.quotes[1]), a.content = u(a.content, f.index, C), e[g.token].content = u(e[g.token].content, g.pos, M), d += C.length - 1, g.token === n && (d += M.length - 1), c = a.content, h = c.length, j.length = S;
              continue e;
            }
          }
          w ? j.push({
            token: n,
            pos: f.index,
            single: k,
            level: p
          }) : O && k && (a.content = u(a.content, f.index, l));
        } else k && (a.content = u(a.content, f.index, l));
      }
    }
  }
}
legacyModule.exports = function (e) {
  var t;
  if (e.md.options.typographer) for (t = e.tokens.length - 1; t >= 0; t--) "inline" === e.tokens[t].type && a.test(e.tokens[t].content) && c(e.tokens[t].children, e);
};
