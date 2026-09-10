let legacyModule = module,
  legacyExports = exports;
var r = require("./34664e6b.js"),
  i = require("./56776166.js").HTML_OPEN_CLOSE_TAG_RE,
  o = [[/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, !0], [/^<!--/, /-->/, !0], [/^<\?/, /\?>/, !0], [/^<![A-Z]/, />/, !0], [/^<!\[CDATA\[/, /\]\]>/, !0], [new RegExp("^</?(" + r.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0], [new RegExp(i.source + "\\s*$"), /^$/, !1]];
legacyModule.exports = function (e, t, n, r) {
  var i,
    a,
    s,
    l,
    u = e.bMarks[t] + e.tShift[t],
    c = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  if (!e.md.options.html) return !1;
  if (60 !== e.src.charCodeAt(u)) return !1;
  for (l = e.src.slice(u, c), i = 0; i < o.length; i++) if (o[i][0].test(l)) break;
  if (i === o.length) return !1;
  if (r) return o[i][2];
  if (a = t + 1, !o[i][1].test(l)) for (; a < n; a++) {
    if (e.sCount[a] < e.blkIndent) break;
    if (u = e.bMarks[a] + e.tShift[a], c = e.eMarks[a], l = e.src.slice(u, c), o[i][1].test(l)) {
      0 !== l.length && a++;
      break;
    }
  }
  return e.line = a, s = e.push("html_block", "", 0), s.map = [t, a], s.content = e.getLines(t, a, e.blkIndent, !0), !0;
};
