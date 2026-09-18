let legacyModule = module,
  legacyExports = exports;
legacyExports.byteLength = u, legacyExports.toByteArray = f, legacyExports.fromByteArray = m;
for (var r = [], i = [], o = "undefined" !== typeof Uint8Array ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, l = a.length; s < l; ++s) r[s] = a[s], i[a.charCodeAt(s)] = s;
function c(e) {
  var t = e.length;
  if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
  var n = e.indexOf("=");
  -1 === n && (n = t);
  var r = n === t ? 0 : 4 - n % 4;
  return [n, r];
}
function u(e) {
  var t = c(e),
    n = t[0],
    r = t[1];
  return 3 * (n + r) / 4 - r;
}
function h(e, t, n) {
  return 3 * (t + n) / 4 - n;
}
function f(e) {
  var t,
    n,
    r = c(e),
    a = r[0],
    s = r[1],
    l = new o(h(e, a, s)),
    u = 0,
    f = s > 0 ? a - 4 : a;
  for (n = 0; n < f; n += 4) t = i[e.charCodeAt(n)] << 18 | i[e.charCodeAt(n + 1)] << 12 | i[e.charCodeAt(n + 2)] << 6 | i[e.charCodeAt(n + 3)], l[u++] = t >> 16 & 255, l[u++] = t >> 8 & 255, l[u++] = 255 & t;
  return 2 === s && (t = i[e.charCodeAt(n)] << 2 | i[e.charCodeAt(n + 1)] >> 4, l[u++] = 255 & t), 1 === s && (t = i[e.charCodeAt(n)] << 10 | i[e.charCodeAt(n + 1)] << 4 | i[e.charCodeAt(n + 2)] >> 2, l[u++] = t >> 8 & 255, l[u++] = 255 & t), l;
}
function d(e) {
  return r[e >> 18 & 63] + r[e >> 12 & 63] + r[e >> 6 & 63] + r[63 & e];
}
function p(e, t, n) {
  for (var r, i = [], o = t; o < n; o += 3) r = (e[o] << 16 & 16711680) + (e[o + 1] << 8 & 65280) + (255 & e[o + 2]), i.push(d(r));
  return i.join("");
}
function m(e) {
  for (var t, n = e.length, i = n % 3, o = [], a = 16383, s = 0, l = n - i; s < l; s += a) o.push(p(e, s, s + a > l ? l : s + a));
  return 1 === i ? (t = e[n - 1], o.push(r[t >> 2] + r[t << 4 & 63] + "==")) : 2 === i && (t = (e[n - 2] << 8) + e[n - 1], o.push(r[t >> 10] + r[t >> 4 & 63] + r[t << 2 & 63] + "=")), o.join("");
}
i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63;
