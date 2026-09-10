let legacyModule = module,
  legacyExports = exports;
var r = {};
function o(e) {
  var t,
    n,
    o = r[e];
  if (o) return o;
  for (o = r[e] = [], t = 0; t < 128; t++) n = String.fromCharCode(t), /^[0-9a-z]$/i.test(n) ? o.push(n) : o.push("%" + ("0" + t.toString(16).toUpperCase()).slice(-2));
  for (t = 0; t < e.length; t++) o[e.charCodeAt(t)] = e[t];
  return o;
}
function i(e, t, n) {
  var r,
    a,
    s,
    c,
    u,
    l = "";
  for ("string" !== typeof t && (n = t, t = i.defaultChars), "undefined" === typeof n && (n = !0), u = o(t), r = 0, a = e.length; r < a; r++) if (s = e.charCodeAt(r), n && 37 === s && r + 2 < a && /^[0-9a-f]{2}$/i.test(e.slice(r + 1, r + 3))) l += e.slice(r, r + 3), r += 2;else if (s < 128) l += u[s];else if (s >= 55296 && s <= 57343) {
    if (s >= 55296 && s <= 56319 && r + 1 < a && (c = e.charCodeAt(r + 1), c >= 56320 && c <= 57343)) {
      l += encodeURIComponent(e[r] + e[r + 1]), r++;
      continue;
    }
    l += "%EF%BF%BD";
  } else l += encodeURIComponent(e[r]);
  return l;
}
i.defaultChars = ";/?:@&=+$,-_.!~*'()#", i.componentChars = "-_.!~*'()", legacyModule.exports = i;
