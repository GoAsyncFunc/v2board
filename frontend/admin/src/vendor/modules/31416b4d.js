let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return h;
}), defineExport(legacyExports, "b", function () {
  return m;
});
var r = require("./586e6237.js"),
  i = require("./62597459.js"),
  o = require("./36477258.js"),
  a = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g;
function s(e, t, n, r, i) {
  if (!t) return "";
  var o = (e + "").split("\n");
  i = l(t, n, r, i);
  for (var a = 0, s = o.length; a < s; a++) o[a] = c(o[a], i);
  return o.join("\n");
}
function l(e, t, n, r) {
  r = r || {};
  var a = Object(i["l"])({}, r);
  a.font = t, n = Object(i["K"])(n, "..."), a.maxIterations = Object(i["K"])(r.maxIterations, 2);
  var s = a.minChar = Object(i["K"])(r.minChar, 0);
  a.cnCharWidth = Object(o["f"])("\u56fd", t);
  var l = a.ascCharWidth = Object(o["f"])("a", t);
  a.placeholder = Object(i["K"])(r.placeholder, "");
  for (var c = e = Math.max(0, e - 1), u = 0; u < s && c >= l; u++) c -= l;
  var h = Object(o["f"])(n, t);
  return h > c && (n = "", h = 0), c = e - h, a.ellipsis = n, a.ellipsisWidth = h, a.contentWidth = c, a.containerWidth = e, a;
}
function c(e, t) {
  var n = t.containerWidth,
    r = t.font,
    i = t.contentWidth;
  if (!n) return "";
  var a = Object(o["f"])(e, r);
  if (a <= n) return e;
  for (var s = 0;; s++) {
    if (a <= i || s >= t.maxIterations) {
      e += t.ellipsis;
      break;
    }
    var l = 0 === s ? u(e, i, t.ascCharWidth, t.cnCharWidth) : a > 0 ? Math.floor(e.length * i / a) : 0;
    e = e.substr(0, l), a = Object(o["f"])(e, r);
  }
  return "" === e && (e = t.placeholder), e;
}
function u(e, t, n, r) {
  for (var i = 0, o = 0, a = e.length; o < a && i < t; o++) {
    var s = e.charCodeAt(o);
    i += 0 <= s && s <= 127 ? n : r;
  }
  return o;
}
function h(e, t) {
  null != e && (e += "");
  var n,
    r = t.overflow,
    a = t.padding,
    s = t.font,
    u = "truncate" === r,
    h = Object(o["e"])(s),
    f = Object(i["K"])(t.lineHeight, h),
    d = !!t.backgroundColor,
    p = "truncate" === t.lineOverflow,
    m = t.width;
  n = null == m || "break" !== r && "breakAll" !== r ? e ? e.split("\n") : [] : e ? w(e, t.font, m, "breakAll" === r, 0).lines : [];
  var g = n.length * f,
    v = Object(i["K"])(t.height, g);
  if (g > v && p) {
    var y = Math.floor(v / f);
    n = n.slice(0, y);
  }
  if (e && u && null != m) for (var b = l(m, s, t.ellipsis, {
      minChar: t.truncateMinChar,
      placeholder: t.placeholder
    }), x = 0; x < n.length; x++) n[x] = c(n[x], b);
  var _ = v,
    E = 0;
  for (x = 0; x < n.length; x++) E = Math.max(Object(o["f"])(n[x], s), E);
  null == m && (m = E);
  var S = E;
  return a && (_ += a[0] + a[2], S += a[1] + a[3], m += a[1] + a[3]), d && (S = m), {
    lines: n,
    height: v,
    outerWidth: S,
    outerHeight: _,
    lineHeight: f,
    calculatedLineHeight: h,
    contentWidth: E,
    contentHeight: g,
    width: m
  };
}
var f = function () {
    function e() {}
    return e;
  }(),
  d = function () {
    function e(e) {
      this.tokens = [], e && (this.tokens = e);
    }
    return e;
  }(),
  p = function () {
    function e() {
      this.width = 0, this.height = 0, this.contentWidth = 0, this.contentHeight = 0, this.outerWidth = 0, this.outerHeight = 0, this.lines = [];
    }
    return e;
  }();
