let legacyModule = module,
  legacyExports = exports;
var r = require("./markdownToken.js"),
  o = require("./markdownUtils.js").isSpace;
function i(e, t, n, r) {
  var i, a, s, c, u, l, f, p;
  for (this.src = e, this.md = t, this.env = n, this.tokens = r, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.bsCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.ddIndent = -1, this.listIndent = -1, this.parentType = "root", this.level = 0, this.result = "", a = this.src, p = !1, s = c = l = f = 0, u = a.length; c < u; c++) {
    if (i = a.charCodeAt(c), !p) {
      if (o(i)) {
        l++, 9 === i ? f += 4 - f % 4 : f++;
        continue;
      }
      p = !0;
    }
    10 !== i && c !== u - 1 || (10 !== i && c++, this.bMarks.push(s), this.eMarks.push(c), this.tShift.push(l), this.sCount.push(f), this.bsCount.push(0), p = !1, l = 0, f = 0, s = c + 1);
  }
  this.bMarks.push(a.length), this.eMarks.push(a.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;
}
i.prototype.push = function (e, t, n) {
  var o = new r(e, t, n);
  return o.block = !0, n < 0 && this.level--, o.level = this.level, n > 0 && this.level++, this.tokens.push(o), o;
}, i.prototype.isEmpty = function (e) {
  return this.bMarks[e] + this.tShift[e] >= this.eMarks[e];
}, i.prototype.skipEmptyLines = function (e) {
  for (var t = this.lineMax; e < t; e++) if (this.bMarks[e] + this.tShift[e] < this.eMarks[e]) break;
  return e;
}, i.prototype.skipSpaces = function (e) {
  for (var t, n = this.src.length; e < n; e++) if (t = this.src.charCodeAt(e), !o(t)) break;
  return e;
}, i.prototype.skipSpacesBack = function (e, t) {
  if (e <= t) return e;
  while (e > t) if (!o(this.src.charCodeAt(--e))) return e + 1;
  return e;
}, i.prototype.skipChars = function (e, t) {
  for (var n = this.src.length; e < n; e++) if (this.src.charCodeAt(e) !== t) break;
  return e;
}, i.prototype.skipCharsBack = function (e, t, n) {
  if (e <= n) return e;
  while (e > n) if (t !== this.src.charCodeAt(--e)) return e + 1;
  return e;
}, i.prototype.getLines = function (e, t, n, r) {
  var i,
    a,
    s,
    c,
    u,
    l,
    f,
    p = e;
  if (e >= t) return "";
  for (l = new Array(t - e), i = 0; p < t; p++, i++) {
    a = 0, f = c = this.bMarks[p], u = p + 1 < t || r ? this.eMarks[p] + 1 : this.eMarks[p];
    while (c < u && a < n) {
      if (s = this.src.charCodeAt(c), o(s)) 9 === s ? a += 4 - (a + this.bsCount[p]) % 4 : a++;else {
        if (!(c - f < this.tShift[p])) break;
        a++;
      }
      c++;
    }
    l[i] = a > n ? new Array(a - n + 1).join(" ") + this.src.slice(c, u) : this.src.slice(c, u);
  }
  return l.join("");
}, i.prototype.Token = r, legacyModule.exports = i;
