let legacyModule = module,
  legacyExports = exports;
var r = require("./53494e64.js"),
  o = [["table", require("./674e5045.js"), ["paragraph", "reference"]], ["code", require("./6e424c6b.js")], ["fence", require("./7679732b.js"), ["paragraph", "reference", "blockquote", "list"]], ["blockquote", require("./3641354a.js"), ["paragraph", "reference", "blockquote", "list"]], ["hr", require("./2f663651.js"), ["paragraph", "reference", "blockquote", "list"]], ["list", require("./537a354c.js"), ["paragraph", "reference", "blockquote"]], ["reference", require("./316e424f.js")], ["html_block", require("./58373158.js"), ["paragraph", "reference", "blockquote"]], ["heading", require("./42316a62.js"), ["paragraph", "reference", "blockquote"]], ["lheading", require("./475a3565.js")], ["paragraph", require("./524b6837.js")]];
function i() {
  this.ruler = new r();
  for (var e = 0; e < o.length; e++) this.ruler.push(o[e][0], o[e][1], {
    alt: (o[e][2] || []).slice()
  });
}
i.prototype.tokenize = function (e, t, n) {
  var r,
    o,
    i = this.ruler.getRules(""),
    a = i.length,
    s = t,
    c = !1,
    u = e.md.options.maxNesting;
  while (s < n) {
    if (e.line = s = e.skipEmptyLines(s), s >= n) break;
    if (e.sCount[s] < e.blkIndent) break;
    if (e.level >= u) {
      e.line = n;
      break;
    }
    for (o = 0; o < a; o++) if (r = i[o](e, s, n, !1), r) break;
    e.tight = !c, e.isEmpty(e.line - 1) && (c = !0), s = e.line, s < n && e.isEmpty(s) && (c = !0, s++, e.line = s);
  }
}, i.prototype.parse = function (e, t, n, r) {
  var o;
  e && (o = new this.State(e, t, n, r), this.tokenize(o, o.line, o.lineMax));
}, i.prototype.State = require("./67302b76.js"), legacyModule.exports = i;
