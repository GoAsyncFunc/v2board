let legacyModule = module,
  legacyExports = exports;
var r = require("./markdownToken.js"),
  i = require("./markdownUtils.js").isWhiteSpace,
  o = require("./markdownUtils.js").isPunctChar,
  a = require("./markdownUtils.js").isMdAsciiPunct;
function s(e, t, n, r) {
  this.src = e, this.env = n, this.md = t, this.tokens = r, this.tokens_meta = Array(r.length), this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [], this._prev_delimiters = [], this.backticks = {}, this.backticksScanned = !1;
}
s.prototype.pushPending = function () {
  var e = new r("text", "", 0);
  return e.content = this.pending, e.level = this.pendingLevel, this.tokens.push(e), this.pending = "", e;
}, s.prototype.push = function (e, t, n) {
  this.pending && this.pushPending();
  var i = new r(e, t, n),
    o = null;
  return n < 0 && (this.level--, this.delimiters = this._prev_delimiters.pop()), i.level = this.level, n > 0 && (this.level++, this._prev_delimiters.push(this.delimiters), this.delimiters = [], o = {
    delimiters: this.delimiters
  }), this.pendingLevel = this.level, this.tokens.push(i), this.tokens_meta.push(o), i;
}, s.prototype.scanDelims = function (e, t) {
  var n,
    r,
    s,
    l,
    u,
    c,
    f,
    d,
    h,
    p = e,
    g = !0,
    m = !0,
    v = this.posMax,
    y = this.src.charCodeAt(e);
  n = e > 0 ? this.src.charCodeAt(e - 1) : 32;
  while (p < v && this.src.charCodeAt(p) === y) p++;
  return s = p - e, r = p < v ? this.src.charCodeAt(p) : 32, f = a(n) || o(String.fromCharCode(n)), h = a(r) || o(String.fromCharCode(r)), c = i(n), d = i(r), d ? g = !1 : h && (c || f || (g = !1)), c ? m = !1 : f && (d || h || (m = !1)), t ? (l = g, u = m) : (l = g && (!m || f), u = m && (!g || h)), {
    can_open: l,
    can_close: u,
    length: s
  };
}, s.prototype.Token = r, legacyModule.exports = s;
