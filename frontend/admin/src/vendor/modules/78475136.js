let legacyModule = module,
  legacyExports = exports;
var r = {};
function i(e) {
  var t,
    n,
    i = r[e];
  if (i) return i;
  for (i = r[e] = [], t = 0; t < 128; t++) n = String.fromCharCode(t), /^[0-9a-z]$/i.test(n) ? i.push(n) : i.push("%" + ("0" + t.toString(16).toUpperCase()).slice(-2));
  for (t = 0; t < e.length; t++) i[e.charCodeAt(t)] = e[t];
  return i;
}
function o(e, t, n) {
  var r,
    a,
    s,
    l,
    c,
    u = "";
  for ("string" !== typeof t && (n = t, t = o.defaultChars), "undefined" === typeof n && (n = !0), c = i(t), r = 0, a = e.length; r < a; r++) if (s = e.charCodeAt(r), n && 37 === s && r + 2 < a && /^[0-9a-f]{2}$/i.test(e.slice(r + 1, r + 3))) u += e.slice(r, r + 3), r += 2;else if (s < 128) u += c[s];else if (s >= 55296 && s <= 57343) {
    if (s >= 55296 && s <= 56319 && r + 1 < a && (l = e.charCodeAt(r + 1), l >= 56320 && l <= 57343)) {
      u += encodeURIComponent(e[r] + e[r + 1]), r++;
      continue;
    }
    u += "%EF%BF%BD";
  } else u += encodeURIComponent(e[r]);
  return u;
}
o.defaultChars = ";/?:@&=+$,-_.!~*'()#", o.componentChars = "-_.!~*'()", legacyModule.exports = o;
