let legacyModule = module,
  legacyExports = exports;
var r = {};
function i(e) {
  var t,
    n,
    i = r[e];
  if (i) return i;
  for (i = r[e] = [], t = 0; t < 128; t++) n = String.fromCharCode(t), i.push(n);
  for (t = 0; t < e.length; t++) n = e.charCodeAt(t), i[n] = "%" + ("0" + n.toString(16).toUpperCase()).slice(-2);
  return i;
}
function o(e, t) {
  var n;
  return "string" !== typeof t && (t = o.defaultChars), n = i(t), e.replace(/(%[a-f0-9]{2})+/gi, function (e) {
    var t,
      r,
      i,
      o,
      a,
      s,
      l,
      c = "";
    for (t = 0, r = e.length; t < r; t += 3) i = parseInt(e.slice(t + 1, t + 3), 16), i < 128 ? c += n[i] : 192 === (224 & i) && t + 3 < r && (o = parseInt(e.slice(t + 4, t + 6), 16), 128 === (192 & o)) ? (l = i << 6 & 1984 | 63 & o, c += l < 128 ? "\ufffd\ufffd" : String.fromCharCode(l), t += 3) : 224 === (240 & i) && t + 6 < r && (o = parseInt(e.slice(t + 4, t + 6), 16), a = parseInt(e.slice(t + 7, t + 9), 16), 128 === (192 & o) && 128 === (192 & a)) ? (l = i << 12 & 61440 | o << 6 & 4032 | 63 & a, c += l < 2048 || l >= 55296 && l <= 57343 ? "\ufffd\ufffd\ufffd" : String.fromCharCode(l), t += 6) : 240 === (248 & i) && t + 9 < r && (o = parseInt(e.slice(t + 4, t + 6), 16), a = parseInt(e.slice(t + 7, t + 9), 16), s = parseInt(e.slice(t + 10, t + 12), 16), 128 === (192 & o) && 128 === (192 & a) && 128 === (192 & s)) ? (l = i << 18 & 1835008 | o << 12 & 258048 | a << 6 & 4032 | 63 & s, l < 65536 || l > 1114111 ? c += "\ufffd\ufffd\ufffd\ufffd" : (l -= 65536, c += String.fromCharCode(55296 + (l >> 10), 56320 + (1023 & l))), t += 9) : c += "\ufffd";
    return c;
  });
}
o.defaultChars = ";/?:@&=+$,#", o.componentChars = "", legacyModule.exports = o;
