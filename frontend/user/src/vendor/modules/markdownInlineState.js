let legacyModule = module,
  legacyExports = exports;
var r = require("./markdownToken.js"),
  o = require("./markdownUtils.js").isWhiteSpace,
  i = require("./markdownUtils.js").isPunctChar,
  a = require("./markdownUtils.js").isMdAsciiPunct;
function s(e, t, n, r) {
  this.src = e, this.env = n, this.md = t, this.tokens = r, this.tokens_meta = Array(r.length), this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [], this._prev_delimiters = [], this.backticks = {}, this.backticksScanned = !1;
}
s.prototype.pushPending = function () {
  var e = new r("text", "", 0);
  return e.content = this.pending, e.level = this.pendingLevel, this.tokens.push(e), this.pending = "", e;
}, s.prototype.push = function (e, t, n) {
  this.pending && this.pushPending();
  var o = new r(e, t, n),
    i = null;
  return n < 0 && (this.level--, this.delimiters = this._prev_delimiters.pop()), o.level = this.level, n > 0 && (this.level++, this._prev_delimiters.push(this.delimiters), this.delimiters = [], i = {
    delimiters: this.delimiters
  }), this.pendingLevel = this.level, this.tokens.push(o), this.tokens_meta.push(i), o;
}, s.prototype.scanDelims = function (e, t) {
  var n,
    r,
    s,
    c,
    u,
    l,
    f,
    p,
    d,
    h = e,
    m = !0,
    v = !0,
    y = this.posMax,
    g = this.src.charCodeAt(e);
  n = e > 0 ? this.src.charCodeAt(e - 1) : 32;
  while (h < y && this.src.charCodeAt(h) === g) h++;
  return s = h - e, r = h < y ? this.src.charCodeAt(h) : 32, f = a(n) || i(String.fromCharCode(n)), d = a(r) || i(String.fromCharCode(r)), l = o(n), p = o(r), p ? m = !1 : d && (l || f || (m = !1)), l ? v = !1 : f && (p || d || (v = !1)), t ? (c = m, u = v) : (c = m && (!v || f), u = v && (!m || d)), {
    can_open: c,
    can_close: u,
    length: s
  };
}, s.prototype.Token = r, legacyModule.exports = s;
