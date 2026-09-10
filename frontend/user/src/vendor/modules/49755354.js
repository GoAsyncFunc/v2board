let legacyModule = module,
  legacyExports = exports;
function n(e, t) {
  var n = [],
    r = !0,
    o = !1,
    i = void 0;
  try {
    for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done); r = !0) if (n.push(a.value), t && n.length === t) break;
  } catch (e) {
    o = !0, i = e;
  } finally {
    try {
      r || null == s["return"] || s["return"]();
    } finally {
      if (o) throw i;
    }
  }
  return n;
}
legacyModule.exports = n;
