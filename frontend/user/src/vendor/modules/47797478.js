let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = function (e, t, n, r) {
  var o = n ? n.call(r, e, t) : void 0;
  if (void 0 !== o) return !!o;
  if (e === t) return !0;
  if ("object" !== typeof e || !e || "object" !== typeof t || !t) return !1;
  var i = Object.keys(e),
    a = Object.keys(t);
  if (i.length !== a.length) return !1;
  for (var s = Object.prototype.hasOwnProperty.bind(t), c = 0; c < i.length; c++) {
    var u = i[c];
    if (!s(u)) return !1;
    var l = e[u],
      f = t[u];
    if (o = n ? n.call(r, l, f, u) : void 0, !1 === o || void 0 === o && l !== f) return !1;
  }
  return !0;
};
