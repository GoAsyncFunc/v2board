let legacyModule = module,
  legacyExports = exports;
legacyExports.read = function (e, t, n, r, i) {
  var o,
    a,
    s = 8 * i - r - 1,
    l = (1 << s) - 1,
    c = l >> 1,
    u = -7,
    h = n ? i - 1 : 0,
    f = n ? -1 : 1,
    d = e[t + h];
  for (h += f, o = d & (1 << -u) - 1, d >>= -u, u += s; u > 0; o = 256 * o + e[t + h], h += f, u -= 8);
  for (a = o & (1 << -u) - 1, o >>= -u, u += r; u > 0; a = 256 * a + e[t + h], h += f, u -= 8);
  if (0 === o) o = 1 - c;else {
    if (o === l) return a ? NaN : 1 / 0 * (d ? -1 : 1);
    a += Math.pow(2, r), o -= c;
  }
  return (d ? -1 : 1) * a * Math.pow(2, o - r);
}, legacyExports.write = function (e, t, n, r, i, o) {
  var a,
    s,
    l,
    c = 8 * o - i - 1,
    u = (1 << c) - 1,
    h = u >> 1,
    f = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
    d = r ? 0 : o - 1,
    p = r ? 1 : -1,
    m = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
  for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, a = u) : (a = Math.floor(Math.log(t) / Math.LN2), t * (l = Math.pow(2, -a)) < 1 && (a--, l *= 2), t += a + h >= 1 ? f / l : f * Math.pow(2, 1 - h), t * l >= 2 && (a++, l /= 2), a + h >= u ? (s = 0, a = u) : a + h >= 1 ? (s = (t * l - 1) * Math.pow(2, i), a += h) : (s = t * Math.pow(2, h - 1) * Math.pow(2, i), a = 0)); i >= 8; e[n + d] = 255 & s, d += p, s /= 256, i -= 8);
  for (a = a << i | s, c += i; c > 0; e[n + d] = 255 & a, d += p, a /= 256, c -= 8);
  e[n + d - p] |= 128 * m;
};
