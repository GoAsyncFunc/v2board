let legacyModule = module,
  legacyExports = exports;
var r = require("./markdownToken.js"),
  i = require("./markdownUtils.js").isSpace;
function o(e, t, n, r) {
  var o, a, s, l, u, c, f, d;
  for (this.src = e, this.md = t, this.env = n, this.tokens = r, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.bsCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.ddIndent = -1, this.listIndent = -1, this.parentType = "root", this.level = 0, this.result = "", a = this.src, d = !1, s = l = c = f = 0, u = a.length; l < u; l++) {
    if (o = a.charCodeAt(l), !d) {
      if (i(o)) {
        c++, 9 === o ? f += 4 - f % 4 : f++;
        continue;
      }
      d = !0;
    }
    10 !== o && l !== u - 1 || (10 !== o && l++, this.bMarks.push(s), this.eMarks.push(l), this.tShift.push(c), this.sCount.push(f), this.bsCount.push(0), d = !1, c = 0, f = 0, s = l + 1);
  }
  this.bMarks.push(a.length), this.eMarks.push(a.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;
}
o.prototype.push = function (e, t, n) {
  var i = new r(e, t, n);
  return i.block = !0, n < 0 && this.level--, i.level = this.level, n > 0 && this.level++, this.tokens.push(i), i;
}, o.prototype.isEmpty = function (e) {
  return this.bMarks[e] + this.tShift[e] >= this.eMarks[e];
}, o.prototype.skipEmptyLines = function (e) {
  for (var t = this.lineMax; e < t; e++) if (this.bMarks[e] + this.tShift[e] < this.eMarks[e]) break;
  return e;
}, o.prototype.skipSpaces = function (e) {
  for (var t, n = this.src.length; e < n; e++) if (t = this.src.charCodeAt(e), !i(t)) break;
  return e;
}, o.prototype.skipSpacesBack = function (e, t) {
  if (e <= t) return e;
  while (e > t) if (!i(this.src.charCodeAt(--e))) return e + 1;
  return e;
}, o.prototype.skipChars = function (e, t) {
  for (var n = this.src.length; e < n; e++) if (this.src.charCodeAt(e) !== t) break;
  return e;
}, o.prototype.skipCharsBack = function (e, t, n) {
  if (e <= n) return e;
  while (e > n) if (t !== this.src.charCodeAt(--e)) return e + 1;
  return e;
}, o.prototype.getLines = function (e, t, n, r) {
  var o,
    a,
    s,
    l,
    u,
    c,
    f,
    d = e;
  if (e >= t) return "";
  for (c = new Array(t - e), o = 0; d < t; d++, o++) {
    a = 0, f = l = this.bMarks[d], u = d + 1 < t || r ? this.eMarks[d] + 1 : this.eMarks[d];
    while (l < u && a < n) {
      if (s = this.src.charCodeAt(l), i(s)) 9 === s ? a += 4 - (a + this.bsCount[d]) % 4 : a++;else {
        if (!(l - f < this.tShift[d])) break;
        a++;
      }
      l++;
    }
    c[o] = a > n ? new Array(a - n + 1).join(" ") + this.src.slice(l, u) : this.src.slice(l, u);
  }
  return c.join("");
}, o.prototype.Token = r, legacyModule.exports = o;
