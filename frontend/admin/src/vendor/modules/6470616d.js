let legacyModule = module,
  legacyExports = exports;
var r = require("./53494e64.js"),
  i = [["table", require("./674e5045.js"), ["paragraph", "reference"]], ["code", require("./6e424c6b.js")], ["fence", require("./7679732b.js"), ["paragraph", "reference", "blockquote", "list"]], ["blockquote", require("./3641354a.js"), ["paragraph", "reference", "blockquote", "list"]], ["hr", require("./2f663651.js"), ["paragraph", "reference", "blockquote", "list"]], ["list", require("./537a354c.js"), ["paragraph", "reference", "blockquote"]], ["reference", require("./316e424f.js")], ["html_block", require("./58373158.js"), ["paragraph", "reference", "blockquote"]], ["heading", require("./42316a62.js"), ["paragraph", "reference", "blockquote"]], ["lheading", require("./475a3565.js")], ["paragraph", require("./524b6837.js")]];
function o() {
  this.ruler = new r();
  for (var e = 0; e < i.length; e++) this.ruler.push(i[e][0], i[e][1], {
    alt: (i[e][2] || []).slice()
  });
}
o.prototype.tokenize = function (e, t, n) {
  var r,
    i,
    o = this.ruler.getRules(""),
    a = o.length,
    s = t,
    l = !1,
    u = e.md.options.maxNesting;
  while (s < n) {
    if (e.line = s = e.skipEmptyLines(s), s >= n) break;
    if (e.sCount[s] < e.blkIndent) break;
    if (e.level >= u) {
      e.line = n;
      break;
    }
    for (i = 0; i < a; i++) if (r = o[i](e, s, n, !1), r) break;
    e.tight = !l, e.isEmpty(e.line - 1) && (l = !0), s = e.line, s < n && e.isEmpty(s) && (l = !0, s++, e.line = s);
  }
}, o.prototype.parse = function (e, t, n, r) {
  var i;
  e && (i = new this.State(e, t, n, r), this.tokenize(i, i.line, i.lineMax));
}, o.prototype.State = require("./67302b76.js"), legacyModule.exports = o;
