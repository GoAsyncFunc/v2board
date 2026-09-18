let legacyModule = module,
  legacyExports = exports;
var r = require("./53494e64.js"),
  i = [["text", require("./75737159.js")], ["newline", require("./516a5946.js")], ["escape", require("./6267436e.js")], ["backticks", require("./5370526d.js")], ["strikethrough", require("./6b697952.js").tokenize], ["emphasis", require("./794b6e76.js").tokenize], ["link", require("./7a512f57.js")], ["image", require("./6b79306a.js")], ["autolink", require("./4b4f794b.js")], ["html_inline", require("./markdownInlineHtmlRule.js")], ["entity", require("./57315270.js")]],
  o = [["balance_pairs", require("./6734304a.js")], ["strikethrough", require("./6b697952.js").postProcess], ["emphasis", require("./794b6e76.js").postProcess], ["text_collapse", require("./normalizeTokenLevels.js")]];
function a() {
  var e;
  for (this.ruler = new r(), e = 0; e < i.length; e++) this.ruler.push(i[e][0], i[e][1]);
  for (this.ruler2 = new r(), e = 0; e < o.length; e++) this.ruler2.push(o[e][0], o[e][1]);
}
a.prototype.skipToken = function (e) {
  var t,
    n,
    r = e.pos,
    i = this.ruler.getRules(""),
    o = i.length,
    a = e.md.options.maxNesting,
    s = e.cache;
  if ("undefined" === typeof s[r]) {
    if (e.level < a) {
      for (n = 0; n < o; n++) if (e.level++, t = i[n](e, !0), e.level--, t) break;
    } else e.pos = e.posMax;
    t || e.pos++, s[r] = e.pos;
  } else e.pos = s[r];
}, a.prototype.tokenize = function (e) {
  var t,
    n,
    r = this.ruler.getRules(""),
    i = r.length,
    o = e.posMax,
    a = e.md.options.maxNesting;
  while (e.pos < o) {
    if (e.level < a) for (n = 0; n < i; n++) if (t = r[n](e, !1), t) break;
    if (t) {
      if (e.pos >= o) break;
    } else e.pending += e.src[e.pos++];
  }
  e.pending && e.pushPending();
}, a.prototype.parse = function (e, t, n, r) {
  var i,
    o,
    a,
    s = new this.State(e, t, n, r);
  for (this.tokenize(s), o = this.ruler2.getRules(""), a = o.length, i = 0; i < a; i++) o[i](s);
}, a.prototype.State = require("./markdownInlineState.js"), legacyModule.exports = a;
