let legacyModule = module,
  legacyExports = exports;
function n(e, t) {
  var n = [],
    r = !0,
    i = !1,
    o = void 0;
  try {
    for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done); r = !0) if (n.push(a.value), t && n.length === t) break;
  } catch (e) {
    i = !0, o = e;
  } finally {
    try {
      r || null == s["return"] || s["return"]();
    } finally {
      if (i) throw o;
    }
  }
  return n;
}
legacyModule.exports = n;
