let legacyModule = module,
  legacyExports = exports;
var r,
  i = new Uint8Array(16);
function o() {
  if (!r && (r = "undefined" !== typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" !== typeof msCrypto && "function" === typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto), !r)) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return r(i);
}
var a = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function s(e) {
  return "string" === typeof e && a.test(e);
}
for (var l = s, c = [], u = 0; u < 256; ++u) c.push((u + 256).toString(16).substr(1));
function h(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
    n = (c[e[t + 0]] + c[e[t + 1]] + c[e[t + 2]] + c[e[t + 3]] + "-" + c[e[t + 4]] + c[e[t + 5]] + "-" + c[e[t + 6]] + c[e[t + 7]] + "-" + c[e[t + 8]] + c[e[t + 9]] + "-" + c[e[t + 10]] + c[e[t + 11]] + c[e[t + 12]] + c[e[t + 13]] + c[e[t + 14]] + c[e[t + 15]]).toLowerCase();
  if (!l(n)) throw TypeError("Stringified UUID is invalid");
  return n;
}
var f = h;
function d(e, t, n) {
  e = e || {};
  var r = e.random || (e.rng || o)();
  if (r[6] = 15 & r[6] | 64, r[8] = 63 & r[8] | 128, t) {
    n = n || 0;
    for (var i = 0; i < 16; ++i) t[n + i] = r[i];
    return t;
  }
  return f(r);
}
legacyExports["a"] = d;
