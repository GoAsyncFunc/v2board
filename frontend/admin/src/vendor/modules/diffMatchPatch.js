let legacyModule = module,
  legacyExports = exports;
var n = function () {
    this.Diff_Timeout = 1, this.Diff_EditCost = 4, this.Match_Threshold = .5, this.Match_Distance = 1e3, this.Patch_DeleteThreshold = .5, this.Patch_Margin = 4, this.Match_MaxBits = 32;
  },
  r = -1,
  i = 1,
  o = 0;
n.Diff = function (e, t) {
  return [e, t];
}, n.prototype.diff_main = function (e, t, r, i) {
  "undefined" == typeof i && (i = this.Diff_Timeout <= 0 ? Number.MAX_VALUE : new Date().getTime() + 1e3 * this.Diff_Timeout);
  var a = i;
  if (null == e || null == t) throw new Error("Null input. (diff_main)");
  if (e == t) return e ? [new n.Diff(o, e)] : [];
  "undefined" == typeof r && (r = !0);
  var s = r,
    l = this.diff_commonPrefix(e, t),
    c = e.substring(0, l);
  e = e.substring(l), t = t.substring(l), l = this.diff_commonSuffix(e, t);
  var u = e.substring(e.length - l);
  e = e.substring(0, e.length - l), t = t.substring(0, t.length - l);
  var h = this.diff_compute_(e, t, s, a);
  return c && h.unshift(new n.Diff(o, c)), u && h.push(new n.Diff(o, u)), this.diff_cleanupMerge(h), h;
}, n.prototype.diff_compute_ = function (e, t, a, s) {
  var l;
  if (!e) return [new n.Diff(i, t)];
  if (!t) return [new n.Diff(r, e)];
  var c = e.length > t.length ? e : t,
    u = e.length > t.length ? t : e,
    h = c.indexOf(u);
  if (-1 != h) return l = [new n.Diff(i, c.substring(0, h)), new n.Diff(o, u), new n.Diff(i, c.substring(h + u.length))], e.length > t.length && (l[0][0] = l[2][0] = r), l;
  if (1 == u.length) return [new n.Diff(r, e), new n.Diff(i, t)];
  var f = this.diff_halfMatch_(e, t);
  if (f) {
    var d = f[0],
      p = f[1],
      m = f[2],
      g = f[3],
      v = f[4],
      y = this.diff_main(d, m, a, s),
      b = this.diff_main(p, g, a, s);
    return y.concat([new n.Diff(o, v)], b);
  }
  return a && e.length > 100 && t.length > 100 ? this.diff_lineMode_(e, t, s) : this.diff_bisect_(e, t, s);
}, n.prototype.diff_lineMode_ = function (e, t, a) {
  var s = this.diff_linesToChars_(e, t);
  e = s.chars1, t = s.chars2;
  var l = s.lineArray,
    c = this.diff_main(e, t, !1, a);
  this.diff_charsToLines_(c, l), this.diff_cleanupSemantic(c), c.push(new n.Diff(o, ""));
  var u = 0,
    h = 0,
    f = 0,
    d = "",
    p = "";
  while (u < c.length) {
    switch (c[u][0]) {
      case i:
        f++, p += c[u][1];
        break;
      case r:
        h++, d += c[u][1];
        break;
      case o:
        if (h >= 1 && f >= 1) {
          c.splice(u - h - f, h + f), u = u - h - f;
          for (var m = this.diff_main(d, p, !1, a), g = m.length - 1; g >= 0; g--) c.splice(u, 0, m[g]);
          u += m.length;
        }
        f = 0, h = 0, d = "", p = "";
        break;
    }
    u++;
  }
  return c.pop(), c;
}, n.prototype.diff_bisect_ = function (e, t, o) {
  for (var a = e.length, s = t.length, l = Math.ceil((a + s) / 2), c = l, u = 2 * l, h = new Array(u), f = new Array(u), d = 0; d < u; d++) h[d] = -1, f[d] = -1;
  h[c + 1] = 0, f[c + 1] = 0;
  for (var p = a - s, m = p % 2 != 0, g = 0, v = 0, y = 0, b = 0, w = 0; w < l; w++) {
    if (new Date().getTime() > o) break;
    for (var x = -w + g; x <= w - v; x += 2) {
      var _ = c + x;
      T = x == -w || x != w && h[_ - 1] < h[_ + 1] ? h[_ + 1] : h[_ - 1] + 1;
      var E = T - x;
      while (T < a && E < s && e.charAt(T) == t.charAt(E)) T++, E++;
      if (h[_] = T, T > a) v += 2;else if (E > s) g += 2;else if (m) {
        var S = c + p - x;
        if (S >= 0 && S < u && -1 != f[S]) {
          var k = a - f[S];
          if (T >= k) return this.diff_bisectSplit_(e, t, T, E, o);
        }
      }
    }
    for (var C = -w + y; C <= w - b; C += 2) {
      S = c + C;
      k = C == -w || C != w && f[S - 1] < f[S + 1] ? f[S + 1] : f[S - 1] + 1;
      var O = k - C;
      while (k < a && O < s && e.charAt(a - k - 1) == t.charAt(s - O - 1)) k++, O++;
      if (f[S] = k, k > a) b += 2;else if (O > s) y += 2;else if (!m) {
        _ = c + p - C;
        if (_ >= 0 && _ < u && -1 != h[_]) {
          var T = h[_];
          E = c + T - _;
          if (k = a - k, T >= k) return this.diff_bisectSplit_(e, t, T, E, o);
        }
      }
    }
  }
  return [new n.Diff(r, e), new n.Diff(i, t)];
}, n.prototype.diff_bisectSplit_ = function (e, t, n, r, i) {
  var o = e.substring(0, n),
    a = t.substring(0, r),
    s = e.substring(n),
    l = t.substring(r),
    c = this.diff_main(o, a, !1, i),
    u = this.diff_main(s, l, !1, i);
  return c.concat(u);
}, n.prototype.diff_linesToChars_ = function (e, t) {
  var n = [],
    r = {};
  function i(e) {
    var t = "",
      i = 0,
      a = -1,
      s = n.length;
    while (a < e.length - 1) {
      a = e.indexOf("\n", i), -1 == a && (a = e.length - 1);
      var l = e.substring(i, a + 1);
      (r.hasOwnProperty ? r.hasOwnProperty(l) : void 0 !== r[l]) ? t += String.fromCharCode(r[l]) : (s == o && (l = e.substring(i), a = e.length), t += String.fromCharCode(s), r[l] = s, n[s++] = l), i = a + 1;
    }
    return t;
  }
  n[0] = "";
  var o = 4e4,
    a = i(e);
  o = 65535;
  var s = i(t);
  return {
    chars1: a,
    chars2: s,
    lineArray: n
  };
}, n.prototype.diff_charsToLines_ = function (e, t) {
  for (var n = 0; n < e.length; n++) {
    for (var r = e[n][1], i = [], o = 0; o < r.length; o++) i[o] = t[r.charCodeAt(o)];
    e[n][1] = i.join("");
  }
}, n.prototype.diff_commonPrefix = function (e, t) {
  if (!e || !t || e.charAt(0) != t.charAt(0)) return 0;
  var n = 0,
    r = Math.min(e.length, t.length),
    i = r,
    o = 0;
  while (n < i) e.substring(o, i) == t.substring(o, i) ? (n = i, o = n) : r = i, i = Math.floor((r - n) / 2 + n);
  return i;
}, n.prototype.diff_commonSuffix = function (e, t) {
  if (!e || !t || e.charAt(e.length - 1) != t.charAt(t.length - 1)) return 0;
  var n = 0,
    r = Math.min(e.length, t.length),
    i = r,
    o = 0;
  while (n < i) e.substring(e.length - i, e.length - o) == t.substring(t.length - i, t.length - o) ? (n = i, o = n) : r = i, i = Math.floor((r - n) / 2 + n);
  return i;
}, n.prototype.diff_commonOverlap_ = function (e, t) {
  var n = e.length,
    r = t.length;
  if (0 == n || 0 == r) return 0;
  n > r ? e = e.substring(n - r) : n < r && (t = t.substring(0, n));
  var i = Math.min(n, r);
  if (e == t) return i;
  var o = 0,
    a = 1;
  while (1) {
    var s = e.substring(i - a),
      l = t.indexOf(s);
    if (-1 == l) return o;
    a += l, 0 != l && e.substring(i - a) != t.substring(0, a) || (o = a, a++);
  }
}, n.prototype.diff_halfMatch_ = function (e, t) {
  if (this.Diff_Timeout <= 0) return null;
  var n = e.length > t.length ? e : t,
    r = e.length > t.length ? t : e;
  if (n.length < 4 || 2 * r.length < n.length) return null;
  var i = this;
  function o(e, t, n) {
    var r,
      o,
      a,
      s,
      l = e.substring(n, n + Math.floor(e.length / 4)),
      c = -1,
      u = "";
    while (-1 != (c = t.indexOf(l, c + 1))) {
      var h = i.diff_commonPrefix(e.substring(n), t.substring(c)),
        f = i.diff_commonSuffix(e.substring(0, n), t.substring(0, c));
      u.length < f + h && (u = t.substring(c - f, c) + t.substring(c, c + h), r = e.substring(0, n - f), o = e.substring(n + h), a = t.substring(0, c - f), s = t.substring(c + h));
    }
    return 2 * u.length >= e.length ? [r, o, a, s, u] : null;
  }
  var a,
    s,
    l,
    c,
    u,
    h = o(n, r, Math.ceil(n.length / 4)),
    f = o(n, r, Math.ceil(n.length / 2));
  if (!h && !f) return null;
  a = f ? h && h[4].length > f[4].length ? h : f : h, e.length > t.length ? (s = a[0], l = a[1], c = a[2], u = a[3]) : (c = a[0], u = a[1], s = a[2], l = a[3]);
  var d = a[4];
  return [s, l, c, u, d];
}, n.prototype.diff_cleanupSemantic = function (e) {
  var t = !1,
    a = [],
    s = 0,
    l = null,
    c = 0,
    u = 0,
    h = 0,
    f = 0,
    d = 0;
  while (c < e.length) e[c][0] == o ? (a[s++] = c, u = f, h = d, f = 0, d = 0, l = e[c][1]) : (e[c][0] == i ? f += e[c][1].length : d += e[c][1].length, l && l.length <= Math.max(u, h) && l.length <= Math.max(f, d) && (e.splice(a[s - 1], 0, new n.Diff(r, l)), e[a[s - 1] + 1][0] = i, s--, s--, c = s > 0 ? a[s - 1] : -1, u = 0, h = 0, f = 0, d = 0, l = null, t = !0)), c++;
  t && this.diff_cleanupMerge(e), this.diff_cleanupSemanticLossless(e), c = 1;
  while (c < e.length) {
    if (e[c - 1][0] == r && e[c][0] == i) {
      var p = e[c - 1][1],
        m = e[c][1],
        g = this.diff_commonOverlap_(p, m),
        v = this.diff_commonOverlap_(m, p);
      g >= v ? (g >= p.length / 2 || g >= m.length / 2) && (e.splice(c, 0, new n.Diff(o, m.substring(0, g))), e[c - 1][1] = p.substring(0, p.length - g), e[c + 1][1] = m.substring(g), c++) : (v >= p.length / 2 || v >= m.length / 2) && (e.splice(c, 0, new n.Diff(o, p.substring(0, v))), e[c - 1][0] = i, e[c - 1][1] = m.substring(0, m.length - v), e[c + 1][0] = r, e[c + 1][1] = p.substring(v), c++), c++;
    }
    c++;
  }
}, n.prototype.diff_cleanupSemanticLossless = function (e) {
  function t(e, t) {
    if (!e || !t) return 6;
    var r = e.charAt(e.length - 1),
      i = t.charAt(0),
      o = r.match(n.nonAlphaNumericRegex_),
      a = i.match(n.nonAlphaNumericRegex_),
      s = o && r.match(n.whitespaceRegex_),
      l = a && i.match(n.whitespaceRegex_),
      c = s && r.match(n.linebreakRegex_),
      u = l && i.match(n.linebreakRegex_),
      h = c && e.match(n.blanklineEndRegex_),
      f = u && t.match(n.blanklineStartRegex_);
    return h || f ? 5 : c || u ? 4 : o && !s && l ? 3 : s || l ? 2 : o || a ? 1 : 0;
  }
  var r = 1;
  while (r < e.length - 1) {
    if (e[r - 1][0] == o && e[r + 1][0] == o) {
      var i = e[r - 1][1],
        a = e[r][1],
        s = e[r + 1][1],
        l = this.diff_commonSuffix(i, a);
      if (l) {
        var c = a.substring(a.length - l);
        i = i.substring(0, i.length - l), a = c + a.substring(0, a.length - l), s = c + s;
      }
      var u = i,
        h = a,
        f = s,
        d = t(i, a) + t(a, s);
      while (a.charAt(0) === s.charAt(0)) {
        i += a.charAt(0), a = a.substring(1) + s.charAt(0), s = s.substring(1);
        var p = t(i, a) + t(a, s);
        p >= d && (d = p, u = i, h = a, f = s);
      }
      e[r - 1][1] != u && (u ? e[r - 1][1] = u : (e.splice(r - 1, 1), r--), e[r][1] = h, f ? e[r + 1][1] = f : (e.splice(r + 1, 1), r--));
    }
    r++;
  }
}, n.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/, n.whitespaceRegex_ = /\s/, n.linebreakRegex_ = /[\r\n]/, n.blanklineEndRegex_ = /\n\r?\n$/, n.blanklineStartRegex_ = /^\r?\n\r?\n/, n.prototype.diff_cleanupEfficiency = function (e) {
  var t = !1,
    a = [],
    s = 0,
    l = null,
    c = 0,
    u = !1,
    h = !1,
    f = !1,
    d = !1;
  while (c < e.length) e[c][0] == o ? (e[c][1].length < this.Diff_EditCost && (f || d) ? (a[s++] = c, u = f, h = d, l = e[c][1]) : (s = 0, l = null), f = d = !1) : (e[c][0] == r ? d = !0 : f = !0, l && (u && h && f && d || l.length < this.Diff_EditCost / 2 && u + h + f + d == 3) && (e.splice(a[s - 1], 0, new n.Diff(r, l)), e[a[s - 1] + 1][0] = i, s--, l = null, u && h ? (f = d = !0, s = 0) : (s--, c = s > 0 ? a[s - 1] : -1, f = d = !1), t = !0)), c++;
  t && this.diff_cleanupMerge(e);
}, n.prototype.diff_cleanupMerge = function (e) {
  e.push(new n.Diff(o, ""));
  var t,
    a = 0,
    s = 0,
    l = 0,
    c = "",
    u = "";
  while (a < e.length) switch (e[a][0]) {
    case i:
      l++, u += e[a][1], a++;
      break;
    case r:
      s++, c += e[a][1], a++;
      break;
    case o:
      s + l > 1 ? (0 !== s && 0 !== l && (t = this.diff_commonPrefix(u, c), 0 !== t && (a - s - l > 0 && e[a - s - l - 1][0] == o ? e[a - s - l - 1][1] += u.substring(0, t) : (e.splice(0, 0, new n.Diff(o, u.substring(0, t))), a++), u = u.substring(t), c = c.substring(t)), t = this.diff_commonSuffix(u, c), 0 !== t && (e[a][1] = u.substring(u.length - t) + e[a][1], u = u.substring(0, u.length - t), c = c.substring(0, c.length - t))), a -= s + l, e.splice(a, s + l), c.length && (e.splice(a, 0, new n.Diff(r, c)), a++), u.length && (e.splice(a, 0, new n.Diff(i, u)), a++), a++) : 0 !== a && e[a - 1][0] == o ? (e[a - 1][1] += e[a][1], e.splice(a, 1)) : a++, l = 0, s = 0, c = "", u = "";
      break;
  }
  "" === e[e.length - 1][1] && e.pop();
  var h = !1;
  a = 1;
  while (a < e.length - 1) e[a - 1][0] == o && e[a + 1][0] == o && (e[a][1].substring(e[a][1].length - e[a - 1][1].length) == e[a - 1][1] ? (e[a][1] = e[a - 1][1] + e[a][1].substring(0, e[a][1].length - e[a - 1][1].length), e[a + 1][1] = e[a - 1][1] + e[a + 1][1], e.splice(a - 1, 1), h = !0) : e[a][1].substring(0, e[a + 1][1].length) == e[a + 1][1] && (e[a - 1][1] += e[a + 1][1], e[a][1] = e[a][1].substring(e[a + 1][1].length) + e[a + 1][1], e.splice(a + 1, 1), h = !0)), a++;
  h && this.diff_cleanupMerge(e);
}, n.prototype.diff_xIndex = function (e, t) {
  var n,
    o = 0,
    a = 0,
    s = 0,
    l = 0;
  for (n = 0; n < e.length; n++) {
    if (e[n][0] !== i && (o += e[n][1].length), e[n][0] !== r && (a += e[n][1].length), o > t) break;
    s = o, l = a;
  }
  return e.length != n && e[n][0] === r ? l : l + (t - s);
}, n.prototype.diff_prettyHtml = function (e) {
  for (var t = [], n = /&/g, a = /</g, s = />/g, l = /\n/g, c = 0; c < e.length; c++) {
    var u = e[c][0],
      h = e[c][1],
      f = h.replace(n, "&amp;").replace(a, "&lt;").replace(s, "&gt;").replace(l, "&para;<br>");
    switch (u) {
      case i:
        t[c] = '<ins style="background:#e6ffe6;">' + f + "</ins>";
        break;
      case r:
        t[c] = '<del style="background:#ffe6e6;">' + f + "</del>";
        break;
      case o:
        t[c] = "<span>" + f + "</span>";
        break;
    }
  }
  return t.join("");
}, n.prototype.diff_text1 = function (e) {
  for (var t = [], n = 0; n < e.length; n++) e[n][0] !== i && (t[n] = e[n][1]);
  return t.join("");
}, n.prototype.diff_text2 = function (e) {
  for (var t = [], n = 0; n < e.length; n++) e[n][0] !== r && (t[n] = e[n][1]);
  return t.join("");
}, n.prototype.diff_levenshtein = function (e) {
  for (var t = 0, n = 0, a = 0, s = 0; s < e.length; s++) {
    var l = e[s][0],
      c = e[s][1];
    switch (l) {
      case i:
        n += c.length;
        break;
      case r:
        a += c.length;
        break;
      case o:
        t += Math.max(n, a), n = 0, a = 0;
        break;
    }
  }
  return t += Math.max(n, a), t;
}, n.prototype.diff_toDelta = function (e) {
  for (var t = [], n = 0; n < e.length; n++) switch (e[n][0]) {
    case i:
      t[n] = "+" + encodeURI(e[n][1]);
      break;
    case r:
      t[n] = "-" + e[n][1].length;
      break;
    case o:
      t[n] = "=" + e[n][1].length;
      break;
  }
  return t.join("\t").replace(/%20/g, " ");
}, n.prototype.diff_fromDelta = function (e, t) {
  for (var a = [], s = 0, l = 0, c = t.split(/\t/g), u = 0; u < c.length; u++) {
    var h = c[u].substring(1);
    switch (c[u].charAt(0)) {
      case "+":
        try {
          a[s++] = new n.Diff(i, decodeURI(h));
        } catch (e) {
          throw new Error("Illegal escape in diff_fromDelta: " + h);
        }
        break;
      case "-":
      case "=":
        var f = parseInt(h, 10);
        if (isNaN(f) || f < 0) throw new Error("Invalid number in diff_fromDelta: " + h);
        var d = e.substring(l, l += f);
        "=" == c[u].charAt(0) ? a[s++] = new n.Diff(o, d) : a[s++] = new n.Diff(r, d);
        break;
      default:
        if (c[u]) throw new Error("Invalid diff operation in diff_fromDelta: " + c[u]);
    }
  }
  if (l != e.length) throw new Error("Delta length (" + l + ") does not equal source text length (" + e.length + ").");
  return a;
}, n.prototype.match_main = function (e, t, n) {
  if (null == e || null == t || null == n) throw new Error("Null input. (match_main)");
  return n = Math.max(0, Math.min(n, e.length)), e == t ? 0 : e.length ? e.substring(n, n + t.length) == t ? n : this.match_bitap_(e, t, n) : -1;
}, n.prototype.match_bitap_ = function (e, t, n) {
  if (t.length > this.Match_MaxBits) throw new Error("Pattern too long for this browser.");
  var r = this.match_alphabet_(t),
    i = this;
  function o(e, r) {
    var o = e / t.length,
      a = Math.abs(n - r);
    return i.Match_Distance ? o + a / i.Match_Distance : a ? 1 : o;
  }
  var a = this.Match_Threshold,
    s = e.indexOf(t, n);
  -1 != s && (a = Math.min(o(0, s), a), s = e.lastIndexOf(t, n + t.length), -1 != s && (a = Math.min(o(0, s), a)));
  var l,
    c,
    u = 1 << t.length - 1;
  s = -1;
  for (var h, f = t.length + e.length, d = 0; d < t.length; d++) {
    l = 0, c = f;
    while (l < c) o(d, n + c) <= a ? l = c : f = c, c = Math.floor((f - l) / 2 + l);
    f = c;
    var p = Math.max(1, n - c + 1),
      m = Math.min(n + c, e.length) + t.length,
      g = Array(m + 2);
    g[m + 1] = (1 << d) - 1;
    for (var v = m; v >= p; v--) {
      var y = r[e.charAt(v - 1)];
      if (g[v] = 0 === d ? (g[v + 1] << 1 | 1) & y : (g[v + 1] << 1 | 1) & y | (h[v + 1] | h[v]) << 1 | 1 | h[v + 1], g[v] & u) {
        var b = o(d, v - 1);
        if (b <= a) {
          if (a = b, s = v - 1, !(s > n)) break;
          p = Math.max(1, 2 * n - s);
        }
      }
    }
    if (o(d + 1, n) > a) break;
    h = g;
  }
  return s;
}, n.prototype.match_alphabet_ = function (e) {
  for (var t = {}, n = 0; n < e.length; n++) t[e.charAt(n)] = 0;
  for (n = 0; n < e.length; n++) t[e.charAt(n)] |= 1 << e.length - n - 1;
  return t;
}, n.prototype.patch_addContext_ = function (e, t) {
  if (0 != t.length) {
    if (null === e.start2) throw Error("patch not initialized");
    var r = t.substring(e.start2, e.start2 + e.length1),
      i = 0;
    while (t.indexOf(r) != t.lastIndexOf(r) && r.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin) i += this.Patch_Margin, r = t.substring(e.start2 - i, e.start2 + e.length1 + i);
    i += this.Patch_Margin;
    var a = t.substring(e.start2 - i, e.start2);
    a && e.diffs.unshift(new n.Diff(o, a));
    var s = t.substring(e.start2 + e.length1, e.start2 + e.length1 + i);
    s && e.diffs.push(new n.Diff(o, s)), e.start1 -= a.length, e.start2 -= a.length, e.length1 += a.length + s.length, e.length2 += a.length + s.length;
  }
}, n.prototype.patch_make = function (e, t, a) {
  var s, l;
  if ("string" == typeof e && "string" == typeof t && "undefined" == typeof a) s = e, l = this.diff_main(s, t, !0), l.length > 2 && (this.diff_cleanupSemantic(l), this.diff_cleanupEfficiency(l));else if (e && "object" == typeof e && "undefined" == typeof t && "undefined" == typeof a) l = e, s = this.diff_text1(l);else if ("string" == typeof e && t && "object" == typeof t && "undefined" == typeof a) s = e, l = t;else {
    if ("string" != typeof e || "string" != typeof t || !a || "object" != typeof a) throw new Error("Unknown call format to patch_make.");
    s = e, l = a;
  }
  if (0 === l.length) return [];
  for (var c = [], u = new n.patch_obj(), h = 0, f = 0, d = 0, p = s, m = s, g = 0; g < l.length; g++) {
    var v = l[g][0],
      y = l[g][1];
    switch (h || v === o || (u.start1 = f, u.start2 = d), v) {
      case i:
        u.diffs[h++] = l[g], u.length2 += y.length, m = m.substring(0, d) + y + m.substring(d);
        break;
      case r:
        u.length1 += y.length, u.diffs[h++] = l[g], m = m.substring(0, d) + m.substring(d + y.length);
        break;
      case o:
        y.length <= 2 * this.Patch_Margin && h && l.length != g + 1 ? (u.diffs[h++] = l[g], u.length1 += y.length, u.length2 += y.length) : y.length >= 2 * this.Patch_Margin && h && (this.patch_addContext_(u, p), c.push(u), u = new n.patch_obj(), h = 0, p = m, f = d);
        break;
    }
    v !== i && (f += y.length), v !== r && (d += y.length);
  }
  return h && (this.patch_addContext_(u, p), c.push(u)), c;
}, n.prototype.patch_deepCopy = function (e) {
  for (var t = [], r = 0; r < e.length; r++) {
    var i = e[r],
      o = new n.patch_obj();
    o.diffs = [];
    for (var a = 0; a < i.diffs.length; a++) o.diffs[a] = new n.Diff(i.diffs[a][0], i.diffs[a][1]);
    o.start1 = i.start1, o.start2 = i.start2, o.length1 = i.length1, o.length2 = i.length2, t[r] = o;
  }
  return t;
}, n.prototype.patch_apply = function (e, t) {
  if (0 == e.length) return [t, []];
  e = this.patch_deepCopy(e);
  var n = this.patch_addPadding(e);
  t = n + t + n, this.patch_splitMax(e);
  for (var a = 0, s = [], l = 0; l < e.length; l++) {
    var c,
      u,
      h = e[l].start2 + a,
      f = this.diff_text1(e[l].diffs),
      d = -1;
    if (f.length > this.Match_MaxBits ? (c = this.match_main(t, f.substring(0, this.Match_MaxBits), h), -1 != c && (d = this.match_main(t, f.substring(f.length - this.Match_MaxBits), h + f.length - this.Match_MaxBits), (-1 == d || c >= d) && (c = -1))) : c = this.match_main(t, f, h), -1 == c) s[l] = !1, a -= e[l].length2 - e[l].length1;else if (s[l] = !0, a = c - h, u = -1 == d ? t.substring(c, c + f.length) : t.substring(c, d + this.Match_MaxBits), f == u) t = t.substring(0, c) + this.diff_text2(e[l].diffs) + t.substring(c + f.length);else {
      var p = this.diff_main(f, u, !1);
      if (f.length > this.Match_MaxBits && this.diff_levenshtein(p) / f.length > this.Patch_DeleteThreshold) s[l] = !1;else {
        this.diff_cleanupSemanticLossless(p);
        for (var m, g = 0, v = 0; v < e[l].diffs.length; v++) {
          var y = e[l].diffs[v];
          y[0] !== o && (m = this.diff_xIndex(p, g)), y[0] === i ? t = t.substring(0, c + m) + y[1] + t.substring(c + m) : y[0] === r && (t = t.substring(0, c + m) + t.substring(c + this.diff_xIndex(p, g + y[1].length))), y[0] !== r && (g += y[1].length);
        }
      }
    }
  }
  return t = t.substring(n.length, t.length - n.length), [t, s];
}, n.prototype.patch_addPadding = function (e) {
  for (var t = this.Patch_Margin, r = "", i = 1; i <= t; i++) r += String.fromCharCode(i);
  for (i = 0; i < e.length; i++) e[i].start1 += t, e[i].start2 += t;
  var a = e[0],
    s = a.diffs;
  if (0 == s.length || s[0][0] != o) s.unshift(new n.Diff(o, r)), a.start1 -= t, a.start2 -= t, a.length1 += t, a.length2 += t;else if (t > s[0][1].length) {
    var l = t - s[0][1].length;
    s[0][1] = r.substring(s[0][1].length) + s[0][1], a.start1 -= l, a.start2 -= l, a.length1 += l, a.length2 += l;
  }
  if (a = e[e.length - 1], s = a.diffs, 0 == s.length || s[s.length - 1][0] != o) s.push(new n.Diff(o, r)), a.length1 += t, a.length2 += t;else if (t > s[s.length - 1][1].length) {
    l = t - s[s.length - 1][1].length;
    s[s.length - 1][1] += r.substring(0, l), a.length1 += l, a.length2 += l;
  }
  return r;
}, n.prototype.patch_splitMax = function (e) {
  for (var t = this.Match_MaxBits, a = 0; a < e.length; a++) if (!(e[a].length1 <= t)) {
    var s = e[a];
    e.splice(a--, 1);
    var l = s.start1,
      c = s.start2,
      u = "";
    while (0 !== s.diffs.length) {
      var h = new n.patch_obj(),
        f = !0;
      h.start1 = l - u.length, h.start2 = c - u.length, "" !== u && (h.length1 = h.length2 = u.length, h.diffs.push(new n.Diff(o, u)));
      while (0 !== s.diffs.length && h.length1 < t - this.Patch_Margin) {
        var d = s.diffs[0][0],
          p = s.diffs[0][1];
        d === i ? (h.length2 += p.length, c += p.length, h.diffs.push(s.diffs.shift()), f = !1) : d === r && 1 == h.diffs.length && h.diffs[0][0] == o && p.length > 2 * t ? (h.length1 += p.length, l += p.length, f = !1, h.diffs.push(new n.Diff(d, p)), s.diffs.shift()) : (p = p.substring(0, t - h.length1 - this.Patch_Margin), h.length1 += p.length, l += p.length, d === o ? (h.length2 += p.length, c += p.length) : f = !1, h.diffs.push(new n.Diff(d, p)), p == s.diffs[0][1] ? s.diffs.shift() : s.diffs[0][1] = s.diffs[0][1].substring(p.length));
      }
      u = this.diff_text2(h.diffs), u = u.substring(u.length - this.Patch_Margin);
      var m = this.diff_text1(s.diffs).substring(0, this.Patch_Margin);
      "" !== m && (h.length1 += m.length, h.length2 += m.length, 0 !== h.diffs.length && h.diffs[h.diffs.length - 1][0] === o ? h.diffs[h.diffs.length - 1][1] += m : h.diffs.push(new n.Diff(o, m))), f || e.splice(++a, 0, h);
    }
  }
}, n.prototype.patch_toText = function (e) {
  for (var t = [], n = 0; n < e.length; n++) t[n] = e[n];
  return t.join("");
}, n.prototype.patch_fromText = function (e) {
  var t = [];
  if (!e) return t;
  var a = e.split("\n"),
    s = 0,
    l = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
  while (s < a.length) {
    var c = a[s].match(l);
    if (!c) throw new Error("Invalid patch string: " + a[s]);
    var u = new n.patch_obj();
    t.push(u), u.start1 = parseInt(c[1], 10), "" === c[2] ? (u.start1--, u.length1 = 1) : "0" == c[2] ? u.length1 = 0 : (u.start1--, u.length1 = parseInt(c[2], 10)), u.start2 = parseInt(c[3], 10), "" === c[4] ? (u.start2--, u.length2 = 1) : "0" == c[4] ? u.length2 = 0 : (u.start2--, u.length2 = parseInt(c[4], 10)), s++;
    while (s < a.length) {
      var h = a[s].charAt(0);
      try {
        var f = decodeURI(a[s].substring(1));
      } catch (e) {
        throw new Error("Illegal escape in patch_fromText: " + f);
      }
      if ("-" == h) u.diffs.push(new n.Diff(r, f));else if ("+" == h) u.diffs.push(new n.Diff(i, f));else if (" " == h) u.diffs.push(new n.Diff(o, f));else {
        if ("@" == h) break;
        if ("" !== h) throw new Error('Invalid patch mode "' + h + '" in: ' + f);
      }
      s++;
    }
  }
  return t;
}, n.patch_obj = function () {
  this.diffs = [], this.start1 = null, this.start2 = null, this.length1 = 0, this.length2 = 0;
}, n.patch_obj.prototype.toString = function () {
  var e, t;
  e = 0 === this.length1 ? this.start1 + ",0" : 1 == this.length1 ? this.start1 + 1 : this.start1 + 1 + "," + this.length1, t = 0 === this.length2 ? this.start2 + ",0" : 1 == this.length2 ? this.start2 + 1 : this.start2 + 1 + "," + this.length2;
  for (var n, a = ["@@ -" + e + " +" + t + " @@\n"], s = 0; s < this.diffs.length; s++) {
    switch (this.diffs[s][0]) {
      case i:
        n = "+";
        break;
      case r:
        n = "-";
        break;
      case o:
        n = " ";
        break;
    }
    a[s + 1] = n + encodeURI(this.diffs[s][1]) + "\n";
  }
  return a.join("").replace(/%20/g, " ");
}, legacyModule.exports = n, legacyModule.exports["diff_match_patch"] = n, legacyModule.exports["DIFF_DELETE"] = r, legacyModule.exports["DIFF_INSERT"] = i, legacyModule.exports["DIFF_EQUAL"] = o;
