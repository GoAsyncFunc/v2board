let legacyModule = module,
  legacyExports = exports;
var r = require("./34664e6b.js"),
  o = require("./56776166.js").HTML_OPEN_CLOSE_TAG_RE,
  i = [[/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, !0], [/^<!--/, /-->/, !0], [/^<\?/, /\?>/, !0], [/^<![A-Z]/, />/, !0], [/^<!\[CDATA\[/, /\]\]>/, !0], [new RegExp("^</?(" + r.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0], [new RegExp(o.source + "\\s*$"), /^$/, !1]];
legacyModule.exports = function (e, t, n, r) {
  var o,
    a,
    s,
    c,
    u = e.bMarks[t] + e.tShift[t],
    l = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4) return !1;
  if (!e.md.options.html) return !1;
  if (60 !== e.src.charCodeAt(u)) return !1;
  for (c = e.src.slice(u, l), o = 0; o < i.length; o++) if (i[o][0].test(c)) break;
  if (o === i.length) return !1;
  if (r) return i[o][2];
  if (a = t + 1, !i[o][1].test(c)) for (; a < n; a++) {
    if (e.sCount[a] < e.blkIndent) break;
    if (u = e.bMarks[a] + e.tShift[a], l = e.eMarks[a], c = e.src.slice(u, l), i[o][1].test(c)) {
      0 !== c.length && a++;
      break;
    }
  }
  return e.line = a, s = e.push("html_block", "", 0), s.map = [t, a], s.content = e.getLines(t, a, e.blkIndent, !0), !0;
};