function m(e, t) {
  var n = new p();
  if (null != e && (e += ""), !e) return n;
  var l,
    c = t.width,
    u = t.height,
    h = t.overflow,
    f = "break" !== h && "breakAll" !== h || null == c ? null : {
      width: c,
      accumWidth: 0,
      breakAll: "breakAll" === h
    },
    d = a.lastIndex = 0;
  while (null != (l = a.exec(e))) {
    var m = l.index;
    m > d && g(n, e.substring(d, m), t, f), g(n, l[2], t, f, l[1]), d = a.lastIndex;
  }
  d < e.length && g(n, e.substring(d, e.length), t, f);
  var v = [],
    y = 0,
    b = 0,
    w = t.padding,
    x = "truncate" === h,
    _ = "truncate" === t.lineOverflow;
  function E(e, t, n) {
    e.width = t, e.lineHeight = n, y += n, b = Math.max(b, t);
  }
  e: for (var S = 0; S < n.lines.length; S++) {
    for (var k = n.lines[S], C = 0, O = 0, T = 0; T < k.tokens.length; T++) {
      var L = k.tokens[T],
        A = L.styleName && t.rich[L.styleName] || {},
        P = L.textPadding = A.padding,
        j = P ? P[1] + P[3] : 0,
        M = L.font = A.font || t.font;
      L.contentHeight = Object(o["e"])(M);
      var R = Object(i["K"])(A.height, L.contentHeight);
      if (L.innerHeight = R, P && (R += P[0] + P[2]), L.height = R, L.lineHeight = Object(i["L"])(A.lineHeight, t.lineHeight, R), L.align = A && A.align || t.align, L.verticalAlign = A && A.verticalAlign || "middle", _ && null != u && y + L.lineHeight > u) {
        T > 0 ? (k.tokens = k.tokens.slice(0, T), E(k, O, C), n.lines = n.lines.slice(0, S + 1)) : n.lines = n.lines.slice(0, S);
        break e;
      }
      var N = A.width,
        D = null == N || "auto" === N;
      if ("string" === typeof N && "%" === N.charAt(N.length - 1)) L.percentWidth = N, v.push(L), L.contentWidth = Object(o["f"])(L.text, M);else {
        if (D) {
          var I = A.backgroundColor,
            $ = I && I.image;
          $ && ($ = r["b"]($), r["c"]($) && (L.width = Math.max(L.width, $.width * R / $.height)));
        }
        var F = x && null != c ? c - O : null;
        null != F && F < L.width ? !D || F < j ? (L.text = "", L.width = L.contentWidth = 0) : (L.text = s(L.text, F - j, M, t.ellipsis, {
          minChar: t.truncateMinChar
        }), L.width = L.contentWidth = Object(o["f"])(L.text, M)) : L.contentWidth = Object(o["f"])(L.text, M);
      }
      L.width += j, O += L.width, A && (C = Math.max(C, L.lineHeight));
    }
    E(k, O, C);
  }
  n.outerWidth = n.width = Object(i["K"])(c, b), n.outerHeight = n.height = Object(i["K"])(u, y), n.contentHeight = y, n.contentWidth = b, w && (n.outerWidth += w[1] + w[3], n.outerHeight += w[0] + w[2]);
  for (S = 0; S < v.length; S++) {
    L = v[S];
    var B = L.percentWidth;
    L.width = parseInt(B, 10) / 100 * n.width;
  }
  return n;
}
function g(e, t, n, r, i) {
  var a,
    s,
    l = "" === t,
    c = i && n.rich[i] || {},
    u = e.lines,
    h = c.font || n.font,
    p = !1;
  if (r) {
    var m = c.padding,
      g = m ? m[1] + m[3] : 0;
    if (null != c.width && "auto" !== c.width) {
      var v = Object(o["g"])(c.width, r.width) + g;
      u.length > 0 && v + r.accumWidth > r.width && (a = t.split("\n"), p = !0), r.accumWidth = v;
    } else {
      var y = w(t, h, r.width, r.breakAll, r.accumWidth);
      r.accumWidth = y.accumWidth + g, s = y.linesWidths, a = y.lines;
    }
  } else a = t.split("\n");
  for (var b = 0; b < a.length; b++) {
    var x = a[b],
      _ = new f();
    if (_.styleName = i, _.text = x, _.isLineHolder = !x && !l, "number" === typeof c.width ? _.width = c.width : _.width = s ? s[b] : Object(o["f"])(x, h), b || p) u.push(new d([_]));else {
      var E = (u[u.length - 1] || (u[0] = new d())).tokens,
        S = E.length;
      1 === S && E[0].isLineHolder ? E[0] = _ : (x || !S || l) && E.push(_);
    }
  }
}
function v(e) {
  var t = e.charCodeAt(0);
  return t >= 33 && t <= 383;
}
var y = Object(i["I"])(",&?/;] ".split(""), function (e, t) {
  return e[t] = !0, e;
}, {});
function b(e) {
  return !v(e) || !!y[e];
}
function w(e, t, n, r, i) {
  for (var a = [], s = [], l = "", c = "", u = 0, h = 0, f = 0; f < e.length; f++) {
    var d = e.charAt(f);
    if ("\n" !== d) {
      var p = Object(o["f"])(d, t),
        m = !r && !b(d);
      (a.length ? h + p > n : i + h + p > n) ? h ? (l || c) && (m ? (l || (l = c, c = "", u = 0, h = u), a.push(l), s.push(h - u), c += d, u += p, l = "", h = u) : (c && (l += c, c = "", u = 0), a.push(l), s.push(h), l = d, h = p)) : m ? (a.push(c), s.push(u), c = d, u = p) : (a.push(d), s.push(p)) : (h += p, m ? (c += d, u += p) : (c && (l += c, c = "", u = 0), l += d));
    } else c && (l += c, h += u), a.push(l), s.push(h), l = "", c = "", u = 0, h = 0;
  }
  return a.length || l || (l = e, c = "", u = 0), c && (l += c), l && (a.push(l), s.push(h)), 1 === a.length && (h += i), {
    accumWidth: h,
    lines: a,
    linesWidths: s
  };
}
