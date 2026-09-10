let legacyModule = module,
  legacyExports = exports;
var r = require("./6634786f.js"),
  o = require("./72636e59.js"),
  i = require("./7755384a.js"),
  a = require("./49713135.js"),
  s = require("./64575353.js");
function c(e, t) {
  this.typeNumber = e, this.errorCorrectLevel = t, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = [];
}
var u = c.prototype;
u.addData = function (e) {
  var t = new r(e);
  this.dataList.push(t), this.dataCache = null;
}, u.isDark = function (e, t) {
  if (e < 0 || this.moduleCount <= e || t < 0 || this.moduleCount <= t) throw new Error(e + "," + t);
  return this.modules[e][t];
}, u.getModuleCount = function () {
  return this.moduleCount;
}, u.make = function () {
  if (this.typeNumber < 1) {
    var e = 1;
    for (e = 1; e < 40; e++) {
      for (var t = o.getRSBlocks(e, this.errorCorrectLevel), n = new i(), r = 0, s = 0; s < t.length; s++) r += t[s].dataCount;
      for (s = 0; s < this.dataList.length; s++) {
        var c = this.dataList[s];
        n.put(c.mode, 4), n.put(c.getLength(), a.getLengthInBits(c.mode, e)), c.write(n);
      }
      if (n.getLengthInBits() <= 8 * r) break;
    }
    this.typeNumber = e;
  }
  this.makeImpl(!1, this.getBestMaskPattern());
}, u.makeImpl = function (e, t) {
  this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
  for (var n = 0; n < this.moduleCount; n++) {
    this.modules[n] = new Array(this.moduleCount);
    for (var r = 0; r < this.moduleCount; r++) this.modules[n][r] = null;
  }
  this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(e, t), this.typeNumber >= 7 && this.setupTypeNumber(e), null == this.dataCache && (this.dataCache = c.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, t);
}, u.setupPositionProbePattern = function (e, t) {
  for (var n = -1; n <= 7; n++) if (!(e + n <= -1 || this.moduleCount <= e + n)) for (var r = -1; r <= 7; r++) t + r <= -1 || this.moduleCount <= t + r || (this.modules[e + n][t + r] = 0 <= n && n <= 6 && (0 == r || 6 == r) || 0 <= r && r <= 6 && (0 == n || 6 == n) || 2 <= n && n <= 4 && 2 <= r && r <= 4);
}, u.getBestMaskPattern = function () {
  for (var e = 0, t = 0, n = 0; n < 8; n++) {
    this.makeImpl(!0, n);
    var r = a.getLostPoint(this);
    (0 == n || e > r) && (e = r, t = n);
  }
  return t;
}, u.createMovieClip = function (e, t, n) {
  var r = e.createEmptyMovieClip(t, n),
    o = 1;
  this.make();
  for (var i = 0; i < this.modules.length; i++) for (var a = i * o, s = 0; s < this.modules[i].length; s++) {
    var c = s * o,
      u = this.modules[i][s];
    u && (r.beginFill(0, 100), r.moveTo(c, a), r.lineTo(c + o, a), r.lineTo(c + o, a + o), r.lineTo(c, a + o), r.endFill());
  }
  return r;
}, u.setupTimingPattern = function () {
  for (var e = 8; e < this.moduleCount - 8; e++) null == this.modules[e][6] && (this.modules[e][6] = e % 2 == 0);
  for (var t = 8; t < this.moduleCount - 8; t++) null == this.modules[6][t] && (this.modules[6][t] = t % 2 == 0);
}, u.setupPositionAdjustPattern = function () {
  for (var e = a.getPatternPosition(this.typeNumber), t = 0; t < e.length; t++) for (var n = 0; n < e.length; n++) {
    var r = e[t],
      o = e[n];
    if (null == this.modules[r][o]) for (var i = -2; i <= 2; i++) for (var s = -2; s <= 2; s++) this.modules[r + i][o + s] = -2 == i || 2 == i || -2 == s || 2 == s || 0 == i && 0 == s;
  }
}, u.setupTypeNumber = function (e) {
  for (var t = a.getBCHTypeNumber(this.typeNumber), n = 0; n < 18; n++) {
    var r = !e && 1 == (t >> n & 1);
    this.modules[Math.floor(n / 3)][n % 3 + this.moduleCount - 8 - 3] = r;
  }
  for (n = 0; n < 18; n++) {
    r = !e && 1 == (t >> n & 1);
    this.modules[n % 3 + this.moduleCount - 8 - 3][Math.floor(n / 3)] = r;
  }
}, u.setupTypeInfo = function (e, t) {
  for (var n = this.errorCorrectLevel << 3 | t, r = a.getBCHTypeInfo(n), o = 0; o < 15; o++) {
    var i = !e && 1 == (r >> o & 1);
    o < 6 ? this.modules[o][8] = i : o < 8 ? this.modules[o + 1][8] = i : this.modules[this.moduleCount - 15 + o][8] = i;
  }
  for (o = 0; o < 15; o++) {
    i = !e && 1 == (r >> o & 1);
    o < 8 ? this.modules[8][this.moduleCount - o - 1] = i : o < 9 ? this.modules[8][15 - o - 1 + 1] = i : this.modules[8][15 - o - 1] = i;
  }
  this.modules[this.moduleCount - 8][8] = !e;
}, u.mapData = function (e, t) {
  for (var n = -1, r = this.moduleCount - 1, o = 7, i = 0, s = this.moduleCount - 1; s > 0; s -= 2) {
    6 == s && s--;
    while (1) {
      for (var c = 0; c < 2; c++) if (null == this.modules[r][s - c]) {
        var u = !1;
        i < e.length && (u = 1 == (e[i] >>> o & 1));
        var l = a.getMask(t, r, s - c);
        l && (u = !u), this.modules[r][s - c] = u, o--, -1 == o && (i++, o = 7);
      }
      if (r += n, r < 0 || this.moduleCount <= r) {
        r -= n, n = -n;
        break;
      }
    }
  }
}, c.PAD0 = 236, c.PAD1 = 17, c.createData = function (e, t, n) {
  for (var r = o.getRSBlocks(e, t), s = new i(), u = 0; u < n.length; u++) {
    var l = n[u];
    s.put(l.mode, 4), s.put(l.getLength(), a.getLengthInBits(l.mode, e)), l.write(s);
  }
  var f = 0;
  for (u = 0; u < r.length; u++) f += r[u].dataCount;
  if (s.getLengthInBits() > 8 * f) throw new Error("code length overflow. (" + s.getLengthInBits() + ">" + 8 * f + ")");
  s.getLengthInBits() + 4 <= 8 * f && s.put(0, 4);
  while (s.getLengthInBits() % 8 != 0) s.putBit(!1);
  while (1) {
    if (s.getLengthInBits() >= 8 * f) break;
    if (s.put(c.PAD0, 8), s.getLengthInBits() >= 8 * f) break;
    s.put(c.PAD1, 8);
  }
  return c.createBytes(s, r);
}, c.createBytes = function (e, t) {
  for (var n = 0, r = 0, o = 0, i = new Array(t.length), c = new Array(t.length), u = 0; u < t.length; u++) {
    var l = t[u].dataCount,
      f = t[u].totalCount - l;
    r = Math.max(r, l), o = Math.max(o, f), i[u] = new Array(l);
    for (var p = 0; p < i[u].length; p++) i[u][p] = 255 & e.buffer[p + n];
    n += l;
    var d = a.getErrorCorrectPolynomial(f),
      h = new s(i[u], d.getLength() - 1),
      m = h.mod(d);
    c[u] = new Array(d.getLength() - 1);
    for (p = 0; p < c[u].length; p++) {
      var v = p + m.getLength() - c[u].length;
      c[u][p] = v >= 0 ? m.get(v) : 0;
    }
  }
  var y = 0;
  for (p = 0; p < t.length; p++) y += t[p].totalCount;
  var g = new Array(y),
    b = 0;
  for (p = 0; p < r; p++) for (u = 0; u < t.length; u++) p < i[u].length && (g[b++] = i[u][p]);
  for (p = 0; p < o; p++) for (u = 0; u < t.length; u++) p < c[u].length && (g[b++] = c[u][p]);
  return g;
}, legacyModule.exports = c;
