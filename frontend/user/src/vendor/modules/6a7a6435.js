let legacyModule = module,
  legacyExports = exports;
var r = {};
function o(e) {
  var t,
    n,
    o = r[e];
  if (o) return o;
  for (o = r[e] = [], t = 0; t < 128; t++) n = String.fromCharCode(t), o.push(n);
  for (t = 0; t < e.length; t++) n = e.charCodeAt(t), o[n] = "%" + ("0" + n.toString(16).toUpperCase()).slice(-2);
  return o;
}
function i(e, t) {
  var n;
  return "string" !== typeof t && (t = i.defaultChars), n = o(t), e.replace(/(%[a-f0-9]{2})+/gi, function (e) {
    var t,
      r,
      o,
      i,
      a,
      s,
      c,
      u = "";
    for (t = 0, r = e.length; t < r; t += 3) o = parseInt(e.slice(t + 1, t + 3), 16), o < 128 ? u += n[o] : 192 === (224 & o) && t + 3 < r && (i = parseInt(e.slice(t + 4, t + 6), 16), 128 === (192 & i)) ? (c = o << 6 & 1984 | 63 & i, u += c < 128 ? "\ufffd\ufffd" : String.fromCharCode(c), t += 3) : 224 === (240 & o) && t + 6 < r && (i = parseInt(e.slice(t + 4, t + 6), 16), a = parseInt(e.slice(t + 7, t + 9), 16), 128 === (192 & i) && 128 === (192 & a)) ? (c = o << 12 & 61440 | i << 6 & 4032 | 63 & a, u += c < 2048 || c >= 55296 && c <= 57343 ? "\ufffd\ufffd\ufffd" : String.fromCharCode(c), t += 6) : 240 === (248 & o) && t + 9 < r && (i = parseInt(e.slice(t + 4, t + 6), 16), a = parseInt(e.slice(t + 7, t + 9), 16), s = parseInt(e.slice(t + 10, t + 12), 16), 128 === (192 & i) && 128 === (192 & a) && 128 === (192 & s)) ? (c = o << 18 & 1835008 | i << 12 & 258048 | a << 6 & 4032 | 63 & s, c < 65536 || c > 1114111 ? u += "\ufffd\ufffd\ufffd\ufffd" : (c -= 65536, u += String.fromCharCode(55296 + (c >> 10), 56320 + (1023 & c))), t += 9) : u += "\ufffd";
    return u;
  });
}
i.defaultChars = ";/?:@&=+$,#", i.componentChars = "", legacyModule.exports = i;
