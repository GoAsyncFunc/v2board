let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return f;
});
var r = 32,
  i = 7;
function o(e) {
  var t = 0;
  while (e >= r) t |= 1 & e, e >>= 1;
  return e + t;
}
function a(e, t, n, r) {
  var i = t + 1;
  if (i === n) return 1;
  if (r(e[i++], e[t]) < 0) {
    while (i < n && r(e[i], e[i - 1]) < 0) i++;
    s(e, t, i);
  } else while (i < n && r(e[i], e[i - 1]) >= 0) i++;
  return i - t;
}
function s(e, t, n) {
  n--;
  while (t < n) {
    var r = e[t];
    e[t++] = e[n], e[n--] = r;
  }
}
function l(e, t, n, r, i) {
  for (r === t && r++; r < n; r++) {
    var o,
      a = e[r],
      s = t,
      l = r;
    while (s < l) o = s + l >>> 1, i(a, e[o]) < 0 ? l = o : s = o + 1;
    var c = r - s;
    switch (c) {
      case 3:
        e[s + 3] = e[s + 2];
      case 2:
        e[s + 2] = e[s + 1];
      case 1:
        e[s + 1] = e[s];
        break;
      default:
        while (c > 0) e[s + c] = e[s + c - 1], c--;
    }
    e[s] = a;
  }
}
function c(e, t, n, r, i, o) {
  var a = 0,
    s = 0,
    l = 1;
  if (o(e, t[n + i]) > 0) {
    s = r - i;
    while (l < s && o(e, t[n + i + l]) > 0) a = l, l = 1 + (l << 1), l <= 0 && (l = s);
    l > s && (l = s), a += i, l += i;
  } else {
    s = i + 1;
    while (l < s && o(e, t[n + i - l]) <= 0) a = l, l = 1 + (l << 1), l <= 0 && (l = s);
    l > s && (l = s);
    var c = a;
    a = i - l, l = i - c;
  }
  a++;
  while (a < l) {
    var u = a + (l - a >>> 1);
    o(e, t[n + u]) > 0 ? a = u + 1 : l = u;
  }
  return l;
}
function u(e, t, n, r, i, o) {
  var a = 0,
    s = 0,
    l = 1;
  if (o(e, t[n + i]) < 0) {
    s = i + 1;
    while (l < s && o(e, t[n + i - l]) < 0) a = l, l = 1 + (l << 1), l <= 0 && (l = s);
    l > s && (l = s);
    var c = a;
    a = i - l, l = i - c;
  } else {
    s = r - i;
    while (l < s && o(e, t[n + i + l]) >= 0) a = l, l = 1 + (l << 1), l <= 0 && (l = s);
    l > s && (l = s), a += i, l += i;
  }
  a++;
  while (a < l) {
    var u = a + (l - a >>> 1);
    o(e, t[n + u]) < 0 ? l = u : a = u + 1;
  }
  return l;
}
function h(e, t) {
  var n,
    r,
    o = i,
    a = 0,
    s = 0;
  a = e.length;
  var l = [];
  function h(e, t) {
    n[s] = e, r[s] = t, s += 1;
  }
  function f() {
    while (s > 1) {
      var e = s - 2;
      if (e >= 1 && r[e - 1] <= r[e] + r[e + 1] || e >= 2 && r[e - 2] <= r[e] + r[e - 1]) r[e - 1] < r[e + 1] && e--;else if (r[e] > r[e + 1]) break;
      p(e);
    }
  }
  function d() {
    while (s > 1) {
      var e = s - 2;
      e > 0 && r[e - 1] < r[e + 1] && e--, p(e);
    }
  }
  function p(i) {
    var o = n[i],
      a = r[i],
      l = n[i + 1],
      h = r[i + 1];
    r[i] = a + h, i === s - 3 && (n[i + 1] = n[i + 2], r[i + 1] = r[i + 2]), s--;
    var f = u(e[l], e, o, a, 0, t);
    o += f, a -= f, 0 !== a && (h = c(e[o + a - 1], e, l, h, h - 1, t), 0 !== h && (a <= h ? m(o, a, l, h) : g(o, a, l, h)));
  }
  function m(n, r, a, s) {
    var h = 0;
    for (h = 0; h < r; h++) l[h] = e[n + h];
    var f = 0,
      d = a,
      p = n;
    if (e[p++] = e[d++], 0 !== --s) {
      if (1 !== r) {
        var m,
          g,
          v,
          y = o;
        while (1) {
          m = 0, g = 0, v = !1;
          do {
            if (t(e[d], l[f]) < 0) {
              if (e[p++] = e[d++], g++, m = 0, 0 === --s) {
                v = !0;
                break;
              }
            } else if (e[p++] = l[f++], m++, g = 0, 1 === --r) {
              v = !0;
              break;
            }
          } while ((m | g) < y);
          if (v) break;
          do {
            if (m = u(e[d], l, f, r, 0, t), 0 !== m) {
              for (h = 0; h < m; h++) e[p + h] = l[f + h];
              if (p += m, f += m, r -= m, r <= 1) {
                v = !0;
                break;
              }
            }
            if (e[p++] = e[d++], 0 === --s) {
              v = !0;
              break;
            }
            if (g = c(l[f], e, d, s, 0, t), 0 !== g) {
              for (h = 0; h < g; h++) e[p + h] = e[d + h];
              if (p += g, d += g, s -= g, 0 === s) {
                v = !0;
                break;
              }
            }
            if (e[p++] = l[f++], 1 === --r) {
              v = !0;
              break;
            }
            y--;
          } while (m >= i || g >= i);
          if (v) break;
          y < 0 && (y = 0), y += 2;
        }
        if (o = y, o < 1 && (o = 1), 1 === r) {
          for (h = 0; h < s; h++) e[p + h] = e[d + h];
          e[p + s] = l[f];
        } else {
          if (0 === r) throw new Error();
          for (h = 0; h < r; h++) e[p + h] = l[f + h];
        }
      } else {
        for (h = 0; h < s; h++) e[p + h] = e[d + h];
        e[p + s] = l[f];
      }
    } else for (h = 0; h < r; h++) e[p + h] = l[f + h];
  }
  function g(n, r, a, s) {
    var h = 0;
    for (h = 0; h < s; h++) l[h] = e[a + h];
    var f = n + r - 1,
      d = s - 1,
      p = a + s - 1,
      m = 0,
      g = 0;
    if (e[p--] = e[f--], 0 !== --r) {
      if (1 !== s) {
        var v = o;
        while (1) {
          var y = 0,
            b = 0,
            w = !1;
          do {
            if (t(l[d], e[f]) < 0) {
              if (e[p--] = e[f--], y++, b = 0, 0 === --r) {
                w = !0;
                break;
              }
            } else if (e[p--] = l[d--], b++, y = 0, 1 === --s) {
              w = !0;
              break;
            }
          } while ((y | b) < v);
          if (w) break;
          do {
            if (y = r - u(l[d], e, n, r, r - 1, t), 0 !== y) {
              for (p -= y, f -= y, r -= y, g = p + 1, m = f + 1, h = y - 1; h >= 0; h--) e[g + h] = e[m + h];
              if (0 === r) {
                w = !0;
                break;
              }
            }
            if (e[p--] = l[d--], 1 === --s) {
              w = !0;
              break;
            }
            if (b = s - c(e[f], l, 0, s, s - 1, t), 0 !== b) {
              for (p -= b, d -= b, s -= b, g = p + 1, m = d + 1, h = 0; h < b; h++) e[g + h] = l[m + h];
              if (s <= 1) {
                w = !0;
                break;
              }
            }
            if (e[p--] = e[f--], 0 === --r) {
              w = !0;
              break;
            }
            v--;
          } while (y >= i || b >= i);
          if (w) break;
          v < 0 && (v = 0), v += 2;
        }
        if (o = v, o < 1 && (o = 1), 1 === s) {
          for (p -= r, f -= r, g = p + 1, m = f + 1, h = r - 1; h >= 0; h--) e[g + h] = e[m + h];
          e[p] = l[d];
        } else {
          if (0 === s) throw new Error();
          for (m = p - (s - 1), h = 0; h < s; h++) e[m + h] = l[h];
        }
      } else {
        for (p -= r, f -= r, g = p + 1, m = f + 1, h = r - 1; h >= 0; h--) e[g + h] = e[m + h];
        e[p] = l[d];
      }
    } else for (m = p - (s - 1), h = 0; h < s; h++) e[m + h] = l[h];
  }
  return a < 120 ? 5 : a < 1542 ? 10 : a < 119151 ? 19 : 40, n = [], r = [], {
    mergeRuns: f,
    forceMergeRuns: d,
    pushRun: h
  };
}
function f(e, t, n, i) {
  n || (n = 0), i || (i = e.length);
  var s = i - n;
  if (!(s < 2)) {
    var c = 0;
    if (s < r) return c = a(e, n, i, t), void l(e, n, i, n + c, t);
    var u = h(e, t),
      f = o(s);
    do {
      if (c = a(e, n, i, t), c < f) {
        var d = s;
        d > f && (d = f), l(e, n, n + d, n + c, t), c = d;
      }
      u.pushRun(n, c), u.mergeRuns(), s -= c, n += c;
    } while (0 !== s);
    u.forceMergeRuns();
  }
}
