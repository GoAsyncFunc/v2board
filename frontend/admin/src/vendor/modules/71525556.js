let legacyModule = module,
  legacyExports = exports;
var r = require("./53494e64.js"),
  i = [["normalize", require("./normalizeMarkdownSource.js")], ["block", require("./parseMarkdownBlock.js")], ["inline", require("./parseMarkdownInline.js")], ["linkify", require("./6d534630.js")], ["replacements", require("./7530714b.js")], ["smartquotes", require("./727a4447.js")]];
function o() {
  this.ruler = new r();
  for (var e = 0; e < i.length; e++) this.ruler.push(i[e][0], i[e][1]);
}
o.prototype.process = function (e) {
  var t, n, r;
  for (r = this.ruler.getRules(""), t = 0, n = r.length; t < n; t++) r[t](e);
}, o.prototype.State = require("./markdownParserState.js"), legacyModule.exports = o;
